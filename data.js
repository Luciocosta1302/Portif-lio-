/* =========================================================
   CONTEÚDO DO PORTFÓLIO — edite só este arquivo.
   ========================================================= */

const GITHUB = "https://github.com/Luciocosta1302";

/* Trabalhos selecionados: aparecem com miniatura.
   image: 1200x750 (16:10) em assets/projects/ */
const WORK = [
  {
    title: "lu.ricos",
    role: "Fundador · Design & Desenvolvimento",
    year: "2024 —",
    desc: "E-commerce de relógios com estética editorial, carrinho com checkout pelo WhatsApp e o LU.BOT, assistente de vendas com IA.",
    tags: ["HTML", "CSS", "JavaScript", "LLM"],
    image: "assets/projects/luricos.jpg",
    live: "https://storeluricos.netlify.app/",
    code: `${GITHUB}/Lu.Ricos`,
  },
  {
    title: "StudyAI",
    role: "Produto pessoal · Em desenvolvimento",
    year: "2026",
    desc: "Plataforma de estudos que transforma PDFs em resumos, flashcards, simulados e um chat com o material, usando RAG.",
    tags: ["Next.js", "TypeScript", "Gemini", "pgvector"],
    image: "assets/projects/studyai.jpg",
  },
  {
    title: "Atlas AI",
    role: "Agente de IA · Back-end",
    year: "2026",
    desc: "Agente que escolhe ferramentas, executa e observa. Memória em SQLite, streaming SSE e 103 testes automatizados.",
    tags: ["Python", "LangGraph", "FastAPI", "Gemini"],
    image: "assets/projects/atlas.jpg",
    code: `${GITHUB}/atlas-ai-agent`,
  },
  {
    title: "Cumaru Interiores",
    role: "Landing page conceito",
    year: "2026",
    desc: "Marcenaria amazônica fictícia com mesa 3D interativa. O modelo foi otimizado de 8,9 MB para 295 KB em Python.",
    tags: ["Three.js", "Python", "Offline-first"],
    image: "assets/projects/cumaru.jpg",
    live: "https://agent-6a5f7e967b61331e4893f5--cumaru-interioires.netlify.app/",
    code: `${GITHUB}/cumaru-interiores`,
  },
  {
    title: "Patas Vet",
    role: "Site institucional",
    year: "2026",
    desc: "Site para clínica veterinária em Belém, com serviços, depoimentos e agendamento direto pelo WhatsApp.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "assets/projects/patas-vet.jpg",
    live: "https://luciocosta1302.github.io/patas-vet/",
    code: `${GITHUB}/patas-vet`,
  },
  {
    title: "LivrosEbook",
    role: "Agente literário · Claude Code",
    year: "2026",
    desc: "Agente de escrita de ficção com subagente, comandos próprios e bíblia do livro como memória entre capítulos.",
    tags: ["Prompt engineering", "Agents", "Claude"],
    image: "assets/projects/livros-ebook.jpg",
    code: `${GITHUB}/LivrosEbook`,
  },
];

/* Outros projetos: lista compacta, sem miniatura. */
const OTHER = [
  { title: "Áurea Estética", desc: "Site para clínica de estética", stack: "HTML · CSS · JS", year: "2024" },
  { title: "Detector de golpes", desc: "Análise de mensagens suspeitas com LLM", stack: "JS · LLM API", year: "2025" },
  { title: "Redesign do WhatsApp", desc: "Estudo de interface", stack: "UI", year: "2025" },
  { title: "Sandbox 3D", desc: "Jogo de construção no navegador", stack: "Three.js", year: "2025" },
  { title: "Jogo de plataforma", desc: "Jogo 2D no navegador", stack: "JavaScript", year: "2025" },
  { title: "Ciclo do Nitrogênio", desc: "Modelagem em grafos com BFS e Dijkstra · UNIFESSPA", stack: "Java", year: "2025" },
];

const STACK = [
  { group: "Front-end", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Three.js"] },
  { group: "IA & Dados", items: ["Engenharia de prompts", "APIs Claude, Gemini, ChatGPT", "RAG", "LangGraph", "SQL", "pgvector", "Supabase"] },
  { group: "Back-end", items: ["Python", "FastAPI", "Java (OOP)", "Estruturas de dados", "Git & GitHub"] },
  { group: "TI & Suporte", items: ["Hardware e software", "Redes", "Sistemas operacionais", "Excel avançado", "Noções de LGPD"] },
];

/* type: "open" = vaga futura (pontilhado). Troque quando conseguir o emprego. */
const EXPERIENCE = [
  { type: "open", period: "Próximo", role: "Estágio em TI / Desenvolvimento", place: "Aberto a oportunidades" },
  { period: "2024 —", role: "Fundador & Desenvolvedor", place: "lu.ricos · Marabá, PA / Remoto" },
  { period: "2024 —", role: "Desenvolvedor Web Freelance", place: "Negócios locais · Marabá, PA" },
  { period: "2026 —", role: "Criador do StudyAI", place: "Projeto pessoal" },
];

const EDUCATION = [
  { period: "2026 — 2029", role: "Bacharelado em Sistemas de Informação", place: "UNIFESSPA · Marabá, PA" },
];

/* status: "done" | "progress" | "soon". Adicione url para a credencial. */
const CERTS = [
  { title: "Fundamentos de Suporte Técnico em TI", issuer: "Google · Coursera", year: "2026", status: "done", url: "" },
  { title: "Pacote Office com foco em Excel", issuer: "Curso em Vídeo", year: "", status: "done", url: "" },
  { title: "IBM Front-End Developer Professional Certificate", issuer: "IBM · Coursera", year: "", status: "progress", url: "" },
  { title: "Google Data Analytics", issuer: "Google · Coursera", year: "", status: "progress", url: "" },
];
