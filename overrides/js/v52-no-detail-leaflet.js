(()=>{
  if(!window.L||!L.map||L.__atlasStaticDetailMapPatch)return;
  const realMap=L.map.bind(L);
  L.__atlasStaticDetailMapPatch=true;

  // Architecture rule: Leaflet belongs only to the global Map view.
  // Detail pages use static editorial WEBP maps.  Returning a harmless
  // map stub here prevents the legacy app renderer from creating a second
  // Leaflet map and, on iOS/iPadOS, avoids stale Leaflet state after Back.
  L.map=function(target,options){
    const id=typeof target==='string'?target:target?.id;
    if(id!=='speciesRangeMap') return realMap(target,options);
    return {
      setView(){return this},
      fitBounds(){return this},
      invalidateSize(){return this},
      addLayer(){return this},
      removeLayer(){return this},
      addControl(){return this},
      removeControl(){return this},
      on(){return this},
      off(){return this},
      whenReady(fn){if(typeof fn==='function')fn();return this},
      remove(){return this},
      getContainer(){return document.getElementById('speciesRangeMap')}
    };
  };

  // Defensive iOS cleanup.  No invisible modal/overlay/body lock may survive
  // after leaving a species sheet.
  document.addEventListener('click',e=>{
    if(!e.target.closest('#detailBack,[data-view]'))return;
    document.body.classList.remove('modal-open');
    const modal=document.getElementById('imageModal');
    if(modal){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
    }
    const mapCard=document.getElementById('mapBottomCard');
    if(e.target.closest('#detailBack')) mapCard?.classList.remove('show');
  },true);
})();
