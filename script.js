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

  /* x, y: posição relativa à tela (-0.5 a 0.5)
     z: profundidade fixa · t: posição ao longo da página (0 = topo, 1 = fim)
     size: largura em px a 520 unidades da câmera · o: opacidade máxima
     spin: giro (graus por unidade de profundidade) · full: sem máscara nas bordas */
  const OBJECTS = [
    { src: "eclipse",   x: 0.30,  y: -0.06, mx: 0.5, my: -0.34, z: 1500, size: 2900, o: 0.55, full: true },
    { src: "bipolar",   x: -0.42, y: 0.22,  t: 0.05, size: 900,  o: 0.5 },
    { src: "jewel",     x: 0.40,  y: -0.18, t: 0.11, size: 700,  o: 0.55 },
    { src: "hourglass", x: -0.36, y: -0.16, t: 0.17, size: 760,  o: 0.5 },
    { src: "lmc",       x: -0.05, y: 0.05,  t: 0.24, size: 1500, o: 0.32 },
    { src: "saturn",    x: 0.38,  y: 0.14,  t: 0.31, size: 900,  o: 0.6, full: true, spin: -0.004 },
    { src: "pillars",   x: -0.44, y: 0.16,  t: 0.37, size: 520,  o: 0.45 },
    { src: "n49",       x: 0.38,  y: -0.2,  t: 0.44, size: 900,  o: 0.5 },
    { src: "butterfly", x: -0.34, y: 0.06,  t: 0.51, size: 1000, o: 0.5 },
    { src: "spiral",    x: 0.34,  y: 0.18,  t: 0.58, size: 1050, o: 0.55, spin: 0.012 },
    { src: "gum19",     x: -0.38, y: -0.18, t: 0.65, size: 900,  o: 0.5 },
    { src: "crab",      x: 0.3,   y: 0.1,   t: 0.72, size: 1000, o: 0.5 },
    { src: "cluster",   x: -0.3,  y: 0.02,  t: 0.79, size: 900,  o: 0.4 },
    { src: "tadpoles",  x: 0.32,  y: -0.12, t: 0.86, size: 1100, o: 0.45 },
    { src: "moon-half", x: 0.12,  y: 0.42,  t: 1,   size: 1500, o: 0.4, full: true, far: 1000, end: 650 }, // fica no fim
  ];

  // tamanho real de cada imagem (evita mudança de layout)
  const SPACE_DIMS = {"bipolar":[1200,1116],"butterfly":[1024,910],"cluster":[758,1024],"crab":[1200,1406],"eclipse":[1600,1067],"gum19":[1066,959],"hourglass":[1000,1000],"jewel":[985,697],"lmc":[1200,1285],"moon-half":[1600,1067],"n49":[1200,1284],"pillars":[480,630],"saturn":[1024,929],"spiral":[1024,1014],"tadpoles":[1200,1182]};

  let W, H, dpr, mobile, maxCam = 1, cam = 0, target = 0, vel = 0, warp = 0, stars = [];
  const manifesto = document.getElementById("manifesto");
  let mTop = 0, mH = 0; // posição da seção manifesto, medida no resize

  const els = OBJECTS.map((o) => {
    const img = new Image();
    img.dataset.name = o.src;
    const dm = SPACE_DIMS[o.src];
    if (dm) { img.width = dm[0]; img.height = dm[1]; }
    img.loading = "lazy";
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
    if (manifesto) { const r = manifesto.getBoundingClientRect(); mTop = r.top + scrollY; mH = r.height; }
    // posições proporcionais ao comprimento da página; a lua fica logo depois do fim
    OBJECTS.forEach((o) => { o.zAbs = o.z ?? (o.t * maxCam + (o.end ?? 900)); });
    sizeObjects();
    const n = mobile ? 220 : 480;
    stars = Array.from({ length: n }, () => newStar(Math.random() * 2000 + 20));
  }

  function newStar(z) {
    return { x: (Math.random() - 0.5) * 2600, y: (Math.random() - 0.5) * 1800, z, b: Math.random() * 0.7 + 0.3 };
  }

  // tamanho fixo definido uma vez; por quadro só mudam transform e opacity
  function sizeObjects() {
    const scale = mobile ? 0.6 : 1;
    OBJECTS.forEach((o, i) => { els[i].style.width = o.size * scale + "px"; });
  }

  const last = OBJECTS.map(() => ({ o: -1, t: "" }));
  function placeObjects() {
    const scale = mobile ? 0.6 : 1;
    OBJECTS.forEach((o, i) => {
      const el = els[i];
      const rel = o.zAbs - cam;
      const far = o.far || 2600;
      if (!el.src && rel < far + 1500) el.src = `assets/space/${el.dataset.name}${mobile ? "-m" : ""}.webp`; // carrega um pouco antes de aparecer
      let op = 0, t = last[i].t;
      // some antes de ficar enorme: nada cresce mais que 2,6x perto do texto
      if (rel > 220 && rel < far && el.naturalWidth) {
        const k = Math.min(F / rel, 2.6);
        const w0 = o.size * scale;
        const h0 = w0 * (el.naturalHeight / el.naturalWidth);
        const ox = mobile && o.mx != null ? o.mx : o.x;
        const oy = mobile && o.my != null ? o.my : o.y;
        const sx = W / 2 + ox * W * k * 1.4;
        const sy = H / 2 + oy * H * k * 1.4;
        const fadeIn = Math.min(1, (far - rel) / (o.far ? 300 : 900));
        const fadeOut = Math.min(1, (rel - 220) / 420);
        op = Math.round(o.o * fadeIn * fadeOut * 100) / 100;
        const rot = o.spin ? ` rotate(${(o.spin * rel).toFixed(2)}deg)` : "";
        t = `translate3d(${(sx - w0 / 2).toFixed(1)}px, ${(sy - h0 / 2).toFixed(1)}px, 0) scale(${k.toFixed(4)})${rot}`;
      }
      if (op !== last[i].o) { el.style.opacity = op; last[i].o = op; }
      if (op > 0 && t !== last[i].t) { el.style.transform = t; last[i].t = t; }
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
    if (document.documentElement.classList.contains("bg-paused")) { requestAnimationFrame(frame); return; }
    target = scrollY * DEPTH;
    const prev = cam;
    cam += (target - cam) * 0.08;               // câmera com inércia
    vel += ((cam - prev) - vel) * 0.25;
    // perto da seção manifesto as estrelas entram em "dobra"
    if (manifesto) {
      const d = Math.abs(mTop - scrollY + mH / 2 - H / 2) / H;
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
// miniatura em dois tamanhos: o navegador escolhe pela largura da tela
const srcsetOf = (src) => `${src.replace(".webp", "-600.webp")} 600w, ${src} 1200w`;

/* ---------- Trabalhos ---------- */
const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };
const linksOf = (p) => [
  p.live && `<a href="${esc(p.live)}" ${ext}>Site ↗</a>`,
  p.code && `<a href="${esc(p.code)}" ${ext}>Código ↗</a>`,
].filter(Boolean).join("");

/* Grade completa (página Todos os projetos) */
fill("#work-count", `(${pad(WORK.length)})`);
fill("#work", WORK.map((p, i) => {
  const href = p.live || p.code;
  const thumb = `<img src="${esc(p.image)}" srcset="${esc(srcsetOf(p.image))}" sizes="(max-width: 680px) 92vw, 600px" alt="Prévia do projeto ${esc(p.title)}" loading="lazy" width="1200" height="750" />
    ${!href ? `<span class="badge mono">Em breve</span>` : ""}
    ${p.chip ? `<span class="chip mono">${esc(p.chip)}</span>` : ""}`;
  const links = linksOf(p);
  return `
  <article class="project reveal">
    ${href ? `<a class="thumb" href="${esc(href)}" ${ext} data-cursor="${p.live ? "Ver site ↗" : "Ver código ↗"}">${thumb}</a>`
           : `<div class="thumb">${thumb}</div>`}
    <span class="p-index mono">N°${pad(i + 1)} / ${pad(WORK.length)}</span>
    <div class="p-head"><h3 data-scramble translate="no">${esc(p.title)}</h3><span class="mono">${esc(p.year)}</span></div>
    <p class="p-role">${esc(p.role)}</p>
    <p class="p-desc">${esc(p.desc)}</p>
    <div class="p-foot">
      <span class="p-tags mono">${p.tags.map(esc).join(" · ")}</span>
      ${links ? `<span class="p-links mono">${links}</span>` : ""}
    </div>
  </article>`;
}).join(""));

fill("#other-count", `(${pad(OTHER.length)})`);
fill("#other", OTHER.map((p) => `
  <li class="reveal"><div class="row">
    <span>${esc(p.title)}</span><span>${esc(p.desc)}</span><span class="mono">${esc(p.stack)}</span><span class="mono">${esc(p.year)}</span>
  </div></li>`).join(""));


/* =========================================================
   VITRINE DE TRABALHOS
   A seção fica presa na tela enquanto o scroll avança. Cada
   projeto vem do fundo do espaço, para no centro e passa pela
   câmera. O texto embaixo troca junto com o projeto ativo.
   ========================================================= */
(() => {
  const track = $("#showcase");
  if (!track) return;
  const n = WORK.length;
  track.style.setProperty("--n", n);
  const cardsEl = $("#sc-cards");
  cardsEl.innerHTML = WORK.map((p, i) => {
    const href = p.live || p.code;
    const open = href ? `a href="${esc(href)}" ${ext} data-cursor="${p.live ? "Ver site ↗" : "Ver código ↗"}"` : "div";
    const close = href ? "a" : "div";
    return `<${open} class="sc-card" data-i="${i}" aria-label="${esc(p.title)}">
      <img src="${esc(p.image)}" srcset="${esc(srcsetOf(p.image))}" sizes="(max-width: 700px) 86vw, 880px" alt="Prévia do projeto ${esc(p.title)}" width="1200" height="750" loading="lazy" />
      ${p.chip ? `<span class="chip mono">${esc(p.chip)}</span>` : ""}
      ${!href ? `<span class="badge mono">Em breve</span>` : ""}
    </${close}>`;
  }).join("");
  const cards = $$(".sc-card", cardsEl);
  $("#sc-total").textContent = pad(n);
  $("#sc-dots").innerHTML = WORK.map((p, i) => `<button role="tab" aria-label="${esc(p.title)}" data-i="${i}"></button>`).join("");
  const dots = $$("#sc-dots button");
  const box = $(".sc-info");
  const info = {
    index: $("#sc-index"), title: $("#sc-title"), role: $("#sc-role"),
    desc: $("#sc-desc"), tags: $("#sc-tags"), links: $("#sc-links"), now: $("#sc-now"),
  };

  let shown = -1;
  function showInfo(i) {
    if (i === shown) return;
    shown = i;
    const p = WORK[i];
    box.classList.remove("swap"); void box.offsetWidth; box.classList.add("swap");
    info.index.textContent = `N°${pad(i + 1)} / ${pad(n)} · ${p.year}`;
    info.title.textContent = p.title;
    info.title.translate = false;
    info.role.textContent = p.role;
    info.desc.textContent = p.desc;
    info.tags.textContent = p.tags.join(" · ");
    info.links.innerHTML = linksOf(p);
    info.now.textContent = pad(i + 1);
    delete info.title.dataset.done;
    scramble(info.title);
    dots.forEach((d, k) => d.setAttribute("aria-selected", k === i));
    cards.forEach((c, k) => { c.tabIndex = k === i ? 0 : -1; c.style.pointerEvents = k === i ? "auto" : "none"; c.classList.toggle("is-active", k === i); });
  }

  let tTop = 0, tH = 1;
  const measure = () => { const r = track.getBoundingClientRect(); tTop = r.top + scrollY; tH = r.height; };
  measure();
  addEventListener("resize", measure);
  addEventListener("load", measure);
  new ResizeObserver(measure).observe(document.body);
  const progress = () => {
    const span = Math.max(1, tH - innerHeight);
    return Math.min(1, Math.max(0, (scrollY - tTop) / span)) * (n - 1);
  };
  const stillM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let cur = progress(), running = false;

  function place() {
    const mobile = innerWidth < 700;
    cards.forEach((c, i) => {
      const d = i - cur, ad = Math.abs(d);
      let tx, ty, tz, ry, rz, op;
      if (d >= 0) { // ainda vem do fundo
        tx = d * (mobile ? 16 : 24); ty = -d * 3; tz = -d * 650; ry = -d * 16; rz = d * 3; op = 1 - d * 0.4;
      } else {      // já passou pela câmera
        tx = d * (mobile ? 90 : 70); ty = -d * 2; tz = -d * 380; ry = -d * 30; rz = d * 6; op = 1 - Math.pow(ad, 1.7) * 2.2;
      }
      op = Math.max(0, Math.min(1, op));
      c.style.opacity = op.toFixed(3);
      c.style.visibility = op < 0.01 ? "hidden" : "visible";
      c.style.zIndex = String(100 - Math.round(ad * 10));
      c.style.transform = `translate(-50%, -50%) translate3d(${tx.toFixed(2)}vw, ${ty.toFixed(2)}vh, ${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
    });
    showInfo(Math.round(cur));
  }

  function loop() {
    const target = progress();
    cur += (target - cur) * (stillM ? 1 : 0.12);
    if (Math.abs(target - cur) < 0.0005) cur = target;
    place();
    if (running) requestAnimationFrame(loop);
  }
  new IntersectionObserver(([en]) => {
    const was = running;
    running = en.isIntersecting;
    if (running && !was) requestAnimationFrame(loop);
  }).observe(track);
  // a primeira exibição espera o resto do script (scramble) estar pronto
  queueMicrotask(place);

  // pontos: levam o scroll até o projeto escolhido
  dots.forEach((d) => d.addEventListener("click", () => {
    const i = +d.dataset.i;
    const span = tH - innerHeight;
    scrollTo({ top: tTop + (span * i) / (n - 1) + 1, behavior: stillM ? "auto" : "smooth" });
  }));
})();

/* ---------- Sobre: stack ---------- */
fill("#stack", STACK.map((g) => `
  <div class="stack-group reveal">
    <h3>${esc(g.group)}</h3>
    <ul class="tools">${g.items.map(([name, key]) => {
      const ic = ICONS[key] || { svg: "", color: "" };
      return `<li class="tool" style="--c:${ic.color}">${ic.svg}<span>${esc(name)}</span></li>`;
    }).join("")}</ul>
  </div>`).join(""));

/* ---------- Experiência / formação ---------- */
const timeline = (list) => list.map((e) => `
  <li class="reveal ${e.type === "open" ? "open" : ""}"><div class="row">
    <span class="mono">${esc(e.period)}</span><span>${e.logo ? `<img class="t-logo" src="${esc(e.logo)}" alt="" width="28" height="28" loading="lazy" />` : ""}${esc(e.role)}</span><span>${esc(e.place)}</span>
  </div></li>`).join("");
fill("#experience", timeline(EXPERIENCE));
fill("#education", timeline(EDUCATION));

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
  fill("#certs", rows.join(""));
}
$$(".tab").forEach((t) => t.addEventListener("click", () => {
  $$(".tab").forEach((b) => { b.classList.toggle("active", b === t); b.setAttribute("aria-selected", b === t); });
  renderCerts(t.dataset.tab);
}));
if ($("#certs")) renderCerts("done");

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
addEventListener("pointermove", (e) => { if (cxEl) { cxEl.textContent = p4(e.clientX); cyEl.textContent = p4(e.clientY); } }, { passive: true });
let pageMax = 1;
const measurePage = () => { pageMax = document.documentElement.scrollHeight - innerHeight; };
measurePage();
addEventListener("resize", measurePage);
addEventListener("load", measurePage);
const updDepth = () => {
  const max = pageMax;
  if (depthEl) depthEl.textContent = String(Math.round((scrollY / Math.max(1, max)) * 100)).padStart(3, "0");
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

fill("#year", new Date().getFullYear());

/* ---------- Pausar a animação do fundo ---------- */
(() => {
  const btns = $$(".motion-toggle");
  if (!btns.length) return;
  const set = (on) => {
    document.documentElement.classList.toggle("bg-paused", on);
    btns.forEach((b) => { b.setAttribute("aria-pressed", on); b.textContent = on ? "Retomar animação do fundo" : "Pausar animação do fundo"; });
  };
  let saved = false;
  try { saved = localStorage.getItem("bg-paused") === "1"; } catch (e) {}
  set(saved);
  btns.forEach((b) => b.addEventListener("click", () => {
    const on = !document.documentElement.classList.contains("bg-paused");
    set(on);
    try { localStorage.setItem("bg-paused", on ? "1" : "0"); } catch (e) {}
  }));
})();

/* ---------- Título do topo: palavra por palavra ---------- */
(() => {
  const h = $(".hero-title");
  if (!h) return;
  let i = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(" "); return; }
          const w = document.createElement("span"); w.className = "w";
          const s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
          w.append(s); frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrap(n);
    });
  };
  wrap(h);
})();

/* ---------- Altímetro ---------- */
(() => {
  const alt = $("#altimeter");
  if (!alt) return;
  const stops = [["inicio", "Início"], ["trabalhos", "Trabalhos"], ["sobre", "Sobre"], ["experiencia", "Experiência"], ["certificados", "Certificados"], ["contato", "Contato"]]
    .map(([id, name]) => ({ id, name, el: document.getElementById(id) })).filter((s) => s.el);
  alt.innerHTML = `<span class="alt-line"></span><span class="alt-fill"></span><span class="alt-mark"></span>` +
    stops.map((s) => `<a class="alt-stop" href="#${s.id}"><span>${s.name}</span></a>`).join("") +
    `<span class="alt-depth">000%</span>`;
  const links = $$(".alt-stop", alt), fill = $(".alt-fill", alt), mark = $(".alt-mark", alt), depth = $(".alt-depth", alt);
  let max = 1, tops = [];
  const measure = () => {
    max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    tops = stops.map((s) => Math.min(1, (s.el.getBoundingClientRect().top + scrollY) / max));
    links.forEach((l, k) => { l.style.top = (tops[k] * 100).toFixed(2) + "%"; });
  };
  const update = () => {
    const p = Math.min(1, scrollY / max);
    fill.style.height = (p * 100).toFixed(2) + "%";
    mark.style.top = (p * 100).toFixed(2) + "%";
    depth.textContent = String(Math.round(p * 100)).padStart(3, "0") + "%";
    let on = 0;
    tops.forEach((t, k) => { if (p + 0.02 >= t) on = k; });
    links.forEach((l, k) => l.classList.toggle("on", k === on));
  };
  measure(); update();
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", () => { measure(); update(); });
  addEventListener("load", () => { measure(); update(); });
  new ResizeObserver(() => { measure(); update(); }).observe(document.body);
})();
