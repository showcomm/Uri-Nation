// Uri-Nation Board Builder
// Grid-based stamp editor. Exports JSON compatible with Board.fromJSON().

// ─── Component Definitions ──────────────────────────────────────────

var CELL = 40; // pixels per grid unit

// Territory / Home turf share identical footprint geometry.
// Yard is the 2×1 front row; house is the 2×2 back block.
var COMPOUND_FP = [
  // rot 0  N — yard on top
  [{dr:0,dc:0,sub:'yard'},{dr:0,dc:1,sub:'yard'},
   {dr:1,dc:0,sub:'house'},{dr:1,dc:1,sub:'house'},
   {dr:2,dc:0,sub:'house'},{dr:2,dc:1,sub:'house'}],
  // rot 1  E — yard on right
  [{dr:0,dc:0,sub:'house'},{dr:0,dc:1,sub:'house'},{dr:0,dc:2,sub:'yard'},
   {dr:1,dc:0,sub:'house'},{dr:1,dc:1,sub:'house'},{dr:1,dc:2,sub:'yard'}],
  // rot 2  S — yard on bottom
  [{dr:0,dc:0,sub:'house'},{dr:0,dc:1,sub:'house'},
   {dr:1,dc:0,sub:'house'},{dr:1,dc:1,sub:'house'},
   {dr:2,dc:0,sub:'yard'},{dr:2,dc:1,sub:'yard'}],
  // rot 3  W — yard on left
  [{dr:0,dc:0,sub:'yard'},{dr:0,dc:1,sub:'house'},{dr:0,dc:2,sub:'house'},
   {dr:1,dc:0,sub:'yard'},{dr:1,dc:1,sub:'house'},{dr:1,dc:2,sub:'house'}]
];

var FACING = ['N','E','S','W'];
var FACING_FULL = ['north','east','south','west'];

var DEFS = {
  sidewalk: {
    name: 'Sidewalk',
    footprints: [
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'}],   // H
      [{dr:0,dc:0,sub:'main'},{dr:1,dc:0,sub:'main'}]    // V
    ],
    colors: {main:'#d4b896'},
    swatch: '#d4b896'
  },
  road: {
    name: 'Road',
    footprints: [
      [{dr:0,dc:0,sub:'main'},{dr:1,dc:0,sub:'main'}],   // V
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'}]    // H
    ],
    colors: {main:'#888888'},
    swatch: '#888888'
  },
  intersection: {
    name: 'Intersection',
    footprints: [[{dr:0,dc:0,sub:'main'}]],
    colors: {main:'#aaaaaa'},
    swatch: '#aaaaaa'
  },
  territory: {
    name: 'Territory',
    footprints: COMPOUND_FP,
    colors: {yard:'#7ec850', house:'#c87850'},
    swatch: '#7ec850'
  },
  home: {
    name: 'Home Turf',
    footprints: COMPOUND_FP,
    colors: {yard:'#88aaff', house:'#4477dd'},
    swatch: '#4477dd'
  },
  dogPark: {
    name: 'Dog Park',
    footprints: [[{dr:0,dc:0,sub:'main'}]],
    colors: {main:'#40c080'},
    swatch: '#40c080'
  },
  waterPark: {
    name: 'Water Park',
    footprints: [[{dr:0,dc:0,sub:'main'}]],
    colors: {main:'#40a8a0'},
    swatch: '#40a8a0'
  },
  pathStraight: {
    name: 'Path Straight',
    footprints: [
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'}],   // H
      [{dr:0,dc:0,sub:'main'},{dr:1,dc:0,sub:'main'}]    // V
    ],
    colors: {main:'#c8a878'},
    swatch: '#c8a878'
  },
  pathCorner: {
    name: 'Path Corner',
    footprints: [
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'},{dr:1,dc:0,sub:'main'},{dr:1,dc:1,sub:'main'}],
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'},{dr:1,dc:0,sub:'main'},{dr:1,dc:1,sub:'main'}],
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'},{dr:1,dc:0,sub:'main'},{dr:1,dc:1,sub:'main'}],
      [{dr:0,dc:0,sub:'main'},{dr:0,dc:1,sub:'main'},{dr:1,dc:0,sub:'main'},{dr:1,dc:1,sub:'main'}]
    ],
    colors: {main:'#c8a878'},
    swatch: '#c8a878'
  }
};

