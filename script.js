/**
 * D3.js v7 Treemap Visualization Script
 * Features: Responsive, Zoomable, Breadcrumb, Search, Export (PNG/SVG), Pastel Color Scale, Accessibility.
 * Data is loaded from 'data.json'.
 */

// --- Configuration ---
const CONFIG = {
    MARGIN: { top: 10, right: 10, bottom: 10, left: 10 },
    TRANSITION_DURATION: 750, // Smooth transition time in ms
    FONT_SIZE_MIN: 8,
    FONT_SIZE_MAX: 16,
    // Custom pastel color mapping for up to 5 levels of depth
    COLOR_DEPTH_MAPPING: [
        '--color-pastel-green', // Level 0 (Root)
        '--color-pastel-blue',  // Level 1
        '--color-pastel-pink',  // Level 2
        '--color-pastel-yellow',// Level 3
        '--color-neutral-medium'// Level 4+
    ]
};

// --- DOM Elements ---
const container = document.getElementById('treemap-container');
const breadcrumbContainer = document.getElementById('pathContainer');
const backButton = document.getElementById('backButton');
const searchInput = document.getElementById('searchInput');
const tooltip = d3.select('#treemap-tooltip');
const body = d3.select('body');

let width, height;
let root; // The full hierarchical data root
let currentFocus; // The node currently being viewed/zoomed into

// --- D3 Utilities ---

// 1. Color Scale (Pastel, based on Depth)
const color = d3.scaleOrdinal()
    .domain(d3.range(CONFIG.COLOR_DEPTH_MAPPING.length))
    .range(CONFIG.COLOR_DEPTH_MAPPING.map(v => getComputedStyle(document.documentElement).getPropertyValue(v)));

// Function to update color scale in response to theme change
function updateColorScale() {
    color.range(CONFIG.COLOR_DEPTH_MAPPING.map(v => getComputedStyle(document.documentElement).getPropertyValue(v)));
}

// 2. Treemap Layout
const treemap = d3.treemap()
    .tile(d3.treemapSquarify)
    .round(true)
    .paddingInner(1)
    .paddingOuter(1);

// 3. SVG and Group setup
let svg, g, zoomG;

// --- Main Setup and Data Loading ---

async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setupD3(data);
        setupControls();
    } catch (error) {
        console.error("Error loading or processing data.json:", error);
        container.innerHTML = `<p style="color:var(--color-accent);padding:20px;">Error loading data.json. Check console for details. Ensure the file exists and is in the correct hierarchical format with 'value' fields on leaf nodes.</p>`;
    }
}

function setupD3(data) {
    // 1. Calculate Initial Size
    width = container.clientWidth - CONFIG.MARGIN.left - CONFIG.MARGIN.right;
    height = container.clientHeight - CONFIG.MARGIN.top - CONFIG.MARGIN.bottom;

    // 2. Hierarchical Data Structure
    root = d3.hierarchy(data)
        .sum(d => d.value || 0) // Sum 'value' for treemap sizing
        .sort((a, b) => b.value - a.value);

    // Apply the initial treemap layout
    treemap.size([width, height])(root);

    // 3. Create SVG
    svg = d3.select(container)
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr("viewBox", `0 0 ${width + CONFIG.MARGIN.left + CONFIG.MARGIN.right} ${height + CONFIG.MARGIN.top + CONFIG.MARGIN.bottom}`)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .style("font", "10px sans-serif");

    g = svg.append("g")
        .attr("transform", `translate(${CONFIG.MARGIN.left},${CONFIG.MARGIN.top})`);

    zoomG = g.append("g").attr("class", "zoom-group");

    // 4. Initial Draw and Focus
    currentFocus = root;
    drawTreemap(root);
    updateBreadcrumb(root);
    createLegend();
    
    // 5. Setup Resize Observer for responsiveness
    new ResizeObserver(handleResize).observe(container);
    
    // 6. Theme Toggle Initial State
    const isDarkMode = body.classed('dark-mode');
    d3.select('#moon-icon').style('display', isDarkMode ? 'inline' : 'none');
    d3.select('#sun-icon').style('display', isDarkMode ? 'none' : 'inline');
    updateColorScale(); // Apply initial colors based on current theme
}

