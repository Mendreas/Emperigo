(()=>{
const Q=s=>document.querySelector(s);
const SAFE=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

const ICONS={
 population:'<circle cx="9" cy="9" r="3"/><circle cx="15.5" cy="10" r="2.5"/><path d="M3 20c0-4 2.4-7 6-7s6 3 6 7M14 14c3 0 5 2 5 6"/>',
 status:'<path d="M12 3v18M5 12h14"/><path d="M7 7l10 10M17 7 7 17"/>',
 location:'<path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/>',
 weight:'<path d="M8 6h8l3 14H5L8 6Z"/><path d="M10 6a2 2 0 1 1 4 0"/>',
 length:'<path d="M3 12h18M3 12l3-3m-3 3 3 3m15-3-3-3m3 3-3 3"/>',
 social:'<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 20c0-4 2-7 5-7s5 3 5 7M11 20c0-4 2-7 5-7s5 3 5 7"/>',
 longevity:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16"/>',
 forest:'<path d="M12 3 7 10h3l-4 6h4v5h4v-5h4l-4-6h3Z"/>',
 mountain:'<path d="m3 19 6-10 4 6 2-3 6 7Z"/>',
 climate:'<path d="M7 17a5 5 0 0 1 5-8 6 6 0 0 1 10 4 4 4 0 0 1-1 8H8"/><path d="M4 5v3M2.5 6.5h3"/>',
 fire:'<path d="M13 2c2 5-1 6 2 9 1-3 3-3 4-5 2 4 2 7 0 11-2 4-8 6-12 2-4-4-2-9 2-12 0 3 2 4 4 5 1-3-2-5 0-8Z"/>',
 people:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M3 20c0-4 2-7 5-7s5 3 5 7m1-5c3 0 5 2 5 5"/>',
 habitat:'<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
 traffic:'<rect x="5" y="6" width="14" height="14" rx="2"/><path d="M8 6V4m8 2V4M8 10v7m4-7v7m4-7v7"/>',
 genetic:'<path d="M8 3c8 4 8 14 0 18m8-18C8 7 8 17 16 21M8 7h8M7 12h10M8 17h8"/>'
};
const icon=k=>`<svg class="v40-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]||ICONS.population}</svg>`;
const COMMONS='https://commons.wikimedia.org/wiki/Special:FilePath/';

const SPECIES={
 'PANDA-GIGANTE':{
  id:'giant-panda',
  hero:'assets/generated-v39/giant-panda/animal_main.webp',
  statsIcons:['population','status','location'],
  facts:[
   ['1 860','INDIVÍDUOS NA NATUREZA','estimativa de referência'],
   ['99%','DA DIETA É BAMBU','especialização extrema'],
   ['12–38 kg','DE BAMBU POR DIA','consumo diário'],
   ['10–16 h','A ALIMENTAR-SE','grande parte do dia'],
   ['1 200–3 500 m','ALTITUDE TÍPICA','florestas montanhosas']
  ],
  traits:[
   ['assets/generated-v39/giant-panda/animal_main.webp','POLEGAR “FALSO”','Um osso do pulso alongado funciona como um polegar e permite agarrar caules de bambu.','31% 69%',2.45],
   ['assets/generated-v39/giant-panda/animal_main.webp','MANCHAS ICÓNICAS','As áreas negras em redor dos olhos, orelhas e membros formam um padrão imediatamente reconhecível.','50% 20%',2.65],
   ['assets/generated-v39/giant-panda/animal_main.webp','PELO ESPESSO','A pelagem densa ajuda a suportar o frio e a humidade das montanhas.','33% 53%',3.1],
   [COMMONS+encodeURIComponent('Panda Cub from Wolong, Sichuan, China.JPG'),'BEBÉS MUITO PEQUENOS','As crias nascem minúsculas, cegas e rosadas, extremamente dependentes da mãe.','50% 45%',1]
  ],
  dietTitle:'DIETA: 99% BAMBU',
  dietIntro:'Apesar da ancestralidade carnívora, o panda evoluiu para uma dieta quase exclusivamente herbívora.',
  diet:[
   [COMMONS+encodeURIComponent('Bamboo leaves.jpg'),'FOLHAS','Folhas jovens e maduras'],
   [COMMONS+encodeURIComponent('Black Bamboo Stems.JPG'),'CAULES','Partes fibrosas do bambu'],
   [COMMONS+encodeURIComponent('Bamboo shoot.jpg'),'REBENTOS','Muito nutritivos na época certa'],
   [COMMONS+encodeURIComponent('Culm branch growing from bamboo node, Jardim Botânico de Lisboa, Lisbon, Portugal julesvernex2.jpg'),'RAMOS','Consumidos regularmente'],
   [COMMONS+encodeURIComponent('Bamboo Flowers.jpg'),'FLORES','Disponíveis ocasionalmente']
  ],
  story:['VOCÊ SABIA?','O “polegar” do panda não é realmente um dedo.','É um osso do pulso modificado que atua como uma pinça contra os restantes dedos e ajuda a segurar o bambu com enorme precisão.'],
  threats:[
   ['habitat','PERDA E FRAGMENTAÇÃO','Estradas, agricultura e desflorestação isolam manchas de floresta.'],
   ['forest','ESCASSEZ DE BAMBU','Alterações no habitat podem reduzir o alimento disponível.'],
   ['genetic','BAIXA TAXA REPRODUTIVA','A reprodução é lenta e as crias são muito vulneráveis.'],
   ['traffic','CAÇA ILEGAL','Armadilhas destinadas a outros animais ainda representam risco.'],
   ['climate','MUDANÇAS CLIMÁTICAS','As faixas de bambu podem deslocar-se e fragmentar ainda mais o habitat.']
  ]
 }
};

function renderStats(root,cfg){
 const holders=[...root.querySelectorAll('.stats-column .stat .ico')];
 cfg.statsIcons.forEach((k,i)=>{if(holders[i]){holders[i].classList.add('v40-stat-icon');holders[i].innerHTML=icon(k)}});
}
function renderFacts(root,cfg){
 const animalData=root.querySelector('#detail-animal .animal-data'); if(!animalData)return;
 root.querySelector('.v40-facts')?.remove();
 animalData.insertAdjacentHTML('afterend',`<section class="v40-facts">${cfg.facts.map(f=>`<article><strong>${SAFE(f[0])}</strong><b>${SAFE(f[1])}</b><small>${SAFE(f[2])}</small></article>`).join('')}</section>`);
}
function renderTraits(root,cfg){
 const unique=root.querySelector('.unique-grid'); if(!unique)return;
 unique.innerHTML=cfg.traits.map(t=>`<div class="unique-item v40-trait"><div class="crop"><img src="${t[0]}" alt="${SAFE(t[1])}" style="object-position:${SAFE(t[3]||'50% 50%')};--trait-zoom:${Number(t[4]||1)}"></div><div><h4>${SAFE(t[1])}</h4><p>${SAFE(t[2])}</p></div></div>`).join('');
}
function renderDiet(root,cfg){
 const card=root.querySelector('.diet-card'); if(!card)return;
 card.innerHTML=`<div class="heading"><span class="brush">${SAFE(cfg.dietTitle)}</span></div><p class="v40-diet-intro">${SAFE(cfg.dietIntro)}</p><div class="v40-diet-grid">${cfg.diet.map(d=>`<article><img src="${d[0]}" alt="${SAFE(d[1])}" loading="lazy" referrerpolicy="no-referrer"><b>${SAFE(d[1])}</b><small>${SAFE(d[2])}</small></article>`).join('')}</div></div>`;
}
function renderStory(root,cfg){
 const mid=root.querySelector('#detail-habitat .middle-grid'); if(!mid)return;
 root.querySelector('.v40-story')?.remove();
 mid.insertAdjacentHTML('afterend',`<aside class="v40-story"><span>${SAFE(cfg.story[0])}</span><strong>${SAFE(cfg.story[1])}</strong><p>${SAFE(cfg.story[2])}</p></aside>`);
}
function renderThreats(root,cfg){
 const tg=root.querySelector('.threat-grid'); if(!tg)return;
 tg.innerHTML=cfg.threats.map(t=>`<div class="threat-item"><span class="ico v40-threat">${icon(t[0])}</span><div><b>${SAFE(t[1])}</b><small>${SAFE(t[2])}</small></div></div>`).join('');
}
function apply(){
 const root=Q('#detailContent'); if(!root)return;
 const title=root.querySelector('.info-title h1')?.textContent?.trim().toUpperCase();
 const cfg=SPECIES[title]; if(!cfg)return;
 const info=root.querySelector('.infographic'); if(!info)return;
 const stamp=`${cfg.id}:v401`;
 if(info.dataset.v40Engine===stamp)return;
 info.dataset.v40Engine=stamp; info.classList.add('v40-engine',`v40-${cfg.id}`);
 const hero=root.querySelector('.animal-visual img'); if(hero){hero.src=cfg.hero;hero.alt=title;hero.classList.add('v40-hero')}
 renderStats(root,cfg);renderFacts(root,cfg);renderTraits(root,cfg);renderDiet(root,cfg);renderStory(root,cfg);renderThreats(root,cfg);
}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply()})}
const start=()=>{const d=Q('#detailContent');if(d)new MutationObserver(schedule).observe(d,{childList:true,subtree:true});schedule()};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
document.addEventListener('click',()=>setTimeout(schedule,0),true);
})();