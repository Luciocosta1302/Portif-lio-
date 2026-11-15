/* ---------- Estrelas (sutis, sem efeitos chamativos) ---------- */
(() => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, stars = [];

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const n = Math.round((innerWidth * innerHeight) / 5200);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() ** 4 * 1.3 + 0.35) * dpr,
      a: Math.random() * 0.6 + 0.2,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.6 + 0.2,
      z: Math.random(),
    }));
    if (still) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const off = (scrollY * dpr) * 0.04;
    ctx.fillStyle = "#dfe6f0";
    for (const s of stars) {
      let y = (s.y - off * (0.3 + s.z)) % h;
      if (y < 0) y += h;
      ctx.globalAlpha = still ? s.a : s.a * (0.65 + 0.35 * Math.sin(s.p + t * 0.0006 * s.s));
      ctx.beginPath();
      ctx.arc(s.x, y, s.r, 0, 6.283);
      ctx.fill();
    }
    if (!still) requestAnimationFrame(draw);
  }

  resize();
  addEventListener("resize", resize);
  if (!still) requestAnimationFrame(draw);
})();

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const ext = 'target="_blank" rel="noopener"';

/* ---------- Trabalhos ---------- */
$("#work-count").textContent = `(${pad(WORK.length)})`;
$("#work").innerHTML = WORK.map((p) => {
  const href = p.live || p.code;
  const thumb = `<img src="${esc(p.image)}" alt="Prévia do projeto ${esc(p.title)}" loading="lazy" width="1200" height="750" />
    ${!href ? `<span class="badge mono">Em breve</span>` : ""}`;
  const links = [
    p.live && `<a href="${esc(p.live)}" ${ext}>Site ↗</a>`,
    p.code && `<a href="${esc(p.code)}" ${ext}>Código ↗</a>`,
  ].filter(Boolean).join("");
  return `
  <article class="project reveal">
    ${href ? `<a class="thumb" href="${esc(href)}" ${ext} data-cursor="${p.live ? "Ver site ↗" : "Ver código ↗"}">${thumb}</a>`
           : `<div class="thumb">${thumb}</div>`}
    <div class="p-head"><h3>${esc(p.title)}</h3><span class="mono">${esc(p.year)}</span></div>
    <p class="p-role">${esc(p.role)}</p>
    <p class="p-desc">${esc(p.desc)}</p>
    <div class="p-foot">
      <span class="p-tags mono">${p.tags.map(esc).join(" · ")}</span>
      ${links ? `<span class="p-links mono">${links}</span>` : ""}
    </div>
  </article>`;
}).join("");

$("#other-count").textContent = `(${pad(OTHER.length)})`;
$("#other").innerHTML = OTHER.map((p) => `
  <li class="reveal"><div class="row">
    <span>${esc(p.title)}</span><span>${esc(p.desc)}</span><span class="mono">${esc(p.stack)}</span><span class="mono">${esc(p.year)}</span>
  </div></li>`).join("");

/* ---------- Sobre: stack ---------- */
$("#stack").innerHTML = STACK.map((g) => `
  <div><h3>${esc(g.group)}</h3><ul>${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("");

/* ---------- Experiência / formação ---------- */
const timeline = (list) => list.map((e) => `
  <li class="reveal ${e.type === "open" ? "open" : ""}"><div class="row">
    <span class="mono">${esc(e.period)}</span><span>${esc(e.role)}</span><span>${esc(e.place)}</span>
  </div></li>`).join("");
$("#experience").innerHTML = timeline(EXPERIENCE);
$("#education").innerHTML = timeline(EDUCATION);

/* ---------- Certificados com abas ---------- */
const certCount = (s) => CERTS.filter((c) => c.status === s).length;
$$(".tab").forEach((t) => {
  const n = certCount(t.dataset.tab);
  if (n) t.insertAdjacentHTML("beforeend", `<sup>${n}</sup>`);
});

function renderCerts(tab) {
  const list = CERTS.filter((c) => c.status === tab);
  const rows = list.map((c, i) => `
    <li><div class="row" style="animation-delay:${i * 60}ms">
      <span>${esc(c.title)}</span>
      <span>${esc(c.issuer)}${c.year ? " · " + esc(c.year) : ""}</span>
      <span class="mono">${c.url ? `<a href="${esc(c.url)}" ${ext}>Credencial ↗</a>` : tab === "progress" ? "Em curso" : "Concluído"}</span>
    </div></li>`);
  const slots = Math.max(tab === "soon" ? 3 : 0, 0);
  for (let i = 0; i < slots; i++) {
    rows.push(`<li class="empty"><div class="row" style="animation-delay:${i * 60}ms">
      <span>Espaço reservado para um novo certificado</span><span>—</span><span class="mono">Em breve</span></div></li>`);
  }
  $("#certs").innerHTML = rows.join("");
}
$$(".tab").forEach((t) => t.addEventListener("click", () => {
  $$(".tab").forEach((b) => { b.classList.toggle("active", b === t); b.setAttribute("aria-selected", b === t); });
  renderCerts(t.dataset.tab);
}));
renderCerts("done");

/* ---------- Cursor com rótulo nas miniaturas ---------- */
const cursor = $(".cursor");
let cx = 0, cy = 0, tx = 0, ty = 0;
addEventListener("pointermove", (e) => {
  tx = e.clientX; ty = e.clientY;
  const t = e.target.closest?.("[data-cursor]");
  if (t && e.pointerType === "mouse") { cursor.textContent = t.dataset.cursor; cursor.classList.add("on"); }
  else cursor.classList.remove("on");
});
(function follow() {
  cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
  cursor.style.left = cx + "px"; cursor.style.top = cy + "px";
  requestAnimationFrame(follow);
})();

/* ---------- Copiar e-mail ---------- */
$$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = "Copiado ✓"; }
  catch { b.textContent = "Selecione o e-mail"; }
  setTimeout(() => (b.textContent = "Copiar"), 1800);
}));

/* ---------- Relógio local (Marabá = America/Belem) ---------- */
const clock = $("#clock");
const tick = () => {
  clock.textContent = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Belem" }).format(new Date());
};
tick(); setInterval(tick, 20000);

/* ---------- Topo, menu, link ativo ---------- */
const topbar = $(".top");
addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", scrollY > 40);
  document.documentElement.style.setProperty("--scroll", scrollY);
}, { passive: true });

const menuBtn = $(".menu-btn");
menuBtn.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", open);
});
$$(".nav a").forEach((a) => a.addEventListener("click", () => {
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded", false);
}));

const navLinks = $$(".nav a");
const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.hash === `#${en.target.id}`));
}), { rootMargin: "-40% 0px -55% 0px" });
$$("section[id]").forEach((s) => spy.observe(s));

/* ---------- Entrada ao rolar ---------- */
const io = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
}), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
$$(".reveal, .label, .about-grid, .contact > *").forEach((el) => { el.classList.add("reveal"); io.observe(el); });

$("#year").textContent = new Date().getFullYear();
