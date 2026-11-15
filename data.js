/* =========================================================
   CONTEÚDO DO PORTFÓLIO
   Edite só este arquivo para adicionar projetos, designs,
   experiências e certificados. O layout se ajusta sozinho.
   ========================================================= */

const GITHUB = "https://github.com/Luciocosta1302";

/* tags: ia | web | cliente | academico
   status: "live" | "dev" | "done"                        */
const PROJECTS = [
  {
    title: "StudyAI",
    tagline: "Plataforma de estudos com IA",
    desc: "EdTech que gera resumos, flashcards, simulados e chat com PDF. Pipeline RAG com embeddings em pgvector para respostas precisas a partir do material do aluno.",
    stack: ["Next.js", "React", "TypeScript", "Gemini API", "RAG", "Supabase", "pgvector"],
    tags: ["ia", "web"],
    status: "dev",
    year: "2026",
    featured: true,
    links: {},
  },
  {
    title: "lu.ricos + LU.BOT",
    tagline: "E-commerce de relógios com assistente de IA",
    desc: "Loja própria que fundei e desenvolvi. O LU.BOT recomenda relógios a partir do perfil do cliente. Integração com Instagram, WhatsApp e Mercado Livre.",
    stack: ["HTML", "CSS", "JavaScript", "LLM API", "Excel"],
    tags: ["ia", "web"],
    status: "live",
    year: "2024 →",
    featured: true,
    links: { code: `${GITHUB}/Lu.Ricos` },
  },
  {
    title: "Atlas AI Agent",
    tagline: "Agente de IA em Python",
    desc: "Agente autônomo que usa LLMs com ferramentas para executar tarefas em múltiplas etapas.",
    stack: ["Python", "LLM API", "Agents"],
    tags: ["ia"],
    status: "dev",
    year: "2026",
    links: { code: `${GITHUB}/atlas-ai-agent` },
  },
  {
    title: "Detector de Golpes",
    tagline: "App anti-fraude com LLM",
    desc: "Analisa mensagens suspeitas e explica, em linguagem simples, por que algo pode ser golpe.",
    stack: ["JavaScript", "LLM API"],
    tags: ["ia", "web"],
    status: "done",
    year: "2025",
    links: {},
  },
  {
    title: "Patas Vet",
    tagline: "Site para clínica veterinária",
    desc: "Site institucional responsivo para clínica de Marabá, focado em agendamento e confiança.",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["web", "cliente"],
    status: "live",
    year: "2025",
    links: { code: `${GITHUB}/patas-vet` },
  },
  {
    title: "Cumaru Interiores",
    tagline: "Site para estúdio de interiores",
    desc: "Portfólio visual elegante para empresa de design de interiores, com galeria de ambientes.",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["web", "cliente"],
    status: "live",
    year: "2025",
    links: { code: `${GITHUB}/cumaru-interiores` },
  },
  {
    title: "Áurea Estética",
    tagline: "Site para clínica de estética",
    desc: "Landing page com apresentação de serviços e contato direto via WhatsApp.",
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["web", "cliente"],
    status: "live",
    year: "2025",
    links: {},
  },
  {
    title: "Sandbox 3D",
    tagline: "Jogo de mundo aberto no navegador",
    desc: "Jogo sandbox em 3D com construção de blocos, renderizado direto no browser.",
    stack: ["Three.js", "JavaScript", "WebGL"],
    tags: ["web"],
    status: "done",
    year: "2025",
    links: {},
  },
  {
    title: "Ciclo do Nitrogênio em Grafos",
    tagline: "Projeto acadêmico · UNIFESSPA",
    desc: "Modelagem do ciclo do nitrogênio como grafo, com busca em largura (BFS) e caminhos mínimos (Dijkstra).",
    stack: ["Java", "Grafos", "BFS", "Dijkstra"],
    tags: ["academico"],
    status: "done",
    year: "2025",
    links: { code: `${GITHUB}/Prog-2` },
  },
  {
    title: "LivrosEbook",
    tagline: "Automação de e-books",
    desc: "Scripts em Python para organizar e gerar conteúdo de e-books.",
    stack: ["Python"],
    tags: ["academico"],
    status: "done",
    year: "2025",
    links: { code: `${GITHUB}/LivrosEbook` },
  },
];

/* Designs do Canva. "hue" define a cor da capa gerada.
   Para usar uma imagem real, adicione: image: "assets/designs/arquivo.jpg" */
