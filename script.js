// Demo D3 tree (replace data with your project's tree-map)
const data = {
  "name":"Linux Mastery",
  "children":[
    {"name":"System Admin", "children":[{"name":"Networking"},{"name":"Security"},{"name":"Users"}]},
    {"name":"Development", "children":[{"name":"Scripting"},{"name":"Containers"},{"name":"CI/CD"}]},
    {"name":"Tools", "children":[{"name":"Monitoring"},{"name":"Automation"},{"name":"Debugging"}]}
  ]
};

const width = document.querySelector('.visualization').clientWidth;
const height = document.querySelector('.visualization').clientHeight;

const svg = d3.select("#vis").append("svg")
  .attr("width", "100%")
  .attr("height", height)
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio","xMidYMid meet");

const g = svg.append("g").attr("transform", "translate(40,40)");

const root = d3.hierarchy(data);
const treeLayout = d3.tree().size([height-120, width-160]);
treeLayout(root);

// links
g.selectAll(".link")
  .data(root.links())
  .join("path")
  .attr("class","link")
  .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x))
  .attr("fill","none")
  .attr("stroke","rgba(255,255,255,0.12)")
  .attr("stroke-width",1.2);

// nodes
const node = g.selectAll(".node")
  .data(root.descendants())
  .join("g")
  .attr("transform", d => `translate(${d.y},${d.x})`);

node.append("circle")
  .attr("r", 6)
  .attr("fill", (d,i) => i===0 ? "#fff" : "#4da6ff");

node.append("text")
  .attr("dy", "0.32em")
  .attr("x", d => d.children ? -10 : 10)
  .attr("text-anchor", d => d.children ? "end" : "start")
  .text(d => d.data.name)
  .attr("fill","white")
  .style("font-size","12px");

// Responsive on resize
window.addEventListener('resize', () => {
  const w = document.querySelector('.visualization').clientWidth;
  const h = document.querySelector('.visualization').clientHeight;
  svg.attr("viewBox", `0 0 ${w} ${h}`);
});

// Toggle theme (simple invert)
document.getElementById('toggleTheme').addEventListener('click', () => {
  const root = document.documentElement;
  if (root.style.getPropertyValue('--bg') === '#fff') {
    root.style.setProperty('--bg', '#000');
    root.style.setProperty('--fg', '#fff');
    root.style.setProperty('--muted', '#bbb');
  } else {
    root.style.setProperty('--bg', '#fff');
    root.style.setProperty('--fg', '#000');
    root.style.setProperty('--muted', '#444');
  }
  document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg');
});
