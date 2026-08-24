(()=>{
  const NAME='TIGRE-DE-SUMATRA';
  const ROOT='assets/generated-v50/sumatran-tiger/';
  const HERO_B64=ROOT+'animal.webp.b64';
  const MAP_B64=ROOT+'map_range.webp.b64';
  const MONKEY='https://commons.wikimedia.org/wiki/Special:FilePath/Southern%20Pig-tailed%20Macaque.jpg';
  const cache=new Map();
  let scheduled=false;

  function isTiger(root){
    return root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()===NAME;
  }

  async function blobUrl(path){
    if(cache.has(path)) return cache.get(path);
    const b64=(await fetch(path,{cache:'no-store'}).then(r=>r.text())).trim();
    const bin=atob(b64), bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    cache.set(path,url);
    return url;
  }

  async function apply(){
    scheduled=false;
    const root=document.getElementById('detailContent');
    if(!isTiger(root)) return;

    const [heroUrl,mapUrl]=await Promise.all([blobUrl(HERO_B64),blobUrl(MAP_B64)]);
    const info=root.querySelector('.infographic');
    info?.classList.add('v40-engine','v40-sumatran-tiger');

    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.dataset.v50Tiger!=='hero'){
      hero.src=heroUrl;
      hero.alt='Tigre-de-Sumatra';
      hero.dataset.v50Tiger='hero';
      hero.classList.add('v40-hero');
      hero.style.objectFit='contain';
      hero.style.objectPosition='center bottom';
    }

    const traits=[...root.querySelectorAll('.unique-grid .unique-item')].slice(0,3);
    const cfg=[
      ['RISCAS DENSAS','As riscas estreitas e próximas ajudam a quebrar a silhueta na floresta tropical.','50% 20%','2.45'],
      ['BARBATANAS FACIAIS','Os pelos faciais longos reforçam a expressão e ajudam na perceção tátil de curta distância.','50% 39%','2.7'],
      ['PATAS PODEROSAS','Patas dianteiras robustas favorecem deslocação silenciosa, saltos e ataques curtos.','37% 88%','2.8']
    ];
    traits.forEach((item,i)=>{
      const img=item.querySelector('.crop img');
      const title=item.querySelector('h4');
      const text=item.querySelector('p');
      if(title) title.textContent=cfg[i][0];
      if(text) text.textContent=cfg[i][1];
      if(img){
        img.src=heroUrl;
        img.dataset.v50Tiger='trait-'+i;
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
      let map=card.querySelector('img.v43-static-map,img.v47-amur-map,img');
      const dynamic=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');
      if(dynamic && dynamic.tagName!=='IMG'){
        map=document.createElement('img');
        dynamic.replaceWith(map);
      }
      if(map){
        map.src=mapUrl;
        map.alt='Mapa editorial da localização do Tigre-de-Sumatra';
        map.dataset.v50Tiger='map';
        map.className='v43-static-map zoomable-image';
        map.style.display='block';
        map.style.width='100%';
        map.style.height='auto';
        map.style.maxHeight='none';
        map.style.aspectRatio='auto';
        map.style.objectFit='contain';
        map.style.objectPosition='center';
        map.style.background='#b8d8e6';
      }
    }

    [...root.querySelectorAll('.v40-diet-grid article')].forEach(article=>{
      if(article.querySelector('b')?.textContent?.trim().toUpperCase()==='MACACOS'){
        const img=article.querySelector('img');
        if(img && !img.src.includes('Southern%20Pig-tailed%20Macaque.jpg')){
          img.src=MONKEY;
          img.alt='Macaco-de-cauda-de-porco';
          img.referrerPolicy='no-referrer';
        }
      }
    });
  }

  function schedule(){
    if(scheduled) return;
    scheduled=true;
    requestAnimationFrame(()=>apply().catch(console.error));
  }

  function start(){
    const root=document.getElementById('detailContent');
    if(root) new MutationObserver(schedule).observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    window.addEventListener('resize',schedule,{passive:true});
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
