# haoqi.design — referência

Capturas: `haoqi-01..10.jpg` (desktop 1440×900, rolagem por roda — usa Lenis em container `overflow-y:auto`), `haoqi-mobile.jpg`, `haoqi-hover-before.jpg` / `haoqi-hover.jpg` (card VECTORSYMBOLS).

## Conceito geral
- Fundo **creme/papel** `rgb(251,250,244)` com **grid de 3 colunas visível** (linhas finas cinza-azuladas + marcas "+" nas interseções), estilo folha técnica/blueprint.
- Hero: fundo azul-céu com reflexos (cáustica de água/luz), **"hello" 3D em vidro/inflado** (WebGL, canvas fixo 1440×900) e cursor 3D azul gigante. Título display enorme "I BRING / CRAFT & TASTE / TO DIGITAL WORK" com **efeito de scramble** (letras viram `{OJ`, `I*LG` em verde-lima antes de resolver).
- Topo em 3 colunas: logo "HAOQI.DESIGN" (bold sans) · tagline mono "Thinking in systems. Designing with care." · bio mono com o nome da empresa censurado (■■■■■■). Nav mono maiúscula: WORK · CONTACT · THEME[A] · SOUND[-] (som/tema como toggles de texto).
- Rodapé fixo HUD: relógio "GMT+8 CN 17:39", **coordenadas do cursor em tempo real** "0720 X 0450 Y", ícone de globo.
- Scrollbar customizada fina (barrinha preta) na direita.
- Seção "sobre": foto retrato com assinatura manuscrita em verde-lima + parágrafo display ~60px ("I explore how to shape AI-era workflows…"), 2ª frase em cinza com links sublinhados.
- Final: **warp-speed / hiperespaço** — linhas radiais azul/ciano/roxo em fundo azul-marinho → preto, texto branco enorme "INNOVATE WITH PURPOSE" → "WITH A HUMAN TOUCH", depois anéis elípticos e frases flutuantes ("Clarity first. Delight second.", "Ship in small loops. Aim for long arcs.") e CTA "LET'S CREATE SOMETHING EXTRAORDINARY" + email + Twitter/X, Figma, GitHub.

## Tipografia (computada)
- body: `tiktok, sans-serif` · 16px · peso 400 · letter-spacing normal · line-height 24px · cor rgb(0, 0, 0)
- parágrafo display: `tiktok, sans-serif` · 60.48px · peso 400 · letter-spacing normal · line-height 60.48px · cor rgb(0, 0, 0)
- logo/nav: `tiktok, sans-serif` · 16px · peso 700 · letter-spacing normal · line-height 24px · cor rgb(0, 0, 0) · uppercase; links de nav e metadados em **mono** (fonte "mono"/"tronica-mono") ~14–15px maiúsculo, ls ~0.05em.
- Display do hero: sans extra-bold/black ~80px, maiúsculo, line-height ~0.95.
- Fontes carregadas: tiktok 100 900, mono 100 900, tronica-mono 400. Não há h1/h2 semânticos.

## Cores
- Fundo body: `rgb(251, 250, 244)`; texto `rgb(0,0,0)`.
- Fundos detectados: `lab(92.9242 -39.8464 87.367)` (5), `rgb(0, 0, 0)` (4).
- Paleta: creme `#FBFAF4`, preto, **verde-lima neon `lab(92.9 -39.8 87.4)` ≈ `#C6F500`** (tags "CODING PROJECT", glitch de texto, pontinho quadrado), azul-céu `#BFDDF3` (hero), azul elétrico `#2B7BE0` (cursor 3D), azul-marinho `#0B2A55` → preto + ciano/roxo (seção warp), cinza-médio para texto secundário.

## Seção de projetos
- Container `section.px-14 py-24` → `div.grid.grid-cols-12` (colunas ~110px, row-gap ~110px, sem column-gap; margem lateral 56px).
- Cards `article` ocupam **3 de 12 colunas** (≈332px) em posições escalonadas (col-start variando: 5, 6, 9…), criando um **layout editorial assimétrico/disperso**, não um grid regular; o primeiro (REUNIMOS™) é largo (~6–7 colunas).
- Thumbnails: proporção ~**3:2 (1.55)** nos coding projects e **1:1** nos de produto/ícones; **raio 0px** (cantos retos); fundo de cor sólida por projeto.
- Tag "CODING PROJECT" em mono 11px preto sobre **verde-lima**, colada no canto superior direito da imagem.
- Legenda abaixo da imagem em uma linha: NOME à esquerda (sans 14px maiúsculo) · ANO + categoria ("TOOLS ↗", "EVENT ↗") à direita em mono.
- Card = `a.group.block.space-y-3.p-2`.

## Animações / hover
- **Hover do card troca a imagem** (crossfade para uma versão alternativa — ex. VECTORSYMBOLS passa da captura da UI para logos Σ + Figma); keyframes `hsstFadeIn/hsstFadeOut` (fade com easing em degraus) — compare `haoqi-hover-before.jpg` vs `haoqi-hover.jpg`.
- Texto com **scramble/decodificação** de caracteres (glitch em verde-lima) ao entrar na tela.
- Cursor: coordenadas X/Y ao vivo no rodapé; caret piscando (`caret-blink`, `ltBlink`).
- Assinatura SVG desenhada (`svg-sign-draw`: stroke-dashoffset → 0).
- Globo girando (`rtSpin`).
- Scroll suave (Lenis) + cenas WebGL fixas (hello 3D, warp de estrelas que acelera com o scroll).
- Toggles THEME[A] (auto/light/dark) e SOUND (efeitos sonoros de UI).

## Texto visível (innerText)
```
HAOQI.DESIGN
WORK
CONTACT
THEME[A]
SOUND[-]
GMT+8 CN 17:41
0720 X 0450 Y
Design &
Engineering
Thinking in systems. Designing with care.
I'm Haoqi Wen, leading Design Engineering and AI exploration at 
■
■
■
■
■
■
, engineering, and AI at scale. Outside work, I build design tools for team efficiency.
I BRING
CRAFT & TASTE
TO DIGITAL WORK

I explore how to shape AI-era workflows with craft and taste, building the next generation of digital products.

I’m building reunimos™, and previously worked on Alibaba aDrive, Teambition, and 100offer.

CODING PROJECT
REUNIMOS™
2024-2026
CODING PROJECT
INSPIRE MONO
2025
CODING PROJECT
WASM DESIGN UTILS
2025
CODING PROJECT
VECTORSYMBOLS
2023
TOOLS
↗
CODING PROJECT
DARKSIDE
2021
TOOLS
↗
ADRIVE 阿里云盘
2020-2022
SHORE ICON
2022
TEAMBITION
2018-2020
FOF: SEE HEAR TOUCH
2022
EVENT
↗
FOF: DESIGN SYSTEM
2021
EVENT
↗
INNOVATE
WITH
PURPOSE
LET'S
CREATE
SOMETHING
EXTRAORDINARY
CURIOSITY.WEN@GMAIL.COM
TWITTER/X
FIGMA
GITHUB
```
