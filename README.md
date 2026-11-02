# Recomendador de Pranchas — Session Store

Questionário que recomenda pranchas do catálogo da Session Store.

Site (GitHub Pages): abra a URL principal do repositório. O `index.html` fica na raiz.
Local: abra `index.html` direto no navegador (não precisa de servidor).

```
index.html            estrutura das 3 telas (hero, quiz, resultados)
css/styles.css        todo o visual
assets/               logo
js/data/questions.js  perguntas do questionário (QUESTIONS)
js/data/catalogo.js   catálogo de pranchas (CATALOGO)
js/state.js           estado compartilhado (respostas, passoAtual)
js/recommender.js     cálculo de nível, volume alvo e pontuação
js/quiz.js            fluxo do questionário e navegação
js/results.js         tela de resultados e WhatsApp
```

Ordem dos `<script>` no index.html importa (dados → estado → lógica → telas).
