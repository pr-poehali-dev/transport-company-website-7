import Icon from "@/components/ui/icon";
import { NAV_LINKS, REVIEWS, WAREHOUSE_IMAGE } from "@/components/constants";
import { TelegramIcon } from "@/components/Header";

export default function FooterSection() {
  return (
    <>
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
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-orange-500" />
                  </div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider font-bold">Телефоны</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+79128887300" className="text-gray-900 font-bold hover:text-orange-500 transition-colors text-lg">+7 912 888-73-00</a>
                  <a href="tel:+79128880042" className="text-gray-900 font-bold hover:text-orange-500 transition-colors text-lg">+7 912 888-00-42</a>
                  <a href="tel:+79128884300" className="text-gray-900 font-bold hover:text-orange-500 transition-colors text-lg">+7 912 888-43-00</a>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-orange-500" />
                  </div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider font-bold">Email</span>
                </div>
                <a href="mailto:yulmitrans@mail.ru" className="text-gray-900 font-bold hover:text-orange-500 transition-colors text-base break-all">yulmitrans@mail.ru</a>
              </div>

              <a href="https://t.me/yulmitrans" target="_blank" rel="noopener noreferrer"
                 className="bg-[#2AABEE] rounded-xl p-6 hover:bg-[#1d96d4] transition-all group col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    <TelegramIcon />
                  </div>
                  <span className="text-sm text-white/80 uppercase tracking-wider font-bold">Telegram</span>
                </div>
                <div className="text-white font-bold text-lg">t.me/yulmitrans</div>
                <div className="text-white/70 text-sm mt-1">Написать в мессенджер →</div>
              </a>

              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-orange-500" />
                  </div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider font-bold">Режим работы</span>
                </div>
                <div className="text-gray-900 font-bold text-lg">Круглосуточно,<br />без выходных</div>
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
          <div className="text-center text-gray-500 text-sm space-y-1">
            <div>© 2025 ЮЛМИ-ТРАНС — Грузоперевозки по России и Крайнему Северу</div>
            <div className="text-gray-600 text-xs">ИП Вахрушев Юлий Михайлович · ИНН 110100379330 · ОГРНИП 317110100009462</div>
          </div>
        </div>
      </footer>
    </>
  );
}