// --- Treemap Drawing Logic ---

function drawTreemap(d) {
    const focusNode = d;

    // Calculate position and scale based on the focused node
    const kx = width / (focusNode.x1 - focusNode.x0);
    const ky = height / (focusNode.y1 - focusNode.y0);

    // Use a transition for smooth animation
    const t = svg.transition().duration(CONFIG.TRANSITION_DURATION);

    // 1. Create/Update Node Groups
    const nodes = zoomG.selectAll(".node-group")
        .data(focusNode.descendants(), d => d.data.name + d.depth); 

    // ENTER selection: New nodes
    const nodeEnter = nodes.enter().append("g")
        .attr("class", d => `node-group node-depth-${d.depth}`)
        .attr("transform", d => `translate(${focusNode.x0 * kx}, ${focusNode.y0 * ky})`) // Start position
        .attr("tabindex", d => d.children ? 0 : null) // Make parent nodes keyboard focusable
        .attr("role", "button")
        .attr("aria-label", d => d.children ? `Treemap node: ${d.data.name}. Click to zoom. Value: ${d3.format(",")(d.value)}` : `Treemap node: ${d.data.name}. Value: ${d3.format(",")(d.value)}`);

    // Add Rectangles
    nodeEnter.append("rect")
        .attr("class", "node-rect")
        .attr("fill", d => color(d.depth % CONFIG.COLOR_DEPTH_MAPPING.length)) // Color by depth, looping colors
        .attr("width", 0) 
        .attr("height", 0)
        .style("opacity", 0); 

    // Add Text Labels
    nodeEnter.append("text")
        .attr("class", "node-text")
        .attr("x", 4)
        .attr("y", 14)
        .attr("opacity", 0) 
        .text(d => d.data.name);

    // MERGE ENTER + UPDATE
    const nodeUpdate = nodeEnter.merge(nodes);

    // Transition for position (zoom effect)
    nodeUpdate.transition(t)
        .attr("transform", d => `translate(${(d.x0 - focusNode.x0) * kx}, ${(d.y0 - focusNode.y0) * ky})`)
        .style("opacity", 1); 

    // Transition for Rectangles
    nodeUpdate.select(".node-rect").transition(t)
        .attr("width", d => (d.x1 - d.x0) * kx)
        .attr("height", d => (d.y1 - d.y0) * ky)
        .style("opacity", 1) 
        .attr("fill", d => color(d.depth % CONFIG.COLOR_DEPTH_MAPPING.length)); 

    // Transition for Text Labels
    nodeUpdate.select(".node-text").transition(t)
        .attr("x", d => ((d.x1 - d.x0) * kx / 2)) 
        .attr("y", d => ((d.y1 - d.y0) * ky / 2) + 5) 
        .attr("text-anchor", "middle")
        .style("font-size", d => {
            // Smart font sizing
            const area = (d.x1 - d.x0) * (d.y1 - d.y0);
            const scale = d3.scaleSqrt().domain([root.value * 0.0001, root.value * 0.5]).range([CONFIG.FONT_SIZE_MIN, CONFIG.FONT_SIZE_MAX]).clamp(true);
            const size = scale(area);
            return `${size}px`;
        })
        .attr("opacity", d => {
            // Hide text if the rect is too small
            const rectWidth = (d.x1 - d.x0) * kx;
            const rectHeight = (d.y1 - d.y0) * ky;
            // Only show if wide enough for a few characters and tall enough for one line
            return rectWidth > 50 && rectHeight > 18 && d.depth < focusNode.depth + 3 ? 1 : 0; 
        })
        .text(d => d.data.name.length > 20 && d.depth > 0 ? d.data.name.substring(0, 18) + '...' : d.data.name);

    // EXIT selection
    nodes.exit().transition(t)
        .style("opacity", 0)
        .remove();

    // 2. Add Interaction Handlers (Click-to-Zoom and Hover/Focus)
    nodeUpdate.on("click", (event, d) => {
        event.stopPropagation();
        if (d.children) { // Only zoom into nodes that have children
            zoom(event, d);
        }
    })
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip)
    .on("focus", showTooltip) // Keyboard focus = show tooltip
    .on("blur", hideTooltip); // Keyboard blur = hide tooltip
}

