(()=>{
const COMMONS='https://commons.wikimedia.org/wiki/Special:FilePath/';
const ROOT='assets/generated-v57/saola/';
const HERO=`${ROOT}animal.webp`;
const MAP=`${ROOT}map_range.webp`;
const HABITAT=`${ROOT}habitat.webp`;
const DIET=[
 [`${ROOT}diet-01.webp`,'FOLHAS','Parte importante da alimentação'],
 [`${ROOT}diet-02.webp`,'REBENTOS','Vegetação jovem e tenra'],
 [`${ROOT}diet-03.webp`,'PLANTAS HERBÁCEAS','Consumidas no sub-bosque'],
 [`${ROOT}diet-04.webp`,'VEGETAÇÃO RIBEIRINHA','Associada a vales e cursos de água'],
 [`${ROOT}diet-05.webp`,'FOLHAS DE ARBUSTOS','Complemento vegetal']
];
const TRAITS=[
 ['CORNOS LONGOS E PARALELOS','Machos e fêmeas possuem dois cornos quase paralelos que podem atingir cerca de 50 cm.','50% 12%','1.65'],
 ['MARCAS FACIAIS BRANCAS','As manchas claras na face contrastam fortemente com a pelagem castanha.','50% 27%','2.25'],
 ['GLÂNDULAS FACIAIS','Glândulas maxilares muito desenvolvidas parecem ter um papel importante na comunicação química.','48% 34%','2.35']
];
const SAOLA={
 id:'saola',name:'Saola',scientific:'Pseudoryx nghetinhensis',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'Ásia',place:'Vietname / Laos',lat:17.8,lng:105.7,
 population:'Desconhecida',trend:'Em declínio',habitat:'Florestas perenes húmidas das Montanhas Anamitas',diet:'Folhas, rebentos, plantas herbáceas e vegetação ribeirinha; dieta ainda pouco conhecida',fact:'Foi descrita cientificamente apenas em 1992 e é conhecida como “unicórnio asiático”.',
 threats:['Laços e armadilhas de caça','Perda e fragmentação de habitat','Comércio de fauna selvagem','População extremamente pequena'],
 actions:['Remoção de armadilhas','Patrulhas e proteção florestal','Monitorização por câmaras e DNA ambiental','Proteção das reservas de saola'],
 image:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG'),cardImage:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG'),photoPosition:'50% 42%',initials:'SA',detailZoom:6,
 rangeLabel:'Montanhas Anamitas, Vietname e Laos',rangePoints:[[18.2,105.4],[17.6,105.8],[16.3,107.4]],rangePolygon:[[19.1,104.8],[18.4,105.2],[17.7,105.7],[16.8,106.5],[15.8,107.4],[16.0,107.9],[17.0,107.1],[18.0,106.2],[19.2,105.4]],
 intro:'Um dos mamíferos mais raros do mundo, o saola vive apenas nas florestas húmidas das Montanhas Anamitas, entre o Vietname e o Laos. A população selvagem é desconhecida e não existem animais em cativeiro.',
 traits:TRAITS.map(t=>({title:t[0],text:t[1],crop:t[2],detailImage:HERO})),
 dietItems:DIET.map(d=>d[1]),dietIconKeys:['leaf','shoot','leaf','leaf','leaf'],
 habitatFacts:['Floresta perene húmida','Montanhas Anamitas','Vales e cursos de água','Pouca ou nenhuma estação seca'],
 habitatImage:HABITAT,habitatCredit:'Habitat representativo das Montanhas Anamitas.',
 credit:'Imagem documental de referência — Wikimedia Commons.',sources:['WWF — Saola','IUCN Red List — Pseudoryx nghetinhensis'],
 rangeMapNote:'Distribuição restrita e fragmentada nas Montanhas Anamitas do Vietname e Laos; a localização exata das populações remanescentes é incerta.',sectionSources:{status:'IUCN Red List / WWF',range:'WWF / conhecimento de distribuição nas Montanhas Anamitas',habitat:'WWF — florestas perenes húmidas das Montanhas Anamitas'},
 conservationMessage:'Reduzir drasticamente os laços de caça e localizar os últimos indivíduos são prioridades imediatas para evitar a extinção do saola.'
};
async function inject(){
 try{
  const r=await fetch('data/species.json',{cache:'no-store'});const a=await r.json();if(!a.some(x=>x.id==='saola'))a.push(SAOLA);
  const oldFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{const u=typeof input==='string'?input:(input&&input.url)||'';if(/data\/species\.json(?:\?|$)/.test(u))return Promise.resolve(new Response(JSON.stringify(a),{status:200,headers:{'Content-Type':'application/json'}}));return oldFetch(input,init)};
 }catch(e){console.warn('Saola preload failed',e)}
}
function isSaola(root){return !!root&&((root.querySelector('.info-title h1,h1')?.textContent||'').trim().toUpperCase()==='SAOLA'||(root.textContent||'').toUpperCase().includes('PSEUDORYX NGHETINHENSIS'));}
function styles(){if(document.getElementById('v57-saola-styles'))return;const s=document.createElement('style');s.id='v57-saola-styles';s.textContent=`#detailContent .v57-map{display:block!important;width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important}#detailContent .v57-diet{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:28px 16px!important;align-items:start!important}#detailContent .v57-diet article{width:auto!important;margin:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;min-width:0!important}#detailContent .v57-diet img{width:150px!important;height:150px!important;max-width:100%!important;object-fit:cover!important;border-radius:50%!important;display:block!important;margin:0 auto 10px!important}@media(max-width:700px){#detailContent .v57-diet{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:24px 10px!important}#detailContent .v57-diet img{width:min(34vw,150px)!important;height:min(34vw,150px)!important}}`;document.head.appendChild(s)}
let busy=false,scheduled=false;
function apply(){if(busy)return;const root=document.getElementById('detailContent');if(!isSaola(root))return;const info=root.querySelector('.infographic');if(!info||info.dataset.v57Applied==='1')return;busy=true;try{info.dataset.v57Applied='1';styles();
 const hero=root.querySelector('.animal-visual img');if(hero){hero.src=HERO;hero.alt='Saola';hero.classList.add('zoomable-image');hero.style.objectFit='contain';hero.style.objectPosition='center bottom'}
 const grid=root.querySelector('.unique-grid');if(grid)grid.innerHTML=TRAITS.map(t=>`<div class="unique-item v40-trait"><div class="crop"><img class="zoomable-image" src="${HERO}" alt="${t[0]}" style="width:100%!important;height:100%!important;object-fit:cover!important;object-position:${t[2]}!important;transform:scale(${t[3]})!important;transform-origin:${t[2]}!important"></div><div><h4>${t[0]}</h4><p>${t[1]}</p></div></div>`).join('');
 const card=root.querySelector('.where-card');if(card){card.querySelector(':scope > .heading')?.remove();let img=card.querySelector('img');const dyn=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');if(dyn&&dyn.tagName!=='IMG'){img=document.createElement('img');dyn.replaceWith(img)}if(!img){img=document.createElement('img');card.prepend(img)}img.src=MAP;img.alt='Mapa editorial da distribuição da Saola';img.className='v57-map zoomable-image'}
 const habitat=root.querySelector('.habitat-card img,.habitat-hero img,.habitat-photo img');if(habitat){habitat.src=HABITAT;habitat.classList.add('zoomable-image')}
 const dietCard=root.querySelector('.v40-diet-card,.diet-card');if(dietCard)dietCard.innerHTML=`<div class="heading"><span class="brush">DIETA: HERBÍVORA</span></div><p class="v40-diet-intro">A dieta conhecida inclui folhas, rebentos e outras plantas; por ser uma espécie extremamente rara, a alimentação permanece pouco documentada.</p><div class="v40-diet-grid v57-diet">${DIET.map(d=>`<article><img class="zoomable-image" src="${d[0]}" alt="${d[1]}" loading="lazy"><b>${d[1]}</b><small>${d[2]}</small></article>`).join('')}</div>`;
 root.querySelectorAll('img').forEach(i=>i.classList.add('zoomable-image'));
}catch(e){console.error('Saola assets',e)}finally{busy=false}}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply()})}
function start(){const root=document.getElementById('detailContent');if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});document.addEventListener('click',()=>setTimeout(schedule,0),true);schedule()}
inject();document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();