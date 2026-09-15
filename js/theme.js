/* ==========================================================================
   THEME (DARK MODE)
   ========================================================================== */
const ThemeManager = {
  KEY: 'office_pro_theme',
  init() {
    const saved = localStorage.getItem(this.KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.apply(saved ? saved === 'dark' : prefersDark);
  },
  toggle() {
    this.apply(!document.documentElement.classList.contains('dark'));
  },
  apply(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem(this.KEY, isDark ? 'dark' : 'light'); } catch(e) {}
    ['theme-icon-mobile', 'theme-icon-desktop'].forEach(id => {
      const icon = document.getElementById(id);
      if (icon) icon.className = `fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-xs w-3.5 text-center`;
    });
  }
};

const Glossary = {
  open() { document.getElementById('glossary-modal').classList.remove('hidden'); },
  close() { document.getElementById('glossary-modal').classList.add('hidden'); },
  render() {
    const list = document.getElementById('glossary-list');
    list.innerHTML = GLOSSARY_DB.map(g => `
      <div class="border-b border-line pb-2.5">
        <p class="font-bold text-sm">${g.term}</p>
        <p class="text-xs text-ink/60">${g.def}</p>
      </div>`).join('');
    document.getElementById('modulo0-glossary').innerHTML = GLOSSARY_DB.map(g => `
      <div class="sheet-soft rounded-lg p-3">
        <p class="font-bold text-xs mb-0.5">${g.term}</p>
        <p class="text-[11px] text-ink/60">${g.def}</p>
      </div>`).join('');
  }
};

const Modulo0 = {
  complete() {
    AppGamification.addXP(20, 'm0');
    if (!AppState.user.badges.includes('b_modulo0')) AppState.user.badges.push('b_modulo0');
    AppState.save();
    AppGamification.updateUI();
    const btn = document.getElementById('m0-complete-btn');
    btn.innerHTML = 'Concluído <i class="fa-solid fa-check ml-1"></i>';
    btn.disabled = true;
    btn.classList.add('opacity-60');
  }
};