var PLAYER_COLORS = {
  blue:   {yard:'#88aaff', house:'#4477dd'},
  purple: {yard:'#cc88ff', house:'#8844cc'},
  orange: {yard:'#ffbb66', house:'#dd8833'},
  yellow: {yard:'#ffee66', house:'#ccbb33'}
};

// Quarter-circle arc params for each path-corner rotation.
// cx/cy are in cell units from the component's top-left corner.
var CORNER_ARCS = [
  {cx:2, cy:2, start:Math.PI,       end:1.5*Math.PI},   // rot 0: S→E
  {cx:0, cy:2, start:1.5*Math.PI,   end:2*Math.PI},     // rot 1: W→S
  {cx:0, cy:0, start:0,             end:0.5*Math.PI},   // rot 2: N→W
  {cx:2, cy:0, start:0.5*Math.PI,   end:Math.PI}        // rot 3: E→N
];

// Path-corner entry/exit cell offsets (within 2×2 block) per rotation.
var CORNER_ENDPOINTS = [
  {entry:{dr:1,dc:0}, exit:{dr:0,dc:1}},  // rot 0
  {entry:{dr:0,dc:0}, exit:{dr:1,dc:1}},  // rot 1
  {entry:{dr:0,dc:1}, exit:{dr:1,dc:0}},  // rot 2
  {entry:{dr:1,dc:1}, exit:{dr:0,dc:0}}   // rot 3
];

// ─── State ──────────────────────────────────────────────────────────

var gridCols = 22;
var gridRows = 19;
var grid = [];        // grid[r][c] = {comp, sub} | null
var components = [];  // all placed component objects
var nextIdNum = 0;

var activeStamp = null;  // type key or null
var activeRot = 0;
var selected = null;     // component object or null

var hoverR = -1, hoverC = -1;
var dragging = null;     // {comp, origRow, origCol, offR, offC}
var dragStarted = false;
var mouseDownPos = null;

var canvas, ctx;

// ─── Grid Helpers ───────────────────────────────────────────────────

function initGrid(cols, rows) {
  gridCols = cols;
  gridRows = rows;
  grid = [];
  for (var r = 0; r < rows; r++) {
    grid[r] = [];
    for (var c = 0; c < cols; c++) grid[r][c] = null;
  }
}

function fp(type, rot) {
  var d = DEFS[type];
  return d.footprints[rot % d.footprints.length];
}

function cellColor(type, sub, playerColour) {
  if (type === 'home' && playerColour && PLAYER_COLORS[playerColour]) {
    return PLAYER_COLORS[playerColour][sub] || '#888';
  }
  return DEFS[type].colors[sub] || '#888';
}

function canPlace(type, rot, row, col, ignore) {
  var cells = fp(type, rot);
  for (var i = 0; i < cells.length; i++) {
    var r = row + cells[i].dr, c = col + cells[i].dc;
    if (r < 0 || r >= gridRows || c < 0 || c >= gridCols) return false;
    if (grid[r][c] && (!ignore || grid[r][c].comp !== ignore)) return false;
  }
  return true;
}

function placeOnGrid(comp) {
  var cells = fp(comp.type, comp.rotation);
  for (var i = 0; i < cells.length; i++) {
    grid[comp.row + cells[i].dr][comp.col + cells[i].dc] = {comp:comp, sub:cells[i].sub};
  }
}

function removeFromGrid(comp) {
  var cells = fp(comp.type, comp.rotation);
  for (var i = 0; i < cells.length; i++) {
    var r = comp.row + cells[i].dr, c = comp.col + cells[i].dc;
    if (r >= 0 && r < gridRows && c >= 0 && c < gridCols &&
        grid[r][c] && grid[r][c].comp === comp) {
      grid[r][c] = null;
    }
  }
}

function makeId(type) {
  nextIdNum++;
  return type + '_' + nextIdNum;
}

function compAt(row, col) {
  if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) return null;
  return grid[row][col] ? grid[row][col].comp : null;
}

function deleteComp(comp) {
  removeFromGrid(comp);
  var i = components.indexOf(comp);
  if (i >= 0) components.splice(i, 1);
}

