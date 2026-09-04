(()=>{
const ROOT='assets/generated-v68/yangtze-finless-porpoise/';
const PATCH={
 id:'yangtze-finless-porpoise',name:'Marsopa-sem-Barbatana-do-Yangtzé',scientific:'Neophocaena asiaeorientalis asiaeorientalis',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos marinhos',region:'Ásia',place:'Rio Yangtzé, China',population:'1 000–1 800',trend:'População muito reduzida, sob forte pressão',initials:'MY',
 intro:'Um tesouro do rio Yangtzé, agora à beira do silêncio. Esta pequena marsopa de água doce depende de um rio saudável, com alimento abundante, água limpa e zonas seguras para sobreviver.',
 animalImage:ROOT+'animal.webp',image:ROOT+'documentary.webp',cardImage:ROOT+'documentary.webp',documentaryImage:ROOT+'documentary.webp',
 habitat:'Rio Yangtzé e lagos ligados ao sistema fluvial',habitatDescription:'Vive exclusivamente no sistema do Yangtzé, sobretudo no curso médio e inferior e em lagos conectados como Poyang e Dongting. Precisa de águas com boa qualidade, alimento suficiente e menor perturbação humana.',habitatImage:ROOT+'habitat.webp',mapImage:ROOT+'map_range.webp',mapHasTitle:true,rangeLabel:'Curso médio e inferior do rio Yangtzé e lagos associados, China',
 metrics:[{value:'1 000–1 800',label:'POPULAÇÃO',note:'estimativa WWF'},{value:'CR',label:'IUCN',note:'criticamente em perigo'},{value:'1,2–1,8 m',label:'COMPRIMENTO',note:'aproximadamente'},{value:'40–70 kg',label:'PESO',note:'aproximadamente'}],
 traits:[
  {title:'SEM BARBATANA DORSAL',text:'Em vez de uma barbatana dorsal, possui uma crista baixa no dorso, característica que dá nome ao grupo.',image:ROOT+'trait-01.webp'},
  {title:'CABEÇA ARREDONDADA',text:'A cabeça é arredondada e o focinho é curto, dando-lhe uma silhueta muito distinta.',image:ROOT+'trait-02.webp'},
  {title:'OLHOS PEQUENOS',text:'Tem olhos relativamente pequenos e depende muito da ecolocalização para navegar e encontrar presas em águas turvas.',image:ROOT+'trait-03.webp'},
  {title:'ECOLOCALIZAÇÃO',text:'Comunica e orienta-se através de cliques e assobios de alta frequência, essenciais num rio com baixa visibilidade.',image:ROOT+'trait-04.webp'}],
 diet:'Alimenta-se sobretudo de pequenos peixes, camarões e outros crustáceos presentes no sistema fluvial.',dietTitle:'DIETA: PEIXES E PEQUENOS ANIMAIS AQUÁTICOS',dietItems:['Peixes','Camarões','Crustáceos'],dietNotes:['Principal fonte de alimento','Consumidos regularmente','Complementam a dieta'],dietImages:[1,2,3].map(i=>ROOT+`diet-0${i}.webp`),
 habitatFacts:['Rio Yangtzé','Lagos Poyang e Dongting','Água doce','Curso médio e inferior'],
 threats:['Captura acidental em redes de pesca','Tráfego fluvial e colisões','Poluição da água','Barragens e alteração do fluxo do rio','Perda e degradação do habitat'],
 actions:['Proteger áreas críticas do Yangtzé','Reduzir pesca ilegal e captura acidental','Melhorar a qualidade da água','Restaurar habitats e conectividade fluvial','Monitorizar populações'],
 conservationMessage:'Sem um Yangtzé saudável, não há futuro para a marsopa.',
 sources:['WWF — Yangtze Finless Porpoise','IUCN Red List']
};
function apply(o){if(o&&(o.id==='yangtze-finless-porpoise'||o.scientific==='Neophocaena asiaeorientalis asiaeorientalis'||o.scientific==='Neophocaena asiaeorientalis ssp. asiaeorientalis'))Object.assign(o,PATCH);return o;}
const a=window.EM_PERIGO_SPECIES_ADDITIONS;if(Array.isArray(a))a.forEach(apply);
const oldFetch=window.fetch;if(oldFetch)window.fetch=async function(...args){const r=await oldFetch.apply(this,args);try{const u=String(args[0]&&args[0].url||args[0]||'');if(/species\.json(?:[?#]|$)/.test(u)){const data=await r.clone().json();if(Array.isArray(data)){data.forEach(apply);return new Response(JSON.stringify(data),{status:r.status,statusText:r.statusText,headers:new Headers(r.headers)});}}}catch(e){}return r;};
})();