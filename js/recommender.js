// ---------- Lógica de recomendação ----------
function calcularSkillScore(){
  let s = { iniciante:0.2, intermediario:0.55, avancado:0.85 }[respostas.nivel] ?? 0.4;
  if(respostas.pegaOnda === 'sim') s += 0.1;
  else if(respostas.pegaOnda === 'nao') s -= 0.15;
  if(respostas.bottomTurn === 'sim') s += 0.1;
  else if(respostas.bottomTurn === 'parcial') s += 0.03;
  else if(respostas.bottomTurn === 'nao') s -= 0.05;
  if(respostas.tempo === 'mais3a') s += 0.05;
  else if(respostas.tempo === 'menos6m') s -= 0.05;
  if(respostas.frequencia === 'alta') s += 0.05;
  else if(respostas.frequencia === 'baixa') s -= 0.05;
  return Math.min(1, Math.max(0, s));
}

function calcularVolumeAlvo(skillScore){
  const fator = 0.58 - 0.32*skillScore;
  const ajusteMar = { fraco:1.12, medio:1.0, forte:0.88 };
  let alvo = respostas.peso * fator * (ajusteMar[respostas.mar] ?? 1);

  if(respostas.dificuldadeRemar === 'sim') alvo *= 1.08;
  else if(respostas.dificuldadeRemar === 'as_vezes') alvo *= 1.04;

  if(respostas.dificuldadeEntrar === 'sim') alvo *= 1.05;
  else if(respostas.dificuldadeEntrar === 'as_vezes') alvo *= 1.02;

  if(respostas.pegaOnda === 'nao') alvo *= 1.08;
  else if(respostas.pegaOnda === 'parcial') alvo *= 1.03;

  if(respostas.objetivo === 'ondas') alvo *= 1.06;
  else if(respostas.objetivo === 'performance') alvo *= 0.94;

  return Math.min(respostas.peso*0.75, Math.max(respostas.peso*0.15, alvo));
}

function nivelEfetivo(skillScore){
  if(skillScore < 0.35) return 'iniciante';
  if(skillScore < 0.65) return 'intermediario';
  return 'avancado';
}

function marParaMatch(){
  if(respostas.tamanhoOndas === 'grandes' && respostas.mar === 'medio') return 'forte';
  return respostas.mar;
}

function pontuarPrancha(p, alvo, nivelEf, marEf){
  const volumeScore = Math.max(0, 1 - Math.abs(p.volume - alvo)/alvo);
  const nivelScore = p.niveis.includes(nivelEf) ? 1 : 0.4;
  const marScore = p.mares.includes(marEf) ? 1 : 0.5;

  let pontosScore = 0.7;
  const falta = (respostas.senteFalta || []).filter(v=>v!=='nada');
  if(falta.length){
    const overlap = falta.filter(v=>p.pontosFortes.includes(v)).length;
    pontosScore = overlap / falta.length;
  }

  return volumeScore*0.45 + nivelScore*0.25 + marScore*0.15 + pontosScore*0.15;
}
