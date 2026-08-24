(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const HERO=ROOT+'animal.webp?v=4.3.12';
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.12';
  const TRAITS=[
    ROOT+'trait-1.webp?v=4.3.12',
    ROOT+'trait-2.webp?v=4.3.12',
    ROOT+'trait-3.webp?v=4.3.12'
  ];
  const STAMP='amur-leopard:v4312';
  let scheduled=false;

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()==='LEOPARDO-DE-AMUR';
  }

  function enforceTraitAssets(root){
    const traitImgs=[...root.querySelectorAll('.unique-grid .unique-item img')];
    TRAITS.forEach((src,i)=>{
      const img=traitImgs[i];
      if(!img) return;
      if(img.getAttribute('src')!==src) img.src=src;
      img.alt=['Rosetas espaçadas do Leopardo-de-Amur','Olhos do Leopardo-de-Amur','Patas largas do Leopardo-de-Amur'][i];
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','100%','important');
      img.style.setProperty('object-fit','cover','important');
      img.style.setProperty('object-position','center','important');
      img.style.setProperty('transform','none','important');
    });
  }

  function applyMobileAnimalLayout(root){
    const data=root.querySelector('.animal-data');
    const stats=data?.querySelector('.stats-column');
    const visual=data?.querySelector('.animal-visual');
    if(!data||!stats||!visual) return;

    if(!window.matchMedia('(max-width:700px)').matches) return;

    const intro=stats.querySelector('.intro');
    if(intro && intro.parentElement===stats){
      intro.classList.add('v47-amur-mobile-intro');
      data.insertBefore(intro,stats);
    }

    const compact=window.matchMedia('(max-width:430px)').matches;
    const panelHeight=compact?'330px':'360px';

    data.style.setProperty('display','grid','important');
    data.style.setProperty('grid-template-columns',compact?'minmax(0,50%) minmax(0,50%)':'minmax(0,49%) minmax(0,51%)','important');
    data.style.setProperty('grid-template-rows','auto auto','important');
    data.style.setProperty('column-gap',compact?'0':'4px','important');
    data.style.setProperty('align-items','start','important');

    const movedIntro=data.querySelector(':scope > .v47-amur-mobile-intro');
    if(movedIntro){
      movedIntro.style.setProperty('grid-column','1 / -1','important');
      movedIntro.style.setProperty('grid-row','1','important');
      movedIntro.style.setProperty('margin','0 0 18px','important');
    }

    stats.style.setProperty('display','flex','important');
    stats.style.setProperty('flex-direction','column','important');
    stats.style.setProperty('justify-content','space-between','important');
    stats.style.setProperty('grid-column','1','important');
    stats.style.setProperty('grid-row','2','important');
    stats.style.setProperty('height',panelHeight,'important');
    stats.style.setProperty('min-height','0','important');
    stats.style.setProperty('margin','0','important');
    stats.style.setProperty('min-width','0','important');

    stats.querySelectorAll('.stat').forEach(stat=>{
      stat.style.setProperty('grid-column','auto','important');
      stat.style.setProperty('grid-row','auto','important');
      stat.style.setProperty('min-width','0','important');
    });

    visual.style.setProperty('grid-column','2','important');
    visual.style.setProperty('grid-row','2','important');
    visual.style.setProperty('width','100%','important');
    visual.style.setProperty('height',panelHeight,'important');
    visual.style.setProperty('min-height','0','important');
    visual.style.setProperty('max-height',panelHeight,'important');
    visual.style.setProperty('margin','0','important');
    visual.style.setProperty('align-self','start','important');
    visual.style.setProperty('overflow','visible','important');
    visual.style.setProperty('background','transparent','important');

    const img=visual.querySelector('img');
    if(img){
      img.style.setProperty('display','block','important');
      img.style.setProperty('width','100%','important');
      img.style.setProperty('height','100%','important');
      img.style.setProperty('min-height','0','important');
      img.style.setProperty('max-height',panelHeight,'important');
      img.style.setProperty('object-fit','contain','important');
      img.style.setProperty('object-position','center center','important');
    }
  }

  function finalize(){
    scheduled=false;
    const root=document.getElementById('detailContent');
    if(!isLeopard(root)) return;

    const info=root.querySelector('.infographic');
    if(info){
      info.dataset.v47Finalized=STAMP;
      info.classList.add('v40-engine','v40-amur-leopard');
    }

    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.getAttribute('src')!==HERO){
      hero.src=HERO;
      hero.alt='Leopardo-de-Amur';
      hero.classList.add('v40-hero');
      hero.style.objectFit='contain';
      hero.style.objectPosition='center center';
    }

    enforceTraitAssets(root);
    applyMobileAnimalLayout(root);

    const card=root.querySelector('.where-card');
    if(!card) return;

    const maps=[...card.querySelectorAll('img.v47-amur-map')];
    const dynamic=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');
    const alreadyCorrect=maps.length===1 && !dynamic && maps[0].getAttribute('src')===MAP;
    if(alreadyCorrect) return;

    try{ window.state?.detailMap?.remove?.(); }catch(e){}

    let heading=card.querySelector('.heading');
    if(heading) heading=heading.cloneNode(true);
    else {
      heading=document.createElement('div');
      heading.className='heading';
      heading.innerHTML='<span class="brush">ONDE VIVE?</span>';
    }

    card.replaceChildren(heading);

    const img=document.createElement('img');
    img.className='v47-amur-map zoomable-image';
    img.src=MAP;
    img.alt='Distribuição histórica e atual do Leopardo-de-Amur';
    img.draggable=false;
    img.style.display='block';
    img.style.width='100%';
    img.style.height='auto';
    img.style.objectFit='contain';
    img.style.background='#f3efe3';
    img.style.borderRadius='0 0 16px 16px';
    card.appendChild(img);
  }

  function schedule(){
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(finalize);
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(!root) return;
    new MutationObserver(schedule).observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    window.addEventListener('resize',schedule,{passive:true});
    schedule();
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();