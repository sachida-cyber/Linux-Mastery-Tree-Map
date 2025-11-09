/* script.js — D3 v7 tree + interactions for Linux Mastery Pro
   Expects global DATA object from data.js
*/

(() => {
  // GLOBALS
  let root, treeLayout, svg, g, zoom, duration = 350;
  let nodeIdCounter = 0;
  let selectedNode = null;

  // adaptive sizing
  function getDimensions(){
    const container = document.getElementById('canvasWrapper');
    return { width: container.clientWidth, height: container.clientHeight };
  }

  // initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Basic sanity: DATA must exist
    if (typeof DATA === 'undefined') {
      document.getElementById('detailsContent').innerHTML = '<h3>Error</h3><p>data.js not loaded — make sure data.js is included.</p>';
      return;
    }
    initializeTree();
    populateExplanationsList();
    setupEventListeners();
  });

  // Init tree and SVG
  function initializeTree(){
    const dims = getDimensions();
    svg = d3.select('#tree-svg')
      .attr('width', dims.width)
      .attr('height', dims.height)
      .attr('role','tree')
      .attr('tabindex',0);

    // setup zoom
    zoom = d3.zoom()
      .scaleExtent([0.2, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom).on("dblclick.zoom", null);

    // container group
    g = svg.append('g').attr('transform', `translate(120,${dims.height / 2})`);

    // tree layout
    treeLayout = d3.tree()
      .size([dims.height - 120, dims.width - 360])
      .separation((a,b) => (a.parent === b.parent ? 1 : 1.2));

    // create hierarchy
    root = d3.hierarchy(DATA, d => d.children);
    root.x0 = dims.height / 2;
    root.y0 = 0;
    // assign ids and collapse deep nodes
    root.each((d,i) => {
      d.id = ++nodeIdCounter;
      d._children = d.children;
      if (d.depth > 2) d.children = null; // lazy collapse deep levels
    });

    update(root);
    // initial zoom to center
    svg.call(zoom.transform, d3.zoomIdentity.translate(120, dims.height/2).scale(1));
  }

  // diagonal path
  function diagonal(s, d){
    return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
  }

  // update tree
  function update(source){
    const dims = getDimensions();
    treeLayout.size([dims.height - 120, dims.width - 360]);
    const treeData = treeLayout(root);
    const nodes = treeData.descendants();
    const links = treeData.links();

    nodes.forEach(d => d.y = d.depth * 200);

    // NODES
    const node = g.selectAll('g.node').data(nodes, d => d.id);

    const nodeEnter = node.enter().append('g')
      .attr('class','node')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('tabindex', 0)
      .attr('role','treeitem')
      .attr('aria-label', d => `${d.data.name}: ${d.data.short || d.data.type}`)
      .on('click', (event,d) => {
        handleNodeActivation(d);
      })
      .on('keydown', (event,d) => {
        handleKeyNav(event,d);
      })
      .on('mouseenter', (event,d) => showTooltip(event,d))
      .on('mouseleave', hideTooltip);

    nodeEnter.append('circle')
      .attr('r', 0)
      .style('fill', d => circleFill(d))
      .style('stroke', '#041226');

    nodeEnter.append('text')
      .attr('dy','0.32em')
      .attr('x', d => d._children || d.children ? -12 : 12)
      .attr('text-anchor', d => d._children || d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .style('fill-opacity', 0);

    // merge
    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition().duration(duration)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('circle').transition().duration(duration).attr('r', 8).style('fill', d => circleFill(d));
    nodeUpdate.select('text').transition().duration(duration).style('fill-opacity', 1);

    // exit
    const nodeExit = node.exit().transition().duration(duration)
      .attr('transform', d => `translate(${source.y},${source.x})`)
      .remove();
    nodeExit.select('circle').attr('r',0);
    nodeExit.select('text').style('fill-opacity',0);

    // LINKS
    const link = g.selectAll('path.link').data(links, d => d.target.id);
    const linkEnter = link.enter().insert('path','g').attr('class','link')
      .attr('d', d => {
        const o = {x: source.x0, y: source.y0};
        return diagonal(o,o);
      })
      .style('fill','none')
      .style('stroke','rgba(150,200,255,0.12)')
      .style('stroke-width','1.6px');

    linkEnter.merge(link).transition().duration(duration).attr('d', d => diagonal(d.source, d.target));
    link.exit().transition().duration(duration).attr('d', d => {
      const o = {x: source.x, y: source.y};
      return diagonal(o,o);
    }).remove();

    // store old positions
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // choose circle fill by node type
  function circleFill(d){
    const t = (d.data.type || '').toLowerCase();
    if (t === 'root' || d.depth === 0) return 'url(#gradRoot)';
    if (t === 'category') return getComputedStyle(document.documentElement).getPropertyValue('--node-cat') || '#1bbf7a';
    if (t === 'command') return getComputedStyle(document.documentElement).getPropertyValue('--node-cmd') || '#ff9f43';
    // default
    return d._children ? '#4da6ff' : '#238636';
  }

  // toggle children
  function toggle(d){
    if (d.children){
      d._children = d.children; d.children = null;
    } else {
      d.children = d._children; d._children = null;
    }
  }

  function handleNodeActivation(d){
    if (d.children || d._children) {
      toggle(d);
      update(d);
    }
    showDetails(d.data);
    highlightNode(d);
  }

  // keyboard nav
  function handleKeyNav(event,d){
    const visible = root.descendants().filter(n => {
      let p = n.parent;
      while (p){
        if (!p.children) return false;
        p = p.parent;
      }
      return true;
    });
    const idx = visible.findIndex(n => n.id === d.id);
    switch(event.key){
      case 'Enter':
      case ' ':
        event.preventDefault(); handleNodeActivation(d); break;
      case 'ArrowUp':
        event.preventDefault(); if (idx>0) focusNode(visible[idx-1]); break;
      case 'ArrowDown':
        event.preventDefault(); if (idx<visible.length-1) focusNode(visible[idx+1]); break;
      case 'ArrowRight':
        event.preventDefault(); if (d._children){ toggle(d); update(d); } else if (d.children && d.children.length) focusNode(d.children[0]); break;
      case 'ArrowLeft':
        event.preventDefault(); if (d.children){ toggle(d); update(d); } else if (d.parent) focusNode(d.parent); break;
    }
  }

  function focusNode(d){
    // focus DOM
    g.selectAll('g.node').filter(n => n.id === d.id).node()?.focus();
    showDetails(d.data);
    highlightNode(d);
    // also bring into view by zoom transform
    try {
      const svgNode = document.getElementById('tree-svg');
      const bbox = d3.select(g.node().querySelectorAll('g.node')[0]) // fallback
    } catch(e){}
  }

  // tooltip
  function showTooltip(event,d){
    const tt = document.getElementById('tooltip');
    const data = d.data;
    let html = `<strong>${escapeHtml(data.name)}</strong>`;
    if (data.short && data.short !== '-') html += `<div style="margin-top:6px;color:#b8eefd">${escapeHtml(data.short)}</div>`;
    if (data.usage && data.usage !== '-') {
      const first = data.usage.split('\n')[0];
      html += `<div style="margin-top:6px;font-family:monospace;color:#cfffe6">${escapeHtml(first)}</div>`;
    }
    tt.innerHTML = html;
    tt.classList.add('visible');
    const x = event.pageX + 14;
    const y = event.pageY + 14;
    tt.style.left = x + 'px';
    tt.style.top = y + 'px';
  }

  function hideTooltip(){
    const tt = document.getElementById('tooltip');
    tt.classList.remove('visible');
  }

  // details panel
  function showDetails(data){
    const content = document.getElementById('detailsContent');
    const type = data.type || 'item';
    let html = `<h3>${escapeHtml(data.name)}</h3><span class="type-badge">${escapeHtml(type)}</span>`;
    if (data.short && data.short !== '-') html += `<p class="short-desc">${escapeHtml(data.short)}</p>`;
    if (data.install && data.install !== '-') html += `<h4>📦 Install</h4><div class="install-cmd">${escapeHtml(data.install)}</div>`;
    if (data.usage && data.usage !== '-') html += `<h4>💡 Usage</h4><div class="usage-cmd">${escapeHtml(data.usage).replace(/\n/g,'<br>')}</div>`;
    content.innerHTML = html;
    scrollToExplanation(data.name);
  }

  // explanations list
  function populateExplanationsList(){
    const list = document.getElementById('explanationsList');
    list.innerHTML = '';
    const items = [];
    function collect(n){
      if (n.type && n.type.toLowerCase() === 'command') items.push(n);
      if (n.children) n.children.forEach(c => collect(c));
    }
    collect(DATA);
    // sort alphabetically
    items.sort((a,b) => a.name.localeCompare(b.name));
    items.forEach(it => {
      const el = document.createElement('div');
      el.className = 'explanation-item';
      el.dataset.name = it.name;
      el.innerHTML = `<strong>${escapeHtml(it.name)}</strong><p>${escapeHtml(it.short || '')}</p>`;
      el.addEventListener('click', () => findAndSelectNode(it.name));
      list.appendChild(el);
    });
  }

  function scrollToExplanation(name){
    const items = document.querySelectorAll('.explanation-item');
    items.forEach(i => {
      if (i.dataset.name === name){
        i.classList.add('highlighted');
        i.scrollIntoView({behavior:'smooth',block:'nearest'});
      } else {
        i.classList.remove('highlighted');
      }
    });
  }

  function findAndSelectNode(name){
    let found = null;
    root.each(d => {
      if (d.data.name === name) found = d;
    });
    if (!found) return;
    // expand path
    let cur = found.parent;
    while (cur){
      if (!cur.children) { cur.children = cur._children; cur._children = null; }
      cur = cur.parent;
    }
    update(root);
    showDetails(found.data);
    highlightNode(found);
  }

  function highlightNode(d){
    g.selectAll('g.node').classed('highlighted', false);
    g.selectAll('circle').classed('selected', false);
    g.selectAll('g.node').filter(n => n.id === d.id).classed('highlighted', true).select('circle').classed('selected', true);
    selectedNode = d;
  }

  // search
  function searchQuery(q){
    q = q.trim().toLowerCase();
    if (!q) {
      g.selectAll('g.node').classed('dimmed', false).classed('highlighted', false);
      return;
    }
    const matches = [];
    root.each(d => {
      const name = (d.data.name || '').toLowerCase();
      const short = (d.data.short || '').toLowerCase();
      if (name.includes(q) || short.includes(q)){
        matches.push(d);
        // expand path
        let cur = d.parent;
        while (cur){
          if (!cur.children) { cur.children = cur._children; cur._children = null; }
          cur = cur.parent;
        }
      }
    });
    update(root);
    g.selectAll('g.node').classed('highlighted', d => matches.includes(d)).classed('dimmed', d => !matches.includes(d) && matches.length > 0);
    if (matches.length) { showDetails(matches[0].data); scrollToExplanation(matches[0].data.name); }
  }

  // event listeners
  function setupEventListeners(){
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('expandAll').addEventListener('click', expandAll);
    document.getElementById('collapseAll').addEventListener('click', collapseAll);
    document.getElementById('resetView').addEventListener('click', resetView);
    document.getElementById('exportJson').addEventListener('click', exportJson);

    document.getElementById('searchInput').addEventListener('input', (e) => {
      searchQuery(e.target.value);
    });
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
      if (e.key === 'Escape'){ e.target.value=''; searchQuery(''); }
    });

    // resize
    window.addEventListener('resize', () => {
      // recalc svg size
      const dims = getDimensions();
      d3.select('#tree-svg').attr('width', dims.width).attr('height', dims.height);
      update(root);
    });

    // keyboard focus for svg
    document.getElementById('tree-svg').addEventListener('keydown', (e) => {
      if (!selectedNode) return;
      handleKeyNav(e, selectedNode);
    });
  }

  // utilities
  function expandAll(){
    root.each(d => { if (d._children) { d.children = d._children; d._children = null; }});
    update(root);
  }
  function collapseAll(){
    root.each(d => {
      if (d.children && d.depth > 1){
        d._children = d.children; d.children = null;
      }
    });
    update(root);
  }
  function resetView(){
    const dims = getDimensions();
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(120, dims.height/2).scale(1));
  }
  function exportJson(){
    const dataStr = JSON.stringify(DATA, null, 2);
    const blob = new Blob([dataStr], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'linux-mastery-pro.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function toggleTheme(){
    document.body.classList.toggle('light-theme');
  }

  // small escape
  function escapeHtml(s){ if (!s) return ''; return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

})();
