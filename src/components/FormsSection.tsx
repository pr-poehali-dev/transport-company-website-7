import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CITIES } from "@/components/constants";

export default function FormsSection() {
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
    <>
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
    </>
  );
}
