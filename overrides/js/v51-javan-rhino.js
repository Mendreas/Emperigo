(()=>{
  // Global iPhone/iPad navigation guard. Leaflet is reserved for the global
  // Map view; species sheets use static WEBP maps only.
  if(window.L&&L.map&&!L.__atlasStaticDetailMapPatch){
    const realMap=L.map.bind(L);
    L.__atlasStaticDetailMapPatch=true;
    L.map=function(target,options){
      const id=typeof target==='string'?target:target?.id;
      if(id!=='speciesRangeMap')return realMap(target,options);
      return {setView(){return this},fitBounds(){return this},invalidateSize(){return this},addLayer(){return this},removeLayer(){return this},addControl(){return this},removeControl(){return this},on(){return this},off(){return this},whenReady(fn){if(typeof fn==='function')fn();return this},remove(){return this},getContainer(){return document.getElementById('speciesRangeMap')}};
    };
  }
  document.addEventListener('click',e=>{
    if(!e.target.closest('#detailBack,[data-view]'))return;
    document.body.classList.remove('modal-open');
    const modal=document.getElementById('imageModal');
    if(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
    if(e.target.closest('#detailBack'))document.getElementById('mapBottomCard')?.classList.remove('show');
  },true);

  const NAME='RINOCERONTE-DE-JAVA';
  const HERO_B64='assets/generated-v52/javan-rhino/animal.webp.b64';
  const MAP='assets/generated-v43/javan-rhino/map_range.webp?v=4.3.16';
  const LEAVES='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tropicalleaves.jpg/960px-Tropicalleaves.jpg';
  const BRANCHES='https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Tree_branches_with_some_leaves.jpg/960px-Tree_branches_with_some_leaves.jpg';
  let scheduled=false;
  let heroUrl='';

  function isRhino(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()===NAME;
  }

  async function getHero(){
    if(heroUrl)return heroUrl;
    const b64=(await fetch(HERO_B64,{cache:'no-store'}).then(r=>r.text())).trim();
    const bin=atob(b64),bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    heroUrl=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    return heroUrl;
  }

  async function apply(){
    scheduled=false;
    const root=document.getElementById('detailContent');
    if(!isRhino(root)) return;
    const heroSrc=await getHero();

    const info=root.querySelector('.infographic');
    info?.classList.add('v40-engine','v40-javan-rhino');

    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.src!==heroSrc){
      hero.src=heroSrc;
      hero.alt='Rinoceronte-de-Java';
      hero.classList.add('v40-hero');
      hero.style.setProperty('object-fit','contain','important');
      hero.style.setProperty('object-position','center bottom','important');
    }

    const traits=[...root.querySelectorAll('.unique-grid .unique-item')].slice(0,3);
    const cfg=[
      ['UM ÚNICO CORNO','O pequeno corno, normalmente mais evidente nos machos, distingue a espécie entre os rinocerontes asiáticos.','52% 25%','2.5'],
      ['PELE EM PLACAS','Dobras profundas nos ombros, dorso e flancos criam o aspeto de uma armadura natural.','58% 55%','2.35'],
      ['PATAS ROBUSTAS','Patas largas e fortes sustentam o corpo pesado e ajudam a avançar em solo húmido e vegetação densa.','42% 88%','2.9']
    ];
    traits.forEach((item,i)=>{
      const img=item.querySelector('.crop img');
      const title=item.querySelector('h4');
      const text=item.querySelector('p');
      if(title) title.textContent=cfg[i][0];
      if(text) text.textContent=cfg[i][1];
      if(img && img.src!==heroSrc){
        img.src=heroSrc;
        img.alt=cfg[i][0];
        img.style.setProperty('width','100%','important');
        img.style.setProperty('height','100%','important');
        img.style.setProperty('object-fit','cover','important');
        img.style.setProperty('object-position',cfg[i][2],'important');
        img.style.setProperty('transform',`scale(${cfg[i][3]})`,'important');
        img.style.setProperty('transform-origin',cfg[i][2],'important');
      }
    });

    const card=root.querySelector('.where-card');
    if(card){
      card.querySelector(':scope > .heading')?.remove();
      let map=card.querySelector('img.v43-static-map,img');
      const dynamic=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');
      if(dynamic && dynamic.tagName!=='IMG'){
        map=document.createElement('img');
        dynamic.replaceWith(map);
      }
      if(map && !map.src.includes('/generated-v43/javan-rhino/map_range.webp')){
        map.src=MAP;
        map.alt='Mapa editorial da distribuição do Rinoceronte-de-Java em Ujung Kulon';
        map.className='v43-static-map zoomable-image';
        map.style.setProperty('display','block','important');
        map.style.setProperty('width','100%','important');
        map.style.setProperty('height','auto','important');
        map.style.setProperty('max-height','none','important');
        map.style.setProperty('aspect-ratio','auto','important');
        map.style.setProperty('object-fit','contain','important');
        map.style.setProperty('object-position','center','important');
      }
    }

    root.querySelectorAll('.where-card img').forEach(img=>{
      img.style.setProperty('height','auto','important');
      img.style.setProperty('max-height','none','important');
      img.style.setProperty('aspect-ratio','auto','important');
      img.style.setProperty('object-fit','contain','important');
    });

    root.querySelectorAll('.v40-diet-grid article').forEach(article=>{
      const label=article.querySelector('b')?.textContent?.trim().toUpperCase();
      const img=article.querySelector('img');
      if(!img)return;
      if(label==='FOLHAS' && img.src!==LEAVES){img.src=LEAVES;img.alt='Folhas tropicais';img.referrerPolicy='no-referrer'}
      if(label==='RAMOS' && img.src!==BRANCHES){img.src=BRANCHES;img.alt='Ramos com folhas';img.referrerPolicy='no-referrer'}
    });
  }

  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>apply().catch(console.error))}
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    window.addEventListener('resize',schedule,{passive:true});
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
