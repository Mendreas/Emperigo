(()=>{
const PATCH={
 id:'sumatran-elephant',name:'Elefante-de-Sumatra',scientific:'Elephas maximus sumatranus',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'Ásia',place:'Sumatra, Indonésia',population:'2 400–2 800',trend:'Em declínio',initials:'ES',
 intro:'Mais que um gigante: um guardião da floresta. O elefante-de-Sumatra é uma subespécie única e ameaçada que abre caminhos, dispersa sementes e ajuda a manter a diversidade das florestas da ilha.',
 animalImage:'assets/generated-v66/sumatran-elephant/animal.webp',image:'assets/generated-v66/sumatran-elephant/animal.webp',cardImage:'assets/generated-v66/sumatran-elephant/documentary.webp',documentaryImage:'assets/generated-v66/sumatran-elephant/documentary.webp',
 habitat:'Florestas tropicais húmidas de Sumatra',habitatDescription:'Vive em florestas tropicais húmidas, sobretudo de baixa altitude, e depende de grandes áreas contínuas de floresta, corredores de deslocação e acesso regular a água.',habitatImage:'assets/generated-v66/sumatran-elephant/habitat.webp',mapImage:'assets/generated-v66/sumatran-elephant/map_range.webp',mapHasTitle:true,rangeLabel:'Ilha de Sumatra, Indonésia',
 metrics:[{value:'2 400–2 800',label:'POPULAÇÃO',note:'estimativa WWF'},{value:'CR',label:'IUCN',note:'criticamente em perigo'},{value:'Sumatra',label:'DISTRIBUIÇÃO',note:'Indonésia'},{value:'~5 t',label:'PESO',note:'aproximadamente'}],
 traits:[
 {title:'ORELHAS MAIS PEQUENAS',text:'Como elefante asiático, apresenta orelhas menores e mais arredondadas do que os elefantes africanos.',image:'assets/generated-v66/sumatran-elephant/trait-01.webp'},
 {title:'PRESAS SOBRETUDO NOS MACHOS',text:'Os machos podem desenvolver presas bem visíveis; nas fêmeas são geralmente ausentes ou muito pequenas.',image:'assets/generated-v66/sumatran-elephant/trait-02.webp'},
 {title:'PELE DISTINTIVA',text:'A pele cinzenta pode apresentar áreas despigmentadas e uma textura marcada, especialmente na cabeça e nas orelhas.',image:'assets/generated-v66/sumatran-elephant/trait-03.webp'},
 {title:'VIDA SOCIAL COMPLEXA',text:'Fêmeas e crias formam grupos familiares com fortes vínculos sociais, aprendizagem e cooperação.',image:'assets/generated-v66/sumatran-elephant/trait-04.webp'}],
 diet:'Herbívoro; consome diariamente grandes quantidades de vegetação e desempenha um papel importante na dispersão de sementes.',dietTitle:'DIETA: VARIADA E ESSENCIAL PARA A FLORESTA',dietItems:['Folhas','Frutos','Casca','Gramíneas','Brotos'],dietNotes:['Parte importante da dieta','Consumidos quando disponíveis','Fibra vegetal','Vegetação abundante','Vegetação jovem'],dietImages:[1,2,3,4,5].map(i=>`assets/generated-v66/sumatran-elephant/diet-0${i}.webp`),
 habitatFacts:['Floresta tropical húmida','Planícies e zonas montanhosas','Água disponível','Corredores florestais'],
 threats:['Destruição e fragmentação do habitat','Conflito entre humanos e elefantes','Caça furtiva por marfim','Expansão agrícola e plantações'],
 actions:['Proteger e ligar florestas','Reduzir o conflito com comunidades','Combater a caça furtiva','Apoiar conservação local','Escolher produtos de origem responsável'],
 conservationMessage:'Elefantes seguros. Florestas vivas. Um futuro possível.',
 sources:['WWF — Sumatran Elephant','IUCN Red List']
};
function apply(o){if(o&&(o.id==='sumatran-elephant'||o.scientific==='Elephas maximus sumatranus'))Object.assign(o,PATCH);return o;}
const a=window.EM_PERIGO_SPECIES_ADDITIONS;if(Array.isArray(a))a.forEach(apply);
const oldFetch=window.fetch;if(oldFetch)window.fetch=async function(...args){const r=await oldFetch.apply(this,args);try{const u=String(args[0]&&args[0].url||args[0]||'');if(/species\.json(?:\?|$)/.test(u)){const data=await r.clone().json();if(Array.isArray(data)){data.forEach(apply);return new Response(JSON.stringify(data),{status:r.status,statusText:r.statusText,headers:r.headers});}}}catch(e){}return r;};
})();