// --- Zoom/Navigation Logic ---

function zoom(event, d) {
    if (d === currentFocus) return; 

    currentFocus = d;
    drawTreemap(d);
    updateBreadcrumb(d);
    // Move keyboard focus to the first child/node in the new view
    const firstNode = zoomG.select('.node-group[tabindex="0"]').node();
    if (firstNode) firstNode.focus(); 
}

function zoomOut() {
    if (currentFocus.parent) {
        zoom(null, currentFocus.parent);
    }
}

// --- Breadcrumb Logic ---

function updateBreadcrumb(d) {
    breadcrumbContainer.innerHTML = '';
    const path = d.ancestors().reverse(); 
    backButton.disabled = !d.parent;

    path.forEach((node, i) => {
        const isCurrent = i === path.length - 1;
        const crumb = document.createElement('span');
        crumb.classList.add('crumb');
        crumb.textContent = node.data.name;
        crumb.tabIndex = 0;
        crumb.setAttribute('role', 'link');

        if (!isCurrent) {
            // Click/Keyboard to zoom to this ancestor node
            d3.select(crumb).on('click', (event) => {
                event.stopPropagation();
                zoom(event, node);
            }).on('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    zoom(event, node);
                }
            });
        }

        breadcrumbContainer.appendChild(crumb);
        if (!isCurrent) {
            const separator = document.createElement('span');
            separator.innerHTML = ' &gt; ';
            separator.classList.add('separator');
            breadcrumbContainer.appendChild(separator);
        }
    });
}

// --- Tooltip Logic ---

function getPathString(d) {
    return d.ancestors().reverse().map(n => n.data.name).join(" / ");
}

function showTooltip(event, d) {
    const path = getPathString(d);
    tooltip.html(`
        <div class="tooltip-title">${d.data.name}</div>
        <div>Value: <strong>${d3.format(",")(d.value)}</strong></div>
        <div class="tooltip-path">Path: ${path}</div>
    `)
    .style("display", "block");
    moveTooltip(event, d);
}

function moveTooltip(event, d) {
    // Position the tooltip near the mouse/touch point
    let x = event.pageX + 10;
    let y = event.pageY - 10;
    
    // Simple boundary check
    if (x + tooltip.node().offsetWidth > window.innerWidth) {
        x = event.pageX - 10 - tooltip.node().offsetWidth;
    }
    
    tooltip.style("left", `${x}px`)
           .style("top", `${y}px`);
}

function hideTooltip() {
    tooltip.style("display", "none");
}

// --- Utility Functions ---

function handleResize() {
    // Debounce the resize operation for smooth responsiveness
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        width = container.clientWidth - CONFIG.MARGIN.left - CONFIG.MARGIN.right;
        height = container.clientHeight - CONFIG.MARGIN.top - CONFIG.MARGIN.bottom;

        if (width <= 0 || height <= 0) return;

        // Update SVG viewBox and internal treemap size
        svg.attr("viewBox", `0 0 ${width + CONFIG.MARGIN.left + CONFIG.MARGIN.right} ${height + CONFIG.MARGIN.top + CONFIG.MARGIN.bottom}`);
        treemap.size([width, height]);
        
        // Re-calculate layout for the entire tree
        treemap(root);

        // Re-draw the focused view
        const focusNode = currentFocus;
        const kx = width / (focusNode.x1 - focusNode.x0);
        const ky = height / (focusNode.y1 - focusNode.y0);

        // Update positions/sizes immediately without a slow transition
        zoomG.selectAll(".node-group").data(focusNode.descendants(), d => d.data.name + d.depth)
            .attr("transform", d => `translate(${(d.x0 - focusNode.x0) * kx}, ${(d.y0 - focusNode.y0) * ky})`)
            .select(".node-rect")
            .attr("width", d => (d.x1 - d.x0) * kx)
            .attr("height", d => (d.y1 - d.y0) * ky);
            
    }, 300); // 300ms debounce
}

