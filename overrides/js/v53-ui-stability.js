(()=>{
  const detail=()=>document.getElementById('detailContent');
  const modal=()=>document.getElementById('imageModal');
  let suppressUntil=0;

  // Do not request obsolete hero assets before the definitive editorial image.
  // Exact legacy sources only: documentary/postal images remain untouched.
  const TRANSPARENT='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const rewriteHeroSource=value=>{
    const s=String(value??'');
    if(s.includes('assets/generated-v34/amur-leopard/animal-final.webp')){
      return 'assets/generated-v34/amur-leopard/animal.webp?v=4.3.20';
    }
    if(s.includes('assets/generated-v43/sumatran-tiger/animal_main.webp')) return TRANSPARENT;
    if(s.includes('assets/generated-v43/javan-rhino/animal_main.webp')) return TRANSPARENT;
    return value;
  };

  if(!window.__atlasHeroSourceGuard){
    window.__atlasHeroSourceGuard=true;
    const srcDesc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
    if(srcDesc?.set&&srcDesc?.get){
      Object.defineProperty(HTMLImageElement.prototype,'src',{
        configurable:srcDesc.configurable,
        enumerable:srcDesc.enumerable,
        get:srcDesc.get,
        set(value){srcDesc.set.call(this,rewriteHeroSource(value));}
      });
    }
    const nativeSetAttribute=Element.prototype.setAttribute;
    Element.prototype.setAttribute=function(name,value){
      if(this instanceof HTMLImageElement&&String(name).toLowerCase()==='src'){
        return nativeSetAttribute.call(this,name,rewriteHeroSource(value));
      }
      return nativeSetAttribute.call(this,name,value);
    };
  }

  function finishClose(){
    const m=modal();
    if(!m)return;
    m.classList.remove('open','v53-closing');
    m.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
    const img=document.getElementById('imageModalImg');
    if(img) img.removeAttribute('src');
  }

  function closeModal(e){
    if(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();}
    const m=modal();
    if(!m)return;
    suppressUntil=Date.now()+450;
    m.classList.add('v53-closing');
    m.style.setProperty('opacity','0','important');
    m.style.setProperty('pointer-events','auto','important');
    document.body.classList.remove('modal-open');
    window.setTimeout(()=>{
      m.style.removeProperty('opacity');
      m.style.removeProperty('pointer-events');
      finishClose();
    },360);
  }

  function isCloseControl(e){
    const path=typeof e.composedPath==='function'?e.composedPath():[];
    return path.some(n=>n?.id==='imageModalClose') || (e.target instanceof Element && !!e.target.closest('#imageModalClose'));
  }

  ['pointerdown','touchstart','mousedown'].forEach(type=>document.addEventListener(type,e=>{
    if(isCloseControl(e)) closeModal(e);
  },true));

  document.addEventListener('click',e=>{
    if(Date.now()<suppressUntil){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation?.();return;}
    if(isCloseControl(e)||e.target.id==='imageModal'||e.target.id==='imageModalStage') closeModal(e);
  },true);

  document.addEventListener('pointerdown',e=>{
    const trigger=e.target instanceof Element?e.target.closest('.species-card[data-id],.list-row[data-id],#mapBottomCard'):null;
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
      const decoded=img.decode?.();
      if(decoded&&typeof decoded.then==='function')decoded.then(reveal).catch(reveal);else reveal();
    }else{
      img.addEventListener('load',()=>{
        const decoded=img.decode?.();
        if(decoded&&typeof decoded.then==='function')decoded.then(reveal).catch(reveal);else reveal();
      },{once:true});
    }
  }

  function start(){
    const d=detail();
    if(d)new MutationObserver(settleHero).observe(d,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    const x=document.getElementById('imageModalClose');
    if(x){
      x.style.setProperty('pointer-events','auto','important');
      x.style.setProperty('touch-action','manipulation','important');
      x.style.setProperty('-webkit-user-select','none','important');
    }
    settleHero();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