// ─── Canvas Rendering ───────────────────────────────────────────────

function resizeCanvas() {
  canvas.width = gridCols * CELL;
  canvas.height = gridRows * CELL;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = '#222240';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid lines on empty cells only
  ctx.strokeStyle = '#3a3a5a';
  ctx.lineWidth = 0.5;
  for (var r = 0; r < gridRows; r++) {
    for (var c = 0; c < gridCols; c++) {
      if (!grid[r][c]) {
        ctx.strokeRect(c * CELL + 0.5, r * CELL + 0.5, CELL - 1, CELL - 1);
      }
    }
  }

  // Placed component cells
  for (var r = 0; r < gridRows; r++) {
    for (var c = 0; c < gridCols; c++) {
      var g = grid[r][c];
      if (!g) continue;
      ctx.fillStyle = cellColor(g.comp.type, g.sub, g.comp.playerColour);
      ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
    }
  }

  // Path corner arcs
  for (var i = 0; i < components.length; i++) {
    if (components[i].type === 'pathCorner') drawArc(components[i]);
  }

  // Selection outline
  if (selected) drawOutline(selected, '#0080ff', 2.5);

  // Ghost preview
  if (hoverR >= 0 && hoverC >= 0) {
    if (dragging && dragStarted) {
      drawGhost(dragging.comp.type, dragging.comp.rotation,
                hoverR - dragging.offR, hoverC - dragging.offC,
                dragging.comp.playerColour, dragging.comp);
    } else if (activeStamp && !dragging) {
      drawGhost(activeStamp, activeRot, hoverR, hoverC, null, null);
    }
  }
}

function drawArc(comp) {
  var a = CORNER_ARCS[comp.rotation % 4];
  var x = comp.col * CELL + a.cx * CELL;
  var y = comp.row * CELL + a.cy * CELL;
  ctx.strokeStyle = '#a08060';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x, y, CELL, a.start, a.end, false);
  ctx.stroke();
}

function drawOutline(comp, color, width) {
  var cells = fp(comp.type, comp.rotation);
  var set = {};
  for (var i = 0; i < cells.length; i++) {
    set[(comp.row + cells[i].dr) + ',' + (comp.col + cells[i].dc)] = true;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  for (var key in set) {
    var p = key.split(','), r = +p[0], c = +p[1];
    var x = c * CELL, y = r * CELL;
    if (!set[(r-1)+','+c]) { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+CELL,y); ctx.stroke(); }
    if (!set[(r+1)+','+c]) { ctx.beginPath(); ctx.moveTo(x,y+CELL); ctx.lineTo(x+CELL,y+CELL); ctx.stroke(); }
    if (!set[r+','+(c-1)]) { ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x,y+CELL); ctx.stroke(); }
    if (!set[r+','+(c+1)]) { ctx.beginPath(); ctx.moveTo(x+CELL,y); ctx.lineTo(x+CELL,y+CELL); ctx.stroke(); }
  }
}

function drawGhost(type, rot, row, col, playerColour, ignore) {
  var cells = fp(type, rot);
  var ok = canPlace(type, rot, row, col, ignore);
  for (var i = 0; i < cells.length; i++) {
    var r = row + cells[i].dr, c = col + cells[i].dc;
    if (r < 0 || r >= gridRows || c < 0 || c >= gridCols) continue;
    ctx.fillStyle = ok
      ? hexRgba(cellColor(type, cells[i].sub, playerColour), 0.5)
      : 'rgba(255,60,60,0.4)';
    ctx.fillRect(c * CELL, r * CELL, CELL, CELL);
  }
}

function hexRgba(hex, a) {
  return 'rgba(' + parseInt(hex.slice(1,3),16) + ',' +
                   parseInt(hex.slice(3,5),16) + ',' +
                   parseInt(hex.slice(5,7),16) + ',' + a + ')';
}

// ─── Palette ────────────────────────────────────────────────────────

function buildPalette() {
  var el = document.getElementById('palette');
  el.innerHTML = '<h3>Components</h3>';
  var keys = Object.keys(DEFS);
  for (var i = 0; i < keys.length; i++) {
    (function(type) {
      var d = DEFS[type];
      var btn = document.createElement('button');
      btn.className = 'stamp-btn';
      btn.dataset.type = type;
      btn.innerHTML = '<span class="stamp-swatch" style="background:' + d.swatch + '"></span> ' + d.name;
      btn.addEventListener('click', function() { setStamp(type); });
      el.appendChild(btn);
    })(keys[i]);
  }
}

