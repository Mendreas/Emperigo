(()=>{
  const ROOT='assets/generated-v34/amur-leopard/';
  const HERO=ROOT+'animal.webp?v=4.3.4';
  const MAP=ROOT+'mapa_distribuicao.webp?v=4.3.4';
  const TRAITS=['trait-1.webp','trait-2.webp','trait-3.webp'];
  const STAMP='amur-leopard:v430';

  function isLeopard(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()==='LEOPARDO-DE-AMUR';
  }

  function lock(root){
    if(!isLeopard(root)) return;

    const info=root.querySelector('.infographic');
    if(info) info.dataset.v43Engine=STAMP;

    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.getAttribute('src')!==HERO){
      hero.src=HERO;
      hero.alt='Leopardo-de-Amur';
      hero.style.visibility='visible';
      hero.style.objectFit='contain';
      hero.style.objectPosition='center bottom';
    }

    const traitImgs=[...root.querySelectorAll('.unique-grid .unique-item .crop img')];
    TRAITS.forEach((file,i)=>{
      const img=traitImgs[i];
      if(!img) return;
      const src=ROOT+file+'?v=4.3.4';
      if(img.getAttribute('src')!==src) img.src=src;
      img.style.objectFit='cover';
      img.style.objectPosition='center';
      img.style.transform='none';
      img.style.width='100%';
      img.style.height='100%';
    });

    const card=root.querySelector('.where-card');
    if(card){
      const existing=card.querySelector('.v46-amur-map');
      if(!existing){
        try{ window.state?.detailMap?.remove?.(); }catch(e){}
        const heading=card.querySelector('.heading')?.cloneNode(true);
        card.innerHTML='';
        if(heading){ card.appendChild(heading); }
        else {
          const h=document.createElement('div');
          h.className='heading';
          h.innerHTML='<span class="brush">ONDE VIVE?</span>';
          card.appendChild(h);
        }
        const img=document.createElement('img');
        img.className='v43-static-map v46-amur-map zoomable-image';
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
      } else if(existing.getAttribute('src')!==MAP){
        existing.src=MAP;
      }
    }
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(!root) return;
    new MutationObserver(()=>lock(root)).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>lock(root),true);
    lock(root);
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();