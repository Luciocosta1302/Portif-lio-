# 🚀 Lúcio Costa — Portfólio

Portfólio pessoal com tema espacial: estrelas animadas, nebulosas, parallax e estrelas cadentes.
HTML, CSS e JavaScript puros, sem build, pronto para o **GitHub Pages**.

**Seções:** Sobre · Projetos (com filtros) · Designs (Canva) · Stack · Trajetória · Certificados (abas) · Contato

## Como atualizar

Todo o conteúdo fica em **`data.js`**. Não precisa mexer no HTML.

| Quero… | Edite em `data.js` |
|---|---|
| Adicionar um projeto | `PROJECTS` (use `links.live` para o site no ar) |
| Adicionar um design do Canva | `DESIGNS` (use `image: "assets/designs/x.jpg"` para mostrar a capa real) |
| Adicionar um emprego | `TIMELINE` com `type: "work"` (troque o item `future` quando conseguir a vaga) |
| Adicionar um certificado | `CERTS` com `status: "concluido"`, `url` da credencial e `image` opcional |

## Publicar no GitHub Pages

Settings → Pages → *Deploy from a branch* → escolha a branch e a pasta `/ (root)`.

## Rodar localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server` e acesse `http://localhost:8000`.
