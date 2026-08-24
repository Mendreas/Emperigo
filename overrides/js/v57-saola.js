(()=>{
const COMMONS='https://commons.wikimedia.org/wiki/Special:FilePath/';
const SAOLA={
 id:'saola',name:'Saola',scientific:'Pseudoryx nghetinhensis',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'Ásia',place:'Vietname / Laos',lat:17.8,lng:105.7,
 population:'Desconhecida',trend:'Em declínio',habitat:'Florestas perenes húmidas das Montanhas Anamitas',diet:'Vegetação florestal; dieta pouco conhecida',fact:'Foi descrita cientificamente apenas em 1992 e é conhecida como “unicórnio asiático”.',
 threats:['Laços e armadilhas de caça','Perda e fragmentação de habitat','Comércio de fauna selvagem','População extremamente pequena'],
 actions:['Remoção de armadilhas','Patrulhas e proteção florestal','Monitorização por câmaras e DNA ambiental','Proteção das reservas de saola'],
 image:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG'),cardImage:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG'),photoPosition:'50% 42%',initials:'SA',detailZoom:6,
 rangeLabel:'Montanhas Anamitas, Vietname e Laos',rangePoints:[[18.2,105.4],[17.6,105.8],[16.3,107.4]],rangePolygon:[[19.1,104.8],[18.4,105.2],[17.7,105.7],[16.8,106.5],[15.8,107.4],[16.0,107.9],[17.0,107.1],[18.0,106.2],[19.2,105.4]],
 intro:'Um dos mamíferos mais raros do mundo, o saola vive apenas nas florestas húmidas das Montanhas Anamitas, entre o Vietname e o Laos. A população selvagem é desconhecida e não existem animais em cativeiro.',
 traits:[
  {title:'Cornos longos e paralelos',text:'Machos e fêmeas possuem dois cornos quase paralelos que podem atingir cerca de 50 cm.',crop:'50% 22%',detailImage:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG')},
  {title:'Marcas faciais brancas',text:'As manchas claras na face contrastam fortemente com a pelagem castanha.',crop:'50% 32%',detailImage:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG')},
  {title:'Grandes glândulas faciais',text:'Possui glândulas maxilares muito desenvolvidas, provavelmente usadas em comunicação química.',crop:'50% 35%',detailImage:COMMONS+encodeURIComponent('Pseudoryx nghetinhensis.PNG')}
 ],
 dietItems:['Folhas','Rebentos','Plantas herbáceas','Vegetação ribeirinha'],dietIconKeys:['leaf','shoot','leaf','leaf'],
 habitatFacts:['Floresta perene húmida','Montanhas Anamitas','Vales e cursos de água','Pouca ou nenhuma estação seca'],
 habitatImage:COMMONS+encodeURIComponent('Annamite Range.jpg'),habitatCredit:'Habitat representativo das Montanhas Anamitas — Wikimedia Commons.',
 credit:'Imagem documental de referência — Wikimedia Commons.',sources:['WWF — Saola','IUCN Red List — Pseudoryx nghetinhensis'],
 rangeMapNote:'Distribuição restrita e fragmentada nas Montanhas Anamitas do Vietname e Laos; a localização exata das populações remanescentes é incerta.',sectionSources:{status:'IUCN Red List / WWF',range:'WWF / conhecimento de distribuição nas Montanhas Anamitas',habitat:'WWF — florestas perenes húmidas das Montanhas Anamitas'},
 conservationMessage:'Reduzir drasticamente os laços de caça e localizar os últimos indivíduos são prioridades imediatas para evitar a extinção do saola.'
};
async function inject(){
 try{
  const r=await fetch('data/species.json',{cache:'no-store'}); const a=await r.json(); if(a.some(x=>x.id==='saola')) return;
  a.push(SAOLA);
  const oldFetch=window.fetch.bind(window);
  window.fetch=(input,init)=>{const u=typeof input==='string'?input:(input&&input.url)||'';if(/data\/species\.json(?:\?|$)/.test(u))return Promise.resolve(new Response(JSON.stringify(a),{status:200,headers:{'Content-Type':'application/json'}}));return oldFetch(input,init)};
 }catch(e){console.warn('Saola preload failed',e)}
}
inject();
})();