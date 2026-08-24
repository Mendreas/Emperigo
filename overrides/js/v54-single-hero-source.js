(()=>{
  // Prevent obsolete editorial hero assets from ever being requested.
  // The renderer still contains some legacy paths, but iOS/Safari must only
  // request the definitive hero for each species.
  if(window.__atlasSingleHeroSource)return;
  window.__atlasSingleHeroSource=true;

  const TRANSPARENT='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const rewrite=value=>{
    const s=String(value??'');
    if(s.includes('assets/generated-v34/amur-leopard/animal-final.webp')){
      return 'assets/generated-v34/amur-leopard/animal.webp?v=4.3.20';
    }
    // These two v43 heroes are legacy placeholders. Their definitive images
    // are supplied by v50/v51 as blob URLs, so do not waste bandwidth loading
    // the old files first.
    if(s.includes('assets/generated-v43/sumatran-tiger/animal_main.webp')) return TRANSPARENT;
    if(s.includes('assets/generated-v43/javan-rhino/animal_main.webp')) return TRANSPARENT;
    return value;
  };

  const desc=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
  if(desc?.set&&desc?.get){
    Object.defineProperty(HTMLImageElement.prototype,'src',{
      configurable:desc.configurable,
      enumerable:desc.enumerable,
      get:desc.get,
      set(value){desc.set.call(this,rewrite(value));}
    });
  }

  const nativeSetAttribute=Element.prototype.setAttribute;
  Element.prototype.setAttribute=function(name,value){
    if(this instanceof HTMLImageElement && String(name).toLowerCase()==='src'){
      return nativeSetAttribute.call(this,name,rewrite(value));
    }
    return nativeSetAttribute.call(this,name,value);
  };
})();
