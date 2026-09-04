(()=>{
  const rows=Array.isArray(window.EM_PERIGO_SPECIES_ADDITIONS)?window.EM_PERIGO_SPECIES_ADDITIONS:[];
  const turtle=rows.find(x=>x&&x.id==='hawksbill-turtle');
  if(!turtle)return;
  turtle.dietItems=['Esponjas','Algas','Tunicados','Coral mole','Crustáceos','Pequenos invertebrados'];
  turtle.dietNotes=['Alimento principal','Complemento vegetal','Consumidos no recife','Oportunisticamente','Complemento animal','Diversidade de pequenas presas'];
  turtle.dietImages=[
    'assets/generated-v60/hawksbill-turtle/diet-01.webp',
    'assets/generated-v60/hawksbill-turtle/diet-02.webp',
    'assets/generated-v60/hawksbill-turtle/diet-03.webp',
    'assets/generated-v60/hawksbill-turtle/diet-04.webp',
    'assets/generated-v60/hawksbill-turtle/diet-05.webp',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Sabellastarte%20spectabilis%20193162670.jpg'
  ];
})();