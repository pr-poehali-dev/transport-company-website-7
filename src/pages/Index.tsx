import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b419a453-393d-4d16-854e-328b5dc40ae6/files/dfeb7756-3e45-49b8-acdf-e204a0b162af.jpg";

const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

const SERVICES = [
  { icon: "Truck", title: "Автодоставка", desc: "Доставка грузов по России и СНГ. Собственный автопарк из 150+ единиц техники." },
  { icon: "Package", title: "Сборные грузы", desc: "Оптимизируем маршруты и объединяем грузы — экономия до 40% от стоимости." },
  { icon: "Zap", title: "Экспресс-доставка", desc: "Срочная доставка от двери до двери за 24 часа по крупным городам." },
  { icon: "ShieldCheck", title: "Страхование грузов", desc: "Полное страховое покрытие грузов на всём маршруте следования." },
];

const STATS = [
  { value: "12 лет", label: "на рынке" },
  { value: "50 000+", label: "доставок в год" },
];

const REVIEWS = [
  { name: "Алексей Морозов", company: "ООО «ПромСнаб»", text: "Работаем три года. За всё время не было ни одного серьёзного сбоя. Менеджеры отвечают быстро, груз всегда приходит в срок.", rating: 5 },
  { name: "Марина Власова", company: "Сеть магазинов «Уютный дом»", text: "Перевезли всё оборудование при переезде. Упаковали профессионально, ничего не повредили. Рекомендую всем коллегам.", rating: 5 },
  { name: "Дмитрий Карпов", company: "ИП Карпов Д.В.", text: "Цена честная, менеджеры объясняют все детали сразу. Особенно понравился онлайн-трекинг — видно, где груз в любой момент.", rating: 5 },
];

const CITIES = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону", "Уфа", "Красноярск"];

