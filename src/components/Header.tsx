import { useState } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "@/components/constants";

export const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
    </>
  );
}
