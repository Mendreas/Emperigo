(()=>{
const ROOT='assets/generated-v58/snow-leopard/';
const SNOW_LEOPARD={
  id:'snow-leopard',name:'Leopardo-das-Neves',scientific:'Panthera uncia',status:'VU',statusLabel:'Vulnerável',category:'Mamíferos',region:'Ásia',place:'Ásia Central / Himalaias',lat:37.5,lng:84.5,initials:'LN',detailZoom:4,
  population:'3 920–6 390',trend:'Em declínio',habitat:'MONTANHAS ROCHOSAS E ZONAS ALPINAS DA ÁSIA CENTRAL',habitatDescription:'Vive sobretudo em terreno montanhoso frio, seco e escarpado, usando ravinas, cristas e afloramentos rochosos para se deslocar e caçar.',diet:'Predador de ungulados de montanha e pequenos mamíferos.',dietTitle:'DIETA: CARNÍVORA',fact:'A cauda pode aproximar-se do comprimento do corpo e ajuda no equilíbrio em terreno íngreme.',intro:'O “fantasma das montanhas” está adaptado a alguns dos ambientes mais frios e escarpados da Ásia. A sua distribuição atravessa 12 países e grande parte do habitat continua pouco estudada.',
  image:'https://commons.wikimedia.org/wiki/Special:FilePath/Snow%20leopard%20%28Panthera%20uncia%29.JPG',cardImage:'https://commons.wikimedia.org/wiki/Special:FilePath/Snow%20leopard%20%28Panthera%20uncia%29.JPG',documentaryImage:'https://commons.wikimedia.org/wiki/Special:FilePath/Snow%20leopard%20%28Panthera%20uncia%29.JPG',animalImage:ROOT+'animal.webp',photoPosition:'50% 50%',habitatImage:ROOT+'habitat.webp',habitatCredit:'Habitat editorial representativo das altas montanhas da Ásia Central.',mapImage:ROOT+'map_range.webp',mapHasTitle:true,rangeLabel:'Montanhas da Ásia Central e Himalaias',rangeMapNote:'Distribuição atual fragmentada através de 12 países, incluindo China, Mongólia, Índia, Nepal, Paquistão, Rússia e estados da Ásia Central.',rangePoints:[[31.5,79.5],[33.5,76.5],[37.5,84.5],[46.0,92.0],[49.0,89.0]],
  metrics:[{value:'90–115 cm',label:'COMPRIMENTO',note:'corpo sem a cauda'},{value:'55–65 cm',label:'ALTURA',note:'ao ombro'},{value:'27–55 kg',label:'PESO',note:'adultos'},{value:'~100 cm',label:'CAUDA',note:'quase tão longa como o corpo'},{value:'1 000–5 400 m',label:'ALTITUDE',note:'varia conforme a região'}],
  traits:[{title:'PELAGEM DENSA E ROSETAS',text:'O pelo espesso protege do frio e o padrão cinzento com rosetas quebra a silhueta entre rocha e neve.',crop:'48% 45%',zoom:1.75},{title:'PATAS LARGAS',text:'Patas grandes e peludas distribuem o peso na neve e melhoram a aderência em terreno rochoso.',crop:'62% 82%',zoom:2.35},{title:'CAUDA LONGA E ESPESSA',text:'A cauda ajuda no equilíbrio e pode envolver o corpo como proteção térmica durante o repouso.',crop:'8% 72%',zoom:2.0},{title:'OLHOS ADAPTADOS À BAIXA LUZ',text:'A atividade ao amanhecer e ao entardecer favorece uma visão eficiente em luminosidade reduzida.',crop:'79% 21%',zoom:2.55}],
  dietItems:['Íbex','Argali','Markhor','Pikas','Marmotas'],dietImages:[ROOT+'diet-01.webp',ROOT+'diet-02.webp',ROOT+'diet-03.webp',ROOT+'diet-04.webp',ROOT+'diet-05.webp'],dietNotes:['Presa importante','Ovelha selvagem','Cabra selvagem de montanha','Pequenos mamíferos','Roedores de montanha'],habitatFacts:['Terreno rochoso e escarpado','Clima frio e seco','Ravinas e cristas','Grandes áreas de vida'],story:{title:'Não consegue rugir como um leão ou um tigre.',text:'O leopardo-das-neves vocaliza através de miados, rosnados, uivos e “chuffing”, mas não produz um rugido típico dos grandes felinos.'},threats:['Conflito com criadores de gado','Caça furtiva e comércio ilegal','Declínio das presas selvagens','Fragmentação e infraestruturas','Alterações climáticas'],actions:['Coexistência com comunidades locais','Proteção de corredores montanhosos','Combate à caça furtiva','Recuperação das presas selvagens','Monitorização e investigação'],conservationMessage:'Proteger corredores de alta montanha, reduzir mortes retaliatórias e conservar as presas selvagens são medidas essenciais para manter populações ligadas e viáveis.',credit:'Fotografia documental: Wikimedia Commons; dados: WWF e Snow Leopard Trust.',sources:['WWF — Snow Leopard','Snow Leopard Trust — habitat, características e presas']
};
window.EM_PERIGO_SPECIES_ADDITIONS=[...(window.EM_PERIGO_SPECIES_ADDITIONS||[]),SNOW_LEOPARD];

/* Common data overlay: a newer data+assets definition replaces a stale catalogue row with the same id. */
const nativeFetch=window.fetch.bind(window);
window.fetch=async function(input,init){
  const response=await nativeFetch(input,init);
  const url=typeof input==='string'?input:(input&&input.url)||'';
  if(!/(^|\/)data\/species\.json(?:[?#]|$)/.test(url))return response;
  try{
    const rows=await response.clone().json();
    const additions=Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS)?window.EM_PERIGO_SPECIES_ADDITIONS:[];
    if(!Array.isArray(rows)||!additions.length)return response;
    const byId=new Map(additions.filter(x=>x&&x.id).map(x=>[x.id,x]));
    const merged=rows.map(row=>byId.has(row.id)?{...row,...byId.get(row.id)}:row);
    const present=new Set(merged.map(x=>x.id));
    additions.forEach(x=>{if(x&&x.id&&!present.has(x.id))merged.push(x)});
    return new Response(JSON.stringify(merged),{status:response.status,statusText:response.statusText,headers:new Headers(response.headers)});
  }catch(_){return response;}
};
})();