(()=>{
  function speciesName(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()||'';
  }
  function apply(){
    const root=document.getElementById('detailContent');
    if(!root) return;
    const name=speciesName(root);
    const card=root.querySelector('.where-card');
    if(!card) return;

    if(name==='ARARA-AZUL-GRANDE'){
      const img=card.querySelector('img');
      if(img){
        img.style.display='block';
        img.style.width='100%';
        img.style.height='auto';
        img.style.maxHeight='none';
        img.style.objectFit='contain';
        img.style.objectPosition='center';
      }
      const wrappers=[...card.querySelectorAll('.v40-map-wrap,.range-map-wrap,.map-image-wrap,.static-map-wrap')];
      wrappers.forEach(w=>{
        w.style.height='auto';
        w.style.maxHeight='none';
        w.style.overflow='visible';
      });
    }

    if(name==='PANDA-GIGANTE'){
      const heading=card.querySelector(':scope > .heading');
      if(heading) heading.remove();
    }
  }

  function schedule(){ setTimeout(apply,80); setTimeout(apply,300); }
  document.addEventListener('click',schedule,true);
  window.addEventListener('hashchange',schedule);
  document.readyState==='loading' ? document.addEventListener('DOMContentLoaded',schedule) : schedule();
})();
