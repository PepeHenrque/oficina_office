/* ==========================================================================
   NAVIGATION
   ========================================================================== */
const AppNav = {
  init() {
    const desktop = document.getElementById('desktop-nav');
    const mobile = document.getElementById('mobile-nav');
    NAV_ITEMS.forEach(item => {
      const d = document.createElement('button');
      d.id = `nav-desktop-${item.id}`;
      d.onclick = () => this.switchTab(item.id);
      d.className = 'nav-link text-left px-3 py-2 rounded-lg flex items-center gap-2.5 text-ink/70';
      d.innerHTML = `<i class="fa-solid ${item.icon} w-4 text-center"></i> ${item.label}`;
      desktop.appendChild(d);

      const m = document.createElement('button');
      m.id = `nav-mobile-${item.id}`;
      m.onclick = () => this.switchTab(item.id);
      m.className = 'nav-link shrink-0 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-ink/70 bg-paperDim font-semibold';
      m.innerHTML = `<i class="fa-solid ${item.icon}"></i> ${item.label}`;
      mobile.appendChild(m);
    });
  },
  switchTab(tabId) {
    AppState.currentTab = tabId;
    NAV_ITEMS.forEach(item => {
      const view = document.getElementById(`view-${item.id}`);
      if (view) view.classList.add('hidden');
      document.getElementById(`nav-desktop-${item.id}`)?.classList.remove('active');
      document.getElementById(`nav-mobile-${item.id}`)?.classList.remove('active');
    });
    document.getElementById(`view-${tabId}`)?.classList.remove('hidden');
    document.getElementById(`nav-desktop-${tabId}`)?.classList.add('active');
    document.getElementById(`nav-mobile-${tabId}`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