function setStamp(type) {
  activeStamp = (activeStamp === type) ? null : type;
  activeRot = 0;
  selected = null;
  refreshPalette();
  updateRotLabel();
  updateProps();
  draw();
}

function refreshPalette() {
  var btns = document.querySelectorAll('.stamp-btn');
  for (var i = 0; i < btns.length; i++)
    btns[i].classList.toggle('active', btns[i].dataset.type === activeStamp);
}

function updateRotLabel() {
  var el = document.getElementById('rotation-label');
  if (!activeStamp) { el.textContent = ''; return; }
  var d = DEFS[activeStamp];
  if (d.footprints.length <= 1) { el.textContent = ''; return; }
  var tag = '';
  if (activeStamp === 'territory' || activeStamp === 'home')
    tag = FACING[activeRot % 4];
  else if (activeStamp === 'pathCorner')
    tag = 'rot ' + (activeRot % 4);
  else
    tag = (activeRot % 2 === 0) ? 'H' : 'V';
  el.textContent = '[R] rotate \u2014 ' + tag;
}

// ─── Properties Panel ───────────────────────────────────────────────

function updateProps() {
  var el = document.getElementById('props');
  if (!selected) {
    el.innerHTML = '<p class="hint">Select a component to edit properties, or choose a stamp to place.</p>';
    return;
  }
  var c = selected;
  var h = '<h3>Properties</h3>';
  h += '<label>ID<input type="text" id="prop-id" value="' + esc(c.id) + '"></label>';
  h += '<label>Type<input type="text" value="' + esc(DEFS[c.type].name) + '" disabled></label>';

  if (c.type === 'territory' || c.type === 'home') {
    h += '<label>Facing<input type="text" value="' + FACING[c.rotation % 4] + '" readonly></label>';
  }
  if (c.type === 'home') {
    h += '<label>Player Colour<select id="prop-colour">';
    h += '<option value=""' + (!c.playerColour ? ' selected' : '') + '>(none)</option>';
    var cols = ['blue','purple','orange','yellow'];
    for (var i = 0; i < cols.length; i++)
      h += '<option value="'+cols[i]+'"'+(c.playerColour===cols[i]?' selected':'')+'>'+cols[i]+'</option>';
    h += '</select></label>';
  }

  h += '<button id="apply-btn">Apply</button>';
  el.innerHTML = h;
  document.getElementById('apply-btn').addEventListener('click', applyProps);
}

function applyProps() {
  if (!selected) return;
  var nid = document.getElementById('prop-id').value.trim();
  if (!nid) { alert('ID cannot be empty.'); return; }
  if (nid !== selected.id) {
    for (var i = 0; i < components.length; i++) {
      if (components[i].id === nid) { alert('Duplicate ID: ' + nid); return; }
    }
    selected.id = nid;
  }
  if (selected.type === 'home') {
    var sel = document.getElementById('prop-colour');
    if (sel) selected.playerColour = sel.value || null;
  }
  draw();
  updateProps();
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
}

// ─── Input Handling ─────────────────────────────────────────────────

function cellFromEvent(e) {
  var r = canvas.getBoundingClientRect();
  return { row: Math.floor((e.clientY - r.top) / CELL),
           col: Math.floor((e.clientX - r.left) / CELL) };
}

function onMouseMove(e) {
  var p = cellFromEvent(e);
  hoverR = p.row; hoverC = p.col;

  if (dragging && mouseDownPos) {
    var dx = e.clientX - mouseDownPos.x, dy = e.clientY - mouseDownPos.y;
    if (!dragStarted && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      dragStarted = true;
      removeFromGrid(dragging.comp);
    }
  }
  draw();
}

function onMouseDown(e) {
  if (e.button !== 0) return;
  var p = cellFromEvent(e);
  mouseDownPos = {x: e.clientX, y: e.clientY};

  // With no active stamp, clicking a component selects and prepares drag
  if (!activeStamp) {
    var c = compAt(p.row, p.col);
    if (c) {
      selected = c;
      dragging = {comp:c, origRow:c.row, origCol:c.col, offR:p.row-c.row, offC:p.col-c.col};
      dragStarted = false;
      updateProps();
      draw();
    }
  }
}

