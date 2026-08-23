(()=>{
  const ASSET='assets/generated-v34/amur-leopard/';
  const exists=async url=>{try{const r=await fetch(url,{method:'HEAD',cache:'no-store'});return r.ok}catch{return false}};
  const isReload=()=>{try{return performance.getEntriesByType('navigation')[0]?.type==='reload'}catch{return false}};
  if(isReload()&&/^#species\//.test(location.hash))history.replaceState(null,'',location.pathname+location.search);

  const openModal=img=>{
    if(!img)return;
    const modal=document.getElementById('imageModal'),target=document.getElementById('imageModalImg'),caption=document.getElementById('imageModalCaption');
    if(!modal||!target)return;
    target.src=img.currentSrc||img.src;target.alt=img.alt||'Imagem ampliada';if(caption)caption.textContent=img.alt||'';
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  };
  const bindModal=()=>{
    const d=document.getElementById('detailContent');if(!d||d.dataset.v341Modal)return;d.dataset.v341Modal='1';
    d.addEventListener('click',e=>{const habitat=e.target.closest('.habitat-image');const img=e.target.closest('img');const chosen=habitat?.querySelector('img')||img;if(!chosen||chosen.closest('.leaflet-container'))return;e.preventDefault();e.stopImmediatePropagation();openModal(chosen)},true);
  };
  const pickRandomHero=async()=>{try{const r=await fetch('data/species.json',{cache:'no-store'}),species=await r.json();if(!Array.isArray(species)||!species.length)return;const last=localStorage.getItem('emPerigoLastHero');const pool=species.length>1?species.filter(s=>s.id!==last):species;const s=pool[Math.floor(Math.random()*pool.length)]||species[0];localStorage.setItem('emPerigoLastHero',s.id);const hero=document.querySelector('.hero-animal');if(!hero)return;const img=hero.querySelector('img'),badge=hero.querySelector('.hero-badge');if(img){img.src=s.cardImage||s.image;img.alt=s.name;img.style.objectPosition=s.photoPosition||'50% 45%'}if(badge){badge.querySelector('span').textContent=s.status;badge.querySelector('b').textContent=s.name;badge.querySelector('small').textContent=s.place}hero.onclick=()=>document.querySelector(`#featuredGrid [data-id="${CSS.escape(s.id)}"]`)?.click()}catch(e){console.warn('Hero aleatório indisponível',e)}};

  const css=`
  #detailContent .infographic[data-ai-species="amur-leopard"] .animal-visual img{object-fit:contain!important;object-position:center bottom!important;background:#f5efe3;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item .crop img{opacity:1!important;width:100%!important;height:100%!important;object-fit:cover!important;pointer-events:auto!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item>span{display:block!important;width:100%!important;height:92px!important;border:0!important;border-radius:12px!important;overflow:hidden!important;background:#f1eadc!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item>span img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .habitat-image img{object-fit:cover!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .closing .polaroid img{object-fit:cover!important;cursor:zoom-in}
  `;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  const swap=async(img,url,alt)=>{if(!img||!(await exists(url)))return false;img.src=url;img.alt=alt||img.alt;img.classList.add('zoomable-image');return true};
  const applyAmur=async()=>{
    const d=document.getElementById('detailContent');if(!d||d.querySelector('.info-title h1')?.textContent?.trim()!=='Leopardo-de-Amur')return;
    const info=d.querySelector('.infographic');if(!info||info.dataset.v341Amur==='1')return;info.dataset.v341Amur='1';info.dataset.aiInfographic='1';info.dataset.aiSpecies='amur-leopard';
    await swap(d.querySelector('.animal-visual img'),ASSET+'animal.webp','Leopardo-de-Amur — visual central fotorrealista gerado');
    d.querySelector('.animal-visual .ai-hero-placeholder')?.remove();
    const traits=[...d.querySelectorAll('.unique-item .crop img')];
    for(let i=0;i<3;i++)await swap(traits[i],ASSET+`trait-${i+1}.webp`,`Leopardo-de-Amur — característica ${i+1}`);
    const diets=[...d.querySelectorAll('.diet-item>span')];
    for(let i=0;i<4;i++){
      const url=ASSET+`diet-${i+1}.webp`;if(await exists(url)){const label=d.querySelectorAll('.diet-item b')[i]?.textContent||'Dieta';diets[i].innerHTML=`<img class="zoomable-image" src="${url}" alt="${label}">`;diets[i].classList.remove('ai-slot-missing')}
    }
    const habitat=d.querySelector('.habitat-image img');await swap(habitat,ASSET+'habitat-real.webp','Habitat real do Leopardo-de-Amur — florestas temperadas e montanhosas do Extremo Oriente');
    const finalPhoto=d.querySelector('.closing .polaroid img');if(finalPhoto){finalPhoto.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/Amur_leopard.jpg';finalPhoto.alt='Leopardo-de-Amur — fotografia real de Gil Hidalgo / Central Florida Zoo';finalPhoto.dataset.realWebPhoto='1'}
  };
  document.addEventListener('DOMContentLoaded',()=>{bindModal();pickRandomHero();const d=document.getElementById('detailContent');if(d)new MutationObserver(()=>{bindModal();applyAmur()}).observe(d,{childList:true,subtree:true});applyAmur()});
})();