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

  // v3.3 — estrutura preparada para visuais gerados, apenas nas 5 espécies originais.
  const TEST_SPECIES={
    'Leopardo-de-Amur':'amur-leopard',
    'Rinoceronte-de-Java':'javan-rhino',
    'Tigre-de-Sumatra':'sumatran-tiger',
    'Panda-Gigante':'giant-panda',
    'Arara-Azul-Grande':'hyacinth-macaw'
  };
  const AI_BASE='assets/generated-v33';
  const AI_PROMPT='um animal central detalhado e fotorrealista como ponto focal. Use fundos limpos e misture fotorrealismo. Faça com que fique denso, tátil e com acabamento profissional';

  const injectAiStyles=()=>{
    if(document.querySelector('link[data-v33-ai]'))return;
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='css/v33-ai-infographic.css?v=3.3.0';
    link.dataset.v33Ai='1';
    document.head.appendChild(link);
  };

  const imageSlot=(img,path,missingClass,alt)=>{
    if(!img)return;
    const holder=img.parentElement;
    img.dataset.generationPrompt=AI_PROMPT;
    img.dataset.generatedAsset=path;
    img.alt=alt||img.alt||'Visual gerado';
    const probe=new Image();
    probe.onload=()=>{
      img.src=path;
      img.classList.add('ai-generated-asset');
      holder?.classList.remove(missingClass);
    };
    probe.onerror=()=>holder?.classList.add(missingClass);
    probe.src=path;
  };

  const iconSlot=(holder,path)=>{
    if(!holder)return;
    holder.dataset.generationPrompt=AI_PROMPT;
    holder.dataset.generatedAsset=path;
    const old=holder.innerHTML;
    const probe=new Image();
    probe.onload=()=>{
      holder.innerHTML=`<img class="ai-generated-icon" src="${path}" alt="Ícone gerado">`;
    };
    probe.onerror=()=>{holder.innerHTML=old};
    probe.src=path;
  };

  const applyAiInfographic=()=>{
    const detail=document.getElementById('detailContent');
    const infographic=detail?.querySelector('.infographic');
    const title=detail?.querySelector('.info-title h1')?.textContent?.trim();
    const id=TEST_SPECIES[title];
    if(!infographic||!id||infographic.dataset.aiV33==='1')return;
    infographic.dataset.aiV33='1';
    infographic.dataset.aiSpecies=id;
    infographic.classList.add('ai-infographic-test');

    // 1) A fotografia real deixa o topo. O topo passa a esperar o animal gerado.
    const animalVisual=infographic.querySelector('.animal-visual');
    const animalImg=animalVisual?.querySelector('img');
    if(animalVisual&&animalImg){
      animalImg.classList.add('ai-generated-animal');
      const ph=document.createElement('div');
      ph.className='ai-hero-placeholder';
      ph.innerHTML=`<div><strong>${title}</strong><small>Espaço reservado ao animal central gerado com o prompt editorial definido para a app. A fotografia real permanece apenas no final da ficha.</small></div>`;
      animalVisual.appendChild(ph);
      imageSlot(animalImg,`${AI_BASE}/${id}/animal.webp`,'ai-missing',`${title} — visual fotorrealista gerado`);
    }

    // 2) Características únicas deixam de depender das fotos reais; cada chamada espera um visual gerado.
    infographic.querySelectorAll('.unique-item .crop img').forEach((img,i)=>{
      const crop=img.closest('.crop');
      crop?.classList.add('ai-visual-slot');
      imageSlot(img,`${AI_BASE}/${id}/trait-${i+1}.webp`,'ai-slot-missing',`${title} — característica ${i+1}`);
    });

    // 3) Dieta passa a aceitar imagens geradas individualmente por alimento.
    infographic.querySelectorAll('.diet-item').forEach((item,i)=>{
      const holder=item.querySelector(':scope > span');
      if(!holder)return;
      holder.classList.add('ai-diet-slot');
      holder.dataset.generationPrompt=AI_PROMPT;
      const path=`${AI_BASE}/${id}/diet-${i+1}.webp`;
      holder.dataset.generatedAsset=path;
      const label=item.querySelector('b')?.textContent||'Alimento';
      const probe=new Image();
      probe.onload=()=>{
        holder.innerHTML=`<img class="ai-generated-diet" src="${path}" alt="${label}">`;
        holder.classList.remove('ai-slot-missing');
      };
      probe.onerror=()=>holder.classList.add('ai-slot-missing');
      probe.src=path;
    });

    // 4) Os ícones estruturais ficam prontos para serem substituídos por assets gerados reutilizáveis.
    const statKeys=['population','status','location'];
    infographic.querySelectorAll('.stats-column .stat .ico').forEach((h,i)=>iconSlot(h,`${AI_BASE}/ui/${statKeys[i]||'info'}.webp`));
    infographic.querySelectorAll('.habitat-icons > div > span').forEach((h,i)=>iconSlot(h,`${AI_BASE}/ui/habitat-${i+1}.webp`));
    infographic.querySelectorAll('.threat-item .ico').forEach((h,i)=>iconSlot(h,`${AI_BASE}/ui/threat-${i+1}.webp`));
    infographic.querySelectorAll('.save-item > span').forEach((h,i)=>iconSlot(h,`${AI_BASE}/ui/conservation-${i+1}.webp`));

    // A fotografia real da espécie fica preservada exclusivamente no bloco final.
    const closing=infographic.querySelector('.closing .polaroid');
    if(closing)closing.dataset.photoRole='real-species-photo';
  };

  document.addEventListener('DOMContentLoaded',()=>{
    injectAiStyles();
    bindRobustImageModal();
    pickRandomHero();
    const detail=document.getElementById('detailContent');
    if(detail){
      applyAiInfographic();
      new MutationObserver(()=>{bindRobustImageModal();applyAiInfographic()}).observe(detail,{childList:true,subtree:true});
    }
  });
})();