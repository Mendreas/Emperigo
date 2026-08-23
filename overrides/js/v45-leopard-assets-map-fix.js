(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const TRAITS=['trait-1.webp','trait-2.webp','trait-3.webp'];
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.2';
  let queued=false;

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim()==='Leopardo-de-Amur';
  }

  function fixTraits(root){
    const imgs=[...root.querySelectorAll('.unique-grid .unique-item .crop img')];
    TRAITS.forEach((file,i)=>{
      const img=imgs[i];
      if(!img)return;
      const wanted=ROOT+file+'?v=4.3.2';
      if(img.getAttribute('src')!==wanted) img.src=wanted;
      img.style.objectFit='cover';
      img.style.objectPosition='center';
      img.style.transform='none';
      img.style.width='100%';
      img.style.height='100%';
    });
  }

  function fixMap(root){
    const card=root.querySelector('.where-card');
    if(!card)return;

    const canonical=card.querySelector('.v45-leopard-map');
    const extras=[...card.querySelectorAll('.amur-static-range,.v43-static-map')].filter(el=>!el.classList.contains('v45-leopard-map'));
    extras.forEach(el=>el.remove());

    // Remove the old dynamic-map target so older patches cannot create a second map.
    card.querySelectorAll('#speciesRangeMap,.species-range-map,.leaflet-container').forEach(el=>el.remove());
    try{ window.state?.detailMap?.remove?.(); }catch(e){}

    if(!canonical){
      const img=document.createElement('img');
      img.className='amur-static-range v45-leopard-map zoomable-image';
      img.src=MAP;
      img.alt='Distribuição histórica e atual do Leopardo-de-Amur';
      img.style.display='block';
      img.style.width='100%';
      img.style.height='auto';
      img.style.borderRadius='0 0 16px 16px';
      const heading=card.querySelector('.heading');
      if(heading) heading.insertAdjacentElement('afterend',img); else card.prepend(img);
    }

    // Avoid duplicate explanatory blocks inherited from older map implementations.
    const notes=[...card.querySelectorAll('.range-note')];
    notes.forEach(n=>n.style.display='none');
  }

  function fix(){
    queued=false;
    const root=document.getElementById('detailContent');
    if(!isLeopard(root))return;
    fixTraits(root);
    fixMap(root);
  }

  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{fix();setTimeout(fix,80);});
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();