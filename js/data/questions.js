// ---------- Perguntas (config-driven) ----------
const QUESTIONS = [
  {id:'altura', tipo:'number', pergunta:'Qual sua altura (cm)?', placeholder:'Ex: 175', min:120, max:220},
  {id:'peso', tipo:'number', pergunta:'Qual seu peso (kg)?', placeholder:'Ex: 78', min:30, max:150},
  {id:'idade', tipo:'number', pergunta:'Qual sua idade?', placeholder:'Ex: 29', min:8, max:90},
  {id:'nivel', tipo:'select', pergunta:'Qual seu nível de surf?', opcoes:[
    {value:'iniciante', label:'Iniciante', sub:'Nunca surfei ou ainda estou pegando as primeiras ondas'},
    {value:'intermediario', label:'Intermediário', sub:'Já pego onda e remo bem, quero evoluir'},
    {value:'avancado', label:'Avançado', sub:'Já manobro com fluidez e busco performance'}
  ]},
  {id:'tempo', tipo:'select', pergunta:'Há quanto tempo você surfa?', opcoes:[
    {value:'menos6m', label:'Menos de 6 meses'},
    {value:'6m_1a', label:'De 6 meses a 1 ano'},
    {value:'1a_3a', label:'De 1 a 3 anos'},
    {value:'mais3a', label:'Mais de 3 anos'}
  ]},
  {id:'frequencia', tipo:'select', pergunta:'Quantas vezes você surfa por mês, em média?', opcoes:[
    {value:'baixa', label:'1 a 2 vezes'},
    {value:'media', label:'3 a 8 vezes'},
    {value:'alta', label:'9 vezes ou mais'}
  ]},
  {id:'pegaOnda', tipo:'select', pergunta:'Você consegue pegar ondas sozinho, sem ajuda?', opcoes:[
    {value:'sim', label:'Sim, sem dificuldade'},
    {value:'parcial', label:'Às vezes, ainda estou pegando o jeito'},
    {value:'nao', label:'Não, ainda preciso de empurrada'}
  ]},
  {id:'bottomTurn', tipo:'select', pergunta:'Você já consegue fazer a cavada (bottom turn)?', opcoes:[
    {value:'sim', label:'Sim, já é natural'},
    {value:'parcial', label:'Mais ou menos, ainda estou treinando'},
    {value:'nao', label:'Ainda não'}
  ]},
  {id:'tamanhoOndas', tipo:'select', pergunta:'Qual o tamanho médio das ondas que você mais surfa?', opcoes:[
    {value:'pequenas', label:'Pequenas', sub:'Até ~0,5m'},
    {value:'medias', label:'Médias', sub:'~0,5m a 1,5m'},
    {value:'grandes', label:'Grandes', sub:'Acima de 1,5m'}
  ]},
  {id:'mar', tipo:'select', pergunta:'As ondas costumam ser mais fracas ou mais fortes?', opcoes:[
    {value:'fraco', label:'Mais fracas / cheias', sub:'Boas pra remada'},
    {value:'medio', label:'Varia bastante'},
    {value:'forte', label:'Mais fortes / ocas'}
  ]},
  {id:'pranchaAtual', tipo:'text', pergunta:'Qual prancha você usa atualmente?', placeholder:'Ex: 6\'0 x 19,5 x 2,5 — 32L (se souber)', opcional:true},
  {id:'senteFalta', tipo:'multiselect', pergunta:'O que você sente falta na sua prancha atual?', hint:'Pode marcar mais de uma', opcoes:[
    {value:'remada', label:'Mais facilidade pra remar'},
    {value:'estabilidade', label:'Mais estabilidade'},
    {value:'manobra', label:'Mais manobrabilidade'},
    {value:'velocidade', label:'Mais velocidade'},
    {value:'nada', label:'Nada, só quero uma prancha nova'}
  ]},
  {id:'dificuldadeRemar', tipo:'select', pergunta:'Você tem dificuldade pra remar até a arrebentação?', opcoes:[
    {value:'sim', label:'Sim, canso ou fico devendo remada'},
    {value:'as_vezes', label:'Às vezes'},
    {value:'nao', label:'Não, remo bem'}
  ]},
  {id:'dificuldadeEntrar', tipo:'select', pergunta:'Você tem dificuldade pra entrar nas ondas?', opcoes:[
    {value:'sim', label:'Sim, perco muitas ondas'},
    {value:'as_vezes', label:'Às vezes'},
    {value:'nao', label:'Não, pego bem'}
  ]},
  {id:'objetivo', tipo:'select', pergunta:'Seu objetivo agora é pegar mais ondas ou ter mais performance nas manobras?', opcoes:[
    {value:'ondas', label:'Pegar mais ondas', sub:'Priorizo facilidade e volume'},
    {value:'equilibrio', label:'Um pouco dos dois'},
    {value:'performance', label:'Performance', sub:'Priorizo manobrabilidade, mesmo remando mais'}
  ]}
];
