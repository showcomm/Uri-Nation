// Uri-Nation Board Builder
// Grid-based visual editor that exports JSON compatible with Board.fromJSON()

const SPACE_TYPES = {
  SIDEWALK:     'sidewalk',
  TERRITORY:    'territory',
  BOND:         'bond',
  HOME:         'home',
  WATER_SOURCE: 'waterSource',
  CHANCE_SPOT:  'chanceSpot',
  DOG_PARK:     'dogPark',
  EVENTS:       'events',
  INTERSECTION: 'intersection',
  SIDE_STREET:  'sideStreet',
};

// Colours for each space type
const TYPE_COLOURS = {
  [SPACE_TYPES.SIDEWALK]:     '#b0b0b0',
  [SPACE_TYPES.TERRITORY]:    '#7ec850',
  [SPACE_TYPES.BOND]:         '#e04040',
  [SPACE_TYPES.HOME]:         '#f0c040',
  [SPACE_TYPES.WATER_SOURCE]: '#40a0e0',
  [SPACE_TYPES.CHANCE_SPOT]:  '#d080d0',
  [SPACE_TYPES.DOG_PARK]:     '#40c080',
  [SPACE_TYPES.EVENTS]:       '#f08040',
  [SPACE_TYPES.INTERSECTION]: '#808080',
  [SPACE_TYPES.SIDE_STREET]:  '#c0a070',
};

// Short labels drawn on cells
const TYPE_LABELS = {
  [SPACE_TYPES.SIDEWALK]:     'SW',
  [SPACE_TYPES.TERRITORY]:    'TR',
  [SPACE_TYPES.BOND]:         'BO',
  [SPACE_TYPES.HOME]:         'HM',
  [SPACE_TYPES.WATER_SOURCE]: 'WS',
  [SPACE_TYPES.CHANCE_SPOT]:  'CS',
  [SPACE_TYPES.DOG_PARK]:     'DP',
  [SPACE_TYPES.EVENTS]:       'EV',
  [SPACE_TYPES.INTERSECTION]: 'IX',
  [SPACE_TYPES.SIDE_STREET]:  'SS',
};

// ─── State ───────────────────────────────────────────────────────────

let gridCols = 20;
let gridRows = 12;
let cellSize = 48;
let grid = [];          // 2D array [row][col] → null | space object
let selectedStamp = null;
let selectedCell = null; // { row, col }
let idCounter = 0;

function initGrid(cols, rows) {
  gridCols = cols;
  gridRows = rows;
  grid = [];
  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = null;
    }
  }
  selectedCell = null;
  idCounter = 0;
}

function nextId(type) {
  idCounter++;
  return `${type}_${idCounter}`;
}

// ─── Canvas rendering ────────────────────────────────────────────────

let canvas, ctx;

