# carterogunsola.com — referência

Capturas: `carter-01..10.jpg` (desktop 1440×900, rolagem por roda do mouse em passos de 900px — o site usa scroll virtual/WebGL, `document.scrollHeight` = 900), `carter-mobile.jpg` (390×844), `carter-hover-before.jpg` / `carter-hover.jpg` (botão "View project").

## Conceito geral
- Site **escuro, quase monocromático**, estética "HUD"/terminal de engenharia. Fundo cinza-carvão `rgb(30,30,30)` com **grão animado** (keyframe `grain-jump`) e textura de pontilhado sutil.
- Tela de **loader** com contador percentual grande (ex.: "78") no canto superior direito; ~8–10s até carregar.
- Barra superior de status mono minúscula: `UT::10:38MST  FPS::10  PRESENCE::ON  Booking::Q1'27` (labels com 50% de opacidade, valores brilhantes).
- Logo "C O" em dois círculos/caixas com borda fina, canto superior esquerdo.
- Nav em **pílula central** (About · Lab · Writing · Studio · Contact · ⌘K) com fundo `rgba(247,247,247,.08)`; à direita, sino de notificações + toggle de tema (sol/lua) em pílulas.
- A home **não é um grid**: é um **carrossel vertical em tela cheia** (main.hv2 / section.hv2__stage). Cada scroll troca o projeto central: "N°01 / 17" → título grande → tags `W/CLAY · 2026` → botão "View project". Ao redor flutuam **planos wireframe 3D (malhas quadriculadas) e objetos 3D** (placas/cartões metálicos) em WebGL que giram e se reposicionam a cada troca.
- Títulos trocam com **animação de letras "embaralhadas"/espalhadas** (cada caractere em spans duplicados — efeito *roll/drum*: a letra antiga sobe e a nova entra por baixo; frame capturado mostra letras fora de alinhamento, ex. "Scott Snyder").

## Tipografia (computada)
- h1 (visualmente oculto/sr): `Oracle, "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` · 32px · peso 400 · letter-spacing normal · line-height 44.8px · cor rgb(247, 247, 247)
- h2 ("Selected work"): `Oracle, "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` · 47.9998px · peso 580 · letter-spacing -1.344px · line-height 50.8798px · cor rgb(247, 247, 247)
- body: `Oracle, "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` · 16px · peso 400 · letter-spacing normal · line-height 22.4px · cor rgb(247, 247, 247)
- meta "N°01 / 17": `Oracle, "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` · 12.32px · peso 400 · letter-spacing -0.2464px · line-height 13.552px · cor rgba(247, 247, 247, 0.5) · uppercase
- nav links: `Oracle, "Geist Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` · 16px · peso 400 · letter-spacing -0.32px · line-height 17.6px · cor rgb(247, 247, 247)
- Título do projeto em destaque: ~32px peso ~600, branco, centralizado. Tags: ~11px mono maiúsculo em chips `rgb(72,72,72)`/`rgba(247,247,247,.14)`, raio 2–4px.
- Botão "View project": 14px, ls -0.28px, `border-radius: 4px`, `transition: scale .2s cubic-bezier(.5,1,.89,1)`.
- Fontes carregadas: Geist Variable 100 900, Geist Mono Variable 100 900, Oracle 200 1000, PP Neue Montreal Mono 100 299, PP Neue Montreal Mono 300 450, PP Neue Montreal Mono 451 650, PP Neue Montreal Mono 651 900, PP Neue Montreal Mono 100 550, PP Neue Montreal Mono 551 900, Geist Pixel Square 500, Geist Pixel Circle 500, Geist Pixel Triangle 500, Geist Pixel Grid 500, Geist Pixel Line 500, Untitled Sans 300 900.

## Cores
- Fundo body: `rgb(30, 30, 30)`
- Texto (top): `rgb(247, 247, 247)` (126), `color(srgb 0.968627 0.968627 0.968627 / 0.6)` (106), `rgba(247, 247, 247, 0.5)` (33), `color(srgb 0.968627 0.968627 0.968627 / 0.32)` (8), `color(srgb 0.968627 0.968627 0.968627 / 0.66)` (7)
- Fundos (top 10): `rgba(247, 247, 247, 0.08)` (59), `rgb(72, 72, 72)` (32), `rgb(224, 106, 74)` (17), `color(srgb 0.968627 0.968627 0.968627 / 0.14)` (17), `rgb(38, 38, 38)` (9), `color(srgb 0.185725 0.185725 0.185725)` (8), `rgb(0, 0, 0)` (1), `rgba(0, 0, 0, 0.6)` (1), `rgba(247, 247, 247, 0.2)` (1), `rgb(247, 247, 247)` (1)
- Paleta efetiva: off-white `#F7F7F7` em opacidades 100/66/60/50/32/14/8 % sobre `#1E1E1E`/`#262626`/`#303030`/`#484848`; único acento quente **`rgb(224,106,74)` (laranja-coral)** usado em badges/pontos de notificação.

## Seção de projetos
- 17 projetos, **um por "tela"** (100vh), conteúdo centralizado (coluna de ~260px). Sem thumbnails em grid; a mídia é o 3D WebGL ao fundo.
- Metadados acima/abaixo do título: índice `N°xx / 17` (mono 12px, 50% opacidade) acima; chips de cliente + ano abaixo; CTA logo abaixo.
- Projetos vistos: Clay, Helion, Scott Snyder, Heva 2025, ABCAU, PNY, Hamilton AI, Vesyl, Vana 2024, Vana X Team…

## Animações / hover
- Nav: ao passar o mouse num link os demais vão a `opacity:.4`; texto faz **roll vertical** (span duplicado desliza).
- Links sublinhados: `::before` com `transform: scaleX(0→1)` origem à esquerda.
- Botões: leve `scale(.97)` no hover/active; setas com "arrow-roll" (seta sai e outra entra).
- Logo: no hover os círculos invertem (fundo = tinta, texto = papel).
- Keyframes: grain-jump (grão), hud-pulse (status piscando), spin-turn, labd-stage-rise/sink (entrada/saída de cenas: `translateY(6%) scale(.96)` + opacity), transições de página Astro (fade/slide).
- Tudo respeita `prefers-reduced-motion` e `(hover:hover) and (pointer:fine)`.
- Comparação hover-before vs hover: diferença sutil apenas no botão (escala/realce); o grande movimento vem da troca de cena por scroll.

## Texto visível (innerText, deduplicado de spans de animação)
```
UT::10:40MST
FPS::24
PRESENCE::ON
Booking::Q1’27
C
O
About
Lab
Writing
Studio
Contact
⌘K
Carter Ogunsola, Creative Developer & Brand Engineer

N°09 / 17
 
 

N°10 / 17
 
 

Vana 2024
 

Vana X Team
 
 

W/BALKY STUDIO
 
2024
W/BALKY STUDIO
 
2024
View project
View project

Vana 2024, w/balky studio, 2024. 9 of 17.
```
