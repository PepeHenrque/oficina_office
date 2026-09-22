/* ==========================================================================
   INIT
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  AppState.load();
  AppNav.init();
  Glossary.render();
  AppGamification.updateUI();
  AppNav.switchTab('dashboard');

  const m0Btn = document.getElementById('m0-complete-btn');
  if (AppState.user.completedTasks.includes('m0')) {
    m0Btn.innerHTML = 'Concluído <i class="fa-solid fa-check ml-1"></i>';
    m0Btn.disabled = true;
    m0Btn.classList.add('opacity-60');
  }

  WordModule.loadTask(0);
  ExcelModule.loadTask(0);
  PPTModule.loadTask(0);
});