function resizeCanvas() {
  canvas.width = gridCols * cellSize;
  canvas.height = gridRows * cellSize;
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  for (let r = 0; r <= gridRows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * cellSize);
    ctx.lineTo(gridCols * cellSize, r * cellSize);
    ctx.stroke();
  }
  for (let c = 0; c <= gridCols; c++) {
    ctx.beginPath();
    ctx.moveTo(c * cellSize, 0);
    ctx.lineTo(c * cellSize, gridRows * cellSize);
    ctx.stroke();
  }

  // Filled cells
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const space = grid[r][c];
      if (!space) continue;
      const x = c * cellSize;
      const y = r * cellSize;
      ctx.fillStyle = TYPE_COLOURS[space.type] || '#ccc';
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

      // Label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(TYPE_LABELS[space.type] || '??', x + cellSize / 2, y + cellSize / 2 - 7);

      // ID (truncated)
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      const idLabel = space.id.length > 8 ? space.id.slice(0, 8) + '..' : space.id;
      ctx.fillText(idLabel, x + cellSize / 2, y + cellSize / 2 + 7);
    }
  }

  // Edge lines between adjacent occupied cells
  ctx.lineWidth = 2;
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      if (!grid[r][c]) continue;
      // Right neighbor
      if (c + 1 < gridCols && grid[r][c + 1]) {
        const cost = edgeCost(grid[r][c], grid[r][c + 1]);
        ctx.strokeStyle = cost > 0 ? '#e04040' : '#444';
        ctx.beginPath();
        ctx.moveTo((c + 1) * cellSize, r * cellSize + cellSize / 2);
        ctx.lineTo((c + 1) * cellSize, r * cellSize + cellSize / 2);
        // Draw a small connector
        ctx.moveTo(c * cellSize + cellSize - 1, r * cellSize + cellSize / 2);
        ctx.lineTo((c + 1) * cellSize + 1, r * cellSize + cellSize / 2);
        ctx.stroke();
        if (cost > 0) {
          ctx.fillStyle = '#e04040';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(cost.toString(), (c + 1) * cellSize, r * cellSize + cellSize / 2 - 6);
        }
      }
      // Bottom neighbor
      if (r + 1 < gridRows && grid[r + 1][c]) {
        const cost = edgeCost(grid[r][c], grid[r + 1][c]);
        ctx.strokeStyle = cost > 0 ? '#e04040' : '#444';
        ctx.beginPath();
        ctx.moveTo(c * cellSize + cellSize / 2, (r + 1) * cellSize - 1);
        ctx.lineTo(c * cellSize + cellSize / 2, (r + 1) * cellSize + 1);
        ctx.stroke();
        if (cost > 0) {
          ctx.fillStyle = '#e04040';
          ctx.font = 'bold 10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(cost.toString(), c * cellSize + cellSize / 2 + 10, (r + 1) * cellSize + 4);
        }
      }
    }
  }

  // Selection highlight
  if (selectedCell) {
    const { row, col } = selectedCell;
    ctx.strokeStyle = '#0080ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
  }
}

// ─── Edge cost logic ─────────────────────────────────────────────────

function edgeCost(spaceA, spaceB) {
  // Side street connections cost 1 drive
  if (spaceA.type === SPACE_TYPES.SIDE_STREET || spaceB.type === SPACE_TYPES.SIDE_STREET) {
    return 1;
  }
  // Road crossing: north ↔ south, not at intersection
  if (spaceA.side && spaceB.side && spaceA.side !== spaceB.side) {
    // Free at intersections
    if (spaceA.type === SPACE_TYPES.INTERSECTION || spaceB.type === SPACE_TYPES.INTERSECTION) {
      return 0;
    }
    // Mid-block crossing costs 1
    return 1;
  }
  return 0;
}

// ─── Palette ─────────────────────────────────────────────────────────

function buildPalette() {
  const palette = document.getElementById('palette');
  palette.innerHTML = '<h3>Stamps</h3>';
  for (const [key, type] of Object.entries(SPACE_TYPES)) {
    const btn = document.createElement('button');
    btn.className = 'stamp-btn';
    btn.dataset.type = type;
    btn.innerHTML = `<span class="stamp-colour" style="background:${TYPE_COLOURS[type]}"></span> ${key}`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedStamp = type;
    });
    palette.appendChild(btn);
  }

  // Eraser
  const eraser = document.createElement('button');
  eraser.className = 'stamp-btn';
  eraser.innerHTML = '<span class="stamp-colour" style="background:#fff;border:1px solid #999"></span> ERASER';
  eraser.addEventListener('click', () => {
    document.querySelectorAll('.stamp-btn').forEach(b => b.classList.remove('active'));
    eraser.classList.add('active');
    selectedStamp = '__erase__';
  });
  palette.appendChild(eraser);
}

// ─── Metadata panel ──────────────────────────────────────────────────