function onMouseUp(e) {
  var p = cellFromEvent(e);

  // Finalise drag
  if (dragging && dragStarted) {
    var nr = p.row - dragging.offR, nc = p.col - dragging.offC;
    if (canPlace(dragging.comp.type, dragging.comp.rotation, nr, nc, null)) {
      dragging.comp.row = nr;
      dragging.comp.col = nc;
    } else {
      dragging.comp.row = dragging.origRow;
      dragging.comp.col = dragging.origCol;
    }
    placeOnGrid(dragging.comp);
    dragging = null; dragStarted = false; mouseDownPos = null;
    draw();
    return;
  }

  // Click (no drag) on component — already selected in mousedown
  if (dragging && !dragStarted) {
    dragging = null; dragStarted = false; mouseDownPos = null;
    draw();
    return;
  }

  // Stamp placement
  if (activeStamp) {
    if (p.row >= 0 && p.row < gridRows && p.col >= 0 && p.col < gridCols) {
      if (canPlace(activeStamp, activeRot, p.row, p.col, null)) {
        var c = {id:makeId(activeStamp), type:activeStamp, row:p.row, col:p.col,
                 rotation:activeRot, playerColour:null};
        components.push(c);
        placeOnGrid(c);
        selected = c;
        updateProps();
      }
    }
    mouseDownPos = null;
    draw();
    return;
  }

  // Click empty → deselect
  if (!compAt(p.row, p.col)) {
    selected = null;
    updateProps();
  }
  mouseDownPos = null;
  draw();
}

function onKeyDown(e) {
  var inField = e.target && e.target.closest && e.target.closest('input, select');

  if ((e.key === 'r' || e.key === 'R') && !inField) {
    if (activeStamp) {
      var d = DEFS[activeStamp];
      activeRot = (activeRot + 1) % d.footprints.length;
      updateRotLabel();
      draw();
    }
  }

  if ((e.key === 'Delete' || e.key === 'Backspace') && !inField) {
    if (selected) {
      deleteComp(selected);
      selected = null;
      updateProps();
      draw();
    }
  }

  if (e.key === 'Escape') {
    if (activeStamp) { activeStamp = null; activeRot = 0; refreshPalette(); updateRotLabel(); }
    if (selected) { selected = null; updateProps(); }
    if (dragging) {
      if (dragStarted) {
        dragging.comp.row = dragging.origRow;
        dragging.comp.col = dragging.origCol;
        placeOnGrid(dragging.comp);
      }
      dragging = null; dragStarted = false;
    }
    draw();
  }
}

// ─── Export (Save JSON) ─────────────────────────────────────────────

