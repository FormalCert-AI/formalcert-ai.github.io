(() => {
  const regionInput = document.getElementById('region-size');
  const alphaInput = document.getElementById('violation-tolerance');
  const region = document.getElementById('certified-region');
  const contour = document.getElementById('inner-contour');
  const trajectory = document.getElementById('example-trajectory');
  const start = document.getElementById('trajectory-start');
  const samples = document.getElementById('plot-samples');
  let task = 'invariance';
  const beta = 0.05;

  function update() {
    const measure = Number(regionInput.value) / 100;
    const alpha = Number(alphaInput.value) / 100;
    const bound = Math.max(0, 1 - alpha / measure);
    const radius = Math.sqrt(measure / Math.PI);
    const rx = 472 * radius;
    const ry = 310 * radius;
    region.setAttribute('rx', rx);
    region.setAttribute('ry', ry);
    contour.setAttribute('rx', rx * 0.6);
    contour.setAttribute('ry', ry * 0.6);
    document.getElementById('region-value').textContent = `${Math.round(measure * 100)}%`;
    document.getElementById('alpha-value').textContent = `${(alpha * 100).toFixed(1)}%`;
    document.getElementById('bound-value').textContent = bound > 0 ? `≥ ${(bound * 100).toFixed(1)}%` : 'No positive bound';
    document.getElementById('bound-value').style.fontSize = bound > 0 ? '' : '30px';
    document.getElementById('bound-fill').style.width = `${bound * 100}%`;
    document.getElementById('bound-formula').textContent = `max(0, 1 − α / μ) = max(0, 1 − ${alpha.toFixed(3)} / ${measure.toFixed(2)})`;
    document.getElementById('sample-budget').textContent = `N ≥ ${Math.ceil((2 / alpha) * (Math.log(1 / beta) + 1)).toLocaleString('en-US')}`;

    // Uniform dot lattice visualizes reference measure, not certification samples.
    samples.replaceChildren();
    for (let x = -0.9; x <= 0.91; x += 0.18) {
      for (let y = -0.9; y <= 0.91; y += 0.18) {
        if (x * x + y * y >= 0.86) continue;
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', 280 + x * rx);
        dot.setAttribute('cy', 200 + y * ry);
        dot.setAttribute('r', 1.7);
        samples.append(dot);
      }
    }
    const points = Array.from({ length: 96 }, (_, i) => {
      const t = i / 95;
      const angle = 2.6 + t * Math.PI * 2.15;
      const r = task === 'reach' ? 0.86 * (1 - t) : 0.84 - 0.48 * t;
      return [280 + rx * r * Math.cos(angle), 200 + ry * r * Math.sin(angle)];
    });
    trajectory.setAttribute('d', points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' '));
    start.setAttribute('cx', points[0][0]);
    start.setAttribute('cy', points[0][1]);
  }

  regionInput.addEventListener('input', update);
  alphaInput.addEventListener('input', update);
  document.querySelectorAll('[data-task]').forEach(button => {
    button.addEventListener('click', () => {
      task = button.dataset.task;
      document.querySelectorAll('[data-task]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.getElementById('target-marker').toggleAttribute('hidden', task !== 'reach');
      document.getElementById('phase-title').textContent = task === 'reach' ? 'Illustrative multi-step reach-avoid region' : 'Illustrative multi-step invariant region';
      document.getElementById('task-description').innerHTML = task === 'reach'
        ? 'Reach-avoid: reach the target within k<sub>max</sub> steps and remain in the certified region until arrival.'
        : 'Invariance: remain in the certified region over the next k<sub>max</sub> steps.';
      update();
    });
  });
  update();

  const tabs = Array.from(document.querySelectorAll('[data-panel]'));
  function selectTab(button, focus = false) {
    tabs.forEach(tab => {
      const active = tab === button;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.dataset.panel).hidden = !active;
    });
    if (focus) button.focus();
  }
  tabs.forEach((button, index) => {
    button.addEventListener('click', () => selectTab(button));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next], true);
    });
  });
})();
