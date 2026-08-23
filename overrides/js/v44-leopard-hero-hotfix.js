(()=>{
  const BASE='assets/generated-v34/amur-leopard/';
  const HERO=BASE+'animal.webp?v=4.3.2';
  const TRAITS=[BASE+'trait-1.webp?v=4.3.2',BASE+'trait-2.webp?v=4.3.2',BASE+'trait-3.webp?v=4.3.2'];
  let queued=false,mapEl=null,map=null,loading=false;

  const css=document.createElement('style');
  css.textContent=`
    #detailContent .infographic[data-ai-species="amur-leopard"] .amur-static-range,
    #detailContent .v40-amur-leopard .v43-static-map{display:none!important}
    #detailContent .v44-live-range{height:340px;width:100%;background:#dfe6df;position:relative;z-index:1}
    #detailContent .v44-live-range .leaflet-control-attribution{font-size:8px}
    @media(max-width:700px){#detailContent .v44-live-range{height:330px}}
  `;
  document.head.appendChild(css);

  async function ensureMap(root){
    const card=root.querySelector('.where-card');
    if(!card||!window.L)return;
    card.classList.remove('amur-where-art');
    const oldLive=card.querySelector('.v44-live-range');
    if(oldLive){ if(mapEl===oldLive&&map){setTimeout(()=>map.invalidateSize(),80);return;} oldLive.remove(); }
    if(loading)return;
    loading=true;
    try{
      const species=await fetch('data/species.json',{cache:'force-cache'}).then(r=>r.json());
      const s=species.find(x=>x.id==='amur-leopard');
      if(!s)return;
      const live=document.createElement('div');
      live.className='v44-live-range';
      live.setAttribute('aria-label','Mapa interativo da distribuição do Leopardo-de-Amur');
      const heading=card.querySelector('.heading');
      (heading||card.firstElementChild)?.insertAdjacentElement('afterend',live);
      mapEl=live;
      map=L.map(live,{zoomControl:true,attributionControl:true,scrollWheelZoom:false,tap:true});
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
      const layers=[];
      if(Array.isArray(s.rangePolygon)&&s.rangePolygon.length){
        const historic=L.polygon(s.rangePolygon,{color:'#697b3c',weight:2,fillColor:'#899a5a',fillOpacity:.24}).addTo(map);
        layers.push(historic);
      }
      if(Array.isArray(s.rangePoints)){
        s.rangePoints.forEach(p=>{const c=L.circleMarker(p,{radius:7,color:'#fff',weight:2,fillColor:'#d99a22',fillOpacity:1}).addTo(map);layers.push(c)});
      }
      const group=L.featureGroup(layers);
      if(layers.length)map.fitBounds(group.getBounds().pad(.35));else map.setView([s.lat||43.4,s.lng||131.6],6);
      setTimeout(()=>map?.invalidateSize(),120);
    }catch(e){console.warn('Mapa dinâmico Leopardo indisponível',e)}finally{loading=false;}
  }

  function fix(){
    queued=false;
    const root=document.getElementById('detailContent');
    const title=root?.querySelector('.info-title h1')?.textContent?.trim();
    if(title!=='Leopardo-de-Amur')return;
    const info=root.querySelector('.infographic');
    if(info){info.dataset.aiSpecies='amur-leopard';info.classList.add('v40-amur-leopard')}
    const hero=root.querySelector('.animal-visual img');
    if(hero){
      if(!(hero.getAttribute('src')||'').includes('generated-v34/amur-leopard/animal.webp'))hero.src=HERO;
      hero.alt='Leopardo-de-Amur — visual central fotorrealista gerado';
      hero.style.opacity='1';hero.style.objectFit='contain';hero.style.objectPosition='center bottom';
    }
    const imgs=[...root.querySelectorAll('.unique-item .crop img')];
    TRAITS.forEach((src,i)=>{if(imgs[i]&&!(imgs[i].getAttribute('src')||'').includes(`generated-v34/amur-leopard/trait-${i+1}.webp`)){imgs[i].src=src;imgs[i].style.objectFit='cover';imgs[i].style.transform='none'}});
    root.querySelectorAll('.amur-static-range,.v43-static-map').forEach(el=>el.style.display='none');
    ensureMap(root);
  }
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(fix)}
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true,attributes:true});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();