/* ==========================================================================
   GAMIFICATION
   ========================================================================== */
const AppGamification = {
  addXP(amount, taskId) {
    if (!AppState.user.completedTasks.includes(taskId)) {
      AppState.user.completedTasks.push(taskId);
      AppState.user.xp += amount;
      this.checkLevel();
      this.checkBadges();
      AppState.save();
      this.updateUI();
    }
  },
  checkLevel() { AppState.user.level = Math.floor(AppState.user.xp / 100) + 1; },
  checkBadges() {
    const c = AppState.user.completedTasks;
    const b = AppState.user.badges;
    if (c.includes('w1') && c.includes('w2') && c.includes('w3') && !b.includes('b_word_1')) b.push('b_word_1');
    if (['w1','w2','w3','w4','w5','w6','w7','w8','w9','w10','w11'].every(id => c.includes(id)) && !b.includes('b_word_master')) b.push('b_word_master');
    if (c.includes('e2') && c.includes('e3') && !b.includes('b_excel_1')) b.push('b_excel_1');
    if (['e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11'].every(id => c.includes(id)) && !b.includes('b_excel_master')) b.push('b_excel_master');
    if (c.includes('p1') && c.includes('p5') && !b.includes('b_ppt_1')) b.push('b_ppt_1');
    if (['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11'].every(id => c.includes(id)) && !b.includes('b_ppt_master')) b.push('b_ppt_master');
    if (AppState.user.xp >= 200 && !b.includes('b_xp_200')) b.push('b_xp_200');
    if (b.length >= 8 && !b.includes('b_master_office')) b.push('b_master_office');
  },
  resetProgress() {
    if (confirm('Deseja reiniciar todo o seu progresso?')) {
      AppState.user = { xp: 0, level: 1, completedTasks: [], badges: [] };
      AppState.save();
      location.reload();
    }
  },
  updateUI() {
    document.getElementById('header-xp').textContent = `${AppState.user.xp} XP`;
    document.getElementById('header-xp-mobile').textContent = `${AppState.user.xp} XP`;
    document.getElementById('header-level').textContent = `Nível ${AppState.user.level}`;
    document.getElementById('level-bar').style.width = `${Math.min(100, AppState.user.xp % 100)}%`;

    const c = AppState.user.completedTasks;
    const wordDone = c.filter(id => id.startsWith('w')).length;
    const excelDone = c.filter(id => id.startsWith('e')).length;
    const pptDone = c.filter(id => id.startsWith('p')).length;
    const m0Done = c.includes('m0');

    document.getElementById('progress-word-bar').style.width = `${(wordDone/11)*100}%`;
    document.getElementById('progress-excel-bar').style.width = `${(excelDone/11)*100}%`;
    document.getElementById('progress-ppt-bar').style.width = `${(pptDone/11)*100}%`;
    document.getElementById('m0-bar').style.width = m0Done ? '100%' : '0%';
    document.getElementById('m0-status').textContent = m0Done ? 'Concluído — bom trabalho!' : 'Comece por aqui se nunca usou o Office';

    document.getElementById('badge-count-word').textContent = `${wordDone}/11`;
    document.getElementById('badge-count-excel').textContent = `${excelDone}/11`;
    document.getElementById('badge-count-ppt').textContent = `${pptDone}/11`;

    const grid = document.getElementById('badges-grid');
    grid.innerHTML = '';
    BADGES_DB.forEach(badge => {
      const isUnlocked = AppState.user.badges.includes(badge.id);
      const el = document.createElement('div');
      el.className = `p-3 rounded-xl border text-center space-y-1.5 ${isUnlocked ? 'sheet-soft border-ink/20' : 'bg-paperDim/50 border-line opacity-40 grayscale'}`;
      el.innerHTML = `
        <div class="w-9 h-9 mx-auto rounded-full bg-paper flex items-center justify-center text-sm ${badge.color}"><i class="fa-solid ${badge.icon}"></i></div>
        <p class="font-bold text-[11px] leading-tight">${badge.title}</p>`;
      grid.appendChild(el);
    });
    document.getElementById('total-badges-unlocked').textContent = `${AppState.user.badges.length} / ${BADGES_DB.length}`;
  }
};
