'use client';

import React, { useEffect } from 'react';

const ThemeSwitcher = () => {
  useEffect(() => {
    // Sayfa yüklendiğinde local storage'dan temayı al
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div title="Change Theme" className="dropdown dropdown-hover dropdown-end block">
      <div tabIndex={0} role="button" className="btn btn-sm btn-ghost">
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
        {/* <span className="font-normal">Theme</span> */}
        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <div tabIndex={0} className="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[30.5rem] max-h-[calc(100vh-8.6rem)] overflow-y-auto border border-white/5 shadow-2xl outline-1 outline-black/5 mt-16">
        <ul className="menu w-56">
          {[
            'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro',
            'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel',
            'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business',
            'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'
          ].map((theme) => (
            <li key={theme}>
              <button
                className="gap-3 px-2"
                onClick={() => handleThemeChange(theme)}
                data-set-theme={theme}
                data-act-class="[&_svg]:visible"
              >
                <div data-theme={theme} className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                  <div className="bg-base-content size-1 rounded-full"></div>
                  <div className="bg-primary size-1 rounded-full"></div>
                  <div className="bg-secondary size-1 rounded-full"></div>
                  <div className="bg-accent size-1 rounded-full"></div>
                </div>
                <div className="w-32 truncate">{theme}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="invisible h-3 w-3 shrink-0">
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSwitcher;