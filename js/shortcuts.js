/* ==========================================================================
   KEYBOARD SHORTCUTS (espelham os atalhos reais do Word/Excel/PowerPoint)
   ========================================================================== */
document.addEventListener('keydown', (e) => {
  if (!e.ctrlKey || e.metaKey || e.altKey) return;
  const glossaryOpen = !document.getElementById('glossary-modal').classList.contains('hidden');
  if (glossaryOpen) return; // evita formatar o editor "por baixo" do modal aberto
  const key = e.key.toLowerCase();

  if (AppState.currentTab === 'word') {
    const map = {
      n: () => WordModule.execCmd('bold'),          // Ctrl+N — Negrito (padrão real do Word em PT-BR)
      b: () => WordModule.execCmd('bold'),           // Ctrl+B — alternativa mais comum
      i: () => WordModule.execCmd('italic'),         // Ctrl+I — Itálico
      s: () => WordModule.execCmd('underline'),      // Ctrl+S — Sublinhado
      j: () => WordModule.execCmd('justifyFull'),    // Ctrl+J — Justificar
      e: () => WordModule.execCmd('justifyCenter'),  // Ctrl+E — Centralizar
      q: () => WordModule.execCmd('justifyLeft'),    // Ctrl+Q — Alinhar à esquerda
      g: () => WordModule.execCmd('justifyRight'),   // Ctrl+G — Alinhar à direita
      f: () => WordModule.openSearchReplace(),       // Ctrl+F — Localizar
      u: () => WordModule.openSearchReplace()        // Ctrl+U — Substituir
    };
    if (map[key]) { e.preventDefault(); map[key](); }
  } else if (AppState.currentTab === 'ppt') {
    if (key === 'm') { e.preventDefault(); PPTModule.addSlide(); } // Ctrl+M — Novo slide
  }
});
