# 🚀 Lúcio Costa — Portfólio

Portfólio pessoal em estilo editorial quase monocromático, com uma viagem pelo espaço ao fundo: o scroll move a câmera entre estrelas e imagens do Hubble (NASA/ESA).
HTML, CSS e JavaScript puros, sem build, pronto para o **GitHub Pages**.

**Seções:** Trabalhos selecionados (com miniaturas) · Outros projetos · Sobre + stack · Experiência · Formação · Certificados (abas) · Contato

## Como atualizar

Todo o conteúdo fica em **`data.js`**. Não precisa mexer no HTML.

| Quero… | Edite em `data.js` |
|---|---|
| Projeto com miniatura | `WORK` (imagem 1200×750 em `assets/projects/`, `live` e `code` opcionais) |
| Projeto sem miniatura | `OTHER` |
| Novo emprego | `EXPERIENCE` (substitua o item `type: "open"` quando conseguir a vaga) |
| Novo certificado | `CERTS` com `status: "done"` e `url` da credencial |
| Imagens do fundo | lista `OBJECTS` no topo de `script.js` (arquivos em `assets/space/`) |

## Publicar no GitHub Pages

Settings → Pages → *Deploy from a branch* → escolha a branch e a pasta `/ (root)`.

## Rodar localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server` e acesse `http://localhost:8000`.
