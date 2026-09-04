(()=>{
const ROOT='assets/generated-v67/vaquita/';
const PATCH={
 id:'vaquita',name:'Vaquita',scientific:'Phocoena sinus',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos marinhos',region:'América do Norte',place:'Norte do Golfo da Califórnia, México',population:'7–10',trend:'Extremamente reduzida; sem declínio detetável face aos anos imediatamente anteriores',initials:'VA',
 intro:'O golfinho mais raro do mundo. Pequena no tamanho e imensa no valor ecológico, a vaquita vive apenas no extremo norte do Golfo da Califórnia e continua ameaçada sobretudo pelas redes de emalhar ilegais.',
 animalImage:ROOT+'animal.webp',image:ROOT+'animal.webp',cardImage:ROOT+'documentary.webp',documentaryImage:ROOT+'documentary.webp',
 habitat:'Águas costeiras rasas do Alto Golfo da Califórnia',habitatDescription:'Vive exclusivamente no extremo norte do Golfo da Califórnia, no México, em águas costeiras relativamente rasas, turvas e produtivas. É o cetáceo com uma das distribuições geográficas mais pequenas do mundo.',habitatImage:ROOT+'habitat.webp',mapImage:ROOT+'map_range.webp',mapHasTitle:true,rangeLabel:'Alto Golfo da Califórnia, México',
 metrics:[{value:'7–10',label:'POPULAÇÃO',note:'estimativa do levantamento de 2025'},{value:'CR',label:'IUCN',note:'criticamente em perigo'},{value:'México',label:'DISTRIBUIÇÃO',note:'Alto Golfo da Califórnia'},{value:'~1,5 m',label:'COMPRIMENTO',note:'até cerca de 1,5 m'}],
 traits:[
 {title:'BARBATANA DORSAL ARREDONDADA',text:'Apresenta uma barbatana dorsal relativamente baixa, triangular e arredondada, adequada ao corpo compacto da espécie.',image:ROOT+'trait-01.webp'},
 {title:'ANÉIS ESCUROS NOS OLHOS',text:'As manchas negras em torno dos olhos são uma das características visuais mais distintivas da vaquita.',image:ROOT+'trait-02.webp'},
 {title:'CORPO PEQUENO E ROBUSTO',text:'É a menor marsopa do mundo, com corpo compacto, dorso cinzento-escuro e ventre mais claro.',image:ROOT+'trait-03.webp'},
 {title:'ROSTRO MUITO CURTO',text:'A cabeça é arredondada e não apresenta um bico pronunciado, característica típica das marsopas.',image:ROOT+'trait-04.webp'}],
 diet:'Alimenta-se de pequenos peixes, lulas e outros organismos marinhos que captura nas águas costeiras do seu habitat.',dietTitle:'DIETA PRINCIPAL',dietItems:['Peixes demersais','Lulas','Peixes pequenos'],dietNotes:['Presas próximas do fundo','Cefalópodes costeiros','Pequenos peixes locais'],dietImages:[1,2,3].map(i=>ROOT+`diet-0${i}.webp`),
 habitatFacts:['Alto Golfo da Califórnia','Águas costeiras rasas','Águas turvas e produtivas','Distribuição extremamente restrita'],
 threats:['Redes de emalhar e pesca ilegal','Pesca ilegal de totoaba','Captura acidental e afogamento','Perturbação humana no habitat'],
 actions:['Eliminar redes de emalhar do habitat','Combater a pesca e o tráfico ilegal de totoaba','Apoiar artes de pesca seguras para a vaquita','Apoiar fiscalização, ciência e conservação local'],
 conservationMessage:'A sobrevivência da vaquita depende de uma decisão concreta: retirar as redes de emalhar do seu habitat.',
 sources:['WWF — Vaquita (2025 survey)','IUCN Red List / Cetacean Specialist Group']
};
function apply(o){if(o&&(o.id==='vaquita'||o.scientific==='Phocoena sinus'))Object.assign(o,PATCH);return o;}
const a=window.EM_PERIGO_SPECIES_ADDITIONS;if(Array.isArray(a))a.forEach(apply);
const oldFetch=window.fetch;if(oldFetch)window.fetch=async function(...args){const r=await oldFetch.apply(this,args);try{const u=String(args[0]&&args[0].url||args[0]||'');if(/species\.json(?:\?|$)/.test(u)){const data=await r.clone().json();if(Array.isArray(data)){data.forEach(apply);return new Response(JSON.stringify(data),{status:r.status,statusText:r.statusText,headers:r.headers});}}}catch(e){}return r;};
})();