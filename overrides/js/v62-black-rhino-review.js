(()=>{
const A=Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS)?window.EM_PERIGO_SPECIES_ADDITIONS:[];
const byId=new Map(A.filter(x=>x&&x.id).map(x=>[x.id,x]));
const old=byId.get('black-rhino')||{};
byId.set('black-rhino',{
 ...old,
 id:'black-rhino',name:'Rinoceronte-Negro',scientific:'Diceros bicornis',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'África',place:'África oriental e austral',initials:'RN',
 population:'~6 500',trend:'Em recuperação lenta',
 intro:'Força e resiliência em extinção. O rinoceronte-negro já foi comum em grande parte de África, mas a caça furtiva reduziu drasticamente a população.',
 animalImage:'assets/generated-v60/black-rhino/animal-user.webp',
 habitat:'Savanas, matagais, zonas áridas e áreas montanhosas',habitatDescription:'Ocupa savanas e pradarias, arbustos espinhosos, semidesertos e áreas montanhosas na África subsaariana.',habitatImage:'assets/generated-v60/black-rhino/habitat.webp',mapImage:'assets/generated-v60/black-rhino/map_range.webp',mapHasTitle:true,
 metrics:[{value:'~6 500',label:'POPULAÇÃO',note:'aproximadamente'},{value:'800–1 400 kg',label:'PESO',note:'adultos'},{value:'~1,6 m',label:'ALTURA',note:'ao ombro'},{value:'2',label:'CORNOS',note:'anterior geralmente maior'}],
 traits:[
  {title:'COMPORTAMENTO SOLITÁRIO',text:'São geralmente solitários e territoriais, exceto fêmeas acompanhadas pelas crias.',crop:'52% 48%',zoom:1.55},
  {title:'VISÃO E OLFATO AGUDOS',text:'A visão é limitada, mas o olfato e a audição são muito desenvolvidos para detetar perigos.',crop:'72% 35%',zoom:2.3},
  {title:'CORREDORES NATURAIS',text:'Usam rotas regulares através dos seus territórios, criando trilhos conhecidos.',crop:'48% 60%',zoom:1.7},
  {title:'GESTAÇÃO LONGA',text:'A gestação dura cerca de 15–16 meses e normalmente nasce apenas uma cria.',crop:'48% 52%',zoom:1.55},
  {title:'PELE SENSÍVEL',text:'Apesar da aparência grossa, a pele é sensível ao sol e a picadas de insetos.',crop:'38% 43%',zoom:2.2}
 ],
 diet:'Herbívoro ramoneador; alimenta-se de folhas, brotos, frutos, ramos e vegetação herbácea.',dietTitle:'DIETA: HERBÍVORO',
 dietItems:['Folhas','Brotos','Frutos','Ramos','Grama'],
 dietNotes:['Base da dieta','Vegetação jovem','Consumidos quando disponíveis','Arbustos e pequenas árvores','Complemento herbáceo'],
 dietImages:[1,2,3,4,5].map(i=>`assets/generated-v60/black-rhino/diet-0${i}.webp`),
 habitatFacts:['Savanas e pradarias','Arbustos espinhosos','Áreas montanhosas','Zonas áridas'],
 threats:['Caça furtiva','Perda de habitat','Conflitos humanos','Mudanças climáticas','Baixa diversidade genética'],
 actions:['Proteger habitats','Combater a caça ilegal','Apoiar comunidades locais','Educar e consciencializar','Registar e monitorar'],
 conservationMessage:'Cada rinoceronte importa. A conservação hoje garante que eles existam amanhã.'
});
window.EM_PERIGO_SPECIES_ADDITIONS=[...byId.values()];
})();