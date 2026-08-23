(()=>{
  const isReload=()=>{
    try{return performance.getEntriesByType('navigation')[0]?.type==='reload'}catch{return false}
  };

  // On a manual refresh, always return to Home instead of reopening the last species hash.
  if(isReload() && /^#species\//.test(location.hash)){
    history.replaceState(null,'',location.pathname+location.search);
  }

  const openModal=(img)=>{
    if(!img)return;
    const modal=document.getElementById('imageModal');
    const target=document.getElementById('imageModalImg');
    const caption=document.getElementById('imageModalCaption');
    if(!modal||!target)return;
    target.src=img.currentSrc||img.src;
    target.alt=img.alt||'Imagem ampliada';
    if(caption)caption.textContent=img.alt||'';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  };

  const bindRobustImageModal=()=>{
    const detail=document.getElementById('detailContent');
    if(!detail||detail.dataset.v31ModalBound)return;
    detail.dataset.v31ModalBound='1';
    detail.addEventListener('click',e=>{
      const habitat=e.target.closest('.habitat-image');
      const img=e.target.closest('img');
      const chosen=habitat?.querySelector('img') || img;
      if(!chosen)return;
      // Ignore map tiles and map controls; only infographic photography should enlarge.
      if(chosen.closest('.leaflet-container'))return;
      e.preventDefault();
      e.stopImmediatePropagation();
      openModal(chosen);
    },true);
  };

  const pickRandomHero=async()=>{
    try{
      const res=await fetch('data/species.json',{cache:'no-store'});
      const species=await res.json();
      if(!Array.isArray(species)||!species.length)return;
      const last=localStorage.getItem('emPerigoLastHero');
      let pool=species.length>1?species.filter(s=>s.id!==last):species;
      const s=pool[Math.floor(Math.random()*pool.length)]||species[0];
      localStorage.setItem('emPerigoLastHero',s.id);
      const hero=document.querySelector('.hero-animal');
      if(!hero)return;
      const img=hero.querySelector('img');
      const badge=hero.querySelector('.hero-badge');
      if(img){
        img.src=s.cardImage||s.image;
        img.alt=s.name;
        img.style.objectPosition=s.photoPosition||'50% 45%';
      }
      if(badge){
        const st=badge.querySelector('span'),nm=badge.querySelector('b'),pl=badge.querySelector('small');
        if(st)st.textContent=s.status;
        if(nm)nm.textContent=s.name;
        if(pl)pl.textContent=s.place;
      }
      hero.dataset.speciesId=s.id;
      hero.style.cursor='pointer';
      hero.onclick=()=>{
        const card=document.querySelector(`#featuredGrid [data-id="${CSS.escape(s.id)}"]`);
        if(card)card.click();
      };
    }catch(e){console.warn('Hero aleatório indisponível',e)}
  };

  document.addEventListener('DOMContentLoaded',()=>{
    bindRobustImageModal();
    pickRandomHero();
    const detail=document.getElementById('detailContent');
    if(detail)new MutationObserver(bindRobustImageModal).observe(detail,{childList:true,subtree:true});
  });
})();