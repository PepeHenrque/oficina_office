/* ==========================================================================
   WORD MODULE
   ========================================================================== */
const WordModule = {
  activeTaskIdx: 0,
  hintVisible: false,

  tasks: [
    { id:'w1', title:'1. Negrito para destacar o essencial', xp:30,
      explanation:'<p>Textos corridos são difíceis de escanear rápido. O <strong>negrito</strong> diz ao leitor "olhe aqui primeiro" — é assim que memorandos, contratos e relatórios sinalizam o que não pode passar despercebido.</p>',
      hint: 'Selecione as palavras "revise as diretrizes" e clique no botão de negrito (B) na barra de ferramentas.',
      officeReal: 'No Word: selecione o texto → aba <strong>Página Inicial</strong> → grupo <strong>Fonte</strong> → ícone <strong>N</strong> (ou <code>Ctrl+N</code>).',
      initialDoc: '<h1>MEMORANDO INTERNO</h1><p>Solicitamos que toda a equipe revise as diretrizes do projeto antes da reunião de homologação.</p>',
      checks: [
        { label: 'Aplicar negrito em algum trecho do texto', test: html => /<b>|<strong>|font-weight:\s*(bold|[6-9]00)/i.test(html) }
      ] },

    { id:'w2', title:'2. Alinhamento justificado', xp:30,
      explanation:'<p>Quando o texto é <strong>justificado</strong>, as bordas ficam retas dos dois lados — o padrão de documentos institucionais e livros, porque parece mais organizado em blocos de parágrafo longos.</p>',
      hint: 'Clique dentro do parágrafo e depois no ícone de alinhamento justificado (as quatro linhas retas).',
      officeReal: 'No Word: <strong>Página Inicial</strong> → grupo <strong>Parágrafo</strong> → <strong>Justificar</strong> (<code>Ctrl+J</code>).',
      initialDoc: '<h2>POLÍTICA DE PRIVACIDADE</h2><p>A presente política descreve detalhadamente como coletamos, utilizamos, armazenamos e protegemos as informações pessoais de nossos usuários finais e parceiros comerciais.</p>',
      checks: [
        { label: 'Justificar o parágrafo', test: html => /text-align:\s*justify|align="justify"/i.test(html) }
      ] },

    { id:'w3', title:'3. Hierarquia com Título 1 e Título 2', xp:30,
      explanation:'<p>Marcar um texto como Título 1 ou Título 2 não é só deixar maior — é dizer ao programa "isto é uma seção", o que depois permite gerar sumários automáticos e navegar pelo documento.</p>',
      hint: 'Clique na primeira linha e aplique H1 na barra; clique na segunda linha de título e aplique H2.',
      officeReal: 'No Word: selecione a linha → <strong>Página Inicial</strong> → grupo <strong>Estilos</strong> → <strong>Título 1</strong> ou <strong>Título 2</strong>.',
      initialDoc: '<h1>1. INTRODUÇÃO AO PROJETO</h1><p>Detalhamento inicial do escopo do projeto corporativo.</p><p>1.1 Objetivos Específicos</p><p>Definição das metas operacionais para o primeiro trimestre.</p>',
      checks: [
        { label: 'Ter um Título 1 (H1) no documento', test: html => /<h1/i.test(html) },
        { label: 'Ter um Título 2 (H2) no documento', test: html => /<h2/i.test(html) }
      ] },

    { id:'w4', title:'4. Lista com marcadores', xp:30,
      explanation:'<p>Requisitos, ingredientes, passos — qualquer coisa que seja "vários itens soltos" fica mais fácil de ler em lista do que em frase corrida.</p>',
      hint: 'Selecione as três linhas de requisitos e clique no ícone de lista com marcadores.',
      officeReal: 'No Word: selecione as linhas → <strong>Página Inicial</strong> → grupo <strong>Parágrafo</strong> → <strong>Marcadores</strong>.',
      initialDoc: '<p>Requisitos indispensáveis para o contrato:</p><p>Certidão Negativa de Débitos</p><p>Contrato Social Atualizado</p><p>Comprovante de Inscrição Estadual</p>',
      checks: [
        { label: 'Transformar os itens em lista com marcadores', test: html => /<ul/i.test(html) && /<li/i.test(html) }
      ] },

    { id:'w5', title:'5. Localizar e substituir', xp:35,
      explanation:'<p>Trocar uma palavra repetida manualmente, uma por uma, é o tipo de tarefa em que humanos erram. A ferramenta de substituição troca todas de uma vez, sem esquecer nenhuma.</p>',
      hint: 'Clique no ícone de lupa, digite [EMPRESA] para buscar e Acme Corp para substituir.',
      officeReal: 'No Word: <strong>Página Inicial</strong> → grupo <strong>Edição</strong> → <strong>Substituir</strong> (<code>Ctrl+U</code>).',
      initialDoc: '<p>A [EMPRESA] declara que a [EMPRESA] atende a todas as normas regulamentatórias vigentes do setor corporativo.</p>',
      checks: [
        { label: 'Remover todas as ocorrências de [EMPRESA]', test: html => !/\[EMPRESA\]/i.test(html) },
        { label: 'Conter o texto "Acme Corp" no lugar', test: html => /Acme Corp/i.test(html) }
      ] },

    { id:'w6', title:'6. Inserir uma tabela', xp:35,
      explanation:'<p>Números organizados em linhas soltas de texto ficam difíceis de comparar. Uma tabela alinha tudo em colunas, então o olho compara valores instantaneamente.</p>',
      hint: 'Clique no botão de tabela na barra de ferramentas para inserir uma tabela pronta no ponto do cursor.',
      officeReal: 'No Word: <strong>Inserir</strong> → grupo <strong>Tabelas</strong> → <strong>Tabela</strong> → defina linhas e colunas.',
      initialDoc: '<p>Abaixo apresentamos a estrutura de custos por departamento:</p>',
      checks: [
        { label: 'Inserir uma tabela no documento', test: html => /<table/i.test(html) }
      ] },

    { id:'w7', title:'7. Cabeçalho institucional', xp:35,
      explanation:'<p>Um cabeçalho repete uma informação fixa (nome da empresa, título do documento) no topo de todas as páginas, sem que você precise digitar de novo em cada uma.</p>',
      hint: 'A faixa "DOCUMENTO OFICIAL - USO INTERNO" já simula um cabeçalho — deixe-a em negrito ou destaque para validar.',
      officeReal: 'No Word: <strong>Inserir</strong> → grupo <strong>Cabeçalho e Rodapé</strong> → <strong>Cabeçalho</strong>.',
      initialDoc: '<div style="border-bottom:2px solid #2954E5;padding-bottom:4px;margin-bottom:12px;font-weight:bold;font-size:11px;color:#1B3AA8;">DOCUMENTO OFICIAL - USO INTERNO</div><p>Conteúdo principal do relatório executivo sobre conformidade corporativa.</p>',
      checks: [
        { label: 'Manter a identificação "DOCUMENTO OFICIAL" visível no topo', test: html => /DOCUMENTO OFICIAL/i.test(html) }
      ] },

    { id:'w8', title:'8. Marca-texto para avisos', xp:35,
      explanation:'<p>Destacar com cor de fundo funciona como um marca-texto de papel: direciona o olho direto para o aviso mais urgente da página.</p>',
      hint: 'Selecione a palavra "impreterível" e clique no ícone do marca-texto.',
      officeReal: 'No Word: <strong>Página Inicial</strong> → grupo <strong>Fonte</strong> → <strong>Cor do Realce do Texto</strong>.',
      initialDoc: '<p>Atenção: O prazo impreterível para submissão das propostas encerra-se na sexta-feira às 18h00.</p>',
      checks: [
        { label: 'Aplicar um destaque de cor de fundo em algum trecho', test: html => /background-color|<mark/i.test(html) }
      ] },

    { id:'w9', title:'9. Citação em bloco', xp:40,
      explanation:'<p>Uma citação longa precisa ficar visualmente separada do seu próprio texto, com recuo e itálico, para o leitor saber exatamente onde termina a sua voz e começa a de outra pessoa.</p>',
      hint: 'Selecione o parágrafo entre aspas e formate como bloco de citação (itálico já está aplicado — mantenha).',
      officeReal: 'No Word: clique com o botão direito no parágrafo → <strong>Parágrafo</strong> → <strong>Recuo Esquerdo</strong> em 4 cm.',
      initialDoc: '<p>Conforme destacado pela doutrina especializada em gestão da inovação:</p><blockquote style="margin-left:20px;font-style:italic;color:#475569;">"A transformação digital nas corporações depende da capacitação contínua das equipes e do domínio das ferramentas essenciais."</blockquote>',
      checks: [
        { label: 'Manter a citação com recuo em bloco ou itálico', test: html => /<blockquote/i.test(html) || /font-style:\s*italic/i.test(html) }
      ] },

    { id:'w10', title:'10. Caixa de texto de destaque', xp:40,
      explanation:'<p>Uma nota executiva isolada numa caixa chama atenção sem se misturar com o parágrafo ao redor — útil para resumos, avisos ou conclusões rápidas.</p>',
      hint: 'A caixa "NOTA EXECUTIVA" já existe no documento — mantenha a borda visível ao editar.',
      officeReal: 'No Word: <strong>Inserir</strong> → grupo <strong>Texto</strong> → <strong>Caixa de Texto</strong>.',
      initialDoc: '<div style="border:1.5px solid #2954E5;background-color:#E7ECFC;padding:12px;border-radius:8px;"><strong>NOTA EXECUTIVA:</strong> Todos os indicadores da meta foram batidos com antecedência de 15 dias.</div><p>Segue abaixo o detalhamento operacional das equipes envolvidas.</p>',
      checks: [
        { label: 'Manter a borda visível ao redor da caixa', test: html => /border:/i.test(html) },
        { label: 'Manter o texto "NOTA EXECUTIVA" na caixa', test: html => /NOTA EXECUTIVA/i.test(html) }
      ] },

    { id:'w11', title:'🏆 Desafio Final: Relatório Executivo', xp:100,
      explanation:'<p><strong>Você é o estagiário responsável pelo relatório anual.</strong> Combine tudo que praticou: deixe o título em <strong>negrito</strong>, o parágrafo <strong>justificado</strong>, insira uma <strong>tabela</strong> e troque <code>[STATUS]</code> por <code>Aprovado</code>.</p>',
      hint: 'São 4 requisitos: negrito, justificado, tabela e a troca de texto — resolva um de cada vez. O checklist ao lado mostra exatamente qual falta.',
      officeReal: 'Este desafio combina as guias <strong>Página Inicial</strong>, <strong>Inserir</strong> e a ferramenta de substituição.',
      initialDoc: '<h1>RELATÓRIO ANUAL DE RESULTADOS</h1><p>O desempenho operacional da corporação no último exercício financeiro manteve-se consistente em todos os setores estratégicos. O parecer da auditoria externa sobre o demonstrativo é: [STATUS].</p>',
      checks: [
        { label: 'Aplicar negrito em algum trecho', test: html => /<b>|<strong>|font-weight:\s*(bold|[6-9]00)/i.test(html) },
        { label: 'Justificar o parágrafo', test: html => /text-align:\s*justify|align="justify"/i.test(html) },
        { label: 'Inserir uma tabela', test: html => /<table/i.test(html) },
        { label: 'Trocar [STATUS] por "Aprovado"', test: html => !/\[STATUS\]/i.test(html) && /Aprovado/i.test(html) }
      ] }
  ],

  renderTaskButtons() {
    const container = document.getElementById('word-question-tabs');
    container.innerHTML = '';
    this.tasks.forEach((t, idx) => {
      const isCompleted = AppState.user.completedTasks.includes(t.id);
      const isFinal = idx === 10;
      const btn = document.createElement('button');
      btn.onclick = () => this.loadTask(idx);
      btn.className = `task-pill w-9 h-9 rounded-lg text-xs flex items-center justify-center transition ${
        idx === this.activeTaskIdx ? 'bg-word text-white' : isCompleted ? 'bg-word-soft text-word-dark border border-word/30' : 'bg-paperDim text-ink/50 pill-idle'}`;
      btn.innerHTML = isFinal ? '<i class="fa-solid fa-trophy text-amber-500"></i>' : (isCompleted ? '<i class="fa-solid fa-check text-[10px]"></i>' : (idx+1));
      container.appendChild(btn);
    });
  },

  loadTask(idx) {
    this.activeTaskIdx = idx;
    this.hintVisible = false;
    const task = this.tasks[idx];
    document.getElementById('word-task-number').textContent = idx === 10 ? 'Desafio Final' : `Exercício ${idx+1} de 11`;
    document.getElementById('word-task-title').textContent = task.title;
    document.getElementById('word-xp-reward').textContent = `+${task.xp} XP`;
    document.getElementById('word-task-explanation').innerHTML = task.explanation;
    document.getElementById('word-office-real-text').innerHTML = task.officeReal;
    document.getElementById('word-editor').innerHTML = task.initialDoc;
    document.getElementById('word-feedback').textContent = '';
    document.getElementById('word-hint-box').classList.add('hidden');
    document.getElementById('word-hint-box').textContent = task.hint;
    document.getElementById('word-hint-toggle-label').textContent = 'Ver dica';
    document.getElementById('word-editor').oninput = () => this.renderChecklist();
    this.renderChecklist();
    this.renderTaskButtons();

    const nextBtn = document.getElementById('word-next-btn');
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
    document.getElementById('word-hint-box').classList.toggle('hidden', !this.hintVisible);
    document.getElementById('word-hint-toggle-label').textContent = this.hintVisible ? 'Esconder dica' : 'Ver dica';
  },

  renderChecklist() {
    const task = this.tasks[this.activeTaskIdx];
    const html = document.getElementById('word-editor').innerHTML;
    document.getElementById('word-checklist').innerHTML = task.checks.map(c => {
      const ok = c.test(html);
      return `<div class="checklist-item flex items-center gap-2 text-xs ${ok ? 'text-excel-dark' : 'text-ink/50'}">
        <i class="fa-solid ${ok ? 'fa-circle-check' : 'fa-circle'}"></i> ${c.label}
      </div>`;
    }).join('');
  },

  execCmd(cmd, arg = null) {
    document.getElementById('word-editor').focus();
    document.execCommand(cmd, false, arg);
    this.renderChecklist();
  },

  insertTable() {
    const html = `<table><thead><tr><th>Item</th><th>Valor</th></tr></thead><tbody><tr><td>Projeto A</td><td>R$ 15.000</td></tr></tbody></table><p></p>`;
    this.execCmd('insertHTML', html);
  },

  insertTextBox() {
    const html = `<div style="border:1.5px solid #1C1B22;background-color:#F6F5EF;padding:10px;border-radius:6px;">Novo texto de destaque</div><p></p>`;
    this.execCmd('insertHTML', html);
  },

  openSearchReplace() {
    const target = prompt('Buscar por:', '[EMPRESA]');
    if (!target) return;
    const replacement = prompt(`Substituir "${target}" por:`, 'Acme Corp');
    if (replacement === null) return;
    const editor = document.getElementById('word-editor');
    const regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    editor.innerHTML = editor.innerHTML.replace(regex, replacement);
    this.renderChecklist();
  },

  validateCurrentTask() {
    const html = document.getElementById('word-editor').innerHTML;
    const task = this.tasks[this.activeTaskIdx];
    const results = task.checks.map(c => ({ label: c.label, ok: c.test(html) }));
    const passed = results.every(r => r.ok);
    const fb = document.getElementById('word-feedback');
    if (passed) {
      fb.textContent = '✓ Validação concluída com sucesso!';
      fb.className = 'text-xs font-bold text-excel-dark';
      AppGamification.addXP(task.xp, task.id);
      this.renderTaskButtons();
      document.getElementById('word-next-btn').classList.remove('hidden');
    } else {
      const missing = results.filter(r => !r.ok).map(r => r.label);
      fb.innerHTML = `✗ Ainda falta: <strong>${missing.join(' · ')}</strong>`;
      fb.className = 'text-xs font-bold text-rose-600';
    }
  }
};