function exportJSON() {
  var spaces = [];
  var edges = [];
  var positions = [];
  var nodeMap = {}; // 'r,c' → nodeId

  for (var i = 0; i < components.length; i++) {
    var comp = components[i];
    var cells = fp(comp.type, comp.rotation);

    // Roads are barriers, not nodes
    if (comp.type === 'road') continue;

    if (comp.type === 'territory' || comp.type === 'home') {
      // Only yard cells become space nodes
      var yi = 0;
      for (var j = 0; j < cells.length; j++) {
        if (cells[j].sub !== 'yard') continue;
        var r = comp.row + cells[j].dr, c = comp.col + cells[j].dc;
        var nid = comp.id + '_' + yi;
        var node = {id: nid, type: comp.type === 'home' ? 'home' : 'territory'};
        if (comp.type === 'territory') node.facing = FACING_FULL[comp.rotation % 4];
        if (comp.type === 'home' && comp.playerColour) {
          node.playerColour = comp.playerColour;
          node.homeOwner = comp.playerColour;
        }
        spaces.push(node);
        nodeMap[r+','+c] = nid;
        positions.push({id:nid, row:r, col:c});
        yi++;
      }

    } else if (comp.type === 'pathStraight') {
      var c0 = {r:comp.row+cells[0].dr, c:comp.col+cells[0].dc};
      var c1 = {r:comp.row+cells[1].dr, c:comp.col+cells[1].dc};
      var eid = comp.id+'_entry', xid = comp.id+'_exit';
      spaces.push({id:eid, type:'sideStreet'});
      spaces.push({id:xid, type:'sideStreet'});
      nodeMap[c0.r+','+c0.c] = eid;
      nodeMap[c1.r+','+c1.c] = xid;
      positions.push({id:eid, row:c0.r, col:c0.c});
      positions.push({id:xid, row:c1.r, col:c1.c});
      edges.push({from:eid, to:xid, driveCost:1});

    } else if (comp.type === 'pathCorner') {
      var ep = CORNER_ENDPOINTS[comp.rotation % 4];
      var er = comp.row+ep.entry.dr, ec = comp.col+ep.entry.dc;
      var xr = comp.row+ep.exit.dr,  xc = comp.col+ep.exit.dc;
      var eid = comp.id+'_entry', xid = comp.id+'_exit';
      spaces.push({id:eid, type:'sideStreet'});
      spaces.push({id:xid, type:'sideStreet'});
      nodeMap[er+','+ec] = eid;
      nodeMap[xr+','+xc] = xid;
      positions.push({id:eid, row:er, col:ec});
      positions.push({id:xid, row:xr, col:xc});
      edges.push({from:eid, to:xid, driveCost:1});

    } else {
      // sidewalk, intersection, dogPark, waterPark — each cell is a node
      for (var j = 0; j < cells.length; j++) {
        var r = comp.row + cells[j].dr, c = comp.col + cells[j].dc;
        var nid = cells.length > 1 ? comp.id + '_' + j : comp.id;
        var exportType = comp.type;
        if (exportType === 'waterPark') exportType = 'waterSource';
        spaces.push({id:nid, type:exportType});
        nodeMap[r+','+c] = nid;
        positions.push({id:nid, row:r, col:c});
      }
    }
  }

  // Build a fast type lookup
  var typeOf = {};
  for (var s = 0; s < spaces.length; s++) typeOf[spaces[s].id] = spaces[s].type;

  // Adjacency-based edges
  var CONNECT = {
    'sidewalk':    ['sidewalk','intersection','territory','home','dogPark','waterSource','sideStreet'],
    'intersection':['sidewalk','intersection'],
    'territory':   ['sidewalk'],
    'home':        ['sidewalk'],
    'dogPark':     ['sidewalk'],
    'waterSource': ['sidewalk'],
    'sideStreet':  ['sidewalk']
  };
  var edgeSeen = {};
  var DIRS = [[0,1],[0,-1],[1,0],[-1,0]];

  for (var p = 0; p < positions.length; p++) {
    var pos = positions[p];
    var nt = typeOf[pos.id];
    var allowed = CONNECT[nt];
    if (!allowed) continue;
    for (var d = 0; d < DIRS.length; d++) {
      var nk = (pos.row+DIRS[d][0])+','+(pos.col+DIRS[d][1]);
      var nid = nodeMap[nk];
      if (!nid) continue;
      var nnt = typeOf[nid];
      if (allowed.indexOf(nnt) < 0) continue;
      var ek = [pos.id, nid].sort().join('|');
      if (edgeSeen[ek]) continue;
      edgeSeen[ek] = true;
      edges.push({from:pos.id, to:nid, driveCost:0});
    }
  }

  // Mid-block road crossings: walk through road cells to find sidewalk on other side
  for (var p = 0; p < positions.length; p++) {
    var pos = positions[p];
    if (typeOf[pos.id] !== 'sidewalk') continue;
    for (var d = 0; d < DIRS.length; d++) {
      var dr = DIRS[d][0], dc = DIRS[d][1];
      var cr = pos.row + dr, cc = pos.col + dc;
      var crossed = false;
      while (cr >= 0 && cr < gridRows && cc >= 0 && cc < gridCols) {
        var g = grid[cr] && grid[cr][cc];
        if (!g) break;
        if (g.comp.type === 'road') { crossed = true; cr += dr; cc += dc; }
        else if (g.comp.type === 'intersection') { crossed = false; break; }
        else break;
      }
      if (!crossed) continue;
      var farId = nodeMap[cr+','+cc];
      if (farId && typeOf[farId] === 'sidewalk') {
        var ek = [pos.id, farId].sort().join('|');
        if (!edgeSeen[ek]) {
          edgeSeen[ek] = true;
          edges.push({from:pos.id, to:farId, driveCost:1});
        }
      }
    }
  }

  // Component-level data for round-trip reload
  var compData = [];
  for (var i = 0; i < components.length; i++) {
    var c = components[i];
    compData.push({id:c.id, type:c.type, row:c.row, col:c.col,
                   rotation:c.rotation, playerColour:c.playerColour||undefined});
  }

  return {
    spaces: spaces,
    edges: edges,
    _positions: positions,
    _grid: {cols:gridCols, rows:gridRows, components:compData}
  };
}