// --- Control Setup (Search, Export, Theme) ---

function setupControls() {
    // BACK BUTTON (Zoom Out)
    d3.select(backButton).on('click', zoomOut)
        .on('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                zoomOut();
            }
        });

    // KEYBOARD ESCAPE (Accessibility: Zoom Out)
    d3.select('body').on('keydown', (event) => {
        if (event.key === 'Escape') {
            zoomOut();
        }
    });
    
    // THEME TOGGLE (Light/Dark Mode)
    d3.select('#themeToggle').on('click', function() {
        const isDarkMode = body.classed('dark-mode');
        body.classed('dark-mode', !isDarkMode).classed('light-mode', isDarkMode);
        
        // Update icons and re-draw with new colors
        d3.select('#moon-icon').style('display', !isDarkMode ? 'inline' : 'none');
        d3.select('#sun-icon').style('display', isDarkMode ? 'none' : 'inline');
        
        updateColorScale();
        drawTreemap(currentFocus);
        createLegend(); 
    });

    // SEARCH FUNCTIONALITY (Highlighting)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) {
            zoomG.selectAll('.node-group')
                .classed('highlighted', false)
                .classed('dimmed', false);
            return;
        }
        
        const matches = [];
        root.each(d => {
            if (d.data.name.toLowerCase().includes(query)) {
                matches.push(d);
            }
        });

        // Highlight matches and dim non-matches
        zoomG.selectAll('.node-group')
            .classed('highlighted', d => matches.includes(d))
            .classed('dimmed', d => !matches.includes(d) && matches.length > 0);
    });

    // EXPORT BUTTONS
    d3.select('#exportSvgBtn').on('click', () => exportTreemap('svg'));
    d3.select('#exportPngBtn').on('click', () => exportTreemap('png'));
}

function createLegend() {
    const legendContainer = d3.select('#legendContainer');
    legendContainer.html(''); // Clear existing legend

    CONFIG.COLOR_DEPTH_MAPPING.forEach((cssVar, depth) => {
        if (depth >= root.height + 1) return; 

        const colorValue = getComputedStyle(document.documentElement).getPropertyValue(cssVar);
        
        const item = legendContainer.append('div')
            .attr('class', 'legend-item');

        item.append('div')
            .attr('class', 'legend-color')
            .style('background-color', colorValue);

        item.append('span')
            .text(`Level ${depth + 1}: ${depth === 0 ? 'Root' : depth === root.height ? 'Leaf Nodes' : 'Category'}`);
    });
}


// Function to download the visualization as SVG or PNG
function exportTreemap(format) {
    const svgElement = container.querySelector('svg');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const filename = 'treemap_visualization.' + format;

    if (format === 'svg') {
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (format === 'png') {
        const canvas = document.createElement('canvas');
        const bbox = svgElement.getBBox();
        canvas.width = bbox.width;
        canvas.height = bbox.height;
        const ctx = canvas.getContext('2d');
        
        // Add current background color (supports light/dark mode)
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-secondary');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        const svg64 = btoa(unescape(encodeURIComponent(svgString))); 
        const image64 = 'data:image/svg+xml;base64,' + svg64;

        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = filename;
            link.href = pngFile;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = image64;
    }
}

// --- Initialize ---
loadData();
