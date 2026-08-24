(()=>{
  if(!window.L||!L.map||L.__atlasStaticDetailMapPatch)return;
  const realMap=L.map.bind(L);
  L.__atlasStaticDetailMapPatch=true;
  L.map=function(target,options){
    const id=typeof target==='string'?target:target?.id;
    if(id!=='speciesRangeMap') return realMap(target,options);
    const stub={
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
    return stub;
  };
})();
