/* ================= Campo de estrelas ================= */
(() => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, stars = [], shooters = [], scrollY = 0, mouse = { x: 0, y: 0 };
  const COLORS = ["#ffffff", "#cfe3ff", "#ffe9c7", "#e3d6ff", "#bfe0ff"];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.round((innerWidth * innerHeight) / 2600);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.9 + 0.1, // profundidade (parallax)
      r: (Math.random() ** 3 * 1.6 + 0.3) * dpr,
      tw: Math.random() * Math.PI * 2,
      ts: 0.5 + Math.random() * 1.5,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
  }

  function spawnShooter() {
    shooters.push({
      x: Math.random() * w * 0.8 + w * 0.2,
      y: Math.random() * h * 0.4,
      vx: -(6 + Math.random() * 6) * dpr,
      vy: (2.5 + Math.random() * 3) * dpr,
      life: 1,
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const sy = scrollY * dpr;
    for (const s of stars) {
      const px = s.x + mouse.x * s.z * 18 * dpr;
      let py = (s.y - sy * s.z * 0.25) % h;
      if (py < 0) py += h;
      const a = reduce ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(s.tw + t * 0.001 * s.ts));
      ctx.globalAlpha = a * (0.4 + s.z * 0.6);
      ctx.fillStyle = s.c;
      ctx.beginPath();
      ctx.arc(px, py, s.r * (0.6 + s.z * 0.6), 0, Math.PI * 2);
      ctx.fill();
      if (s.r > 1.4 * dpr) { // brilho em cruz nas estrelas grandes
        ctx.globalAlpha = a * 0.35;
        ctx.fillRect(px - s.r * 3, py - 0.4 * dpr, s.r * 6, 0.8 * dpr);
        ctx.fillRect(px - 0.4 * dpr, py - s.r * 3, 0.8 * dpr, s.r * 6);
      }
    }
    for (const m of shooters) {
      const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
      g.addColorStop(0, `rgba(255,255,255,${m.life})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.globalAlpha = 1;
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6 * dpr;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
      ctx.stroke();
      m.x += m.vx; m.y += m.vy; m.life -= 0.012;
    }
    shooters = shooters.filter((m) => m.life > 0);
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", resize);
  addEventListener("scroll", () => { scrollY = window.scrollY; if (reduce) draw(0); }, { passive: true });
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX / innerWidth - 0.5;
    mouse.y = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  if (!reduce) setInterval(() => Math.random() < 0.6 && spawnShooter(), 3500);
  requestAnimationFrame(draw);
})();

/* ================= Render de conteúdo ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const STATUS = { live: ["no ar", ""], dev: ["em desenvolvimento", "dev"], done: ["concluído", "done"] };

$("#projects").innerHTML = PROJECTS.map((p) => {
  const [label, cls] = STATUS[p.status] || STATUS.done;
  const links = [
    p.links.live && `<a href="${esc(p.links.live)}" target="_blank" rel="noopener">Ver ao vivo ↗</a>`,
    p.links.code && `<a href="${esc(p.links.code)}" target="_blank" rel="noopener">Código ↗</a>`,
  ].filter(Boolean).join("");
  return `
  <article class="card reveal${p.featured ? " featured" : ""}" data-tags="${p.tags.join(" ")}">
    <div class="card-top mono"><span class="status"><span class="dot ${cls}"></span>${label}</span><span>${esc(p.year)}</span></div>
    <h3>${esc(p.title)}</h3>
    <span class="tagline">${esc(p.tagline)}</span>
    <p>${esc(p.desc)}</p>
    <div class="pills">${p.stack.map((s) => `<span class="pill">${esc(s)}</span>`).join("")}</div>
    ${links ? `<div class="card-links">${links}</div>` : ""}
  </article>`;
}).join("");

$("#designs-grid").innerHTML = DESIGNS.map((d) => `
  <a class="design reveal" href="${esc(d.url)}" target="_blank" rel="noopener">
    <div class="cover ${d.image ? "" : "gen"}" style="--h:${d.hue ?? 260}">
      ${d.image ? `<img src="${esc(d.image)}" alt="Capa de ${esc(d.title)}" loading="lazy" />`
                : `<span class="planet"></span><span class="ring"></span>`}
      ${d.pages ? `<span class="pg">${d.pages} páginas</span>` : ""}
    </div>
    <div class="design-body">
      <span class="kind">${esc(d.kind)}</span>
      <h3>${esc(d.title)}</h3>
      <p>${esc(d.desc)}</p>
      <span class="open">Abrir no Canva ↗</span>
    </div>
  </a>`).join("");

$("#stack-grid").innerHTML = STACK.map((g) => `
  <div class="stack-card reveal">
    <h3><span class="ico">${g.icon}</span>${esc(g.group)}</h3>
    <ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>`).join("");

const TYPE = { work: "trabalho", edu: "formação", future: "aberto" };
$("#timeline").innerHTML = TIMELINE.map((t) => `
  <li class="t-item reveal ${t.type}">
    <span class="t-period">${esc(t.period)}</span>
    <div class="t-body">
      <h3>${esc(t.title)}<span class="badge">${TYPE[t.type]}</span></h3>
      <div class="t-place">${esc(t.place)}</div>
      <p>${esc(t.desc)}</p>
    </div>
  </li>`).join("");

/* Certificados com abas */
function renderCerts(tab) {
  const list = CERTS.filter((c) => c.status === tab);
  $("#certs").innerHTML = list.length ? list.map((c, i) => {
    if (c.status === "futuro") return `
      <div class="cert future" style="animation-delay:${i * 70}ms">
        <span class="patch">+</span><h3>Espaço reservado</h3><span class="issuer">Novo certificado em breve</span>
      </div>`;
    const foot = c.status === "andamento"
      ? `<div class="bar"><i></i></div>`
      : c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">Ver credencial ↗</a>` : "";
    return `
      <div class="cert" style="animation-delay:${i * 70}ms">
        ${c.image ? `<img src="${esc(c.image)}" alt="Certificado ${esc(c.title)}" style="border-radius:10px" />` : `<span class="patch">${c.status === "andamento" ? "◔" : "✦"}</span>`}
        <h3>${esc(c.title)}</h3>
        <span class="issuer">${esc(c.issuer)}${c.year ? " · " + esc(c.year) : ""}</span>
        ${foot}
      </div>`;
  }).join("") : `<p class="mono" style="color:var(--dim)">Nada aqui ainda.</p>`;
}
document.querySelectorAll(".tab").forEach((btn) => btn.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((b) => { b.classList.toggle("active", b === btn); b.setAttribute("aria-selected", b === btn); });
  renderCerts(btn.dataset.tab);
}));
renderCerts("concluido");

