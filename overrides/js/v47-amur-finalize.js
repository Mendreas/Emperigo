(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const HERO=ROOT+'animal.webp?v=4.3.6';
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.6';
  const STAMP='amur-leopard:v430';
  let scheduled=false;

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()==='LEOPARDO-DE-AMUR';
  }

  function finalize(){
    scheduled=false;
    const root=document.getElementById('detailContent');
    if(!isLeopard(root)) return;

    const info=root.querySelector('.infographic');
    if(info) info.dataset.v43Engine=STAMP;

    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.getAttribute('src')!==HERO){
      hero.src=HERO;
      hero.alt='Leopardo-de-Amur';
      hero.style.objectFit='contain';
      hero.style.objectPosition='center bottom';
    }

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
    new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    schedule();
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();