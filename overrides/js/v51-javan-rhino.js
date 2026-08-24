(()=>{
  const NAME='RINOCERONTE-DE-JAVA';
  const ROOT='assets/generated-v52/javan-rhino/';
  const HERO_B64=ROOT+'animal.webp.b64';
  const LEAVES_B64=ROOT+'diet-leaves.webp.b64';
  const BRANCHES_B64=ROOT+'diet-branches.webp.b64';
  const MAP='assets/generated-v43/javan-rhino/map_range.webp?v=4.3.17';
  const cache=new Map();
  let queued=false;

  function detailIsActive(){return document.getElementById('view-detail')?.classList.contains('active')}
  function isRhino(root){return detailIsActive()&&root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()===NAME}

  async function blobUrl(path){
    if(cache.has(path))return cache.get(path);
    const b64=(await fetch(path,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`Asset ${path}: ${r.status}`);return r.text()})).trim();
    const bin=atob(b64),bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    cache.set(path,url);return url;
  }

  function setImg(img,src,alt){
    if(!img)return;
    if(img.src!==src)img.src=src;
    img.alt=alt;
  }

  async function apply(){
    queued=false;
    const root=document.getElementById('detailContent');
    if(!isRhino(root))return;
    const [heroSrc,leavesSrc,branchesSrc]=await Promise.all([blobUrl(HERO_B64),blobUrl(LEAVES_B64),blobUrl(BRANCHES_B64)]);
    if(!isRhino(root))return;

    root.querySelector('.infographic')?.classList.add('v40-engine','v40-javan-rhino');

    const hero=root.querySelector('.animal-visual img');
    setImg(hero,heroSrc,'Rinoceronte-de-Java');
    if(hero){hero.classList.add('v40-hero');hero.style.setProperty('object-fit','contain','important');hero.style.setProperty('object-position','center bottom','important')}

    const cfg=[
      ['UM ÚNICO CORNO','O pequeno corno, normalmente mais evidente nos machos, distingue a espécie entre os rinocerontes asiáticos.','52% 24%','2.35'],
      ['PELE EM PLACAS','Dobras profundas nos ombros, dorso e flancos criam o aspeto de uma armadura natural.','62% 49%','2.20'],
      ['PATAS ROBUSTAS','Patas largas e fortes sustentam o corpo pesado e ajudam a avançar em solo húmido e vegetação densa.','44% 83%','2.45']
    ];
    [...root.querySelectorAll('.unique-grid .unique-item')].slice(0,3).forEach((item,i)=>{
      const img=item.querySelector('.crop img');
      const title=item.querySelector('h4'),text=item.querySelector('p');
      if(title)title.textContent=cfg[i][0];if(text)text.textContent=cfg[i][1];
      setImg(img,heroSrc,cfg[i][0]);
      if(img){img.style.setProperty('width','100%','important');img.style.setProperty('height','100%','important');img.style.setProperty('object-fit','cover','important');img.style.setProperty('object-position',cfg[i][2],'important');img.style.setProperty('transform',`scale(${cfg[i][3]})`,'important');img.style.setProperty('transform-origin',cfg[i][2],'important')}
    });

    const card=root.querySelector('.where-card');
    if(card){
      card.querySelector(':scope > .heading')?.remove();
      let map=card.querySelector('img.v43-static-map,img');
      const dynamic=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');
      if(dynamic&&dynamic.tagName!=='IMG'){map=document.createElement('img');dynamic.replaceWith(map)}
      if(map){setImg(map,MAP,'Mapa editorial da distribuição do Rinoceronte-de-Java em Ujung Kulon');map.className='v43-static-map zoomable-image';map.style.cssText+=';display:block!important;width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:auto!important;object-fit:contain!important;object-position:center!important;'}
    }

    root.querySelectorAll('.v40-diet-grid article').forEach(article=>{
      const label=article.querySelector('b')?.textContent?.trim().toUpperCase();
      const img=article.querySelector('img');
      if(label==='FOLHAS')setImg(img,leavesSrc,'Folhas tropicais');
      if(label==='RAMOS'||label==='RAMOS JOVENS')setImg(img,branchesSrc,'Ramos jovens com folhas');
    });
  }

  function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>apply().catch(err=>{queued=false;console.error(err)}))}
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    window.addEventListener('resize',()=>{if(isRhino(root))schedule()},{passive:true});
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
