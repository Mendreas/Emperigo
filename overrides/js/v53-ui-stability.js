(()=>{
  const detail=()=>document.getElementById('detailContent');
  const modal=()=>document.getElementById('imageModal');

  function closeModal(e){
    if(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();}
    const m=modal();
    if(!m)return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    const img=document.getElementById('imageModalImg');
    if(img) img.removeAttribute('src');
  }

  // iOS/Safari: make the close control independent of any later listeners.
  ['pointerup','click','touchend'].forEach(type=>document.addEventListener(type,e=>{
    if(e.target.closest('#imageModalClose')) closeModal(e);
  },true));

  // Also keep tapping the dark backdrop as a reliable escape route.
  document.addEventListener('click',e=>{
    if(e.target.id==='imageModal'||e.target.id==='imageModalStage') closeModal(e);
  },true);

  // Remove the previous species DOM before app.js builds the next sheet. This
  // prevents Safari from retaining the last decoded animal for one paint frame.
  document.addEventListener('pointerdown',e=>{
    const trigger=e.target.closest('.species-card[data-id],.list-row[data-id],#mapBottomCard');
    if(!trigger)return;
    const d=detail();
    if(d) d.replaceChildren();
  },true);

  const FINAL={
    'LEOPARDO-DE-AMUR':src=>src.includes('generated-v34/amur-leopard/animal.webp'),
    'ARARA-AZUL-GRANDE':src=>src.includes('generated-v34/hyacinth-macaw/animal_main.webp'),
    'TIGRE-DE-SUMATRA':src=>src.startsWith('blob:'),
    'RINOCERONTE-DE-JAVA':src=>src.startsWith('blob:')
  };

  let lastHero=null;
  let token=0;
  function settleHero(){
    const d=detail();
    const title=d?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase();
    const img=d?.querySelector('.animal-visual img');
    if(!title||!img)return;
    const test=FINAL[title];
    if(!test){img.style.removeProperty('opacity');return;}

    if(img!==lastHero){
      lastHero=img;
      token++;
      img.style.setProperty('opacity','0','important');
      img.style.setProperty('transition','opacity .14s ease','important');
    }

    const src=img.currentSrc||img.src||'';
    if(!test(src)){
      img.style.setProperty('opacity','0','important');
      return;
    }

    const mine=token;
    const reveal=()=>{
      if(mine!==token||img!==lastHero)return;
      img.style.setProperty('opacity','1','important');
    };
    if(img.complete&&img.naturalWidth>0){
      img.decode?.().then(reveal).catch(reveal) || reveal();
    }else{
      img.addEventListener('load',()=>{img.decode?.().then(reveal).catch(reveal)||reveal()},{once:true});
    }
  }

  function start(){
    const d=detail();
    if(d)new MutationObserver(settleHero).observe(d,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    settleHero();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
