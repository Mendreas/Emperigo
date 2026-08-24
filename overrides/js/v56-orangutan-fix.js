(()=>{
  const NAME='ORANGOTANGO-DE-SUMATRA';
  const ROOT='assets/generated-v55/sumatran-orangutan/';
  const DIET=[
    ['https://upload.wikimedia.org/wikipedia/commons/a/a3/Cluster_Fig_Fruit_-_Red_River_Fig_Fruit_-_Buah_Loa_%28Ficus_racemosa%29.jpg','FIGOS E FRUTOS','Base energética'],
    ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Acer_japonicum_youngleaves.jpg','FOLHAS E REBENTOS','Complemento frequente'],
    ['https://upload.wikimedia.org/wikipedia/commons/7/76/Tree_Bark.jpg','CASCA','Recurso em períodos de escassez'],
    ['https://upload.wikimedia.org/wikipedia/commons/9/9a/Termites_on_wood.JPG','INSETOS','Complemento proteico']
  ];
  const TRAITS=[
    ['BRAÇOS MUITO LONGOS','Braços poderosos e muito compridos permitem deslocar-se entre as copas sem descer ao solo.','50% 55%','1.35'],
    ['PELAGEM RUIVA','A longa pelagem avermelhada é uma das características mais reconhecíveis da espécie.','35% 48%','2.05'],
    ['FACE EXPRESSIVA','Olhos frontais e grande mobilidade facial acompanham uma elevada inteligência e comunicação visual.','47% 27%','2.45'],
    ['MÃOS PREÊNSEIS','Mãos e pés fortes agarram ramos com precisão e sustentam a vida quase exclusivamente arborícola.','78% 14%','2.35']
  ];
  let heroPromise=null, scheduled=false, applying=false;

  const isOrangutan=root=>!!root&&((root.querySelector('.info-title h1,h1')?.textContent||'').trim().toUpperCase()===NAME||(root.textContent||'').toUpperCase().includes(NAME));

  async function getHero(){
    if(heroPromise)return heroPromise;
    heroPromise=(async()=>{
      const parts=await Promise.all([1,2,3,4,5,6].map(n=>fetch(`${ROOT}animal.part${String(n).padStart(2,'0')}.b64?v=4.3.28`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('orangutan asset '+n);return r.text()})));
      const base64=parts.join('').replace(/\s/g,'');
      const bin=atob(base64), bytes=new Uint8Array(bin.length);
      for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
      return URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    })();
    return heroPromise;
  }

  function ensureStyles(){
    if(document.getElementById('v56-orangutan-styles'))return;
    const s=document.createElement('style');
    s.id='v56-orangutan-styles';
    s.textContent=`
      #detailContent .v56-diet{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:30px 20px!important;align-items:start!important}
      #detailContent .v56-diet article{display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;min-width:0!important}
      #detailContent .v56-diet img{width:150px!important;height:150px!important;max-width:100%!important;object-fit:cover!important;border-radius:50%!important;display:block!important}
      @media(max-width:700px){
        #detailContent .v56-diet{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:26px 14px!important}
        #detailContent .v56-diet img{width:min(34vw,150px)!important;height:min(34vw,150px)!important}
      }
    `;
    document.head.appendChild(s);
  }

  async function apply(){
    if(applying)return;
    const root=document.getElementById('detailContent');
    if(!isOrangutan(root))return;
    const info=root.querySelector('.infographic');
    if(!info||info.dataset.v56Applied==='1')return;
    applying=true;
    try{
      const HERO=await getHero();
      if(!isOrangutan(root))return;
      info.dataset.v56Applied='1';
      ensureStyles();

      const hero=root.querySelector('.animal-visual img');
      if(hero){hero.src=HERO;hero.alt='Orangotango-de-Sumatra';hero.classList.add('zoomable-image');hero.style.objectFit='contain';hero.style.objectPosition='center bottom';}

      const grid=root.querySelector('.unique-grid');
      if(grid)grid.innerHTML=TRAITS.map(t=>`<div class="unique-item v40-trait"><div class="crop"><img class="zoomable-image" src="${HERO}" alt="${t[0]}" style="width:100%!important;height:100%!important;object-fit:cover!important;object-position:${t[2]}!important;transform:scale(${t[3]})!important;transform-origin:${t[2]}!important"></div><div><h4>${t[0]}</h4><p>${t[1]}</p></div></div>`).join('');

      const dietCard=root.querySelector('.v40-diet-card,.diet-card');
      if(dietCard)dietCard.innerHTML=`<div class="heading"><span class="brush">DIETA: PRINCIPALMENTE FRUGÍVORA</span></div><p class="v40-diet-intro">Frutos formam a maior parte da dieta quando disponíveis; folhas, rebentos, casca e insetos complementam a alimentação.</p><div class="v40-diet-grid v56-diet">${DIET.map(d=>`<article><img class="zoomable-image" src="${d[0]}" alt="${d[1]}" loading="lazy" referrerpolicy="no-referrer"><b>${d[1]}</b><small>${d[2]}</small></article>`).join('')}</div>`;

      root.querySelectorAll('img').forEach(img=>img.classList.add('zoomable-image'));
    }catch(err){console.error('Orangutan assets',err);}
    finally{applying=false;}
  }

  function openModal(img){
    const modal=document.getElementById('imageModal'), mi=document.getElementById('imageModalImg'), cap=document.getElementById('imageModalCaption');
    if(!modal||!mi)return;
    mi.src=img.currentSrc||img.src;mi.alt=img.alt||'Imagem ampliada';if(cap)cap.textContent=img.alt||'';
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  }

  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});}
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',e=>{
      const r=document.getElementById('detailContent'),img=e.target.closest?.('#detailContent img');
      if(img&&isOrangutan(r)){e.preventDefault();e.stopPropagation();openModal(img);return;}
      setTimeout(schedule,0);
    },true);
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();