function updateMetadataPanel() {
  const panel = document.getElementById('metadata');
  if (!selectedCell || !grid[selectedCell.row][selectedCell.col]) {
    panel.innerHTML = '<p class="hint">Click an occupied cell to edit its properties.</p>';
    return;
  }
  const space = grid[selectedCell.row][selectedCell.col];
  panel.innerHTML = `
    <h3>Properties</h3>
    <label>ID
      <input type="text" id="meta-id" value="${esc(space.id)}" />
    </label>
    <label>Type
      <input type="text" id="meta-type" value="${esc(space.type)}" disabled />
    </label>
    <label>Side
      <select id="meta-side">
        <option value="" ${!space.side ? 'selected' : ''}>(none)</option>
        <option value="north" ${space.side === 'north' ? 'selected' : ''}>north</option>
        <option value="south" ${space.side === 'south' ? 'selected' : ''}>south</option>
      </select>
    </label>
    <label>Home Owner
      <input type="text" id="meta-homeOwner" value="${esc(space.homeOwner || '')}" placeholder="player id" />
    </label>
    <label>Influence (comma-separated territory ids)
      <input type="text" id="meta-influence" value="${esc((space.influence || []).join(', '))}" placeholder="t1, t2" />
    </label>
    <label>Label
      <input type="text" id="meta-label" value="${esc(space.label || '')}" placeholder="human-readable name" />
    </label>
    <button id="meta-apply" class="action-btn">Apply</button>
  `;
  document.getElementById('meta-apply').addEventListener('click', applyMetadata);
}

function applyMetadata() {
  if (!selectedCell) return;
  const space = grid[selectedCell.row][selectedCell.col];
  if (!space) return;

  const newId = document.getElementById('meta-id').value.trim();
  const oldId = space.id;

  // Check for duplicate ids
  if (newId !== oldId) {
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        if (grid[r][c] && grid[r][c].id === newId) {
          alert('Duplicate ID: ' + newId);
          return;
        }
      }
    }
  }

  space.id = newId;
  space.side = document.getElementById('meta-side').value || null;
  space.homeOwner = document.getElementById('meta-homeOwner').value.trim() || null;
  space.label = document.getElementById('meta-label').value.trim() || space.id;

  const infStr = document.getElementById('meta-influence').value.trim();
  space.influence = infStr ? infStr.split(',').map(s => s.trim()).filter(Boolean) : [];

  drawGrid();
  updateMetadataPanel();
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// ─── Grid interaction ────────────────────────────────────────────────

function onCanvasClick(e) {
  const rect = canvas.getBoundingClientRect();
  const col = Math.floor((e.clientX - rect.left) / cellSize);
  const row = Math.floor((e.clientY - rect.top) / cellSize);
  if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) return;

  if (selectedStamp === '__erase__') {
    grid[row][col] = null;
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      selectedCell = null;
    }
  } else if (selectedStamp) {
    if (!grid[row][col]) {
      const id = nextId(selectedStamp);
      grid[row][col] = {
        id,
        type: selectedStamp,
        side: null,
        homeOwner: null,
        influence: [],
        label: id,
      };
    }
    selectedCell = { row, col };
  } else {
    // No stamp selected — just select cell
    selectedCell = grid[row][col] ? { row, col } : null;
  }

  drawGrid();
  updateMetadataPanel();
}

// ─── Export / Import ─────────────────────────────────────────────────

function exportBoard() {
  const spaces = [];
  const posMap = new Map(); // id → { row, col }

  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      const s = grid[r][c];
      if (!s) continue;
      spaces.push({
        id: s.id,
        type: s.type,
        side: s.side,
        homeOwner: s.homeOwner,
        influence: s.influence.length > 0 ? s.influence : undefined,
        label: s.label,
      });
      posMap.set(s.id, { row: r, col: c });
    }
  }

  // Build edges from grid adjacency
  const edges = [];
  const edgeSeen = new Set();
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      if (!grid[r][c]) continue;
      const neighbors = [
        [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1],
      ];
      for (const [nr, nc] of neighbors) {
        if (nr < 0 || nr >= gridRows || nc < 0 || nc >= gridCols) continue;
        if (!grid[nr][nc]) continue;
        const a = grid[r][c].id;
        const b = grid[nr][nc].id;
        const key = [a, b].sort().join('|');
        if (edgeSeen.has(key)) continue;
        edgeSeen.add(key);
        const cost = edgeCost(grid[r][c], grid[nr][nc]);
        edges.push({ from: a, to: b, driveCost: cost });
      }
    }
  }

  return { spaces, edges, _grid: { cols: gridCols, rows: gridRows, cellSize } };
}

