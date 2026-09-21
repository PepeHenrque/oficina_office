/* ==========================================================================
   STATE
   ========================================================================== */
const AppState = {
  user: { xp: 0, level: 1, completedTasks: [], badges: [] },
  currentTab: 'dashboard',
  save() {
    try { localStorage.setItem('office_pro_v5_state', JSON.stringify(this.user)); }
    catch(e) { console.error('Erro ao salvar estado:', e); }
  },
  load() {
    const saved = localStorage.getItem('office_pro_v5_state');
    if (saved) {
      try { this.user = { ...this.user, ...JSON.parse(saved) }; }
      catch (e) { console.error('Erro ao restaurar estado:', e); }
    }
  }
};

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Início', icon: 'fa-house' },
  { id: 'modulo0', label: 'Primeiros Passos', icon: 'fa-seedling' },
  { id: 'word', label: 'Word', icon: 'fa-file-word' },
  { id: 'excel', label: 'Excel', icon: 'fa-file-excel' },
  { id: 'ppt', label: 'PowerPoint', icon: 'fa-file-powerpoint' },
  { id: 'downloads', label: 'Baixar Arquivos', icon: 'fa-download' }
];

const BADGES_DB = [
  { id: 'b_modulo0', title: 'Fundamentos', desc: 'Concluiu os Primeiros Passos.', icon: 'fa-seedling', color: 'text-brand-dark' },
  { id: 'b_word_1', title: 'Formatador do Word', desc: 'Concluiu as 3 primeiras tarefas de Word.', icon: 'fa-pen-nib', color: 'text-word' },
  { id: 'b_word_master', title: 'Especialista em Documentos', desc: 'Concluiu os 11 desafios do Word.', icon: 'fa-file-word', color: 'text-word' },
  { id: 'b_excel_1', title: 'Mestre das Fórmulas', desc: 'Executou cálculos essenciais no Excel.', icon: 'fa-calculator', color: 'text-excel-dark' },
  { id: 'b_excel_master', title: 'Analista de Planilhas', desc: 'Concluiu os 11 desafios do Excel.', icon: 'fa-file-excel', color: 'text-excel-dark' },
  { id: 'b_ppt_1', title: 'Designer de Slides', desc: 'Desenvolveu layouts e temas visuais.', icon: 'fa-display', color: 'text-ppt-dark' },
  { id: 'b_ppt_master', title: 'Orador', desc: 'Concluiu os 11 desafios do PowerPoint.', icon: 'fa-file-powerpoint', color: 'text-ppt-dark' },
  { id: 'b_xp_200', title: 'Proficiente Office', desc: 'Alcançou 200 XP na plataforma.', icon: 'fa-bolt', color: 'text-amber-600' },
  { id: 'b_master_office', title: 'Mestre do Pacote Office', desc: 'Concluiu 100% da oficina.', icon: 'fa-crown', color: 'text-brand-dark' }
];

const GLOSSARY_DB = [
  { term: 'Faixa de Opções (Ribbon)', def: 'A barra de abas e botões no topo do programa, onde ficam todas as ferramentas.' },
  { term: 'Célula', def: 'Cada quadradinho de uma planilha, identificado por coluna e linha (ex: B2).' },
  { term: 'Fórmula', def: 'Instrução que começa com "=" e faz o programa calcular algo automaticamente.' },
  { term: 'Intervalo (Range)', def: 'Um grupo de células, ex: B2:B4 significa "de B2 até B4".' },
  { term: 'Alinhamento', def: 'Como o texto se posiciona na linha: à esquerda, centralizado, à direita ou justificado.' },
  { term: 'Marcadores', def: 'Os pontinhos ou símbolos usados para transformar um texto em lista.' },
  { term: 'Slide', def: 'Cada "página" de uma apresentação de PowerPoint.' },
  { term: 'Tema', def: 'Um conjunto de cores e fontes aplicado de uma vez a todo o documento ou apresentação.' },
  { term: 'Transição', def: 'O efeito visual que acontece ao passar de um slide para o outro.' }
];
