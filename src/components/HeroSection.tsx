import Icon from "@/components/ui/icon";
import { HERO_IMAGE, TRUCK_IMAGE, STATS, SERVICES } from "@/components/constants";

export default function HeroSection() {
  return (
    <>
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
              Транспортная компания с 12-летним опытом. Доставляем грузы по России и СНГ — от 100 кг до 20 тонн.
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
    </>
  );
}