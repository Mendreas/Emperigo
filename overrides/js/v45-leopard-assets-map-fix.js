(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const TRAITS=['trait-1.webp','trait-2.webp','trait-3.webp'];
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.3';
  let queued=false;

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim()==='Leopardo-de-Amur';
  }

  function fixTraits(root){
    const imgs=[...root.querySelectorAll('.unique-grid .unique-item .crop img')];
    TRAITS.forEach((file,i)=>{
      const img=imgs[i];
      if(!img)return;
      const wanted=ROOT+file+'?v=4.3.3';
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
    const current=card.querySelector('.v45-leopard-map');
    if(card.dataset.staticMapVersion==='433' && current){
      if(current.getAttribute('src')!==MAP) current.src=MAP;
      return;
    }

    try{ window.state?.detailMap?.remove?.(); }catch(e){}

    const heading=card.querySelector('.heading')?.cloneNode(true);
    card.innerHTML='';
    if(heading){
      card.appendChild(heading);
    }else{
      const h=document.createElement('div');
      h.className='heading';
      h.innerHTML='<span class="brush">ONDE VIVE?</span>';
      card.appendChild(h);
    }

    const img=document.createElement('img');
    img.className='v43-static-map v45-leopard-map zoomable-image';
    img.src=MAP;
    img.alt='Distribuição histórica e atual do Leopardo-de-Amur';
    img.draggable=false;
    img.style.display='block';
    img.style.width='100%';
    img.style.height='auto';
    img.style.objectFit='contain';
    img.style.borderRadius='0 0 16px 16px';
    img.style.background='#f3efe3';
    card.appendChild(img);
    card.dataset.staticMapVersion='433';
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
    requestAnimationFrame(()=>{fix();setTimeout(fix,100);});
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();