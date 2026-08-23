(()=>{
  const ARARA_HERO='assets/generated-v34/hyacinth-macaw/animal_main.webp';
  const AMUR='assets/generated-v34/amur-leopard/';
  const preload=new Image(); preload.src=ARARA_HERO;

  const setSharedIcon=(holder,file,alt)=>{
    if(!holder)return;
    holder.innerHTML=`<img class="shared-stat-icon" src="${AMUR}${file}" alt="${alt}">`;
  };

  const finishAraraHero=(img)=>{
    if(!img)return;
    const reveal=()=>document.documentElement.classList.remove('v37-opening-arara');
    img.src=ARARA_HERO;
    img.alt='Arara-Azul-Grande — visual principal fotorrealista';
    img.classList.add('v37-arara-hero');
    if(img.complete&&img.naturalWidth) reveal(); else {img.addEventListener('load',reveal,{once:true});img.addEventListener('error',reveal,{once:true});}
  };

  const patch=()=>{
    const d=document.getElementById('detailContent');
    if(!d)return;
    const title=d.querySelector('.info-title h1')?.textContent?.trim();
    if(title==='Arara-Azul-Grande'){
      const stats=[...d.querySelectorAll('.stats-column .stat .ico')];
      setSharedIcon(stats[0],'pop-estimada.webp','População estimada');
      setSharedIcon(stats[1],'status.webp','Estado de conservação');
      setSharedIcon(stats[2],'location.webp','Localização');
      finishAraraHero(d.querySelector('.animal-visual img'));
    } else {
      document.documentElement.classList.remove('v37-opening-arara');
    }
    if(title==='Leopardo-de-Amur'){
      d.querySelectorAll('.stats-column .stat .ico img').forEach(img=>img.classList.add('shared-stat-icon'));
    }
  };

  document.addEventListener('click',e=>{
    const card=e.target.closest('[data-id="hyacinth-macaw"]');
    if(card)document.documentElement.classList.add('v37-opening-arara');
    setTimeout(patch,0);
  },true);

  document.addEventListener('DOMContentLoaded',()=>{
    const d=document.getElementById('detailContent');
    if(d)new MutationObserver(patch).observe(d,{childList:true,subtree:true});
    patch();
  });
})();