/* Filtro de projetos */
document.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", () => {
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
  const f = chip.dataset.filter;
  document.querySelectorAll("#projects .card").forEach((card) => {
    card.classList.toggle("hide", f !== "all" && !card.dataset.tags.split(" ").includes(f));
  });
}));

/* Brilho que segue o mouse nos cards */
document.addEventListener("pointermove", (e) => {
  const card = e.target.closest?.(".card");
  if (!card) return;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - r.left}px`);
  card.style.setProperty("--my", `${e.clientY - r.top}px`);
});

/* Reveal ao rolar + contadores */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  io.unobserve(en.target);
}), { threshold: 0.12 });
document.querySelectorAll(".reveal, .sec-head, .about-text, .about-photos").forEach((el) => {
  el.classList.add("reveal");
  io.observe(el);
});

const counter = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (!en.isIntersecting) return;
  const el = en.target, end = +el.dataset.count;
  let n = 0;
  const step = () => { el.textContent = ++n; if (n < end) setTimeout(step, 900 / end); };
  step();
  counter.unobserve(el);
}), { threshold: 1 });
document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

/* Menu mobile + link ativo */
const menuBtn = $(".menu-btn"), menu = $(".menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") menu.classList.remove("open"); });

const navLinks = [...document.querySelectorAll(".menu a")];
const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));

$("#year").textContent = new Date().getFullYear();
