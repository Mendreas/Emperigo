(()=>{
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  let species=[];

  async function load(){
    try{species=await fetch('data/species.json',{cache:'no-store'}).then(r=>r.json())}catch(e){console.warn('Dynamic infographic: species data unavailable',e)}
  }
  function current(root){
    const title=$('.info-title h1',root)?.textContent?.trim();
    return species.find(s=>s.name===title)||null;
  }
  function addTraits(root,s){
    const box=$('.unique-list',root)||$('.unique-card',root);
    if(!box||!Array.isArray(s.traits)||s.traits.length<=3)return;
    const existing=$$('.unique-item',box).length;
    s.traits.slice(existing).forEach((t,i)=>{
      const item=document.createElement('div');item.className='unique-item dynamic-editorial-item';
      const img=t.detailImage?`<div class="crop"><img src="${esc(t.detailImage)}" alt="${esc(t.title)}"></div>`:'';
      item.innerHTML=`${img}<div><b>${esc(t.title)}</b><p>${esc(t.text)}</p></div>`;box.appendChild(item);
    });
  }
  function addDiet(root,s){
    const grid=$('.diet-items',root)||$('.diet-grid',root);
    if(!grid||!Array.isArray(s.dietItems)||s.dietItems.length<=4)return;
    const existing=$$('.diet-item',grid).length;
    s.dietItems.slice(existing).forEach((label,i)=>{
      const item=document.createElement('div');item.className='diet-item dynamic-editorial-item';
      const key=s.dietIconKeys?.[existing+i]||'fruit';
      item.innerHTML=`<span class="dynamic-diet-icon" data-icon="${esc(key)}">●</span><b>${esc(label)}</b>`;grid.appendChild(item);
    });
  }
  function addHabitatFacts(root,s){
    const grid=$('.habitat-icons',root);if(!grid||!Array.isArray(s.habitatFacts)||s.habitatFacts.length<=3)return;
    const existing=$(':scope > div',grid)?$$(':scope > div',grid).length:0;
    s.habitatFacts.slice(existing).forEach(f=>{const item=document.createElement('div');item.className='dynamic-editorial-item';item.innerHTML=`<span>◆</span><b>${esc(f)}</b>`;grid.appendChild(item)});
  }
  function addFacts(root,s){
    const facts=Array.isArray(s.didYouKnow)?s.didYouKnow:(s.fact?[s.fact]:[]);if(!facts.length)return;
    if($('.did-you-know',root))return;
    const anchor=$('.diet-card',root)||$('.unique-card',root)||$('.where-card',root);if(!anchor)return;
    const card=document.createElement('section');card.className='did-you-know editorial-card';
    card.innerHTML=`<div class="heading">VOCÊ SABIA?</div><div class="did-you-know-list">${facts.map((f,i)=>`<div class="did-you-know-item"><span>${i+1}</span><p>${esc(typeof f==='string'?f:f.text)}</p></div>`).join('')}</div>`;
    anchor.insertAdjacentElement('afterend',card);
  }
  function addExtraEditorial(root,s){
    const blocks=Array.isArray(s.editorialBlocks)?s.editorialBlocks:[];if(!blocks.length)return;
    const closing=$('.closing',root);blocks.forEach((b,i)=>{if(root.querySelector(`[data-editorial-block="${i}"]`))return;const card=document.createElement('section');card.className='editorial-card dynamic-editorial-block';card.dataset.editorialBlock=i;card.innerHTML=`<div class="heading">${esc(b.title||'EM DESTAQUE')}</div>${b.image?`<img src="${esc(b.image)}" alt="${esc(b.title||s.name)}">`:''}<p>${esc(b.text||'')}</p>`;(closing||root).insertAdjacentElement(closing?'beforebegin':'beforeend',card)})
  }
  function apply(){
    const root=document.getElementById('detailContent');if(!root||!$('.infographic',root))return;const s=current(root);if(!s)return;
    const info=$('.infographic',root);if(info.dataset.dynamicEditorialApplied==='1')return;info.dataset.dynamicEditorialApplied='1';
    addTraits(root,s);addDiet(root,s);addHabitatFacts(root,s);addFacts(root,s);addExtraEditorial(root,s);
  }
  const css=`
    .infographic .dynamic-editorial-item{animation:editorialIn .2s ease-out}
    .infographic .did-you-know{margin-top:18px;padding:18px;border-radius:16px;background:#173d52;color:#fff;box-shadow:0 8px 24px #0001}
    .infographic .did-you-know .heading{font-weight:900;font-size:1.15rem;margin-bottom:10px}
    .infographic .did-you-know-list{display:grid;gap:10px}
    .infographic .did-you-know-item{display:grid;grid-template-columns:30px 1fr;gap:10px;align-items:start}
    .infographic .did-you-know-item span{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#173d52;font-weight:900}
    .infographic .did-you-know-item p{margin:3px 0 0;line-height:1.45}
    .infographic .dynamic-editorial-block{margin-top:18px;padding:18px;border-radius:16px;background:#f4f0e7;border:1px solid #ded6c7}
    .infographic .dynamic-editorial-block img{width:100%;max-height:280px;object-fit:cover;border-radius:12px;margin:10px 0;cursor:zoom-in}
    .infographic .diet-items,.infographic .diet-grid,.infographic .habitat-icons{flex-wrap:wrap!important}
    @keyframes editorialIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
  `;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  document.addEventListener('DOMContentLoaded',async()=>{await load();const root=document.getElementById('detailContent');if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});apply()});
})();