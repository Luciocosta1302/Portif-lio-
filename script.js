/* =========================================================
   VIAGEM PELO ESPAÇO
   O scroll move uma "câmera" para frente. Estrelas e imagens
   da NASA ficam em profundidades diferentes e passam por ela.
   Tudo fica atrás de um véu escuro para não roubar a atenção.
   ========================================================= */
(() => {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const layer = document.getElementById("space");
  const F = 520;          // distância focal
  const DEPTH = 1.15;     // unidades de profundidade por px de scroll

  /* x, y: posição relativa à tela (-0.5 a 0.5) · z: profundidade
     size: largura em px quando está a 520 unidades da câmera
     o: opacidade máxima · full: imagem sem máscara nas bordas */
  const OBJECTS = [
    { src: "eclipse",   x: 0.30,  y: -0.06, mx: 0.5, my: -0.34, z: 560,  size: 1100, o: 0.55, full: true },
    { src: "bipolar",   x: -0.42, y: 0.22,  z: 1500, size: 900,  o: 0.5 },
    { src: "jewel",     x: 0.40,  y: -0.18, z: 2300, size: 700,  o: 0.55 },
    { src: "lmc",       x: -0.05, y: 0.05,  z: 3100, size: 1500, o: 0.35 },
    { src: "pillars",   x: 0.44,  y: 0.16,  z: 3800, size: 520,  o: 0.45 },
    { src: "n49",       x: -0.38, y: -0.2,  z: 4600, size: 900,  o: 0.5 },
    { src: "gum19",     x: 0.36,  y: 0.2,   z: 5400, size: 900,  o: 0.5 },
    { src: "crab",      x: -0.3,  y: 0.1,   z: 6200, size: 1000, o: 0.5 },
    { src: "tadpoles",  x: 0.32,  y: -0.12, z: 7000, size: 1100, o: 0.45 },
    { src: "moon-half", x: 0.12,  y: 0.42,  z: null, size: 1500, o: 0.4, full: true, far: 1000 }, // fica no fim
  ];

  let W, H, dpr, mobile, maxCam = 1, cam = 0, target = 0, vel = 0, warp = 0, stars = [];
  const manifesto = document.getElementById("manifesto");

  const els = OBJECTS.map((o) => {
    const img = new Image();
    img.src = `assets/space/${o.src}.jpg`;
    img.alt = "";
    img.decoding = "async";
    if (o.full) img.className = "full";
    layer.appendChild(img);
    return img;
  });

  function layout() {
    W = innerWidth; H = innerHeight; mobile = W < 700;
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    maxCam = Math.max(1, (document.documentElement.scrollHeight - H) * DEPTH);
    // a lua fica sempre um pouco à frente do fim do caminho
    OBJECTS[OBJECTS.length - 1].zAuto = maxCam + 650;
    const n = mobile ? 260 : 520;
    stars = Array.from({ length: n }, () => newStar(Math.random() * 2000 + 20));
  }

  function newStar(z) {
    return { x: (Math.random() - 0.5) * 2600, y: (Math.random() - 0.5) * 1800, z, b: Math.random() * 0.7 + 0.3 };
  }

  function placeObjects() {
    const scale = mobile ? 0.6 : 1;
    OBJECTS.forEach((o, i) => {
      const el = els[i];
      const z = (o.z ?? o.zAuto) * (o.z && maxCam < 7000 ? maxCam / 7000 : 1);
      const rel = z - cam;
      const far = o.far || 2600;
      if (rel < 40 || rel > far) { el.style.opacity = 0; return; }
      const k = F / rel;
      const w = o.size * scale * k;
      const ox = mobile && o.mx != null ? o.mx : o.x;
      const oy = mobile && o.my != null ? o.my : o.y;
      const sx = W / 2 + ox * W * k * 1.4;
      const sy = H / 2 + oy * H * k * 1.4;
      // aparece ao longe, some ao passar pela câmera
      const fadeIn = Math.min(1, (far - rel) / (o.far ? 300 : 900));
      const fadeOut = Math.min(1, (rel - 40) / 260);
      el.style.opacity = (o.o * fadeIn * fadeOut).toFixed(3);
      el.style.width = o.size * scale + "px";
      el.style.transform = `translate3d(${sx - w / 2}px, ${sy - (w * (el.naturalHeight / el.naturalWidth || 1)) / 2}px, 0) scale(${k})`;
      el.style.transformOrigin = "0 0";
    });
  }

  function drawStars() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const speed = 0.35 + Math.max(-14, Math.min(14, vel * 1.6)) + warp * 16;            // parado: deriva lenta · scroll: acelera
    const streak = Math.max(Math.min(Math.abs(vel) * 5, 26), warp * 70);
    ctx.lineCap = "round";
    for (const s of stars) {
      s.z -= speed;
      if (s.z < 8) Object.assign(s, newStar(2000));
      if (s.z > 2020) Object.assign(s, newStar(20));
      const k = F / s.z;
      const px = W / 2 + s.x * k, py = H / 2 + s.y * k;
      if (px < -50 || px > W + 50 || py < -50 || py > H + 50) continue;
      const near = 1 - s.z / 2000;
      const a = Math.min(1, near * 1.3) * s.b * 0.85;
      const r = Math.max(0.35, near * 1.6);
      if (streak > 1.5) {
        const k2 = F / Math.max(10, s.z + Math.sign(speed) * streak * 4);
        ctx.strokeStyle = `rgba(222,230,240,${a * 0.55})`;
        ctx.lineWidth = r;
        ctx.beginPath();
        ctx.moveTo(W / 2 + s.x * k2, H / 2 + s.y * k2);
        ctx.lineTo(px, py);
        ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(222,230,240,${a})`;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, 6.283);
        ctx.fill();
      }
    }
  }

  function frame() {
    target = scrollY * DEPTH;
    const prev = cam;
    cam += (target - cam) * 0.08;               // câmera com inércia
    vel += ((cam - prev) - vel) * 0.25;
    // perto da seção manifesto as estrelas entram em "dobra"
    if (manifesto) {
      const r = manifesto.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - H / 2) / H;
      warp += (Math.max(0, 1 - d * 1.6) - warp) * 0.06;
    }
    placeObjects();
    drawStars();
    requestAnimationFrame(frame);
  }

  layout();
  addEventListener("resize", layout);
  addEventListener("load", layout);
  els.forEach((el) => el.addEventListener("load", placeObjects));

  if (still) {
    cam = scrollY * DEPTH;
    placeObjects(); drawStars();
    addEventListener("scroll", () => { cam = scrollY * DEPTH; placeObjects(); }, { passive: true });
  } else {
    requestAnimationFrame(frame);
  }
})();

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const ext = 'target="_blank" rel="noopener"';

/* ---------- Trabalhos ---------- */
$("#work-count").textContent = `(${pad(WORK.length)})`;
$("#work").innerHTML = WORK.map((p, i) => {
  const href = p.live || p.code;
  const thumb = `<img src="${esc(p.image)}" alt="Prévia do projeto ${esc(p.title)}" loading="lazy" width="1200" height="750" />
    ${!href ? `<span class="badge mono">Em breve</span>` : ""}
    ${p.chip ? `<span class="chip mono">${esc(p.chip)}</span>` : ""}`;
  const links = [
    p.live && `<a href="${esc(p.live)}" ${ext}>Site ↗</a>`,
    p.code && `<a href="${esc(p.code)}" ${ext}>Código ↗</a>`,
  ].filter(Boolean).join("");
  return `
  <article class="project reveal">
    ${href ? `<a class="thumb" href="${esc(href)}" ${ext} data-cursor="${p.live ? "Ver site ↗" : "Ver código ↗"}">${thumb}</a>`
           : `<div class="thumb">${thumb}</div>`}
    <span class="p-index mono">N°${pad(i + 1)} / ${pad(WORK.length)}</span>
    <div class="p-head"><h3 data-scramble>${esc(p.title)}</h3><span class="mono">${esc(p.year)}</span></div>
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
  <div class="stack-group reveal">
    <h3>${esc(g.group)}</h3>
    <ul class="tools">${g.items.map(([name, key]) => {
      const ic = ICONS[key] || { svg: "", color: "" };
      return `<li class="tool" style="--c:${ic.color}">${ic.svg}<span>${esc(name)}</span></li>`;
    }).join("")}</ul>
  </div>`).join("");

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
const clocks = $$(".js-clock");
const tick = () => {
  const t = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Belem" }).format(new Date());
  clocks.forEach((c) => (c.textContent = t));
};
tick(); setInterval(tick, 20000);

/* ---------- Rodapé HUD: cursor e profundidade ---------- */
const cxEl = $("#cx"), cyEl = $("#cy"), depthEl = $("#depth");
const p4 = (n) => String(Math.max(0, Math.round(n))).padStart(4, "0");
addEventListener("pointermove", (e) => { cxEl.textContent = p4(e.clientX); cyEl.textContent = p4(e.clientY); }, { passive: true });
const updDepth = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  depthEl.textContent = String(Math.round((scrollY / Math.max(1, max)) * 100)).padStart(3, "0");
};
addEventListener("scroll", updDepth, { passive: true }); updDepth();

/* ---------- Texto que "decodifica" ao aparecer ---------- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
const stillMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function scramble(el) {
  if (stillMotion || el.dataset.done) return;
  el.dataset.done = 1;
  const nodes = [];
  const walk = (n) => n.childNodes.forEach((c) => (c.nodeType === 3 ? nodes.push(c) : walk(c)));
  walk(el);
  const orig = nodes.map((n) => n.textContent);
  const total = orig.reduce((a, t) => a + t.length, 0);
  const dur = Math.min(900, 280 + total * 22);
  const t0 = performance.now();
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    let seen = 0;
    nodes.forEach((n, k) => {
      n.textContent = [...orig[k]].map((ch) => {
        const idx = seen++;
        if (ch === " " || idx / total < p) return ch;
        return idx / total < p + 0.25 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : ch;
      }).join("");
    });
    if (p < 1) requestAnimationFrame(step);
    else nodes.forEach((n, k) => (n.textContent = orig[k]));
  })(t0);
}
const sio = new IntersectionObserver((entries) => entries.forEach((en) => {
  if (en.isIntersecting) { scramble(en.target); sio.unobserve(en.target); }
}), { threshold: 0.6 });
$$("[data-scramble]").forEach((el) => sio.observe(el));

/* ---------- Topo, menu, link ativo ---------- */
const topbar = $(".top");
addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", scrollY > 40);
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
navLinks.forEach((a) => { a.innerHTML = `<span>${a.textContent}</span>`; });
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
