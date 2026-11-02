// ---------- Tela de resultados ----------
function mostrarResultados(){
  document.getElementById('screen-quiz').classList.add('hidden');
  document.getElementById('screen-results').classList.remove('hidden');

  const skill = calcularSkillScore();
  const alvo = calcularVolumeAlvo(skill);
  const nivelEf = nivelEfetivo(skill);
  const marEf = marParaMatch();

  const ranked = CATALOGO.map(p => ({...p, score: pontuarPrancha(p, alvo, nivelEf, marEf)}))
                          .sort((a,b)=> b.score - a.score)
                          .slice(0,3);

  const nivelLabel = {iniciante:'iniciante', intermediario:'intermediário', avancado:'avançado'}[nivelEf];
  document.getElementById('resultsSub').textContent =
    `Com base nas suas respostas, calculamos um perfil técnico e um volume alvo de referência.`;

  let profileHtml = `<strong>Seu perfil calculado: ${nivelLabel}</strong>
    Volume alvo: ~${alvo.toFixed(1)}L · Peso: ${respostas.peso}kg · Altura: ${respostas.altura}cm`;
  if(respostas.pranchaAtual){
    profileHtml += `<br>Prancha atual informada: ${respostas.pranchaAtual}`;
  }
  document.getElementById('profileBox').innerHTML = profileHtml;

  const nomesPranchas = ranked.map(p => p.nome).join(', ');
  const msg = `Oi! Fiz o questionário de recomendação de pranchas no site e o resultado indicou: ${nomesPranchas}. Volume alvo calculado: ~${alvo.toFixed(1)}L. Queria uma orientação pra fechar a escolha!`;
  document.getElementById('whatsappLink').href = `https://api.whatsapp.com/send?phone=5548991624339&text=${encodeURIComponent(msg)}`;

  const list = document.getElementById('resultsList');
  list.innerHTML = '';
  ranked.forEach((p, idx)=>{
    const div = document.createElement('div');
    div.className = 'board' + (idx===0 ? ' top' : '');
    const precoHtml = p.precoOriginal
      ? `<span class="price-original">R$ ${p.precoOriginal.toFixed(2).replace('.',',')}</span><span class="price price-sale">R$ ${p.preco.toFixed(2).replace('.',',')}</span>`
      : `<span class="price">R$ ${p.preco.toFixed(2).replace('.',',')}</span>`;
    div.innerHTML = `
      <div class="tags-row">
        ${idx===0 ? '<span class="tag">Melhor combinação</span>' : ''}
        ${p.desconto ? `<span class="tag tag-sale">${p.desconto}% OFF</span>` : ''}
      </div>
      <div class="board-top-row">
        <div>
          <h3>${p.nome}</h3>
          <p class="specs">${p.comprimento} · ${p.volume}L</p>
        </div>
        <div class="price-col">${precoHtml}</div>
      </div>
      <a class="link" href="${p.url}" target="_blank" rel="noopener">Ver na loja →</a>
    `;
    list.appendChild(div);
  });
}

function restart(){
  Object.keys(respostas).forEach(k=> delete respostas[k]);
  passoAtual = 0;
  document.getElementById('screen-results').classList.add('hidden');
  document.getElementById('screen-hero').classList.remove('hidden');
}
