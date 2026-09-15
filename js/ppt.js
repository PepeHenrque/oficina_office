/* ==========================================================================
   POWERPOINT MODULE
   ========================================================================== */
const PPTModule = {
  activeTaskIdx: 0,
  slides: [],
  activeSlideIdx: 0,
  theme: 'dark',
  transition: 'none',
  hintVisible: false,

  tasks: [
    { id:'p1', title:'1. Um título de capa que comunica', xp:30,
      explanation:'<p>O primeiro slide define o tom de tudo que vem depois. Altere o título principal para <strong>"Inovação Corporativa"</strong>.</p>',
      hint: 'Clique no título do slide e digite Inovação Corporativa.',
      officeReal: 'No PowerPoint: clique na caixa de texto do título e digite.',
      initSlides: [{ title:'Título da Apresentação', subtitle:'Clique para adicionar subtítulo', cards:[], table:null, list:null }],
      checks: [
        { label: 'Título deve conter "Inovação Corporativa"', test: s => s[0].title.toLowerCase().includes('inovação corporativa') }
      ] },

    { id:'p2', title:'2. Adicionar um novo slide', xp:30,
      explanation:'<p>Uma apresentação raramente cabe num slide só. Clique em <strong>+ Slide</strong> para expandir a narrativa.</p>',
      hint: 'Clique no botão "+ Slide" na barra de ferramentas acima do palco.',
      officeReal: 'No PowerPoint: <strong>Página Inicial</strong> → <strong>Novo Slide</strong> (<code>Ctrl+M</code>).',
      initSlides: [{ title:'Slide Capa', subtitle:'Apresentação Institucional', cards:[], table:null, list:null }],
      checks: [
        { label: 'Ter pelo menos 2 slides', test: s => s.length >= 2 }
      ] },

    { id:'p3', title:'3. Cartões visuais de destaque', xp:30,
      explanation:'<p>Cartões dividem uma ideia densa em blocos fáceis de escanear. Clique em <strong>+ Cartão Visual</strong>.</p>',
      hint: 'Clique em "+ Cartão Visual" com o slide atual selecionado.',
      officeReal: 'No PowerPoint: <strong>Inserir</strong> → <strong>Formas</strong> → <strong>Retângulo de Cantos Arredondados</strong>.',
      initSlides: [{ title:'Pilares Estratégicos', subtitle:'Principais áreas de atuação', cards:[], table:null, list:null }],
      checks: [
        { label: 'Ter ao menos 1 cartão visual no slide', test: s => s.some(sl => sl.cards.length > 0) }
      ] },

    { id:'p4', title:'4. Vários elementos no mesmo slide', xp:30,
      explanation:'<p>Formas ajudam a agrupar conceitos visualmente. Adicione pelo menos 2 cartões visuais neste slide.</p>',
      hint: 'Clique 2 vezes em "+ Cartão Visual".',
      officeReal: 'No PowerPoint: aba <strong>Inserir</strong> → <strong>Formas</strong>.',
      initSlides: [{ title:'Mapeamento de Processos', subtitle:'Estrutura operacional', cards:['Acompanhamento de Metas'], table:null, list:null }],
      checks: [
        { label: 'Ter 2 ou mais cartões visuais no slide', test: s => s.some(sl => sl.cards.length >= 2) }
      ] },

    { id:'p5', title:'5. Escolher um tema de cores', xp:35,
      explanation:'<p>Um tema aplica uma paleta inteira de uma vez, mantendo a apresentação visualmente consistente. Alterne para o <strong>Tema Azul</strong>.</p>',
      hint: 'Clique no botão "Tema Azul".',
      officeReal: 'No PowerPoint: aba <strong>Design</strong> → grupo <strong>Temas</strong>.',
      initSlides: [{ title:'Apresentação Comercial', subtitle:'Proposta de Serviços', cards:[], table:null, list:null }],
      checks: [
        { label: 'Aplicar o Tema Azul', test: (s, t) => t === 'blue' }
      ] },

    { id:'p6', title:'6. Animar um cartão', xp:35,
      explanation:'<p>Animações revelam informação aos poucos em vez de jogar tudo de uma vez — útil para manter a atenção durante a fala. Adicione um cartão e clique nele para ativar a animação de entrada.</p>',
      hint: 'Adicione um cartão visual e depois clique sobre ele no palco para alternar a animação.',
      officeReal: 'No PowerPoint: selecione o objeto → aba <strong>Animações</strong> → <strong>Aparecer</strong>.',
      initSlides: [{ title:'Cronograma de Entrega', subtitle:'Prazos contratuais', cards:['Fase 1: Mapeamento'], table:null, list:null }],
      checks: [
        { label: 'Ter ao menos 1 cartão com animação ativada', test: s => s.some(sl => sl.cardAnim && sl.cardAnim.some(a => a)) }
      ] },

    { id:'p7', title:'7. Escolher uma transição', xp:35,
      explanation:'<p>Transições suavizam a troca entre slides. Escolha uma transição diferente de "Nenhuma" no menu suspenso e veja o efeito ao mover entre slides.</p>',
      hint: 'Use o seletor "Transição" na barra de ferramentas e escolha Esmaecer ou Deslizar.',
      officeReal: 'No PowerPoint: aba <strong>Transições</strong> → escolha um efeito.',
      initSlides: [{ title:'Slide 1', subtitle:'Introdução', cards:[], table:null, list:null }, { title:'Slide 2', subtitle:'Desenvolvimento', cards:[], table:null, list:null }],
      checks: [
        { label: 'Selecionar uma transição diferente de "Nenhuma"', test: (s, t, tr) => tr !== 'none' }
      ] },

    { id:'p8', title:'8. Inserir uma tabela de dados', xp:40,
      explanation:'<p>Números ficam mais legíveis em tabela do que soltos no texto. Clique em <strong>+ Tabela</strong> para inserir uma tabela no slide.</p>',
      hint: 'Clique em "+ Tabela" na barra de ferramentas.',
      officeReal: 'No PowerPoint: <strong>Inserir</strong> → <strong>Tabela</strong>.',
      initSlides: [{ title:'Resumo Financeiro', subtitle:'Demonstrativo anual', cards:[], table:null, list:null }],
      checks: [
        { label: 'Inserir uma tabela no slide', test: s => s.some(sl => sl.table) }
      ] },

    { id:'p9', title:'9. Organizar tópicos em lista', xp:40,
      explanation:'<p>Blocos de texto longos cansam o público. Clique em <strong>+ Lista</strong> para transformar os pontos-chave numa lista com marcadores.</p>',
      hint: 'Clique em "+ Lista" — ela já vem com 2 itens de exemplo.',
      officeReal: 'No PowerPoint: use caixas de texto com listas marcadas.',
      initSlides: [{ title:'Diferenciais Competitivos', subtitle:'Por que nossa solução?', cards:[], table:null, list:null }],
      checks: [
        { label: 'Ter uma lista com 2 ou mais itens', test: s => s.some(sl => sl.list && sl.list.length >= 2) }
      ] },

    { id:'p10', title:'10. Reordenar a narrativa', xp:40,
      explanation:'<p>A ordem dos slides conta a história. Use as setas para mover o slide "Conclusão" para o início.</p>',
      hint: 'Selecione o slide "Conclusão" e clique na seta esquerda para movê-lo.',
      officeReal: 'No PowerPoint: <strong>Exibir</strong> → <strong>Classificação de Slides</strong> → arraste para reordenar.',
      initSlides: [{ title:'Abertura', subtitle:'Slide 1', cards:[], table:null, list:null }, { title:'Conclusão', subtitle:'Slide 2', cards:[], table:null, list:null }],
      checks: [
        { label: 'O slide "Conclusão" deve vir primeiro', test: s => s[0].title.toLowerCase().includes('conclusão') }
      ] },

    { id:'p11', title:'🏆 Desafio Final: Pitch de Vendas', xp:100,
      explanation:'<p><strong>Você vai apresentar para um cliente em potencial.</strong> Monte um deck com pelo menos <strong>2 slides</strong>, aplique o <strong>Tema Azul</strong>, adicione 1 <strong>cartão visual</strong> e mude o título para <code>Pitch de Vendas</code>.</p>',
      hint: 'São 4 requisitos: 2+ slides, Tema Azul, 1+ cartão, título "Pitch de Vendas" — o checklist ao lado mostra qual falta.',
      officeReal: 'Este desafio simula a montagem completa de uma apresentação comercial.',
      initSlides: [{ title:'Título Inicial', subtitle:'Subtítulo', cards:[], table:null, list:null }],
      checks: [
        { label: 'Ter pelo menos 2 slides', test: s => s.length >= 2 },
        { label: 'Aplicar o Tema Azul', test: (s, t) => t === 'blue' },
        { label: 'Ter ao menos 1 cartão visual', test: s => s.some(sl => sl.cards.length > 0) },
        { label: 'Título do 1º slide deve conter "Pitch de Vendas"', test: s => s[0].title.toLowerCase().includes('pitch de vendas') }
      ] }
  ],

  renderTaskButtons() {
    const container = document.getElementById('ppt-question-tabs');
    container.innerHTML = '';
    this.tasks.forEach((t, idx) => {
      const isCompleted = AppState.user.completedTasks.includes(t.id);
      const isFinal = idx === 10;
      const btn = document.createElement('button');
      btn.onclick = () => this.loadTask(idx);
      btn.className = `task-pill w-9 h-9 rounded-lg text-xs flex items-center justify-center transition ${
        idx === this.activeTaskIdx ? 'bg-ppt text-white' : isCompleted ? 'bg-ppt-soft text-ppt-dark border border-ppt/30' : 'bg-paperDim text-ink/50 pill-idle'}`;
      btn.innerHTML = isFinal ? '<i class="fa-solid fa-trophy text-amber-500"></i>' : (isCompleted ? '<i class="fa-solid fa-check text-[10px]"></i>' : (idx+1));
      container.appendChild(btn);
    });
  },

  loadTask(idx) {
    this.activeTaskIdx = idx;
    this.hintVisible = false;
    const task = this.tasks[idx];
    document.getElementById('ppt-task-number').textContent = idx === 10 ? 'Desafio Final' : `Exercício ${idx+1} de 11`;
    document.getElementById('ppt-task-title').textContent = task.title;
    document.getElementById('ppt-xp-reward').textContent = `+${task.xp} XP`;
    document.getElementById('ppt-task-explanation').innerHTML = task.explanation;
    document.getElementById('ppt-office-real-text').innerHTML = task.officeReal;
    document.getElementById('ppt-feedback').textContent = '';
    document.getElementById('ppt-hint-box').classList.add('hidden');
    document.getElementById('ppt-hint-box').textContent = task.hint;
    document.getElementById('ppt-hint-toggle-label').textContent = 'Ver dica';

    this.slides = JSON.parse(JSON.stringify(task.initSlides)).map(s => ({ ...s, cardAnim: (s.cards||[]).map(() => false) }));
    this.activeSlideIdx = 0;
    this.theme = 'dark';
    this.transition = 'none';
    this.renderStage();
    this.renderTaskButtons();

    const nextBtn = document.getElementById('ppt-next-btn');
    nextBtn.innerHTML = idx === this.tasks.length - 1
      ? 'Ir para o painel <i class="fa-solid fa-house ml-1"></i>'
      : 'Próxima atividade <i class="fa-solid fa-arrow-right ml-1"></i>';
    nextBtn.classList.toggle('hidden', !AppState.user.completedTasks.includes(task.id));
  },

  nextTask() {
    if (this.activeTaskIdx < this.tasks.length - 1) this.loadTask(this.activeTaskIdx + 1);
    else AppNav.switchTab('dashboard');
  },

  toggleHint() {
    this.hintVisible = !this.hintVisible;
    document.getElementById('ppt-hint-box').classList.toggle('hidden', !this.hintVisible);
    document.getElementById('ppt-hint-toggle-label').textContent = this.hintVisible ? 'Esconder dica' : 'Ver dica';
  },

  renderChecklist() {
    const task = this.tasks[this.activeTaskIdx];
    if (!task) return;
    document.getElementById('ppt-checklist').innerHTML = task.checks.map(c => {
      const ok = c.test(this.slides, this.theme, this.transition);
      return `<div class="checklist-item flex items-center gap-2 text-xs ${ok ? 'text-excel-dark' : 'text-ink/50'}">
        <i class="fa-solid ${ok ? 'fa-circle-check' : 'fa-circle'}"></i> ${c.label}
      </div>`;
    }).join('');
  },

  addSlide() {
    this.slides.push({ title:`Novo Slide ${this.slides.length+1}`, subtitle:'Clique para editar subtítulo', cards:[], cardAnim:[], table:null, list:null });
    this.activeSlideIdx = this.slides.length - 1;
    this.renderStage();
  },
  addCard() {
    const sl = this.slides[this.activeSlideIdx];
    if (sl) { sl.cards.push('Novo Destaque Visual'); sl.cardAnim.push(false); this.renderStage(); }
  },
  addTable() {
    const sl = this.slides[this.activeSlideIdx];
    if (sl) { sl.table = [['Item','Valor'],['Trimestre 1','R$ 12.000']]; this.renderStage(); }
  },
  addList() {
    const sl = this.slides[this.activeSlideIdx];
    if (sl) { sl.list = ['Alta Qualidade', 'Suporte 24/7']; this.renderStage(); }
  },
  toggleCardAnim(cardIdx) {
    const sl = this.slides[this.activeSlideIdx];
    if (sl && sl.cardAnim) { sl.cardAnim[cardIdx] = !sl.cardAnim[cardIdx]; this.renderStage(); }
  },
  setTheme(t) { this.theme = t; this.renderStage(); },
  setTransition(t) { this.transition = t; this.renderChecklist(); },
  moveSlide(dir) {
    const i = this.activeSlideIdx, j = i + dir;
    if (j < 0 || j >= this.slides.length) return;
    [this.slides[i], this.slides[j]] = [this.slides[j], this.slides[i]];
    this.activeSlideIdx = j;
    this.renderStage();
  },

  navigateSlide(dir) {
    const j = this.activeSlideIdx + dir;
    if (j < 0 || j >= this.slides.length) return;
    this.activeSlideIdx = j;
    if (this.presenting) this.renderPresentationStage(); else this.renderStage();
  },

  renderStage() {
    const container = document.getElementById('ppt-slide-thumbnails');
    container.innerHTML = '';
    this.slides.forEach((slide, idx) => {
      const thumb = document.createElement('div');
      thumb.onclick = () => { const prev = this.activeSlideIdx; this.activeSlideIdx = idx; this.renderStage(prev !== idx); };
      thumb.className = `p-2 rounded-lg border text-[11px] font-bold cursor-pointer transition flex items-center justify-between ${
        idx === this.activeSlideIdx ? 'bg-ppt-soft border-ppt text-ppt-dark' : 'bg-white border-line text-ink/50 thumb-idle'}`;
      thumb.innerHTML = `<span>Slide ${idx+1}</span>`;
      container.appendChild(thumb);
    });

    const stage = document.getElementById('ppt-slide-stage');
    const slide = this.slides[this.activeSlideIdx] || { title:'', subtitle:'', cards:[], cardAnim:[], table:null, list:null };

    const themeClasses = this.theme === 'blue'
      ? 'bg-gradient-to-br from-word to-word-dark border-word text-white'
      : 'bg-ink border-ink text-paper';
    const animClass = this.transition === 'fade' ? 'stage-fade' : this.transition === 'slide' ? 'stage-slide' : '';
    stage.className = `w-full aspect-video rounded-xl p-5 flex flex-col justify-center items-center text-center relative overflow-hidden border-2 ${themeClasses} ${animClass}`;
    stage.innerHTML = this.buildSlideInnerHTML(slide, true);

    if (this.presenting) this.renderPresentationStage();
    this.renderChecklist();
  },

  buildSlideInnerHTML(slide, editable) {
    let cardsHTML = '';
    if (slide.cards && slide.cards.length > 0) {
      cardsHTML = `<div class="grid grid-cols-2 gap-2 w-full mt-3">
        ${slide.cards.map((c,i) => `<div ${editable ? `onclick="PPTModule.toggleCardAnim(${i})"` : ''} class="p-2 bg-white/15 rounded-lg border border-white/25 text-[11px] font-semibold ${editable ? 'cursor-pointer' : ''} ${slide.cardAnim && slide.cardAnim[i] ? 'slide-anim-in' : ''}">${c}${slide.cardAnim && slide.cardAnim[i] ? ' <i class="fa-solid fa-wand-magic-sparkles"></i>' : ''}</div>`).join('')}
      </div>`;
    }
    let tableHTML = '';
    if (slide.table) {
      tableHTML = `<table class="w-full mt-3 text-[11px] border-collapse"><tbody>
        ${slide.table.map(row => `<tr>${row.map(cell => `<td class="border border-white/30 px-2 py-1">${cell}</td>`).join('')}</tr>`).join('')}
      </tbody></table>`;
    }
    let listHTML = '';
    if (slide.list) {
      listHTML = `<ul class="mt-3 text-[11px] text-left list-disc pl-4">${slide.list.map(i => `<li>${i}</li>`).join('')}</ul>`;
    }
    const titleAttrs = editable ? `contenteditable="true" onblur="PPTModule.updateTitle(this.innerText)"` : '';
    const subAttrs = editable ? `contenteditable="true" onblur="PPTModule.updateSubtitle(this.innerText)"` : '';
    const titleSize = editable ? 'text-lg' : 'text-2xl sm:text-3xl';
    const subSize = editable ? 'text-xs' : 'text-sm sm:text-base';
    return `
      <h1 ${titleAttrs} class="${titleSize} font-display font-bold mb-1 focus:outline-none focus:ring-2 focus:ring-white/50 px-2 rounded">${slide.title}</h1>
      <p ${subAttrs} class="${subSize} opacity-80 focus:outline-none focus:ring-2 focus:ring-white/50 px-2 rounded">${slide.subtitle}</p>
      ${cardsHTML}${tableHTML}${listHTML}
    `;
  },

  updateTitle(text) { if (this.slides[this.activeSlideIdx]) { this.slides[this.activeSlideIdx].title = text; this.renderChecklist(); } },
  updateSubtitle(text) { if (this.slides[this.activeSlideIdx]) { this.slides[this.activeSlideIdx].subtitle = text; this.renderChecklist(); } },

  presenting: false,
  _presentKeyHandler: null,

  startPresentation() {
    this.presenting = true;
    const overlay = document.getElementById('ppt-present-overlay');
    overlay.classList.remove('hidden');
    this.renderPresentationStage();

    this._presentKeyHandler = (e) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); this.navigateSlide(1); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); this.navigateSlide(-1); }
      else if (e.key === 'Escape') { this.exitPresentation(); }
    };
    document.addEventListener('keydown', this._presentKeyHandler);

    // Tela cheia de verdade quando o navegador permite; a apresentação funciona mesmo se for negada.
    if (overlay.requestFullscreen) overlay.requestFullscreen().catch(() => {});
  },

  exitPresentation() {
    if (!this.presenting) return;
    this.presenting = false;
    document.getElementById('ppt-present-overlay').classList.add('hidden');
    if (this._presentKeyHandler) { document.removeEventListener('keydown', this._presentKeyHandler); this._presentKeyHandler = null; }
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  },

  renderPresentationStage() {
    const stage = document.getElementById('ppt-present-stage');
    const slide = this.slides[this.activeSlideIdx] || { title:'', subtitle:'', cards:[], cardAnim:[], table:null, list:null };
    const themeClasses = this.theme === 'blue'
      ? 'bg-gradient-to-br from-word to-word-dark border-word text-white'
      : 'bg-ink border-ink text-paper';
    stage.className = `w-[90vw] max-w-4xl aspect-video rounded-xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden border-2 cursor-pointer ${themeClasses}`;
    stage.innerHTML = this.buildSlideInnerHTML(slide, false);
    document.getElementById('ppt-present-counter').textContent = `${this.activeSlideIdx + 1} / ${this.slides.length}`;
  },

  validateCurrentTask() {
    const task = this.tasks[this.activeTaskIdx];
    const results = task.checks.map(c => ({ label: c.label, ok: c.test(this.slides, this.theme, this.transition) }));
    const passed = results.every(r => r.ok);
    const fb = document.getElementById('ppt-feedback');
    if (passed) {
      fb.textContent = '✓ Apresentação validada com sucesso!';
      fb.className = 'text-xs font-bold text-excel-dark';
      AppGamification.addXP(task.xp, task.id);
      this.renderTaskButtons();
      document.getElementById('ppt-next-btn').classList.remove('hidden');
    } else {
      const missing = results.filter(r => !r.ok).map(r => r.label);
      fb.innerHTML = `✗ Ainda falta: <strong>${missing.join(' · ')}</strong>`;
      fb.className = 'text-xs font-bold text-rose-600';
    }
    this.renderChecklist();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && PPTModule.presenting) PPTModule.exitPresentation();
});
