(()=>{
const PATCH={
 name:'Gorila-de-Grauer',scientific:'Gorilla beringei graueri',status:'CR',statusLabel:'Em perigo crítico',category:'Mamíferos',region:'África',place:'Leste da República Democrática do Congo',population:'~6 800',trend:'Em forte declínio histórico',
 intro:'Força da floresta. Esperança no futuro. O gorila-de-Grauer é a maior das quatro subespécies de gorila e vive exclusivamente nas florestas do leste da República Democrática do Congo.',
 image:'assets/generated-v64/eastern-lowland-gorilla/animal.webp',animalImage:'assets/generated-v64/eastern-lowland-gorilla/animal.webp',
 habitat:'Florestas tropicais de planície e montanha do leste do Congo',habitatDescription:'Ocupa florestas tropicais húmidas de baixa altitude e florestas montanhosas no leste da República Democrática do Congo, desde zonas baixas até grandes altitudes.',habitatImage:'assets/generated-v64/eastern-lowland-gorilla/habitat.webp',mapImage:'assets/generated-v64/eastern-lowland-gorilla/map_range.webp',mapHasTitle:true,
 traits:[
  {title:'MAIOR SUBESPÉCIE',text:'É a maior das quatro subespécies de gorila, com corpo robusto, mãos grandes e focinho relativamente curto.',image:'assets/generated-v64/eastern-lowland-gorilla/trait-01.webp'},
  {title:'PELO ACINZENTADO',text:'Os machos adultos desenvolvem a característica faixa prateada ou acinzentada no dorso.',image:'assets/generated-v64/eastern-lowland-gorilla/trait-02.webp'},
  {title:'OLHAR EXPRESSIVO',text:'A face e os olhos permitem uma comunicação visual rica, integrada num repertório social complexo.',image:'assets/generated-v64/eastern-lowland-gorilla/trait-03.webp'}
 ],
 diet:'Principalmente vegetal; folhas, frutos, caules e brotos, casca e outros materiais vegetais.',dietTitle:'DIETA: PRINCIPALMENTE VEGETAL',dietItems:['Folhas','Frutos','Caules e brotos','Casca de árvores'],dietNotes:['Parte importante da dieta','Incluindo figos quando disponíveis','Vegetação fibrosa','Complemento vegetal'],dietImages:[1,2,3,4].map(i=>`assets/generated-v64/eastern-lowland-gorilla/diet-0${i}.webp`),
 habitatFacts:['Florestas tropicais húmidas','Planície e montanha','Leste da RDC','Grande amplitude altitudinal'],
 threats:['Destruição e fragmentação do habitat','Caça ilegal','Doenças','Conflitos armados e mineração'],
 actions:['Apoiar áreas protegidas','Valorizar as comunidades locais','Escolher consumo responsável'],
 conservationMessage:'Proteger o gorila-de-Grauer é proteger as florestas, a biodiversidade e as futuras gerações.',documentaryImage:'assets/generated-v64/eastern-lowland-gorilla/documentary.webp'
};
function apply(o){if(o&&(o.id==='eastern-lowland-gorilla'||o.scientific==='Gorilla beringei graueri'))Object.assign(o,PATCH);return o;}
if(Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS))window.EM_PERIGO_SPECIES_ADDITIONS.forEach(apply);
const nativeFetch=window.fetch.bind(window);
window.fetch=async function(input,init){const r=await nativeFetch(input,init);try{const u=typeof input==='string'?input:(input&&input.url)||'';if(/data\/species\.json(?:\?|$)/.test(u)){const data=await r.clone().json();if(Array.isArray(data)){data.forEach(apply);return new Response(JSON.stringify(data),{status:r.status,statusText:r.statusText,headers:r.headers});}}}catch(e){console.warn('[v64] Grauer patch',e);}return r;};
})();