function saveJSON() {
  var data = exportJSON();
  var name = prompt('Board name:', 'board-01');
  if (!name) return;
  var blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

// ─── Import (Load JSON) ────────────────────────────────────────────

function loadJSON() {
  document.getElementById('file-input').click();
}

function onFileLoad(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    try { importJSON(JSON.parse(ev.target.result)); }
    catch (err) { alert('Failed to load: ' + err.message); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function importJSON(data) {
  if (!data._grid || !data._grid.components) {
    alert('This file does not contain board builder layout data.');
    return;
  }
  gridCols = data._grid.cols || 22;
  gridRows = data._grid.rows || 19;
  document.getElementById('grid-cols').value = gridCols;
  document.getElementById('grid-rows').value = gridRows;
  initGrid(gridCols, gridRows);
  resizeCanvas();
  components = [];
  nextIdNum = 0;
  selected = null;

  var list = data._grid.components;
  for (var i = 0; i < list.length; i++) {
    var d = list[i];
    var c = {id:d.id, type:d.type, row:d.row, col:d.col,
             rotation:d.rotation||0, playerColour:d.playerColour||null};
    var num = parseInt(c.id.replace(/[^0-9]/g,''), 10);
    if (!isNaN(num) && num > nextIdNum) nextIdNum = num;
    if (canPlace(c.type, c.rotation, c.row, c.col, null)) {
      components.push(c);
      placeOnGrid(c);
    }
  }
  updateProps();
  draw();
}

// ─── Grid Resize ────────────────────────────────────────────────────

function applyResize() {
  var nc = parseInt(document.getElementById('grid-cols').value, 10) || 22;
  var nr = parseInt(document.getElementById('grid-rows').value, 10) || 19;
  var keep = [];
  for (var i = 0; i < components.length; i++) {
    var c = components[i], cells = fp(c.type, c.rotation), fits = true;
    for (var j = 0; j < cells.length; j++) {
      if (c.row + cells[j].dr >= nr || c.col + cells[j].dc >= nc) { fits = false; break; }
    }
    if (fits) keep.push(c);
  }
  initGrid(nc, nr);
  components = keep;
  for (var i = 0; i < components.length; i++) placeOnGrid(components[i]);
  selected = null;
  resizeCanvas();
  updateProps();
  draw();
}

// ─── Clear ──────────────────────────────────────────────────────────

function clearBoard() {
  if (!confirm('Clear the entire board?')) return;
  initGrid(gridCols, gridRows);
  components = [];
  nextIdNum = 0;
  selected = null;
  updateProps();
  draw();
}

// ─── Initialisation ─────────────────────────────────────────────────

function init() {
  canvas = document.getElementById('board-canvas');
  ctx = canvas.getContext('2d');
  initGrid(gridCols, gridRows);
  resizeCanvas();
  buildPalette();
  draw();

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('mouseleave', function() {
    hoverR = -1; hoverC = -1;
    if (dragging && dragStarted) {
      dragging.comp.row = dragging.origRow;
      dragging.comp.col = dragging.origCol;
      placeOnGrid(dragging.comp);
      dragging = null; dragStarted = false;
    }
    draw();
  });

  document.addEventListener('keydown', onKeyDown);
  document.getElementById('btn-save').addEventListener('click', saveJSON);
  document.getElementById('btn-load').addEventListener('click', loadJSON);
  document.getElementById('btn-clear').addEventListener('click', clearBoard);
  document.getElementById('btn-resize').addEventListener('click', applyResize);
  document.getElementById('file-input').addEventListener('change', onFileLoad);
}

document.addEventListener('DOMContentLoaded', init);
