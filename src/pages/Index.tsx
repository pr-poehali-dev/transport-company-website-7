import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b419a453-393d-4d16-854e-328b5dc40ae6/files/dfeb7756-3e45-49b8-acdf-e204a0b162af.jpg";
const TRUCK_IMAGE = "https://cdn.poehali.dev/projects/b419a453-393d-4d16-854e-328b5dc40ae6/files/1d7f3725-b965-4a58-ae79-b5e37fef11d4.jpg";
const WAREHOUSE_IMAGE = "https://cdn.poehali.dev/projects/b419a453-393d-4d16-854e-328b5dc40ae6/files/d2c18552-95bb-417b-a36d-2a6cbdd79e77.jpg";

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

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

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white text-xs py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+79128887300" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <Icon name="Phone" size={12} />+7 912 888-73-00
            </a>
            <span className="text-white/20">|</span>
            <a href="tel:+79128880042" className="hover:text-orange-400 transition-colors">+7 912 888-00-42</a>
            <span className="text-white/20">|</span>
            <a href="tel:+79128884300" className="hover:text-orange-400 transition-colors">+7 912 888-43-00</a>
          </div>

          <div className="flex items-center gap-5">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-white/60 hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="mailto:yulmitrans@mail.ru" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
              <Icon name="Mail" size={12} />yulmitrans@mail.ru
            </a>
            <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 bg-[#2AABEE] hover:bg-[#1d96d4] text-white px-3 py-0.5 rounded-full transition-colors font-medium">
              <TelegramIcon />Telegram
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="fixed top-0 md:top-8 left-0 right-0 z-40 bg-white/97 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <Icon name="Truck" size={16} className="text-white" />
            </div>
            <span className="font-black text-gray-900 text-xl tracking-tight">ЮЛМИ-<span className="text-orange-500">ТРАНС</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-orange-500 transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 text-[#2AABEE] border border-[#2AABEE]/30 hover:bg-[#2AABEE]/10 px-3 py-2 rounded-lg transition-colors text-sm font-semibold">
              <TelegramIcon />Написать
            </a>
            <a href="#order" className="bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-orange-400 transition-colors shadow-sm">
              Оставить заявку
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-gray-900" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-gray-700 font-medium py-1" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
                 className="flex-1 flex items-center justify-center gap-2 bg-[#2AABEE] text-white text-sm font-bold px-4 py-3 rounded-lg" onClick={() => setMenuOpen(false)}>
                <TelegramIcon />Telegram
              </a>
              <a href="#order" className="flex-1 bg-orange-500 text-white text-sm font-bold px-4 py-3 rounded-lg text-center" onClick={() => setMenuOpen(false)}>
                Заявка
              </a>
            </div>
            <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
              <a href="tel:+79128887300" className="text-sm text-gray-600 py-1">+7 912 888-73-00</a>
              <a href="tel:+79128880042" className="text-sm text-gray-600 py-1">+7 912 888-00-42</a>
              <a href="tel:+79128884300" className="text-sm text-gray-600 py-1">+7 912 888-43-00</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-24 md:pt-32 min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <a href="tel:+79128887300" className="text-white font-bold text-sm hover:text-orange-400 transition-colors">+7 912 888-73-00</a>
              <span className="text-white/30">|</span>
              <a href="tel:+79128880042" className="text-white font-bold text-sm hover:text-orange-400 transition-colors">+7 912 888-00-42</a>
              <span className="text-white/30">|</span>
              <a href="tel:+79128884300" className="text-white font-bold text-sm hover:text-orange-400 transition-colors">+7 912 888-43-00</a>
              <span className="text-white/30">|</span>
              <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer" className="text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors">Telegram</a>
            </div>
            <div className="inline-flex items-center gap-2 text-white/70 text-sm font-medium mb-5 tracking-widest uppercase">
              <div className="w-8 h-px bg-orange-400" />
              Надёжная доставка грузов
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-4 animate-fade-in">
              Везём<br />
              <span className="text-orange-400">вовремя.</span><br />
              Всегда.
            </h1>
            <p className="text-lg text-white/70 mb-6 leading-snug animate-fade-in animate-delay-200 max-w-lg">
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
      <section id="services" className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-5">
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
              <div key={i} className="bg-white p-6 hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center mb-4 group-hover:bg-orange-50 transition-colors">
                  <Icon name={s.icon} fallback="Package" size={22} className="text-gray-600 group-hover:text-orange-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-orange-400 font-bold tracking-widest uppercase mb-3">О компании</div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
            Быстрая, надёжная доставка<br />грузов по всей России
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-3 rounded-xl overflow-hidden h-52 relative">
              <img src={TRUCK_IMAGE} alt="Грузовик ЮЛМИ-ТРАНС" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/30 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8">
                <div className="text-white">
                  <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">Собственный автопарк</div>
                  <div className="text-2xl font-black">Доставляем по всей России</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Основное */}
            <div className="lg:col-span-1">
              <p className="text-gray-300 leading-snug mb-5">
                Грузы от 100 кг до 20 т по всей России, включая регионы Крайнего Севера. Принимаем сборный груз и негабарит. Оформление разрешений и сопроводительных документов. Любая форма оплаты, в том числе НДС.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "100% гарантия сохранности груза + страхование",
                  "Перевозка от двери до двери без склада и перегруза",
                  "Персональный менеджер, круглосуточная связь",
                  "Помощь в погрузке/выгрузке, спецтехника",
                  "Документы в течение 3 дней после доставки",
                  "Система лояльности для постоянных клиентов",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Для физических лиц */}
            <div className="bg-gray-800 rounded-sm p-6">
              <div className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">Для физических лиц</div>
              <div className="flex flex-col gap-2">
                {[
                  "Домашние переезды",
                  "Переезды для военнослужащих",
                  "Перевозка личных вещей, мебели, бытовой техники",
                  "Перевозка легковых автомобилей",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xs">▸</span>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Для юридических лиц */}
            <div className="bg-gray-800 rounded-sm p-6">
              <div className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-4">Для юридических лиц</div>
              <div className="flex flex-col gap-2">
                {[
                  "Любые грузы от 100 кг в любую точку России",
                  "Контейнерные перевозки",
                  "Скоропортящиеся грузы, рефрижератор",
                  "Металл, металлолом, трубы, металлопрокат",
                  "ЖД запчасти, включая колёсные пары",
                  "Лес, брус, доска, пиломатериал",
                  "Негабарит: строительная и с/х техника, оборудование, металлоконструкции, водный транспорт, эл. подстанции",
                  "Труднодоступные районы: Воркута, Усинск, ХМАО, ЯНАО",
                  "Услуга «Срочная доставка» отдельным транспортом",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1 text-xs">▸</span>
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Стоимость</div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">Расчёт стоимости</h2>
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
                  <div className="text-center mb-4">
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
      <section id="order" className="py-14 px-6 bg-orange-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs text-orange-100 font-bold tracking-widest uppercase mb-3">Работаем быстро</div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Оставьте заявку —<br />перезвоним за 15 минут
              </h2>
              <p className="text-orange-100 leading-snug mb-5">
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
      <section id="reviews" className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Доверяют нам</div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Отзывы клиентов</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border border-gray-100 p-6 rounded-sm hover:border-gray-200 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-snug mb-4">«{r.text}»</p>
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
      <section id="contacts" className="py-14 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-3">Связаться с нами</div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">Контакты</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={16} className="text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Телефоны</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+79128887300" className="text-gray-900 font-semibold hover:text-orange-500 transition-colors text-sm">+7 912 888-73-00</a>
                  <a href="tel:+79128880042" className="text-gray-900 font-semibold hover:text-orange-500 transition-colors text-sm">+7 912 888-00-42</a>
                  <a href="tel:+79128884300" className="text-gray-900 font-semibold hover:text-orange-500 transition-colors text-sm">+7 912 888-43-00</a>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={16} className="text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Email</span>
                </div>
                <a href="mailto:yulmitrans@mail.ru" className="text-gray-900 font-semibold hover:text-orange-500 transition-colors text-sm break-all">yulmitrans@mail.ru</a>
              </div>

              <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
                 className="bg-[#2AABEE] rounded-xl p-5 hover:bg-[#1d96d4] transition-all group col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    <TelegramIcon />
                  </div>
                  <span className="text-xs text-white/80 uppercase tracking-wider font-bold">Telegram</span>
                </div>
                <div className="text-white font-bold text-sm">t.me/yulmitrans</div>
                <div className="text-white/70 text-xs mt-1">Написать в мессенджер →</div>
              </a>

              <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-orange-500" />
                  </div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Режим работы</span>
                </div>
                <div className="text-gray-900 font-semibold text-sm">Круглосуточно,<br />без выходных</div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden h-64 lg:h-auto relative min-h-48">
              <img src={WAREHOUSE_IMAGE} alt="Логистический центр" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-1">Логистика</div>
                <div className="text-white font-black text-lg leading-tight">Работаем по всей России и Крайнему Северу</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Icon name="Truck" size={16} className="text-white" />
              </div>
              <span className="font-black text-xl">ЮЛМИ-<span className="text-orange-500">ТРАНС</span></span>
            </div>
            <div className="flex flex-wrap gap-5 justify-center">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href="tel:+79128887300" className="text-sm text-gray-400 hover:text-white transition-colors">+7 912 888-73-00</a>
              <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 bg-[#2AABEE] hover:bg-[#1d96d4] text-white px-3 py-1.5 rounded-full text-sm font-semibold transition-colors">
                <TelegramIcon />Telegram
              </a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">© 2025 ЮЛМИ-ТРАНС — Грузоперевозки по России и Крайнему Северу</div>
        </div>
      </footer>
    </div>
  );
}