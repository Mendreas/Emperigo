(()=>{
  const ROOT='assets/generated-v63/cross-river-gorilla/';
  const PATCH={
    name:'Gorila-do-Rio-Cross',scientific:'Gorilla gorilla diehli',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'África',place:'Fronteira Nigéria / Camarões',initials:'GC',population:'200–300',trend:'População muito pequena e fragmentada',
    intro:'Força rara. Futuro incerto. O gorila-do-Rio-Cross é uma das subespécies de grandes primatas mais raras do mundo e sobrevive em núcleos florestais isolados na fronteira entre a Nigéria e os Camarões.',
    animalImage:ROOT+'animal.webp',documentaryImage:ROOT+'documentary.webp',image:ROOT+'documentary.webp',cardImage:ROOT+'documentary.webp',
    habitat:'Florestas tropicais e montanhosas do Rio Cross',habitatDescription:'Vive em florestas tropicais húmidas de planície e de montanha na região fronteiriça entre a Nigéria e os Camarões. A distribuição é muito restrita e fragmentada, em áreas de relevo acidentado e elevada biodiversidade.',habitatImage:ROOT+'habitat.webp',mapImage:ROOT+'map_range.webp',mapHasTitle:true,
    metrics:[{value:'200–300',label:'POPULAÇÃO',note:'estimativa na natureza'},{value:'CR',label:'IUCN',note:'criticamente em perigo'},{value:'Nigéria / Camarões',label:'DISTRIBUIÇÃO',note:'região do Rio Cross'},{value:'Floresta',label:'HABITAT',note:'tropical e montanhosa'}],
    traits:[
      {title:'ADAPTAÇÃO À MONTANHA',text:'Ocupa florestas em relevo acidentado e zonas de altitude, incluindo alguns dos habitats mais montanhosos utilizados por gorilas.',image:ROOT+'trait-01.webp'},
      {title:'GRUPOS PEQUENOS',text:'Vive em grupos relativamente pequenos, geralmente estruturados em torno de um macho dominante, fêmeas e crias.',image:ROOT+'trait-02.webp'},
      {title:'COMPORTAMENTO DISCRETO',text:'É muito reservado e difícil de observar; a forte pressão humana favorece a utilização de áreas remotas e de difícil acesso.',image:ROOT+'trait-03.webp'},
      {title:'IMPORTÂNCIA ECOLÓGICA',text:'Ao consumir frutos e deslocar-se pela floresta, contribui para a dispersão de sementes e para a regeneração do habitat.',image:ROOT+'trait-04.webp'}
    ],
    diet:'Principalmente herbívoro; alimenta-se de folhas, brotos, frutos, caules e outras partes de plantas.',dietTitle:'DIETA: PRINCIPALMENTE HERBÍVORO',dietItems:['Folhas','Brotos','Frutos','Caules','Raízes'],dietNotes:['Importantes durante todo o ano','Vegetação jovem','Mais consumidos quando disponíveis','Partes fibrosas de plantas','Consumidas ocasionalmente'],dietImages:[1,2,3,4,5].map(i=>ROOT+`diet-0${i}.webp`),
    habitatFacts:['Florestas tropicais','Zonas montanhosas','Clima húmido','Alta biodiversidade'],
    threats:['Destruição e fragmentação do habitat','Caça ilegal','Mineração','Conflitos e pressão humana','Doenças'],
    actions:['Proteger habitats','Apoiar organizações locais','Promover consumo responsável','Apoiar comunidades locais','Educar e divulgar'],
    conservationMessage:'Proteger o gorila-do-Rio-Cross é proteger as florestas e a vida que nelas existe.'
  };

  const matches=x=>x&&(x.id==='cross-river-gorilla'||x.scientific==='Gorilla gorilla diehli'||x.name==='Gorila-do-Rio-Cross');

  const additions=Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS)?window.EM_PERIGO_SPECIES_ADDITIONS:[];
  const inAdditions=additions.find(matches);
  if(inAdditions)Object.assign(inAdditions,PATCH);

  const previousFetch=window.fetch.bind(window);
  window.fetch=async function(input,init){
    const response=await previousFetch(input,init);
    const url=typeof input==='string'?input:(input&&input.url)||'';
    if(!/(^|\/)data\/species\.json(?:[?#]|$)/.test(url))return response;
    try{
      const data=await response.clone().json();
      if(!Array.isArray(data))return response;
      const patched=data.map(row=>matches(row)?{...row,...PATCH}:row);
      return new Response(JSON.stringify(patched),{status:response.status,statusText:response.statusText,headers:new Headers(response.headers)});
    }catch(_){return response;}
  };
})();