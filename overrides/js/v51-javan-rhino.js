(()=>{
  const NAME='RINOCERONTE-DE-JAVA';
  const HERO='assets/generated-v43/javan-rhino/animal_main.webp?v=4.3.15';
  const MAP='assets/generated-v43/javan-rhino/map_range.webp?v=4.3.15';
  let scheduled=false;

  function isRhino(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()===NAME;
  }

  function apply(){
    scheduled=false;
    const root=document.getElementById('detailContent');
    if(!isRhino(root)) return;

    const info=root.querySelector('.infographic');
    info?.classList.add('v40-engine','v40-javan-rhino');

    const hero=root.querySelector('.animal-visual img');
    if(hero){
      hero.src=HERO;
      hero.alt='Rinoceronte-de-Java';
      hero.classList.add('v40-hero');
      hero.style.setProperty('object-fit','contain','important');
      hero.style.setProperty('object-position','center bottom','important');
    }

    const traits=[...root.querySelectorAll('.unique-grid .unique-item')].slice(0,3);
    const cfg=[
      ['UM ÚNICO CORNO','O pequeno corno, normalmente mais evidente nos machos, distingue a espécie entre os rinocerontes asiáticos.','52% 25%','2.5'],
      ['PELE EM PLACAS','Dobras profundas nos ombros, dorso e flancos criam o aspeto de uma armadura natural.','58% 55%','2.35'],
      ['PATAS ROBUSTAS','Patas largas e fortes sustentam o corpo pesado e ajudam a avançar em solo húmido e vegetação densa.','42% 88%','2.9']
    ];
    traits.forEach((item,i)=>{
      const img=item.querySelector('.crop img');
      const title=item.querySelector('h4');
      const text=item.querySelector('p');
      if(title) title.textContent=cfg[i][0];
      if(text) text.textContent=cfg[i][1];
      if(img){
        img.src=HERO;
        img.alt=cfg[i][0];
        img.style.setProperty('width','100%','important');
        img.style.setProperty('height','100%','important');
        img.style.setProperty('object-fit','cover','important');
        img.style.setProperty('object-position',cfg[i][2],'important');
        img.style.setProperty('transform',`scale(${cfg[i][3]})`,'important');
        img.style.setProperty('transform-origin',cfg[i][2],'important');
      }
    });

    const card=root.querySelector('.where-card');
    if(card){
      // O WEBP já contém o título editorial ONDE VIVE?.
      card.querySelector(':scope > .heading')?.remove();
      let map=card.querySelector('img.v43-static-map,img');
      const dynamic=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');
      if(dynamic && dynamic.tagName!=='IMG'){
        map=document.createElement('img');
        dynamic.replaceWith(map);
      }
      if(map){
        map.src=MAP;
        map.alt='Mapa editorial da distribuição do Rinoceronte-de-Java em Ujung Kulon';
        map.className='v43-static-map zoomable-image';
        map.style.setProperty('display','block','important');
        map.style.setProperty('width','100%','important');
        map.style.setProperty('height','auto','important');
        map.style.setProperty('max-height','none','important');
        map.style.setProperty('aspect-ratio','auto','important');
        map.style.setProperty('object-fit','contain','important');
        map.style.setProperty('object-position','center','important');
      }
    }

    // O mapa é informativo: nunca permitir crop no mobile/tablet.
    root.querySelectorAll('.where-card img').forEach(img=>{
      img.style.setProperty('height','auto','important');
      img.style.setProperty('max-height','none','important');
      img.style.setProperty('aspect-ratio','auto','important');
      img.style.setProperty('object-fit','contain','important');
    });
  }

  function schedule(){
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(apply);
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(root) new MutationObserver(schedule).observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    window.addEventListener('resize',schedule,{passive:true});
    schedule();
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
