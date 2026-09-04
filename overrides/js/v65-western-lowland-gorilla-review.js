(()=>{
  const ROOT='assets/generated-v65/western-lowland-gorilla/';
  const patch={
    name:'Gorila-Ocidental-das-Terras-Baixas',scientific:'Gorilla gorilla gorilla',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'África',place:'África Central / Bacia do Congo',initials:'GO',population:'Desconhecida',trend:'Em declínio',
    intro:'Força que mantém a floresta viva. O gorila-ocidental-das-terras-baixas é a subespécie de gorila mais numerosa e amplamente distribuída, mas continua criticamente ameaçada pela caça, doenças e perda de habitat.',
    animalImage:ROOT+'animal.webp',image:ROOT+'animal.webp',
    habitat:'Florestas tropicais húmidas de baixa altitude',habitatDescription:'Vive nas florestas tropicais húmidas e pantanosas da África Central, incluindo Camarões, República Centro-Africana, Guiné Equatorial, Gabão e República do Congo.',habitatImage:ROOT+'habitat.webp',mapImage:ROOT+'map_range.webp',mapHasTitle:true,
    metrics:[{value:'Desconhecida',label:'POPULAÇÃO',note:'não existe uma contagem global precisa'},{value:'CR',label:'IUCN',note:'criticamente em perigo'},{value:'África Central',label:'DISTRIBUIÇÃO',note:'Bacia do Congo ocidental'},{value:'Floresta',label:'HABITAT',note:'tropical húmida e pântanos'}],
    traits:[
      {title:'GRANDE PORTE',text:'É um grande primata de corpo robusto; os machos adultos podem atingir cerca de 200 kg.',image:ROOT+'trait-01.webp'},
      {title:'LOCOMOÇÃO PODEROSA',text:'Desloca-se sobretudo em quatro apoios, usando os nós dos dedos, combinando força e agilidade.',image:ROOT+'trait-02.webp'},
      {title:'EXPRESSÃO RICA',text:'Comunica através de vocalizações, posturas, expressões faciais e fortes relações sociais.',image:ROOT+'trait-03.webp'}
    ],
    diet:'Maioritariamente vegetal, com frutos, folhas, caules, ervas e casca; também pode consumir insetos.',dietTitle:'DIETA: MAIORITARIAMENTE VEGETAL',dietItems:['Folhas','Frutos','Caules e brotos','Sementes','Raízes'],dietNotes:['Importante na dieta','Muito consumidos quando disponíveis','Fibra vegetal','Complemento vegetal','Consumo ocasional'],dietImages:[1,2,3,4,5].map(i=>ROOT+`diet-0${i}.webp`),
    habitatFacts:['Floresta tropical húmida','Florestas pantanosas','Baixa altitude','Bacia do Congo'],
    threats:['Destruição e fragmentação do habitat','Caça ilegal e bushmeat','Doenças como Ébola','Expansão humana e abertura de estradas'],
    actions:['Proteger as florestas','Combater a caça ilegal','Apoiar comunidades locais','Monitorizar doenças e populações','Promover consumo florestal responsável'],
    conservationMessage:'Proteger o gorila-ocidental-das-terras-baixas é proteger as florestas, a biodiversidade e as comunidades que delas dependem.',
    documentaryImage:ROOT+'documentary.webp',cardImage:ROOT+'documentary.webp'
  };
  const apply=o=>{if(o&&(o.id==='western-lowland-gorilla'||o.scientific==='Gorilla gorilla gorilla'))Object.assign(o,patch);return o};
  const patchArrays=()=>{for(const k of ['EM_PERIGO_SPECIES_ADDITIONS','EM_PERIGO_EXTRA_SPECIES']){const a=window[k];if(Array.isArray(a))a.forEach(apply)}};
  patchArrays();
  const originalFetch=window.fetch;
  if(originalFetch&&!originalFetch.__v65WesternLowland){
    const wrapped=async function(...args){const r=await originalFetch.apply(this,args);const u=String(args[0]&&args[0].url||args[0]||'');if(!/species\.json(?:\?|$)/.test(u))return r;try{const data=await r.clone().json();if(Array.isArray(data)){data.forEach(apply);return new Response(JSON.stringify(data),{status:r.status,statusText:r.statusText,headers:r.headers})}}catch(e){}return r};
    wrapped.__v65WesternLowland=true;window.fetch=wrapped;
  }
})();