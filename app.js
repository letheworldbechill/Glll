const content = document.getElementById('content');

document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => load(btn.dataset.page);
});

function load(page) {
  if (page === 'ritual') renderRitual();
  if (page === 'kompass') renderKompass();
  if (page === 'abend') renderAbend();
}

function renderRitual() {
  content.innerHTML = `
    <h1>30-Sekunden Ritual</h1>
    <div id='step'>Bereit?</div>
    <button id='start'>Start</button>
  `;

  const steps = [
    { t: "Ich bin hier. Ich bin sicher.", d: 5000 },
    { t: "Atme: 4 ein • 1 halten • 5 aus", d: 10000 },
    { t: "Lampe. Tür. Tisch. Präsenz.", d: 10000 },
    { t: "Tut das meinem Leben gut?", d: 4000 },
    { t: "Ich gehe dahin, wo mein System atmen kann.", d: 1000 }
  ];

  let i = 0, running = false;
  const stepEl = document.getElementById('step');

  document.getElementById('start').onclick = () => {
    if (running) return;
    running = true;
    i = 0;
    play();
  };

  function play() {
    if (i >= steps.length) {
      stepEl.textContent = "Fertig.";
      running = false;
      return;
    }
    stepEl.textContent = steps[i].t;
    setTimeout(() => { i++; play(); }, steps[i].d);
  }
}

function renderKompass() {
  content.innerHTML = `
    <h1>15-Sekunden Kompass</h1>
    <p>Antworten mit Ja / Nein.</p>
    <div id='q'></div>
    <button id='yes'>Ja</button>
    <button id='no'>Nein</button>
    <div id='res'></div>
  `;

  const qs = [
    "Bin ich körperlich ruhig genug zum Denken?",
    "Reagiere ich auf Jetzt – oder auf Damals?",
    "Bringt mir dieser Gedanke Stabilität?"
  ];

  let i = 0, score = 0;

  const qEl = document.getElementById('q');
  const res = document.getElementById('res');

  qEl.textContent = qs[i];

  function next(ans) {
    if (ans) score++;
    i++;

    if (i >= qs.length) {
      res.textContent = score >= 2 ? "Klarer Kopf." : "Stop. Erst zentrieren.";
      qEl.textContent = "";
      return;
    }

    qEl.textContent = qs[i];
  }

  document.getElementById('yes').onclick = () => next(true);
  document.getElementById('no').onclick = () => next(false);
}

function renderAbend() {
  content.innerHTML = `
    <h1>Abend-Check</h1>
    <p>Wie klar war ich heute?</p>
    <input type='range' min='0' max='10' id='range'>
    <div id='out'></div>
  `;

  const out = document.getElementById('out');

  document.getElementById('range').oninput = e => {
    out.textContent = "Wert: " + e.target.value;
  };
}
