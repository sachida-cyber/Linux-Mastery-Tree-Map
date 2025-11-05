
function render(data, filter='') {
  const content = document.getElementById('content');
  content.innerHTML = '';
  const f = filter.trim().toLowerCase();
  for (const [topic, cmds] of Object.entries(data)) {
    // filter topic or commands
    const matchesTopic = topic.toLowerCase().includes(f);
    const filteredCmds = cmds.filter(c => c.toLowerCase().includes(f));
    if (f && !matchesTopic && filteredCmds.length === 0) continue;
    const card = document.createElement('div');
    card.className = 'card';
    const h = document.createElement('h3');
    h.textContent = topic;
    const ul = document.createElement('ul');
    const list = (f ? filteredCmds : cmds);
    for (const cmd of list) {
      const li = document.createElement('li');
      li.textContent = cmd;
      li.onclick = () => showDetails(topic, cmd);
      ul.appendChild(li);
    }
    card.appendChild(h);
    card.appendChild(ul);
    content.appendChild(card);
  }
}
function showDetails(topic, cmd) {
  alert(topic + ' → ' + cmd + '\n\nOpen the original project for detailed examples.');
}
document.getElementById('search').addEventListener('input', (e)=>{
  render(DATA, e.target.value);
});
// initial render
render(DATA);