function saveBoard() {
  const data = exportBoard();
  const name = prompt('Board name:', 'board-01') || 'board-01';
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function loadBoard() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        importBoard(data);
      } catch (err) {
        alert('Failed to load board: ' + err.message);
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

function importBoard(data) {
  // Restore grid dimensions if saved
  if (data._grid) {
    gridCols = data._grid.cols || 20;
    gridRows = data._grid.rows || 12;
    cellSize = data._grid.cellSize || 48;
    document.getElementById('grid-cols').value = gridCols;
    document.getElementById('grid-rows').value = gridRows;
  }

  initGrid(gridCols, gridRows);
  resizeCanvas();

  // We need to place spaces on the grid. If _grid layout data is present we
  // can recover positions from the edges + a simple BFS layout. But the
  // simplest approach: save grid positions in the export. Let's store
  // _positions in the export too.
  // For files without _positions, stack spaces left-to-right, top-to-bottom.

  if (data._positions) {
    for (const p of data._positions) {
      if (p.row < gridRows && p.col < gridCols) {
        const spaceDef = data.spaces.find(s => s.id === p.id);
        if (spaceDef) {
          grid[p.row][p.col] = {
            id: spaceDef.id,
            type: spaceDef.type,
            side: spaceDef.side || null,
            homeOwner: spaceDef.homeOwner || null,
            influence: spaceDef.influence || [],
            label: spaceDef.label || spaceDef.id,
          };
          const num = parseInt(spaceDef.id.replace(/[^0-9]/g, ''), 10);
          if (!isNaN(num) && num >= idCounter) idCounter = num;
        }
      }
    }
  } else {
    // Fallback: place sequentially
    let r = 0, c = 0;
    for (const spaceDef of data.spaces) {
      if (r >= gridRows) break;
      grid[r][c] = {
        id: spaceDef.id,
        type: spaceDef.type,
        side: spaceDef.side || null,
        homeOwner: spaceDef.homeOwner || null,
        influence: spaceDef.influence || [],
        label: spaceDef.label || spaceDef.id,
      };
      const num = parseInt(spaceDef.id.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num >= idCounter) idCounter = num;
      c++;
      if (c >= gridCols) { c = 0; r++; }
    }
  }

  selectedCell = null;
  drawGrid();
  updateMetadataPanel();
}

// Override exportBoard to include positions
const _origExport = exportBoard;
function exportBoardWithPositions() {
  const data = _origExport();
  const positions = [];
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      if (grid[r][c]) {
        positions.push({ id: grid[r][c].id, row: r, col: c });
      }
    }
  }
  data._positions = positions;
  return data;
}
// Patch save to use the extended export
function saveBoardPatched() {
  const data = exportBoardWithPositions();
  const name = prompt('Board name:', 'board-01') || 'board-01';
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── Grid resize ─────────────────────────────────────────────────────

function applyGridResize() {
  const newCols = parseInt(document.getElementById('grid-cols').value, 10) || 20;
  const newRows = parseInt(document.getElementById('grid-rows').value, 10) || 12;
  // Preserve existing cells that fit
  const oldGrid = grid;
  const oldRows = gridRows;
  const oldCols = gridCols;
  initGrid(newCols, newRows);
  for (let r = 0; r < Math.min(oldRows, newRows); r++) {
    for (let c = 0; c < Math.min(oldCols, newCols); c++) {
      grid[r][c] = oldGrid[r][c];
    }
  }
  resizeCanvas();
  drawGrid();
  updateMetadataPanel();
}

// ─── Init ────────────────────────────────────────────────────────────

function init() {
  canvas = document.getElementById('board-canvas');
  ctx = canvas.getContext('2d');

  initGrid(gridCols, gridRows);
  resizeCanvas();
  buildPalette();
  drawGrid();
  updateMetadataPanel();

  canvas.addEventListener('click', onCanvasClick);
  document.getElementById('btn-save').addEventListener('click', saveBoardPatched);
  document.getElementById('btn-load').addEventListener('click', loadBoard);
  document.getElementById('btn-clear').addEventListener('click', () => {
    if (confirm('Clear entire board?')) {
      initGrid(gridCols, gridRows);
      drawGrid();
      updateMetadataPanel();
    }
  });
  document.getElementById('btn-resize').addEventListener('click', applyGridResize);
}

document.addEventListener('DOMContentLoaded', init);
