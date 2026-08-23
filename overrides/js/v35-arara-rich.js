(()=>{
const q=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const icon=(symbol)=>`<span class="v35-symbol" aria-hidden="true">${symbol}</span>`;
const facts=[
 ['↔','COMPRIMENTO','cerca de 100 cm','Da cabeça à ponta da longa cauda.'],
 ['⚖','PESO','aprox. 1,2–1,7 kg','É a maior arara e o maior psitacídeo voador em comprimento.'],
 ['⌖','ONDE VIVE','América do Sul','Três núcleos principais: Pantanal/centro-sul, Brasil central e nordeste do Brasil.'],
 ['●●','SOCIAL','Pares e pequenos grupos','É sociável e comunicativa; pode reunir-se em bandos maiores.'],
 ['♡','VÍNCULO DO CASAL','Pares duradouros','Os casais mantêm forte fidelidade aos locais de alimentação e reprodução.']
];
const diets=[
 ['◉','ACURI','Alimento-chave no Pantanal'],['◉','BOCAIÚVA','Alimento-chave no Pantanal'],['◉','BABAÇU','Consumido noutras regiões'],['◉','INAJÁ','Frutos e sementes de palmeira'],['◉','BURITI','Recurso alimentar regional'],['✿','OUTROS FRUTOS','Complementam a dieta quando disponíveis']
];
const threats=[
 ['TRÁFICO ILEGAL','Captura para o comércio de aves continua a ser uma ameaça.'],['PERDA DE HABITAT','Conversão e fragmentação reduzem áreas de alimentação e reprodução.'],['QUEIMADAS E INCÊNDIOS','Destroem palmeiras, árvores-ninho e áreas de alimentação.'],['PERDA DE ÁRVORES-NINHO','Grandes cavidades adequadas à reprodução são um recurso limitado.'],['ALTERAÇÕES CLIMÁTICAS','Secas e mudanças no regime de fogo podem degradar o habitat.']
];
function enrich(){
 const root=q('#detailContent'); if(!root||root.dataset.v35==='1')return;
 const title=root.querySelector('.info-title h1'); if(!title||!title.textContent.toUpperCase().includes('ARARA-AZUL-GRANDE'))return;
 root.dataset.v35='1'; root.classList.add('v35-arara');
 const animal=root.querySelector('#detail-animal .animal-data');
 if(animal){const panel=document.createElement('div');panel.className='v35-facts';panel.innerHTML=`<span class="brush v35-heading">A ARARA EM NÚMEROS</span><div class="v35-facts-grid">${facts.map(f=>`<article>${icon(f[0])}<div><b>${esc(f[1])}</b><strong>${esc(f[2])}</strong><small>${esc(f[3])}</small></div></article>`).join('')}</div>`;animal.insertAdjacentElement('afterend',panel)}
 const ug=root.querySelector('.unique-grid'); if(ug){ug.insertAdjacentHTML('beforeend',`<div class="unique-item v35-extra-trait"><div class="v35-trait-icon">◉</div><div><h4>ANEL AMARELO MARCANTE</h4><p>A pele amarela nua em redor dos olhos e junto à base do bico contrasta fortemente com a plumagem azul-cobalto.</p></div></div>`)}
 const diet=root.querySelector('.diet-card'); if(diet){diet.innerHTML=`<div class="heading"><span class="brush">DIETA: FRUGÍVORA E GRANÍVORA</span></div><h3>Especialista em frutos e sementes de palmeiras</h3><p class="v35-diet-intro">O bico extremamente forte permite abrir sementes muito duras. A dieta varia regionalmente conforme as palmeiras disponíveis.</p><div class="v35-diet-grid">${diets.map(d=>`<article>${icon(d[0])}<b>${esc(d[1])}</b><small>${esc(d[2])}</small></article>`).join('')}</div><div class="v35-eco-note">🌱 Ao deslocar e manipular frutos e sementes, participa nas interações ecológicas das paisagens onde vive.</div>`}
 const middle=root.querySelector('#detail-habitat .middle-grid'); if(middle){middle.insertAdjacentHTML('afterend',`<aside class="v35-didyouknow"><span>VOCÊ SABIA?</span><strong>Um gigante azul com relações ecológicas surpreendentes</strong><p>No Pantanal, a arara-azul-grande nidifica sobretudo em cavidades de grandes árvores. O tucano-toco ajuda a dispersar sementes dessas árvores, embora também possa predar ovos — uma ligação ecológica invulgar.</p></aside>`)}
 const tg=root.querySelector('.threat-grid'); if(tg){tg.innerHTML=threats.map(t=>`<div class="threat-item"><span class="ico">⚠</span><div><b>${esc(t[0])}</b><small>${esc(t[1])}</small></div></div>`).join('')}
 const save=root.querySelector('.save-grid'); if(save){save.insertAdjacentHTML('beforeend',`<div class="save-item"><span class="v35-action-icon">◎</span><b>PROTEGER PALMEIRAS E ÁRVORES-NINHO</b><small>Manter alimento e cavidades de reprodução nas paisagens da espécie.</small></div>`)}
 const closing=root.querySelector('.closing .message'); if(closing)closing.textContent='Proteger a arara-azul-grande exige conservar palmeirais, árvores-ninho e paisagens conectadas, além de combater a captura ilegal.';
}
const obs=new MutationObserver(enrich);obs.observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('click',()=>setTimeout(enrich,0));setTimeout(enrich,300);
})();