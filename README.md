# Dr. Marcelo Crisanto — Site institucional

Site institucional do Dr. Marcelo Crisanto, cirurgião da mão e ortopedista-traumatologista em Recife (CRM-PE 11472). Ênfase em cirurgia minimamente invasiva e medicina integrativa.

## Tecnologias
HTML, CSS e JavaScript puros (sem framework), seguindo o padrão GSD PRO.

## Estrutura
```
├── index.html            Página principal
├── 404.html              Página de erro
├── css/                  variables.css, fonts.css, styles.css (fontes) + styles.min.css (produção)
├── js/                   modules/*.js + script.js (fontes) + script.min.js (produção)
├── assets/               images, icons, fonts (auto-hospedadas)
├── robots.txt, sitemap.xml, site.webmanifest
```

## Desenvolvimento
Os arquivos em `css/` e `js/modules/` são as fontes editáveis. A página carrega os
bundles minificados `css/styles.min.css` e `js/script.min.js` — reminifique após editar.

## Configuração de contato
Telefone, WhatsApp e link do Doctoralia ficam centralizados em `js/modules/api.js`
(e refletidos em `js/script.min.js`).

## Pendências de deploy
- Definir o domínio final (atualizar canonical, Open Graph, sitemap e JSON-LD).
- Configurar `ErrorDocument 404 /404.html` no servidor (ou equivalente).
