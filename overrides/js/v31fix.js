(()=>{
  const isReload=()=>{try{return performance.getEntriesByType('navigation')[0]?.type==='reload'}catch{return false}};
  if(isReload() && /^#species\//.test(location.hash)) history.replaceState(null,'',location.pathname+location.search);

  const openModal=(img)=>{
    if(!img)return;
    const modal=document.getElementById('imageModal'), target=document.getElementById('imageModalImg'), caption=document.getElementById('imageModalCaption');
    if(!modal||!target)return;
    target.src=img.currentSrc||img.src; target.alt=img.alt||'Imagem ampliada';
    if(caption)caption.textContent=img.alt||'';
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  };

  const bindRobustImageModal=()=>{
    const detail=document.getElementById('detailContent');
    if(!detail||detail.dataset.v34ModalBound)return;
    detail.dataset.v34ModalBound='1';
    detail.addEventListener('click',e=>{
      const habitat=e.target.closest('.habitat-image');
      const img=e.target.closest('img');
      const chosen=habitat?.querySelector('img')||img;
      if(!chosen||chosen.closest('.leaflet-container'))return;
      e.preventDefault(); e.stopImmediatePropagation(); openModal(chosen);
    },true);
  };

  const pickRandomHero=async()=>{
    try{
      const res=await fetch('data/species.json',{cache:'no-store'}), species=await res.json();
      if(!Array.isArray(species)||!species.length)return;
      const last=localStorage.getItem('emPerigoLastHero');
      const pool=species.length>1?species.filter(s=>s.id!==last):species;
      const s=pool[Math.floor(Math.random()*pool.length)]||species[0];
      localStorage.setItem('emPerigoLastHero',s.id);
      const hero=document.querySelector('.hero-animal'); if(!hero)return;
      const img=hero.querySelector('img'), badge=hero.querySelector('.hero-badge');
      if(img){img.src=s.cardImage||s.image;img.alt=s.name;img.style.objectPosition=s.photoPosition||'50% 45%'}
      if(badge){badge.querySelector('span').textContent=s.status;badge.querySelector('b').textContent=s.name;badge.querySelector('small').textContent=s.place}
      hero.dataset.speciesId=s.id; hero.style.cursor='pointer';
      hero.onclick=()=>document.querySelector(`#featuredGrid [data-id="${CSS.escape(s.id)}"]`)?.click();
    }catch(e){console.warn('Hero aleatório indisponível',e)}
  };

  const css=`
  #detailContent .infographic[data-ai-species="amur-leopard"]{--ai-paper:#f4efe3}
  #detailContent .infographic[data-ai-species="amur-leopard"] .animal-visual img{object-fit:contain!important;object-position:center bottom!important;background:linear-gradient(180deg,#f7f1e6 0%,#e9e2d3 100%);cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item .crop{background-image:url('assets/generated-v34/amur-traits.svg');background-repeat:no-repeat;background-size:300% 100%;background-color:#eee6d7}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item:nth-child(1) .crop{background-position:0% 50%}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item:nth-child(2) .crop{background-position:50% 50%}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item:nth-child(3) .crop{background-position:100% 50%}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item .crop img{opacity:0!important;pointer-events:none}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item>span{display:block!important;width:100%!important;height:82px!important;border:0!important;border-radius:12px!important;background-image:url('assets/generated-v34/amur-diet.svg')!important;background-repeat:no-repeat!important;background-size:400% 100%!important;background-color:#f1eadc!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item:nth-child(1)>span{background-position:0% 50%!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item:nth-child(2)>span{background-position:33.333% 50%!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item:nth-child(3)>span{background-position:66.666% 50%!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item:nth-child(4)>span{background-position:100% 50%!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .amur-icon{background-image:url('assets/generated-v34/amur-icons.svg')!important;background-repeat:no-repeat!important;background-size:400% 400%!important;border:0!important;background-color:transparent!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .closing .polaroid img{object-fit:cover!important;cursor:zoom-in}
  `;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  const spritePos=['0% 0%','33.333% 0%','66.666% 0%','100% 0%','0% 33.333%','33.333% 33.333%','66.666% 33.333%','100% 33.333%','0% 66.666%','33.333% 66.666%','66.666% 66.666%','100% 66.666%','0% 100%','33.333% 100%'];
  const iconize=(el,index)=>{if(!el)return;el.innerHTML='';el.classList.add('amur-icon');el.style.backgroundPosition=spritePos[index]};

  const applyAmur=()=>{
    const d=document.getElementById('detailContent'); if(!d)return;
    if(d.querySelector('.info-title h1')?.textContent?.trim()!=='Leopardo-de-Amur')return;
    const info=d.querySelector('.infographic'); if(!info||info.dataset.v34Amur==='1')return;
    info.dataset.v34Amur='1'; info.dataset.aiInfographic='1'; info.dataset.aiSpecies='amur-leopard';

    const hero=d.querySelector('.animal-visual img');
    if(hero){hero.src='assets/generated-v34/amur-animal.svg';hero.alt='Leopardo-de-Amur — visual central fotorrealista gerado';hero.classList.add('zoomable-image')}
    d.querySelector('.animal-visual .ai-hero-placeholder')?.remove();
    d.querySelectorAll('.unique-item .crop').forEach(x=>x.classList.remove('ai-slot-missing'));
    d.querySelectorAll('.diet-item>span').forEach(x=>{x.innerHTML='';x.classList.remove('ai-slot-missing')});

    const stats=[...d.querySelectorAll('.stats-column .stat .ico')]; iconize(stats[0],0); iconize(stats[1],1); iconize(stats[2],2);
    [...d.querySelectorAll('.habitat-icons>div>span')].forEach((el,i)=>iconize(el,3+i));
    [...d.querySelectorAll('.threat-item .ico')].forEach((el,i)=>iconize(el,6+i));
    [...d.querySelectorAll('.save-item>span')].forEach((el,i)=>iconize(el,10+i));

    const finalPhoto=d.querySelector('.closing .polaroid img');
    if(finalPhoto){
      finalPhoto.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/Amur_leopard.jpg';
      finalPhoto.alt='Leopardo-de-Amur — fotografia real de Gil Hidalgo / Central Florida Zoo';
      finalPhoto.dataset.realWebPhoto='1';
    }
    const source=d.querySelector('.info-source-note');
    if(source)source.textContent='Fotografia final real: Gil Hidalgo / Central Florida Zoo / Wikimedia Commons — Free Art License.';
  };

  document.addEventListener('DOMContentLoaded',()=>{
    bindRobustImageModal(); pickRandomHero();
    const detail=document.getElementById('detailContent');
    if(detail)new MutationObserver(()=>{bindRobustImageModal();applyAmur()}).observe(detail,{childList:true,subtree:true});
    applyAmur();
  });
})();