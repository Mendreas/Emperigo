(()=>{
  const AMUR_TRAITS=[
    'assets/generated-v34/amur-leopard/trait-1.webp?v=4.3.8',
    'assets/generated-v34/amur-leopard/trait-2.webp?v=4.3.8',
    'assets/generated-v34/amur-leopard/trait-3.webp?v=4.3.8'
  ];

  function speciesName(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()||'';
  }

  function makeMapReadable(root){
    const card=root.querySelector('.where-card');
    if(!card) return;
    const img=card.querySelector('img');
    if(!img) return;
    img.style.display='block';
    img.style.width='100%';
    img.style.maxWidth='100%';
    img.style.height='auto';
    img.style.maxHeight='none';
    img.style.aspectRatio='auto';
    img.style.objectFit='contain';
    img.style.objectPosition='center';
  }

  function apply(){
    const root=document.getElementById('detailContent');
    if(!root) return;
    const name=speciesName(root);
    const info=root.querySelector('.infographic');
    if(!info) return;

    if(name==='ARARA-AZUL-GRANDE'){
      makeMapReadable(root);
    }

    if(name==='PANDA-GIGANTE'){
      const card=root.querySelector('.where-card');
      card?.querySelector(':scope > .heading')?.remove();
      makeMapReadable(root);
    }

    if(name==='LEOPARDO-DE-AMUR'){
      const hero=root.querySelector('.animal-visual img');
      if(hero && !hero.src.includes('/generated-v34/amur-leopard/animal.webp')){
        hero.src='assets/generated-v34/amur-leopard/animal.webp?v=4.3.8';
        hero.alt='Leopardo-de-Amur';
      }
      root.querySelectorAll('.v40-trait img').forEach((img,i)=>{
        if(AMUR_TRAITS[i] && img.getAttribute('src')!==AMUR_TRAITS[i]){
          img.src=AMUR_TRAITS[i];
          img.style.objectPosition='50% 50%';
          img.style.setProperty('--trait-zoom','1');
          img.style.setProperty('--trait-origin','50% 50%');
        }
      });
    }
  }

  let raf=0;
  function schedule(){
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(()=>{
      apply();
      setTimeout(apply,80);
      setTimeout(apply,260);
    });
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(root) new MutationObserver(schedule).observe(root,{childList:true,subtree:true,attributes:true});
    document.addEventListener('click',schedule,true);
    window.addEventListener('hashchange',schedule);
    schedule();
  }

  document.readyState==='loading' ? document.addEventListener('DOMContentLoaded',start) : start();
})();
