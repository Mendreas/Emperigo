(()=>{
  const ASSET='assets/generated-v34/amur-leopard/';
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
    const d=document.getElementById('detailContent');if(!d||d.dataset.v344Modal)return;d.dataset.v344Modal='1';
    d.addEventListener('click',e=>{const habitat=e.target.closest('.habitat-image');const img=e.target.closest('img');const chosen=habitat?.querySelector('img')||img;if(!chosen||chosen.closest('.leaflet-container'))return;e.preventDefault();e.stopImmediatePropagation();openModal(chosen)},true);
  };
  const pickRandomHero=async()=>{try{const r=await fetch('data/species.json',{cache:'no-store'}),species=await r.json();if(!Array.isArray(species)||!species.length)return;const last=localStorage.getItem('emPerigoLastHero');const pool=species.length>1?species.filter(s=>s.id!==last):species;const s=pool[Math.floor(Math.random()*pool.length)]||species[0];localStorage.setItem('emPerigoLastHero',s.id);const hero=document.querySelector('.hero-animal');if(!hero)return;const img=hero.querySelector('img'),badge=hero.querySelector('.hero-badge');if(img){img.src=s.cardImage||s.image;img.alt=s.name;img.style.objectPosition=s.photoPosition||'50% 45%'}if(badge){badge.querySelector('span').textContent=s.status;badge.querySelector('b').textContent=s.name;badge.querySelector('small').textContent=s.place}hero.onclick=()=>document.querySelector(`#featuredGrid [data-id="${CSS.escape(s.id)}"]`)?.click()}catch(e){console.warn('Hero aleatório indisponível',e)}};

  const css=`
  #detailContent .infographic[data-ai-species="amur-leopard"] .animal-visual img{object-fit:contain!important;object-position:center bottom!important;background:transparent!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .unique-item .crop img{opacity:1!important;width:100%!important;height:100%!important;object-fit:cover!important;pointer-events:auto!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item>span{display:block!important;width:100%!important;height:92px!important;border:0!important;border-radius:12px!important;overflow:hidden!important;background:#f1eadc!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .diet-item>span img{width:100%!important;height:100%!important;object-fit:cover!important;display:block!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .habitat-image img{object-fit:cover!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .closing .polaroid img{object-fit:cover!important;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .amur-custom-icon{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;background:transparent!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .stats-column .stat .ico{overflow:hidden}
  #detailContent .infographic[data-ai-species="amur-leopard"] .habitat-icons>div>span{overflow:hidden}
  #detailContent .infographic[data-ai-species="amur-leopard"] .threat-item .ico{overflow:hidden}
  #detailContent .infographic[data-ai-species="amur-leopard"] .amur-static-range{width:100%;display:block;border-radius:0 0 16px 16px;cursor:zoom-in}
  #detailContent .infographic[data-ai-species="amur-leopard"] .where-card.amur-where-art #speciesRangeMap{display:none!important}
  #detailContent .infographic[data-ai-species="amur-leopard"] .where-card.amur-where-art .range-note{display:none!important}
  `;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  const swap=(img,url,alt)=>{
    if(!img)return;
    const old=img.currentSrc||img.src;
    img.onerror=()=>{img.onerror=null;if(old&&old!==url)img.src=old};
    img.src=url;img.alt=alt||img.alt;img.classList.add('zoomable-image');
  };
  const setIcon=(holder,file,alt='')=>{
    if(!holder)return;
    const old=holder.innerHTML;
    holder.innerHTML=`<img class="amur-custom-icon" src="${ASSET}${file}" alt="${alt}">`;
    const img=holder.querySelector('img');if(img)img.onerror=()=>{holder.innerHTML=old};
  };
  const applyWhereArt=d=>{
    const card=d.querySelector('.where-card');if(!card||card.classList.contains('amur-where-art'))return;
    card.classList.add('amur-where-art');
    const heading=card.querySelector('.heading');
    const img=document.createElement('img');img.className='amur-static-range zoomable-image';img.src=ASSET+'where-lives.webp';img.alt='Onde vive o Leopardo-de-Amur — distribuição histórica e atual';
    img.onerror=()=>{img.remove();card.classList.remove('amur-where-art')};
    heading?.insertAdjacentElement('afterend',img);
  };
  const applyAmur=()=>{
    const d=document.getElementById('detailContent');if(!d||d.querySelector('.info-title h1')?.textContent?.trim()!=='Leopardo-de-Amur')return;
    const info=d.querySelector('.infographic');if(!info)return;info.dataset.aiInfographic='1';info.dataset.aiSpecies='amur-leopard';
    swap(d.querySelector('.animal-visual img'),ASSET+'animal.webp','Leopardo-de-Amur — visual central fotorrealista gerado');
    d.querySelector('.animal-visual .ai-hero-placeholder')?.remove();
    const traits=[...d.querySelectorAll('.unique-item .crop img')];for(let i=0;i<3;i++)swap(traits[i],ASSET+`trait-${i+1}.webp`,`Leopardo-de-Amur — característica ${i+1}`);
    const diets=[...d.querySelectorAll('.diet-item>span')];for(let i=0;i<4;i++){if(!diets[i])continue;const label=d.querySelectorAll('.diet-item b')[i]?.textContent||'Dieta';diets[i].innerHTML=`<img class="zoomable-image" src="${ASSET}diet-${i+1}.webp" alt="${label}">`;diets[i].classList.remove('ai-slot-missing')}

    const stats=[...d.querySelectorAll('.stats-column .stat .ico')];setIcon(stats[0],'pop-estimada.webp','População estimada');setIcon(stats[1],'status.webp','Estado de conservação');setIcon(stats[2],'location.webp','Localização');
    const habitatIcons=[...d.querySelectorAll('.habitat-icons>div>span')];setIcon(habitatIcons[0],'habitat-1.webp','Florestas temperadas');setIcon(habitatIcons[1],'habitat-2.webp','Invernos frios');setIcon(habitatIcons[2],'habitat-3.webp','Terreno montanhoso');
    const threats=[...d.querySelectorAll('.threat-item .ico')];for(let i=0;i<4;i++)setIcon(threats[i],`threat-${i+1}.webp`,`Ameaça ${i+1}`);

    swap(d.querySelector('.habitat-image img'),ASSET+'habitat-generated.webp','Habitat do Leopardo-de-Amur — floresta temperada montanhosa no inverno');
    applyWhereArt(d);
    const finalPhoto=d.querySelector('.closing .polaroid img');if(finalPhoto){swap(finalPhoto,ASSET+'animal-final.webp','Leopardo-de-Amur na neve — imagem final');finalPhoto.dataset.realWebPhoto='1'}
  };
  document.addEventListener('DOMContentLoaded',()=>{bindModal();pickRandomHero();const d=document.getElementById('detailContent');if(d)new MutationObserver(()=>{bindModal();applyAmur()}).observe(d,{childList:true,subtree:true});applyAmur()});
})();