export default function Index() {
  const [form, setForm] = useState({ name: "", phone: "", from: "", to: "", weight: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [calcFrom, setCalcFrom] = useState("");
  const [calcTo, setCalcTo] = useState("");
  const [calcWeight, setCalcWeight] = useState("");
  const [calcName, setCalcName] = useState("");
  const [calcPhone, setCalcPhone] = useState("");
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [calcSent, setCalcSent] = useState(false);
  const [calcSending, setCalcSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/yulmitrans@mail.ru", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "Новая заявка с сайта ЮЛМИ-ТРАНС",
          Имя: form.name,
          Телефон: form.phone,
          Откуда: form.from,
          Куда: form.to,
          Вес: form.weight,
          Комментарий: form.comment,
        }),
      });
    } catch (err) { console.error(err); }
    setFormSent(true);
  };

  const handleCalc = () => {
    if (!calcWeight || !calcFrom || !calcTo) return;
    const base = parseFloat(calcWeight) * 12;
    const distance = Math.floor(Math.random() * 1500 + 500);
    const result = Math.round(base + distance * 0.8);
    setCalcResult(result);
  };

  const handleCalcOrder = async () => {
    if (!calcName || !calcPhone) return;
    setCalcSending(true);
    try {
      await fetch("https://formsubmit.co/ajax/yulmitrans@mail.ru", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          _subject: "Заявка из калькулятора — ЮЛМИ-ТРАНС",
          ФИО: calcName,
          Телефон: calcPhone,
          Откуда: calcFrom,
          Куда: calcTo,
          "Вес (кг)": calcWeight,
          "Стоимость (ориент.)": calcResult ? `${calcResult.toLocaleString("ru")} ₽` : "—",
        }),
      });
    } catch (err) { console.error(err); }
    setCalcSending(false);
    setCalcSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-sm flex items-center justify-center">
              <Icon name="Truck" size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">ЮЛМИ-ТРАНС</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78001234567" className="text-sm font-semibold text-gray-900">8 800 123-45-67</a>
            <a href="#order" className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-gray-700 transition-colors">
              Оставить заявку
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-gray-900" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#order" className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-sm text-center" onClick={() => setMenuOpen(false)}>
              Оставить заявку
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-16 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-white/70 text-sm font-medium mb-8 tracking-widest uppercase">
              <div className="w-8 h-px bg-orange-400" />
              Надёжная доставка грузов
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6 animate-fade-in">
              Везём<br />
              <span className="text-orange-400">вовремя.</span><br />
              Всегда.
            </h1>
            <p className="text-lg text-white/70 mb-10 leading-relaxed animate-fade-in animate-delay-200 max-w-lg">
              Транспортная компания с 12-летним опытом. Доставляем грузы по России и СНГ — от 1 кг до 20 тонн.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animate-delay-300">
              <a href="#order" className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-sm transition-colors text-center">
                Рассчитать стоимость
              </a>
              <a href="#services" className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-sm transition-colors text-center">
                Наши услуги
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs text-white/60 mt-0.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b border-gray-100 pb-8">
            <div>
              <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Что мы делаем</div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Услуги</h2>
            </div>
            <a href="#order" className="hidden md:block text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Оставить заявку →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white p-8 hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
                  <Icon name={s.icon} fallback="Package" size={22} className="text-gray-600 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-xs text-orange-400 font-bold tracking-widest uppercase mb-3">О компании</div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                Движемся вперёд<br />с 2012 года
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                ТрансЛогист — одна из ведущих транспортных компаний России. Мы начинали с 5 грузовиков и небольшого офиса в Москве. Сегодня наш автопарк насчитывает более 150 единиц техники, а сеть охватывает все регионы страны.
              </p>
              <p className="text-gray-400 leading-relaxed mb-10">
                Наш принцип прост: груз должен прийти вовремя и в сохранности. Именно поэтому 78% клиентов возвращаются к нам снова.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Собственный автопарк — без посредников",
                  "GPS-трекинг каждого груза в реальном времени",
                  "Личный менеджер на каждый заказ",
                  "Страхование грузов включено в тариф",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="border border-gray-700 p-8 rounded-sm">
                  <div className="text-4xl font-black text-orange-400 mb-2">{s.value}</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Стоимость</div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Калькулятор доставки</h2>
              <p className="text-gray-500 mt-4">Рассчитайте приблизительную стоимость за несколько секунд</p>
            </div>

            <div className="border border-gray-100 rounded-sm p-8 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Откуда</label>
                  <select
                    value={calcFrom}
                    onChange={e => setCalcFrom(e.target.value)}
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm bg-white text-gray-900 focus:outline-none focus:border-gray-900"
                  >
                    <option value="">Выберите город</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Куда</label>
                  <select
                    value={calcTo}
                    onChange={e => setCalcTo(e.target.value)}
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm bg-white text-gray-900 focus:outline-none focus:border-gray-900"
                  >
                    <option value="">Выберите город</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Вес груза (кг)</label>
                  <input
                    type="number"
                    placeholder="Например: 500"
                    value={calcWeight}
                    onChange={e => setCalcWeight(e.target.value)}
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm bg-white text-gray-900 focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleCalc}
                className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-4 rounded-sm transition-colors"
              >
                Рассчитать стоимость
              </button>

              {calcResult && (
                <div className="mt-6 p-6 bg-white border border-orange-200 rounded-sm">
                  <div className="text-center mb-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Ориентировочная стоимость</div>
                    <div className="text-4xl font-black text-gray-900">{calcResult.toLocaleString("ru")} ₽</div>
                    <div className="text-sm text-gray-400 mt-2">Точная цена — после консультации с менеджером</div>
                  </div>
                  {calcSent ? (
                    <div className="text-center py-4">
                      <div className="text-orange-500 font-bold text-lg mb-1">Заявка отправлена!</div>
                      <div className="text-gray-500 text-sm">Мы свяжемся с вами в ближайшее время</div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">ФИО *</label>
                          <input
                            type="text"
                            placeholder="Иванов Иван Иванович"
                            value={calcName}
                            onChange={e => setCalcName(e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm bg-white text-gray-900 focus:outline-none focus:border-gray-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Телефон *</label>
                          <input
                            type="tel"
                            placeholder="+7 (999) 000-00-00"
                            value={calcPhone}
                            onChange={e => setCalcPhone(e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm bg-white text-gray-900 focus:outline-none focus:border-gray-900"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleCalcOrder}
                        disabled={calcSending || !calcName || !calcPhone}
                        className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-3 rounded-sm transition-colors text-sm"
                      >
                        {calcSending ? "Отправляем..." : "Отправить заявку"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order" className="py-24 px-6 bg-orange-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="text-xs text-orange-100 font-bold tracking-widest uppercase mb-3">Работаем быстро</div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Оставьте заявку —<br />перезвоним за 15 минут
              </h2>
              <p className="text-orange-100 leading-relaxed mb-8">
                Менеджер уточнит детали, рассчитает точную стоимость и предложит оптимальный маршрут. Без скрытых комиссий.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "Phone", text: "+7 912 888-73-00" },
                  { icon: "Phone", text: "+7 912 888-00-42" },
                  { icon: "Phone", text: "+7 912 888-43-00" },
                  { icon: "Mail", text: "yulmitrans@mail.ru" },
                  { icon: "Send", text: "Telegram: t.me/yulmitrans" },
                  { icon: "Clock", text: "Работаем круглосуточно, 7 дней в неделю" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Icon name={item.icon} fallback="Phone" size={18} className="text-orange-100" />
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-sm p-8">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-orange-500" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Заявка принята!</h3>
                  <p className="text-gray-500 text-sm">Менеджер свяжется с вами в течение 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <h3 className="text-xl font-black text-gray-900 mb-2">Заявка на доставку</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Имя *</label>
                      <input
                        required
                        type="text"
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Телефон *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Откуда</label>
                      <input
                        type="text"
                        placeholder="Город отправки"
                        value={form.from}
                        onChange={e => setForm({ ...form, from: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Куда</label>
                      <input
                        type="text"
                        placeholder="Город доставки"
                        value={form.to}
                        onChange={e => setForm({ ...form, to: e.target.value })}
                        className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Вес груза (кг)</label>
                    <input
                      type="number"
                      placeholder="Приблизительный вес"
                      value={form.weight}
                      onChange={e => setForm({ ...form, weight: e.target.value })}
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Комментарий</label>
                    <textarea
                      rows={3}
                      placeholder="Особенности груза, пожелания..."
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      className="w-full border border-gray-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gray-900 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-4 rounded-sm transition-colors"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Доверяют нам</div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Отзывы клиентов</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-gray-100 p-8 rounded-sm hover:border-gray-200 transition-colors">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">«{r.text}»</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-bold text-gray-900 text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Связаться с нами</div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Контакты</h2>

              <div className="flex flex-col gap-8">
                {[
                  { icon: "Phone", label: "Телефоны", value: "+7 912 888-73-00 / +7 912 888-00-42 / +7 912 888-43-00" },
                  { icon: "Mail", label: "Email", value: "yulmitrans@mail.ru" },
                  { icon: "Send", label: "Telegram", value: "t.me/yulmitrans" },
                  { icon: "Clock", label: "Режим работы", value: "Круглосуточно, без выходных" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} fallback="MapPin" size={18} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">{item.label}</div>
                      <div className="text-gray-900 font-semibold">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-white border border-gray-200 rounded-sm p-8">
                <h3 className="text-lg font-black text-gray-900 mb-2">Города присутствия</h3>
                <p className="text-sm text-gray-500 mb-6">Доставляем во все города России и СНГ</p>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map(c => (
                    <span key={c} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-sm">
                      {c}
                    </span>
                  ))}
                  <span className="bg-orange-50 text-orange-600 text-xs font-medium px-3 py-1.5 rounded-sm">
                    + ещё 200 городов
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
              <Icon name="Truck" size={14} className="text-gray-900" />
            </div>
            <span className="font-bold text-lg">ЮЛМИ-ТРАНС</span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <p className="text-gray-500 text-sm">© 2025 ЮЛМИ-ТРАНС</p>
        </div>
      </footer>
    </div>
  );
}