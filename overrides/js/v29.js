(()=>{
  const RECENT_KEY='emPerigoRecent';
  const getRecent=()=>{try{return JSON.parse(localStorage.getItem(RECENT_KEY)||'[]')}catch{return[]}};
  const setRecent=ids=>localStorage.setItem(RECENT_KEY,JSON.stringify(ids.slice(0,5)));
  const remember=id=>{if(!id)return;setRecent([id,...getRecent().filter(x=>x!==id)]);renderRecent()};
  const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const speciesNode=id=>document.querySelector(`#featuredGrid [data-id="${CSS.escape(id)}"],#speciesList [data-id="${CSS.escape(id)}"],#favoritesGrid [data-id="${CSS.escape(id)}"]`);
  const speciesInfo=id=>{
    const n=speciesNode(id); if(!n)return null;
    const img=n.querySelector('img')?.src||'';
    const name=n.querySelector('.card-body b, div b, b')?.textContent?.trim()||id;
    const place=n.querySelector('.card-body small,.place,small')?.textContent?.trim()||'';
    return {id,img,name,place};
  };
  function renderRecent(){
    const section=document.getElementById('recentSection'),grid=document.getElementById('recentGrid');
    if(!section||!grid)return;
    const rows=getRecent().map(speciesInfo).filter(Boolean);
    section.hidden=!rows.length;
    grid.innerHTML=rows.map(s=>`<button class="recent-card" data-recent-id="${safe(s.id)}"><img src="${safe(s.img)}" alt="${safe(s.name)}"><span><b>${safe(s.name)}</b><small>${safe(s.place)}</small></span><i>›</i></button>`).join('');
  }
  function showToast(text){
    let el=document.querySelector('.app-toast');
    if(!el){el=document.createElement('div');el.className='app-toast';document.body.appendChild(el)}
    el.textContent=text;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('show'),1800);
  }
  async function shareCurrent(id,name){
    const url=`${location.origin}${location.pathname}#species/${id}`;
    const data={title:`${name} — Em Perigo`,text:`Conheça ${name} no Atlas Vivo Em Perigo.`,url};
    try{
      if(navigator.share){await navigator.share(data);return}
      await navigator.clipboard.writeText(url);showToast('Ligação copiada');
    }catch(e){if(e?.name!=='AbortError')showToast('Não foi possível partilhar')}
  }
  function enhanceDetail(){
    const header=document.querySelector('#detailContent .info-header');
    const title=header?.querySelector('.info-title h1')?.textContent?.trim();
    if(!header||!title)return;
    let id=null;
    document.querySelectorAll('#featuredGrid [data-id],#speciesList [data-id]').forEach(n=>{
      const nTitle=n.querySelector('.card-body b, div b, b')?.textContent?.trim(); if(nTitle===title)id=n.dataset.id;
    });
    if(id)remember(id);
    if(header.querySelector('#detailShareV29'))return;
    const fav=header.querySelector('#detailFav');
    let actions=header.querySelector('.detail-actions');
    if(!actions){actions=document.createElement('div');actions.className='detail-actions';if(fav){fav.before(actions);actions.appendChild(fav)}else header.appendChild(actions)}
    const btn=document.createElement('button');btn.id='detailShareV29';btn.className='share-btn';btn.type='button';btn.setAttribute('aria-label','Partilhar espécie');btn.textContent='↗';
    btn.onclick=()=>id?shareCurrent(id,title):showToast('Ligação indisponível');
    actions.prepend(btn);
  }
  function openHashSpecies(){
    const m=location.hash.match(/^#species\/([^/?#]+)/);if(!m)return;
    const id=decodeURIComponent(m[1]);
    let tries=0;const timer=setInterval(()=>{tries++;const n=speciesNode(id);if(n){clearInterval(timer);n.click()}else if(tries>20)clearInterval(timer)},150);
  }
  document.addEventListener('click',e=>{
    const recent=e.target.closest('[data-recent-id]');
    if(recent){speciesNode(recent.dataset.recentId)?.click();return}
    const species=e.target.closest('[data-id]');if(species?.dataset.id)remember(species.dataset.id);
  },true);
  window.addEventListener('hashchange',openHashSpecies);
  window.addEventListener('DOMContentLoaded',()=>{setTimeout(()=>{renderRecent();openHashSpecies();enhanceDetail()},400)});
  const observer=new MutationObserver(()=>{renderRecent();enhanceDetail()});
  const start=()=>{const target=document.getElementById('detailContent');if(target)observer.observe(target,{childList:true,subtree:true})};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();