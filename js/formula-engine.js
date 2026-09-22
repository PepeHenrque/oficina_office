/* ==========================================================================
   EXCEL FORMULA ENGINE
   ========================================================================== */
const FormulaEngine = {
  COLS: ['A','B','C','D','E'],
  colIndex(letter) { return this.COLS.indexOf(letter.toUpperCase()); },
  parseCellRef(ref) {
    const m = ref.trim().match(/^([A-Za-z]+)(\d+)$/);
    if (!m) return null;
    return { col: m[1].toUpperCase(), row: parseInt(m[2], 10) };
  },
  parseRange(rangeStr) {
    const parts = rangeStr.split(':');
    if (parts.length === 1) {
      const c = this.parseCellRef(parts[0]);
      return c ? [`${c.col}${c.row}`] : [];
    }
    const a = this.parseCellRef(parts[0]), b = this.parseCellRef(parts[1]);
    if (!a || !b) return [];
    const c1 = Math.min(this.colIndex(a.col), this.colIndex(b.col));
    const c2 = Math.max(this.colIndex(a.col), this.colIndex(b.col));
    const r1 = Math.min(a.row, b.row), r2 = Math.max(a.row, b.row);
    const cells = [];
    for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) cells.push(`${this.COLS[c]}${r}`);
    return cells;
  },
  splitArgs(str) {
    const args = []; let cur = ''; let inQ = false;
    for (const ch of str) {
      if (ch === '"') { inQ = !inQ; cur += ch; continue; }
      if ((ch === ';' || ch === ',') && !inQ) { args.push(cur.trim()); cur = ''; continue; }
      cur += ch;
    }
    if (cur.trim() !== '' || args.length > 0) args.push(cur.trim());
    return args;
  },
  stripQuotes(s) { s = s.trim(); return (s.startsWith('"') && s.endsWith('"')) ? s.slice(1,-1) : s; },
  isNumeric(s) { return s.trim() !== '' && !isNaN(Number(s.trim().replace(',', '.'))); },
  toNumber(s) { return Number(String(s).trim().replace(',', '.')); },

  getValue(cellId, raw, cache, visiting) {
    if (cache.hasOwnProperty(cellId)) return cache[cellId];
    const cellRaw = (raw[cellId] ?? '').toString().trim();
    if (cellRaw === '') { cache[cellId] = ''; return ''; }
    if (cellRaw.startsWith('=')) {
      if (visiting.has(cellId)) { cache[cellId] = '#CIRC'; return '#CIRC'; }
      visiting.add(cellId);
      const val = this.evalFormula(cellRaw.slice(1), raw, cache, visiting);
      visiting.delete(cellId);
      cache[cellId] = val;
      return val;
    }
    if (this.isNumeric(cellRaw)) { const n = this.toNumber(cellRaw); cache[cellId] = n; return n; }
    cache[cellId] = cellRaw;
    return cellRaw;
  },
  resolveToken(token, raw, cache, visiting) {
    token = token.trim();
    if (token.startsWith('"') && token.endsWith('"')) return this.stripQuotes(token);
    const ref = this.parseCellRef(token);
    if (ref) return this.getValue(`${ref.col}${ref.row}`, raw, cache, visiting);
    if (this.isNumeric(token)) return this.toNumber(token);
    return token;
  },
  numericValuesFromRange(rangeStr, raw, cache, visiting) {
    return this.parseRange(rangeStr).map(id => this.getValue(id, raw, cache, visiting)).filter(v => typeof v === 'number');
  },
  compareCriteria(value, criteria) {
    criteria = this.stripQuotes(criteria).trim();
    const m = criteria.match(/^(>=|<=|<>|>|<|=)?(.*)$/);
    const op = m[1] || '=';
    const target = m[2].trim();
    if (this.isNumeric(target)) {
      const t = this.toNumber(target);
      const v = typeof value === 'number' ? value : this.toNumber(value);
      switch (op) { case '>=': return v>=t; case '<=': return v<=t; case '<>': return v!==t; case '>': return v>t; case '<': return v<t; default: return v===t; }
    }
    return String(value).toLowerCase() === target.toLowerCase();
  },
  evalCondition(condStr, raw, cache, visiting) {
    const m = condStr.match(/^(.*?)(>=|<=|<>|>|<|=)(.*)$/);
    if (!m) return false;
    const left = this.resolveToken(m[1], raw, cache, visiting);
    const right = this.resolveToken(m[3], raw, cache, visiting);
    const l = typeof left === 'number' ? left : this.toNumber(left);
    const r = typeof right === 'number' ? right : this.toNumber(right);
    switch (m[2]) { case '>=': return l>=r; case '<=': return l<=r; case '<>': return l!==r; case '>': return l>r; case '<': return l<r; default: return l===r; }
  },
  evalFormula(expr, raw, cache, visiting) {
    const m = expr.trim().match(/^([A-Za-zÀ-ÿ.]+)\((.*)\)$/s);
    if (!m) return this.resolveToken(expr, raw, cache, visiting);
    let name = m[1].toUpperCase().replace('É','E').replace('Á','A').replace('Í','I').replace('Ó','O').replace('Ú','U').replace(/\./g,'');
    const args = this.splitArgs(m[2]);
    switch (name) {
      case 'SOMA': { const v = this.numericValuesFromRange(args[0], raw, cache, visiting); return v.reduce((a,b)=>a+b,0); }
      case 'MEDIA': { const v = this.numericValuesFromRange(args[0], raw, cache, visiting); return v.length ? v.reduce((a,b)=>a+b,0)/v.length : 0; }
      case 'MAXIMO': { const v = this.numericValuesFromRange(args[0], raw, cache, visiting); return v.length ? Math.max(...v) : 0; }
      case 'MINIMO': { const v = this.numericValuesFromRange(args[0], raw, cache, visiting); return v.length ? Math.min(...v) : 0; }
      case 'SE': { const cond = this.evalCondition(args[0], raw, cache, visiting); return this.resolveToken(cond ? args[1] : args[2], raw, cache, visiting); }
      case 'CONTSE': {
        const cells = this.parseRange(args[0]); let count = 0;
        cells.forEach(id => { const v = this.getValue(id, raw, cache, visiting); if (v !== '' && this.compareCriteria(v, args[1])) count++; });
        return count;
      }
      default: return '#FUNC?';
    }
  },
  recalcAll(raw) {
    const cache = {};
    Object.keys(raw).forEach(id => this.getValue(id, raw, cache, new Set()));
    return cache;
  },
  format(v) {
    if (typeof v === 'number') return Number.isInteger(v) ? String(v) : String(Math.round(v*100)/100).replace('.', ',');
    return String(v);
  }
};
