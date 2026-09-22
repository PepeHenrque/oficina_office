/* ==========================================================================
   EXCEL MODULE
   ========================================================================== */
const ExcelModule = {
  activeTaskIdx: 0,
  activeCellId: 'A1',
  raw: {},
  computed: {},
  activeSheet: 'Plan1',
  sheets: {},
  hintVisible: false,

  tasks: [
    { id:'e1', title:'1. Inserir dados na grade', xp:30,
      explanation:'<p>Toda planilha começa com dados crus digitados nas células. Digite o número de vendas <strong>1500</strong> na célula <strong>B2</strong> e pressione Tab ou Enter.</p>',
      hint: 'Clique na célula B2 (coluna B, linha 2) e digite 1500.',
      officeReal: 'No Excel: clique na célula, digite o valor e pressione <code>Enter</code>.',
      init: [['Mês','Vendas (R$)'],['Janeiro',''],['Fevereiro','2300']],
      sheet2: [['Item','Status'],['Plano B','Pendente']],
      checks: [
        { label: 'B2 deve ser igual a 1500', test: (raw, computed) => computed['B2'] === 1500 }
      ] },

    { id:'e2', title:'2. =SOMA() soma um intervalo', xp:30,
      explanation:'<p>A função <code>SOMA</code> soma tudo dentro de um intervalo de células, então você nunca precisa somar manualmente. Digite <code>=SOMA(B2:B4)</code> na célula <strong>B5</strong> e veja o resultado aparecer.</p>',
      hint: 'Clique em B5 e digite exatamente: =SOMA(B2:B4)',
      officeReal: 'No Excel: digite a fórmula ou use o botão <strong>AutoSoma</strong> na aba <strong>Página Inicial</strong>.',
      init: [['Item','Valor (R$)'],['Produto A','1200'],['Produto B','1800'],['Produto C','2000'],['TOTAL','']],
      checks: [
        { label: 'B5 deve conter a fórmula =SOMA(...)', test: (raw) => /=\s*SOMA/i.test(raw['B5']||'') },
        { label: 'O resultado de B5 deve ser 5000', test: (raw, computed) => computed['B5'] === 5000 }
      ] },

    { id:'e3', title:'3. =MÉDIA() calcula a média', xp:30,
      explanation:'<p>A função <code>MÉDIA</code> soma os valores e divide pela quantidade de células — a mesma conta que você faria na mão, só que instantânea. Digite <code>=MÉDIA(B2:B4)</code> em <strong>B5</strong>.</p>',
      hint: 'Clique em B5 e digite: =MÉDIA(B2:B4) — pode digitar sem acento também.',
      officeReal: 'No Excel: aba <strong>Fórmulas</strong> → <strong>AutoSoma</strong> → <strong>Média</strong>.',
      init: [['Avaliação','Nota'],['Módulo Word','8.5'],['Módulo Excel','9.0'],['Módulo PPT','9.5'],['MÉDIA','']],
      checks: [
        { label: 'B5 deve conter a fórmula =MÉDIA(...)', test: (raw) => /=\s*M[ÉE]DIA/i.test(raw['B5']||'') },
        { label: 'O resultado de B5 deve ser 9', test: (raw, computed) => computed['B5'] === 9 }
      ] },

    { id:'e4', title:'4. =MÁXIMO() encontra o maior valor', xp:30,
      explanation:'<p>Em vez de olhar linha por linha, <code>MÁXIMO</code> te diz de cara qual foi o melhor resultado de um grupo. Digite <code>=MÁXIMO(B2:B4)</code> em <strong>B5</strong>.</p>',
      hint: 'Clique em B5 e digite: =MÁXIMO(B2:B4)',
      officeReal: 'No Excel: aba <strong>Fórmulas</strong> → <strong>AutoSoma</strong> → <strong>Máximo</strong>.',
      init: [['Filial','Faturamento'],['Norte','45000'],['Sul','62000'],['Leste','38000'],['MAIOR','']],
      checks: [
        { label: 'B5 deve conter a fórmula =MÁXIMO(...)', test: (raw) => /=\s*M[ÁA]XIMO/i.test(raw['B5']||'') },
        { label: 'O resultado de B5 deve ser 62000', test: (raw, computed) => computed['B5'] === 62000 }
      ] },

    { id:'e5', title:'5. =SE() toma uma decisão', xp:35,
      explanation:'<p><code>SE</code> é uma pergunta com duas respostas possíveis: se a condição for verdadeira, mostra uma coisa; se for falsa, mostra outra. Digite <code>=SE(B2>=7;"Aprovado";"Reprovado")</code> na célula <strong>C2</strong>.</p>',
      hint: 'Clique em C2 e digite: =SE(B2>=7;"Aprovado";"Reprovado")',
      officeReal: 'No Excel: aba <strong>Fórmulas</strong> → <strong>Lógica</strong> → <strong>SE</strong>.',
      init: [['Aluno','Nota','Situação'],['Carlos','8.0','']],
      checks: [
        { label: 'C2 deve conter a fórmula =SE(...)', test: (raw) => /=\s*SE\(/i.test(raw['C2']||'') },
        { label: 'O resultado de C2 deve ser "Aprovado"', test: (raw, computed) => String(computed['C2']).toLowerCase() === 'aprovado' }
      ] },

    { id:'e6', title:'6. =CONT.SE() conta com critério', xp:35,
      explanation:'<p><code>CONT.SE</code> conta quantas células atendem uma regra, sem você contar no dedo. Digite <code>=CONT.SE(B2:B4;">=7")</code> na célula <strong>B5</strong> para contar quantas notas passaram de 7.</p>',
      hint: 'Clique em B5 e digite: =CONT.SE(B2:B4;">=7")',
      officeReal: 'No Excel: aba <strong>Fórmulas</strong> → <strong>Mais Funções</strong> → <strong>Estatística</strong> → <strong>CONT.SE</strong>.',
      init: [['Candidato','Nota'],['Ana','9.0'],['Bruno','5.5'],['Carla','8.0'],['Aprovados','']],
      checks: [
        { label: 'B5 deve conter a fórmula =CONT.SE(...)', test: (raw) => /=\s*CONT\.?SE/i.test(raw['B5']||'') },
        { label: 'O resultado de B5 deve ser 2', test: (raw, computed) => computed['B5'] === 2 }
      ] },

    { id:'e7', title:'7. Repetir uma fórmula em outra coluna', xp:35,
      explanation:'<p>No Excel de verdade você arrastaria a "alça de preenchimento" para copiar uma fórmula para a coluna vizinha. Aqui, digite a fórmula em cada célula: <code>=SOMA(B2:B4)</code> em <strong>B5</strong> e <code>=SOMA(C2:C4)</code> em <strong>C5</strong>.</p>',
      hint: 'B5: =SOMA(B2:B4)  |  C5: =SOMA(C2:C4)',
      officeReal: 'No Excel: arraste o quadradinho no canto inferior direito da célula selecionada para copiar a fórmula.',
      init: [['Trimestre','Meta','Realizado'],['T1','100','110'],['T2','120','130'],['T3','110','115'],['TOTAL','','']],
      checks: [
        { label: 'B5 deve ser =SOMA(B2:B4) = 330', test: (raw, computed) => /=\s*SOMA/i.test(raw['B5']||'') && computed['B5'] === 330 },
        { label: 'C5 deve ser =SOMA(C2:C4) = 355', test: (raw, computed) => /=\s*SOMA/i.test(raw['C5']||'') && computed['C5'] === 355 }
      ] },

    { id:'e8', title:'8. Classificar em ordem alfabética', xp:35,
      explanation:'<p>Ordenar uma lista agrupa a informação de forma previsível. Clique em <strong>Classificar A-Z</strong> para reorganizar os produtos por nome — mantendo o estoque de cada um junto do nome certo.</p>',
      hint: 'Clique no botão "Classificar A-Z" logo abaixo da grade.',
      officeReal: 'No Excel: selecione a coluna → aba <strong>Dados</strong> → <strong>Classificar e Filtrar</strong> → <strong>A-Z</strong>.',
      init: [['Nome do Produto','Estoque'],['Zebra Code','50'],['Alpha Soft','120'],['Beta Tech','80']],
      checks: [
        { label: 'A coluna A deve estar em ordem alfabética', test: (raw, computed) => {
            const vals = [computed['A2'], computed['A3'], computed['A4']].map(v => String(v));
            const sorted = [...vals].sort((a,b) => a.localeCompare(b));
            return JSON.stringify(vals) === JSON.stringify(sorted);
          } },
        { label: '"Alpha Soft" deve ficar na primeira posição', test: (raw, computed) => String(computed['A2']) === 'Alpha Soft' }
      ] },

    { id:'e9', title:'9. Formatação condicional', xp:40,
      explanation:'<p>Formatação condicional colore a célula automaticamente com base no valor. Aqui, a Meta é 100 e o Resultado é 85 — abaixo da meta. Clique em <strong>Regra Condicional</strong> e veja o Excel decidir a cor sozinho, comparando os dois números.</p>',
      hint: 'Clique no botão "Regra Condicional" — ele compara B2 (Resultado) com A2 (Meta) de verdade.',
      officeReal: 'No Excel: aba <strong>Página Inicial</strong> → <strong>Formatação Condicional</strong> → <strong>Regras de Realce de Células</strong>.',
      init: [['Meta','Resultado'],['100','85']],
      checks: [
        { label: 'Aplicar a regra condicional em B2', test: (raw, computed, meta) => !!meta.conditionalApplied }
      ] },

    { id:'e10', title:'10. Alternar entre abas', xp:40,
      explanation:'<p>Uma pasta de trabalho pode ter várias planilhas (abas) dentro dela — cada uma com seus próprios dados. Clique na aba <strong>Plan2</strong> no rodapé da grade para trocar de planilha de verdade.</p>',
      hint: 'Clique no botão "Plan2" abaixo da grade.',
      officeReal: 'No Excel: clique no <code>+</code> ao lado das guias de planilha para criar novas abas.',
      init: [['Relatório Geral','Status'],['Consolidado','OK']],
      sheet2: [['Plano B','Status'],['Contingência','Em espera']],
      checks: [
        { label: 'Alternar para a aba Plan2', test: (raw, computed, meta) => meta.visitedSheet2 === true }
      ] },

    { id:'e11', title:'🏆 Desafio Final: DRE Financeiro', xp:100,
      explanation:'<p><strong>Você está fechando o Demonstrativo de Resultado do trimestre.</strong> Complete os 2 requisitos abaixo:</p><ol style="margin:0 0 0 18px;padding:0;list-style:decimal;"><li>Digite <code>5000</code> na célula <strong>D2</strong> (receita de Março).</li><li>Na célula <strong>E2</strong>, digite a fórmula <code>=SOMA(B2:D2)</code> para calcular o TOTAL.</li></ol>',
      hint: 'Resolva um requisito de cada vez e clique em Validar — o checklist ao lado marca com ✓ cada um que já está certo, e a mensagem de erro conta qual ainda falta.',
      officeReal: 'Este desafio simula o fechamento de um DRE (Demonstrativo do Resultado do Exercício).',
      init: [['Item','Jan','Fev','Mar','TOTAL'],['Receita Bruta','4000','4500','','']],
      checks: [
        { label: 'D2 deve ser igual a 5000', test: (raw, computed) => computed['D2'] === 5000 },
        { label: 'E2 deve ser =SOMA(B2:D2) = 13500', test: (raw, computed) => /=\s*SOMA/i.test(raw['E2']||'') && computed['E2'] === 13500 }
      ] }
  ],

  taskMeta: {},

  renderTaskButtons() {
    const container = document.getElementById('excel-question-tabs');
    container.innerHTML = '';
    this.tasks.forEach((t, idx) => {
      const isCompleted = AppState.user.completedTasks.includes(t.id);
      const isFinal = idx === 10;
      const btn = document.createElement('button');
      btn.onclick = () => this.loadTask(idx);
      btn.className = `task-pill w-9 h-9 rounded-lg text-xs flex items-center justify-center transition ${
        idx === this.activeTaskIdx ? 'bg-excel text-white' : isCompleted ? 'bg-excel-soft text-excel-dark border border-excel/30' : 'bg-paperDim text-ink/50 pill-idle'}`;
      btn.innerHTML = isFinal ? '<i class="fa-solid fa-trophy text-amber-500"></i>' : (isCompleted ? '<i class="fa-solid fa-check text-[10px]"></i>' : (idx+1));
      container.appendChild(btn);
    });
  },

  loadTask(idx) {
    this.activeTaskIdx = idx;
    this.hintVisible = false;
    const task = this.tasks[idx];
    this.taskMeta = { conditionalApplied: false, visitedSheet2: false };

    document.getElementById('excel-task-number').textContent = idx === 10 ? 'Desafio Final' : `Exercício ${idx+1} de 11`;
    document.getElementById('excel-task-title').textContent = task.title;
    document.getElementById('excel-xp-reward').textContent = `+${task.xp} XP`;
    document.getElementById('excel-task-explanation').innerHTML = task.explanation;
    document.getElementById('excel-office-real-text').innerHTML = task.officeReal;
    document.getElementById('excel-feedback').textContent = '';
    document.getElementById('excel-hint-box').classList.add('hidden');
    document.getElementById('excel-hint-box').textContent = task.hint;
    document.getElementById('excel-hint-toggle-label').textContent = 'Ver dica';

    this.sheets = { Plan1: this.toRaw(task.init) };
    if (task.sheet2) this.sheets.Plan2 = this.toRaw(task.sheet2);
    this.activeSheet = 'Plan1';
    this.renderGrid();
    this.renderChecklist();
    this.renderTaskButtons();

    const nextBtn = document.getElementById('excel-next-btn');
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
    document.getElementById('excel-hint-box').classList.toggle('hidden', !this.hintVisible);
    document.getElementById('excel-hint-toggle-label').textContent = this.hintVisible ? 'Esconder dica' : 'Ver dica';
  },

  renderChecklist() {
    const task = this.tasks[this.activeTaskIdx];
    const sheet = this.sheets['Plan1'];
    const computed = FormulaEngine.recalcAll(sheet.raw);
    document.getElementById('excel-checklist').innerHTML = task.checks.map(c => {
      const ok = c.test(sheet.raw, computed, this.taskMeta);
      return `<div class="checklist-item flex items-center gap-2 text-xs ${ok ? 'text-excel-dark' : 'text-ink/50'}">
        <i class="fa-solid ${ok ? 'fa-circle-check' : 'fa-circle'}"></i> ${c.label}
      </div>`;
    }).join('');
  },

  toRaw(data) {
    const cols = FormulaEngine.COLS;
    const raw = {};
    data.forEach((row, rIdx) => row.forEach((val, cIdx) => { raw[`${cols[cIdx]}${rIdx+1}`] = val; }));
    return { data, raw, rows: data.length, colsUsed: data[0].length, cellStyles: {} };
  },

  get raw() { return this.sheets[this.activeSheet].raw; },
  set raw(v) { this.sheets[this.activeSheet].raw = v; },

  renderGrid() {
    const sheet = this.sheets[this.activeSheet];
    this.computed = FormulaEngine.recalcAll(sheet.raw);
    const cols = FormulaEngine.COLS;
    const table = document.getElementById('excel-grid');
    table.innerHTML = '';

    const thead = document.createElement('thead');
    let hRow = `<tr class="bg-paperDim text-ink/50 font-bold text-xs"><th class="p-2 border border-line text-center w-8"></th>`;
    for (let i = 0; i < sheet.colsUsed; i++) hRow += `<th class="p-2 border border-line text-center w-28">${cols[i]}</th>`;
    hRow += `</tr>`;
    thead.innerHTML = hRow;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (let r = 1; r <= sheet.rows; r++) {
      const tr = document.createElement('tr');
      let rHTML = `<td class="bg-paperDim text-ink/50 font-bold text-xs p-2 border border-line text-center">${r}</td>`;
      for (let c = 0; c < sheet.colsUsed; c++) {
        const cellId = `${cols[c]}${r}`;
        const rawVal = sheet.raw[cellId] ?? '';
        const displayVal = rawVal.toString().startsWith('=') ? FormulaEngine.format(this.computed[cellId]) : rawVal;
        const styleAttr = sheet.cellStyles[cellId] || '';
        rHTML += `<td class="p-0 border border-line bg-white" style="${styleAttr}">
          <input type="text" id="excel-cell-${cellId}" value="${(displayVal ?? '').toString().replace(/"/g,'&quot;')}"
            onfocus="ExcelModule.onCellFocus('${cellId}')"
            onblur="ExcelModule.onCellBlur('${cellId}')"
            onchange="ExcelModule.onCellChange('${cellId}', this.value)"
            class="w-full h-full p-2 bg-transparent text-ink text-xs grid-cell-input focus:bg-word-soft focus:outline-none">
        </td>`;
      }
      tr.innerHTML = rHTML;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    const tabsContainer = document.getElementById('excel-sheet-tabs');
    const hasSheet2 = !!this.sheets.Plan2;
    tabsContainer.innerHTML = `
      <span class="text-ink/40 mr-1">Guias:</span>
      <button onclick="ExcelModule.switchSheet('Plan1')" class="px-2.5 py-1 rounded font-bold ${this.activeSheet==='Plan1' ? 'bg-excel text-white' : 'bg-paperDim text-ink/60'}">Plan1</button>
      ${hasSheet2 ? `<button onclick="ExcelModule.switchSheet('Plan2')" class="px-2.5 py-1 rounded font-bold ${this.activeSheet==='Plan2' ? 'bg-excel text-white' : 'bg-paperDim text-ink/60'}">Plan2</button>` : ''}
    `;
    document.getElementById('excel-formula-bar').value = '';
    document.getElementById('excel-active-cell').textContent = 'A1';
  },

  onCellFocus(cellId) {
    this.activeCellId = cellId;
    document.getElementById('excel-active-cell').textContent = cellId;
    const sheet = this.sheets[this.activeSheet];
    const input = document.getElementById(`excel-cell-${cellId}`);
    const rawVal = sheet.raw[cellId] ?? '';
    if (input) input.value = rawVal;
    document.getElementById('excel-formula-bar').value = rawVal;
  },

  onCellBlur(cellId) {
    const sheet = this.sheets[this.activeSheet];
    this.computed = FormulaEngine.recalcAll(sheet.raw);
    const input = document.getElementById(`excel-cell-${cellId}`);
    const rawVal = sheet.raw[cellId] ?? '';
    if (input) input.value = rawVal.toString().startsWith('=') ? FormulaEngine.format(this.computed[cellId]) : rawVal;
  },

  onCellChange(cellId, val) {
    const sheet = this.sheets[this.activeSheet];
    sheet.raw[cellId] = val.trim();
    this.computed = FormulaEngine.recalcAll(sheet.raw);
    document.getElementById('excel-formula-bar').value = sheet.raw[cellId];
    this.renderChecklist();
  },

  onFormulaBarCommit(val) {
    this.onCellChange(this.activeCellId, val);
    this.onCellBlur(this.activeCellId);
  },

  sortAZ() {
    const sheet = this.sheets[this.activeSheet];
    const cols = FormulaEngine.COLS;
    const rows = [];
    for (let r = 2; r <= sheet.rows; r++) {
      const row = {};
      for (let c = 0; c < sheet.colsUsed; c++) row[cols[c]] = sheet.raw[`${cols[c]}${r}`] ?? '';
      rows.push(row);
    }
    rows.sort((a, b) => String(a['A']).localeCompare(String(b['A'])));
    rows.forEach((row, i) => {
      const r = i + 2;
      cols.slice(0, sheet.colsUsed).forEach(c => { sheet.raw[`${c}${r}`] = row[c]; });
    });
    this.renderGrid();
    this.renderChecklist();
  },

  toggleConditionalFormat() {
    const sheet = this.sheets[this.activeSheet];
    this.computed = FormulaEngine.recalcAll(sheet.raw);
    const meta = this.computed['A2'], result = this.computed['B2'];
    if (typeof meta !== 'number' || typeof result !== 'number') return;
    const ok = result >= meta;
    sheet.cellStyles['B2'] = ok
      ? 'background-color:#E3F3EA;color:#0B5C3D;font-weight:700;'
      : 'background-color:#FBEADA;color:#A3500A;font-weight:700;';
    this.taskMeta.conditionalApplied = true;
    this.renderGrid();
    this.renderChecklist();
  },

  switchSheet(sheetName) {
    this.activeSheet = sheetName;
    this.taskMeta.visitedSheet2 = this.taskMeta.visitedSheet2 || sheetName === 'Plan2';
    this.renderGrid();
    this.renderChecklist();
  },

  validateCurrentTask() {
    const task = this.tasks[this.activeTaskIdx];
    const sheet = this.sheets['Plan1'];
    this.computed = FormulaEngine.recalcAll(sheet.raw);
    const results = task.checks.map(c => ({ label: c.label, ok: c.test(sheet.raw, this.computed, this.taskMeta) }));
    const passed = results.every(r => r.ok);
    const fb = document.getElementById('excel-feedback');
    if (passed) {
      fb.textContent = '✓ Planilha calculada e validada com sucesso!';
      fb.className = 'text-xs font-bold text-excel-dark';
      AppGamification.addXP(task.xp, task.id);
      this.renderTaskButtons();
      document.getElementById('excel-next-btn').classList.remove('hidden');
    } else {
      const missing = results.filter(r => !r.ok).map(r => r.label);
      fb.innerHTML = `✗ Ainda falta: <strong>${missing.join(' · ')}</strong>`;
      fb.className = 'text-xs font-bold text-rose-600';
    }
    this.renderChecklist();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('excel-formula-bar');
  bar.addEventListener('keydown', e => { if (e.key === 'Enter') { ExcelModule.onFormulaBarCommit(bar.value); bar.blur(); } });
  bar.addEventListener('change', () => ExcelModule.onFormulaBarCommit(bar.value));
});
