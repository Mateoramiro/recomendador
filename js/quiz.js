// ---------- Fluxo do questionário (telas, perguntas, navegação) ----------
function iniciar(){
  document.getElementById('screen-hero').classList.add('hidden');
  document.getElementById('screen-quiz').classList.remove('hidden');
  passoAtual = 0;
  renderStep();
}

function renderStep(){
  const q = QUESTIONS[passoAtual];
  document.getElementById('stepLabel').textContent = `Pergunta ${passoAtual+1} de ${QUESTIONS.length}`;
  document.getElementById('progressFill').style.width = `${(passoAtual/QUESTIONS.length)*100}%`;

  const area = document.getElementById('questionArea');
  const navRight = document.getElementById('navRight');
  navRight.innerHTML = '';
  let html = `<p class="question">${q.pergunta}</p>`;
  if(q.hint) html += `<p class="q-hint">${q.hint}</p>`;

  if(q.tipo === 'select'){
    html += '<div class="options">';
    q.opcoes.forEach(o=>{
      const sel = respostas[q.id] === o.value ? 'selected' : '';
      html += `<button class="opt ${sel}" data-value="${o.value}">${o.label}${o.sub ? `<small>${o.sub}</small>` : ''}</button>`;
    });
    html += '</div>';
    area.innerHTML = html;
    area.querySelectorAll('.opt').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        respostas[q.id] = btn.dataset.value;
        avancar();
      });
    });
  }
  else if(q.tipo === 'multiselect'){
    if(!Array.isArray(respostas[q.id])) respostas[q.id] = [];
    html += '<div class="options">';
    q.opcoes.forEach(o=>{
      const sel = respostas[q.id].includes(o.value) ? 'selected' : '';
      html += `<button class="opt ${sel}" data-value="${o.value}">${o.label}</button>`;
    });
    html += '</div>';
    area.innerHTML = html;
    area.querySelectorAll('.opt').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const v = btn.dataset.value;
        const arr = respostas[q.id];
        const idx = arr.indexOf(v);
        if(idx >= 0) arr.splice(idx,1); else arr.push(v);
        renderStep();
      });
    });
    const contBtn = document.createElement('button');
    contBtn.className = 'btn';
    contBtn.textContent = 'Continuar';
    contBtn.onclick = avancar;
    navRight.appendChild(contBtn);
  }
  else if(q.tipo === 'number'){
    html += `<input type="number" id="inp-${q.id}" placeholder="${q.placeholder||''}" min="${q.min||''}" max="${q.max||''}" value="${respostas[q.id]||''}">`;
    area.innerHTML = html;
    const confBtn = document.createElement('button');
    confBtn.className = 'btn';
    confBtn.textContent = 'Confirmar';
    confBtn.onclick = ()=>{
      const val = parseFloat(document.getElementById(`inp-${q.id}`).value);
      if(!val || val <= 0) return;
      respostas[q.id] = val;
      avancar();
    };
    navRight.appendChild(confBtn);
  }
  else if(q.tipo === 'text'){
    html += `<input type="text" id="inp-${q.id}" placeholder="${q.placeholder||''}" value="${respostas[q.id]||''}">`;
    area.innerHTML = html;
    const confBtn = document.createElement('button');
    confBtn.className = 'btn';
    confBtn.textContent = q.opcional ? 'Continuar' : 'Confirmar';
    confBtn.onclick = ()=>{
      respostas[q.id] = document.getElementById(`inp-${q.id}`).value.trim();
      avancar();
    };
    navRight.appendChild(confBtn);
    if(q.opcional){
      const skipBtn = document.createElement('button');
      skipBtn.className = 'btn secondary';
      skipBtn.textContent = 'Pular';
      skipBtn.onclick = ()=>{ respostas[q.id]=''; avancar(); };
      navRight.insertBefore(skipBtn, confBtn);
    }
  }
}

function avancar(){
  passoAtual++;
  if(passoAtual >= QUESTIONS.length){ mostrarResultados(); }
  else{ renderStep(); }
}

function voltar(){
  if(passoAtual === 0){
    document.getElementById('screen-hero').classList.remove('hidden');
    document.getElementById('screen-quiz').classList.add('hidden');
    return;
  }
  passoAtual--;
  document.getElementById('screen-results').classList.add('hidden');
  document.getElementById('screen-quiz').classList.remove('hidden');
  renderStep();
}
