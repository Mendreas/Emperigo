(()=>{
const A=Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS)?window.EM_PERIGO_SPECIES_ADDITIONS:[];
const byId=new Map(A.filter(x=>x&&x.id).map(x=>[x.id,x]));
const upsert=(id,patch)=>byId.set(id,{...(byId.get(id)||{}),...patch,id});
byId.delete('indian-rhino');

upsert('sumatran-orangutan',{
 name:'Orangotango-de-Sumatra',scientific:'Pongo abelii',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'Ásia',place:'Norte de Sumatra, Indonésia',lat:3.45,lng:98.1,initials:'OS',
 population:'~13 846',trend:'Em declínio',intro:'O orangotango-de-Sumatra vive quase sempre nas árvores e depende de grandes florestas tropicais contínuas no norte de Sumatra.',
 image:'https://upload.wikimedia.org/wikipedia/commons/6/67/Pongo_abelii.jpg',cardImage:'https://upload.wikimedia.org/wikipedia/commons/6/67/Pongo_abelii.jpg',documentaryImage:'https://upload.wikimedia.org/wikipedia/commons/6/67/Pongo_abelii.jpg',animalImage:'assets/generated-v55/sumatran-orangutan/animal.webp',
 habitat:'Florestas tropicais húmidas de Sumatra',habitatImage:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gunung_Leuser_National_Park_Jungle_Life.jpg',mapImage:'assets/generated-v55/sumatran-orangutan/map_range.webp',mapHasTitle:true,
 traits:[
  {title:'BRAÇOS MUITO LONGOS',text:'Braços poderosos e muito compridos permitem deslocar-se entre as copas sem descer ao solo.',crop:'26% 72%',zoom:1.65},
  {title:'PELAGEM RUIVA',text:'A longa pelagem avermelhada é uma das características mais reconhecíveis da espécie.',crop:'32% 46%',zoom:2.1},
  {title:'FACE EXPRESSIVA',text:'Olhos frontais e grande mobilidade facial acompanham uma elevada inteligência e comunicação visual.',crop:'47% 27%',zoom:2.55},
  {title:'MÃOS PREÊNSEIS',text:'Mãos e pés fortes agarram ramos com precisão e sustentam a vida quase exclusivamente arborícola.',crop:'92% 6%',zoom:2.65}
 ],
 diet:'Frutos formam a maior parte da dieta; folhas, rebentos, casca e insetos complementam a alimentação.',dietTitle:'DIETA: PRINCIPALMENTE FRUGÍVORA',
 dietItems:['Figos e frutos','Folhas e rebentos','Casca','Insetos'],dietNotes:['Base energética','Complemento frequente','Recurso em períodos de escassez','Complemento proteico'],dietImages:[
 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Cluster_Fig_Fruit_-_Red_River_Fig_Fruit_-_Buah_Loa_%28Ficus_racemosa%29.jpg',
 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Acer_japonicum_youngleaves.jpg',
 'https://upload.wikimedia.org/wikipedia/commons/7/76/Tree_Bark.jpg',
 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Termites_on_wood.JPG'
 ]
});

upsert('saola',{
 animalImage:'assets/generated-v57/saola/animal.webp',documentaryImage:'https://upload.wikimedia.org/wikipedia/commons/b/ba/Pseudoryx_nghetinhensis_318196.jpg',
 image:'https://upload.wikimedia.org/wikipedia/commons/b/ba/Pseudoryx_nghetinhensis_318196.jpg',cardImage:'https://upload.wikimedia.org/wikipedia/commons/b/ba/Pseudoryx_nghetinhensis_318196.jpg',
 habitatImage:'assets/generated-v57/saola/habitat.webp',mapImage:'assets/generated-v57/saola/map_range.webp',mapHasTitle:true,
 dietItems:['Folhas','Rebentos','Plantas herbáceas','Vegetação ribeirinha','Folhas de arbustos'],dietNotes:['Parte importante da alimentação','Vegetação jovem e tenra','Consumidas no sub-bosque','Associada a vales e cursos de água','Complemento vegetal'],dietImages:[1,2,3,4,5].map(i=>`assets/generated-v57/saola/diet-0${i}.webp`)
});

upsert('hawksbill-turtle',{
 name:'Tartaruga-de-Pente',scientific:'Eretmochelys imbricata',status:'CR',statusLabel:'Em perigo crítico',category:'Répteis',region:'Oceanos tropicais',place:'Recifes tropicais de todo o mundo',
 animalImage:'assets/generated-v60/hawksbill-turtle/animal.webp',documentaryImage:'assets/generated-v60/hawksbill-turtle/documentary.webp',image:'assets/generated-v60/hawksbill-turtle/documentary.webp',cardImage:'assets/generated-v60/hawksbill-turtle/documentary.webp',
 habitat:'Recifes de coral, lagoas e zonas costeiras tropicais',habitatImage:'assets/generated-v60/hawksbill-turtle/habitat.webp',mapImage:'assets/generated-v60/hawksbill-turtle/map_range.webp',mapHasTitle:true,
 intro:'A artista dos recifes. Essencial para recifes saudáveis, ajuda a manter o equilíbrio das esponjas e de outras espécies marinhas.',
 traits:[
  {title:'PADRÃO IRREPETÍVEL',text:'Cada indivíduo apresenta um desenho único na cabeça e na carapaça, como uma impressão digital.',detailImage:'assets/generated-v60/hawksbill-turtle/trait-01.webp'},
  {title:'PESCOÇO FLEXÍVEL',text:'Pode retrair e mover o pescoço lateralmente para proteger a cabeça entre as nadadeiras.',detailImage:'assets/generated-v60/hawksbill-turtle/trait-02.webp'},
  {title:'VISTA AGUDA',text:'A visão ajuda a encontrar alimento entre os recifes e a navegar a longas distâncias.',detailImage:'assets/generated-v60/hawksbill-turtle/trait-03.webp'},
  {title:'MIGRAÇÕES LONGAS',text:'Viaja centenas a milhares de quilómetros entre áreas de alimentação e praias de desova.',detailImage:'assets/generated-v60/hawksbill-turtle/trait-04.webp'}
 ],
 diet:'Omnívora, mas especializada em esponjas marinhas.',dietTitle:'DIETA: ESPECIALISTA DE RECIFE',
 dietItems:['Esponjas','Algas','Tunicados','Coral mole','Crustáceos','Pequenos invertebrados'],
 dietNotes:['Alimento principal','Complemento vegetal','Consumidos no recife','Oportunisticamente','Complemento animal','Diversidade de pequenas presas'],
 dietImages:['assets/generated-v60/hawksbill-turtle/diet-01.webp','assets/generated-v60/hawksbill-turtle/diet-02.webp','assets/generated-v60/hawksbill-turtle/diet-03.webp','assets/generated-v60/hawksbill-turtle/diet-04.webp','assets/generated-v60/hawksbill-turtle/diet-05.webp','https://commons.wikimedia.org/wiki/Special:FilePath/Marine%20invertebrates.jpg'],
 threats:['Caça e coleta ilegal','Destruição de habitat','Pesca incidental','Poluição marinha','Mudanças climáticas'],
 actions:['Proteger os recifes','Reduzir plásticos','Apoiar ONGs e projetos','Não comprar produtos de origem animal','Divulgar e educar']
});

upsert('greater-one-horned-rhino',{
 name:'Rinoceronte-Indiano',scientific:'Rhinoceros unicornis',status:'VU',statusLabel:'Vulnerável',category:'Mamíferos',region:'Ásia',place:'Nordeste da Índia / Nepal',lat:26.58,lng:93.35,initials:'RI',
 population:'~4 000',trend:'Recuperação importante',intro:'O maior rinoceronte asiático recuperou de menos de 200 animais no início do século XX para cerca de 4 000 graças a proteção rigorosa e gestão do habitat.',
 image:'assets/generated-v60/indian-rhino/documentary.webp',cardImage:'assets/generated-v60/indian-rhino/documentary.webp',documentaryImage:'assets/generated-v60/indian-rhino/documentary.webp',animalImage:'assets/generated-v60/indian-rhino/animal.webp',
 habitat:'Planícies alagáveis e florestas tropicais',habitatDescription:'Vive em pradarias alagáveis, florestas tropicais e áreas pantanosas do norte da Índia e do Nepal. Depende de rios, lagos e vegetação densa.',habitatImage:'assets/generated-v60/indian-rhino/habitat.webp',mapImage:'assets/generated-v60/indian-rhino/map_range.webp',mapHasTitle:true,
 metrics:[{value:'~4 000',label:'POPULAÇÃO',note:'na natureza'},{value:'1 800–2 700 kg',label:'PESO',note:'adultos'},{value:'3–3,8 m',label:'COMPRIMENTO',note:'adultos'},{value:'40+ anos',label:'LONGEVIDADE',note:'na natureza'}],
 traits:[
  {title:'PELE EM PLACAS',text:'Pregas profundas dão à pele espessa a aparência de uma armadura.',detailImage:'assets/generated-v60/indian-rhino/trait-01.webp'},
  {title:'CORNO DE QUERATINA',text:'O único corno é feito da mesma proteína que cabelos e unhas.',detailImage:'assets/generated-v60/indian-rhino/trait-02.webp'},
  {title:'COMPORTAMENTO SOLITÁRIO',text:'Adultos são geralmente solitários, exceto fêmeas com crias e concentrações em água e alimento.',detailImage:'assets/generated-v60/indian-rhino/trait-03.webp'},
  {title:'VÍNCULO MÃE E FILHOTE',text:'As fêmeas cuidam das crias durante vários anos, ensinando rotas, alimento e locais de água.',crop:'58% 58%',zoom:1.8}
 ],
 diet:'Herbívoro; consome uma grande variedade de plantas.',dietTitle:'DIETA: HERBÍVORO',dietItems:['Capim','Folhas','Brotações','Frutos','Ramos'],dietNotes:['Base da dieta','Vegetação folhosa','Rebentos tenros','Sazonais','Complemento lenhoso'],dietImages:[1,2,3,4,5].map(i=>`assets/generated-v60/indian-rhino/diet-0${i}.webp`),
 habitatFacts:['Pradarias alagáveis','Florestas tropicais','Rios e lagos','Vegetação densa'],
 threats:['Caça furtiva','Perda de habitat','Conflito humano','Doenças','Mudanças climáticas'],actions:['Apoiar áreas protegidas','Combater a caça ilegal','Apoiar comunidades locais','Restaurar habitats','Educação e consciencialização'],
 fact:'Populações de rinocerontes-indianos recuperaram de menos de 200 animais no início do século XX para cerca de 4 000 hoje.'
});

window.EM_PERIGO_SPECIES_ADDITIONS=[...byId.values()];
})();