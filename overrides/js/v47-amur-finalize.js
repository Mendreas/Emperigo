(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const HERO=ROOT+'animal.webp?v=4.3.5';
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.5';
  let busy=false;

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()==='LEOPARDO-DE-AMUR';
  }

  function finalize(){
    if(busy)return;
    const root=document.getElementById('detailContent');
    if(!isLeopard(root))return;
    busy=true;
    try{
      const hero=root.querySelector('.animal-visual img');
      if(hero && hero.getAttribute('src')!==HERO){
        hero.src=HERO;
        hero.alt='Leopardo-de-Amur';
      }

      const card=root.querySelector('.where-card');
      if(!card)return;
      try{ window.state?.detailMap?.remove?.(); }catch(e){}

      // A ficha nunca usa Leaflet. Remover qualquer resto de mapa dinamico.
      card.querySelectorAll('.leaflet-container,#speciesRangeMap,.species-range-map').forEach(el=>el.remove());

      // Preservar apenas o titulo e um unico WebP canonico.
      let heading=card.querySelector('.heading');
      if(!heading){
        heading=document.createElement('div');
        heading.className='heading';
        heading.innerHTML='<span class="brush">ONDE VIVE?</span>';
      } else {
        heading=heading.cloneNode(true);
      }

      card.innerHTML='';
      card.appendChild(heading);
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
    } finally {
      busy=false;
    }
  }

  function schedule(){ requestAnimationFrame(finalize); }
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>setTimeout(finalize,0),true);
    finalize();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();