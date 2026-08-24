(()=>{
  if(window.L&&L.map&&!L.__atlasStaticDetailMapPatch){
    const realMap=L.map.bind(L);
    L.__atlasStaticDetailMapPatch=true;
    L.map=function(target,options){
      const id=typeof target==='string'?target:target?.id;
      if(id!=='speciesRangeMap')return realMap(target,options);
      return {
        setView(){return this},fitBounds(){return this},invalidateSize(){return this},
        addLayer(){return this},removeLayer(){return this},addControl(){return this},removeControl(){return this},
        on(){return this},off(){return this},whenReady(fn){if(typeof fn==='function')fn();return this},
        remove(){return this},getContainer(){return document.getElementById('speciesRangeMap')}
      };
    };
  }

  function closeTransientUI(){
    document.body.classList.remove('modal-open');
    const modal=document.getElementById('imageModal');
    if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modal.style.pointerEvents='none'}
    document.getElementById('mapBottomCard')?.classList.remove('show');
  }

  document.addEventListener('click',e=>{
    if(!e.target.closest('#detailBack'))return;
    closeTransientUI();
    setTimeout(()=>{
      if(document.getElementById('view-detail')?.classList.contains('active'))return;
      document.getElementById('detailContent')?.replaceChildren();
      document.getElementById('detailSectionNav')?.replaceChildren();
      closeTransientUI();
    },0);
  },true);

  document.addEventListener('click',e=>{
    if(!e.target.closest('.species-card[data-id],.list-row[data-id],#favoritesGrid [data-id],#mapBottomCard'))return;
    closeTransientUI();
  },true);
})();