const DESIGNS = [
  {
    title: "O Clique Perfeito",
    kind: "Apresentação · Projeto Tecer Mulher",
    desc: "Guia visual de fotografia com celular para mulheres idosas — linguagem simples e alto contraste.",
    url: "https://www.canva.com/d/XOz5npdbrzINAMm",
    hue: 320,
    pages: 13,
  },
  {
    title: "Replicação de Estudo SAST",
    kind: "Apresentação acadêmica",
    desc: "Replicação de estudo sobre ferramentas de análise estática de segurança (SAST).",
    url: "https://www.canva.com/d/lB4Ie2cWNcjYPKd",
    hue: 200,
    pages: 15,
  },
  {
    title: "Autonomia no WhatsApp",
    kind: "Slides · CBIE 2026",
    desc: "Apresentação para o Congresso Brasileiro de Informática na Educação.",
    url: "https://www.canva.com/d/ATaB1GdKU8CulDP",
    hue: 150,
    pages: 8,
  },
  {
    title: "E-commerce Brasileiro: Olist",
    kind: "Relatório de dados",
    desc: "Análise exploratória do dataset Olist: vendas, frete, avaliações e comportamento do cliente.",
    url: "https://www.canva.com/d/hbQ-kshjKNE8W6b",
    hue: 260,
    pages: 13,
  },
  {
    title: "Segurança Digital Descomplicada",
    kind: "Apresentação educativa",
    desc: "Boas práticas de segurança online explicadas para o público geral.",
    url: "https://www.canva.com/d/vWuFa1EMxAN2M3t",
    hue: 30,
    pages: 13,
  },
  {
    title: "Guia Visual para Idosas",
    kind: "Material impresso · A4",
    desc: "Versão em apostila do guia O Clique Perfeito, pensada para impressão e leitura fácil.",
    url: "https://www.canva.com/d/trFt0CAVWerhJ0D",
    hue: 280,
    pages: 21,
  },
];

const STACK = [
  { group: "Front-end", icon: "◐", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Three.js"] },
  { group: "IA & Dados", icon: "✦", items: ["Engenharia de prompts", "Claude API", "Gemini API", "ChatGPT API", "RAG", "SQL", "pgvector", "Supabase"] },
  { group: "Programação", icon: "⌘", items: ["Java (OOP)", "Estruturas de Dados", "Python", "Git", "GitHub"] },
  { group: "TI & Suporte", icon: "⚙", items: ["Hardware & Software", "Redes", "Sistemas Operacionais", "Troubleshooting", "LGPD"] },
  { group: "Produtividade", icon: "▦", items: ["Excel avançado", "Tabelas dinâmicas", "Word", "PowerPoint"] },
  { group: "Design", icon: "◇", items: ["Canva", "UI para web", "Apresentações", "Identidade visual"] },
];

/* type: "work" | "edu" | "future"
   Para adicionar um emprego futuro, mude type para "work" e preencha. */
const TIMELINE = [
  {
    type: "future",
    period: "Em breve",
    title: "Próxima missão: Estágio em TI / Desenvolvimento",
    place: "Sua empresa?",
    desc: "Espaço reservado para a minha próxima experiência profissional. Se você está contratando, vamos conversar.",
  },
  {
    type: "work",
    period: "2026 — atual",
    title: "Criador · StudyAI",
    place: "Projeto pessoal",
    desc: "Plataforma EdTech com Next.js, TypeScript e pipeline RAG (Gemini + pgvector/Supabase).",
  },
  {
    type: "edu",
    period: "2026 — 2029",
    title: "Bacharelado em Sistemas de Informação",
    place: "UNIFESSPA · Marabá, PA",
    desc: "Estruturas de Dados (Java), Algoritmos, Arquitetura de Computadores, Matemática Discreta.",
  },
  {
    type: "work",
    period: "2024 — atual",
    title: "Desenvolvedor Web Freelance",
    place: "Marabá, PA",
    desc: "Sites para negócios locais: Cumaru Interiores, Patas Vet e Áurea Estética.",
  },
  {
    type: "work",
    period: "2024 — atual",
    title: "Fundador & Desenvolvedor · lu.ricos",
    place: "Marabá, PA / Remoto",
    desc: "Gestão end-to-end do e-commerce: sourcing, precificação, estoque, vendas multicanal, site e LU.BOT.",
  },
];

/* status: "concluido" | "andamento" | "futuro"
   Adicione "url" para linkar a credencial e "image" para mostrar o certificado. */
const CERTS = [
  { title: "Fundamentos de Suporte Técnico em TI", issuer: "Google · Coursera", year: "2026", status: "concluido", url: "" },
  { title: "Pacote Office com foco em Excel", issuer: "Curso em Vídeo", year: "", status: "concluido", url: "" },
  { title: "IBM Front-End Developer Professional Certificate", issuer: "IBM · Coursera", year: "", status: "andamento", url: "" },
  { title: "Google Data Analytics", issuer: "Google · Coursera", year: "", status: "andamento", url: "" },
  { title: "Novo certificado", issuer: "Em breve", year: "", status: "futuro", url: "" },
  { title: "Novo certificado", issuer: "Em breve", year: "", status: "futuro", url: "" },
];
