(()=>{
  const NAME='ORANGOTANGO-DE-SUMATRA';
  const ROOT='assets/generated-v55/sumatran-orangutan/';
  const HERO=`${ROOT}animal.webp?v=4.3.31`;
  const DIET=[
    ['https://upload.wikimedia.org/wikipedia/commons/a/a3/Cluster_Fig_Fruit_-_Red_River_Fig_Fruit_-_Buah_Loa_%28Ficus_racemosa%29.jpg','FIGOS E FRUTOS','Base energética'],
    ['https://upload.wikimedia.org/wikipedia/commons/8/8a/Acer_japonicum_youngleaves.jpg','FOLHAS E REBENTOS','Complemento frequente'],
    ['https://upload.wikimedia.org/wikipedia/commons/7/76/Tree_Bark.jpg','CASCA','Recurso em períodos de escassez'],
    ['https://upload.wikimedia.org/wikipedia/commons/9/9a/Termites_on_wood.JPG','INSETOS','Complemento proteico']
  ];
  const TRAITS=[
    ['BRAÇOS MUITO LONGOS','Braços poderosos e muito compridos permitem deslocar-se entre as copas sem descer ao solo.','26% 72%','1.65'],
    ['PELAGEM RUIVA','A longa pelagem avermelhada é uma das características mais reconhecíveis da espécie.','32% 46%','2.10'],
    ['FACE EXPRESSIVA','Olhos frontais e grande mobilidade facial acompanham uma elevada inteligência e comunicação visual.','47% 27%','2.55'],
    ['MÃOS PREÊNSEIS','Mãos e pés fortes agarram ramos com precisão e sustentam a vida quase exclusivamente arborícola.','92% 6%','2.65']
  ];
  const MAP_SVG=`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="#bed5db"/><path d="M250 115 290 92 340 105 390 145 430 190 470 235 520 285 565 340 610 395 655 455 705 520 760 585 820 650 875 710 900 755 870 790 825 780 770 735 710 680 650 620 595 555 540 490 485 420 430 350 380 285 335 225 295 170Z" fill="#e0dabf" stroke="#717969" stroke-width="5"/><path d="M285 135 330 128 375 165 420 215 470 270 520 330 575 395 630 460 690 535 750 605 810 670 850 725 835 750 795 720 735 660 675 600 615 535 555 465 500 395 445 325 390 255 340 190Z" fill="#5b793e"/><path d="M285 135 330 128 375 165 420 215 455 255 430 285 390 265 350 225 315 185Z" fill="#dfa630"/><rect x="45" y="40" width="350" height="68" rx="16" fill="#705c32"/><text x="70" y="87" fill="white" font-family="Arial,sans-serif" font-size="42" font-weight="700">ONDE VIVE?</text><text x="190" y="150" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">ACEH</text><text x="430" y="300" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">SUMATRA DO NORTE</text><text x="575" y="475" fill="#1c2b24" font-family="Arial,sans-serif" font-size="46" font-weight="700">SUMATRA</text><rect x="910" y="500" width="440" height="190" rx="20" fill="#f6f0dc" stroke="#969178" stroke-width="2"/><text x="945" y="550" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">LEGENDA</text><rect x="945" y="580" width="35" height="35" fill="#5b793e"/><text x="1000" y="607" fill="#1c2b24" font-family="Arial,sans-serif" font-size="23">Distribuição histórica</text><rect x="945" y="630" width="35" height="35" fill="#dfa630"/><text x="1000" y="657" fill="#1c2b24" font-family="Arial,sans-serif" font-size="23">Distribuição atual</text><text x="930" y="790" fill="#1c2b24" font-family="Arial,sans-serif" font-size="25">Norte de Sumatra, Indonésia</text></svg>`;
  const MAP='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(MAP_SVG);
  let scheduled=false,applying=false;
  const isOrangutan=root=>!!root&&((root.querySelector('.info-title h1,h1')?.textContent||'').trim().toUpperCase()===NAME||(root.textContent||'').toUpperCase().includes(NAME));
  function ensureStyles(){
    if(document.getElementById('v56-orangutan-styles'))return;
    const s=document.createElement('style');s.id='v56-orangutan-styles';s.textContent=`
      #detailContent .v56-diet{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-flow:row!important;gap:30px 18px!important;align-items:start!important}
      #detailContent .v56-diet article{grid-column:auto!important;grid-row:auto!important;width:auto!important;margin:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:flex-start!important;text-align:center!important;min-width:0!important}
      #detailContent .v56-diet article:nth-child(n){grid-column:auto!important;grid-row:auto!important;transform:none!important}
      #detailContent .v56-diet img{width:150px!important;height:150px!important;max-width:100%!important;object-fit:cover!important;border-radius:50%!important;display:block!important;margin:0 auto 10px!important}
      #detailContent .v56-map{display:block!important;width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;background:#bed5db!important}
      @media(max-width:700px){#detailContent .v56-diet{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:26px 10px!important}#detailContent .v56-diet img{width:min(34vw,150px)!important;height:min(34vw,150px)!important}}
    `;document.head.appendChild(s);
  }
  async function apply(){
    if(applying)return;const root=document.getElementById('detailContent');if(!isOrangutan(root))return;
    const info=root.querySelector('.infographic');if(!info||info.dataset.v56Applied==='1')return;applying=true;
    try{
      if(!isOrangutan(root))return;info.dataset.v56Applied='1';ensureStyles();
      const hero=root.querySelector('.animal-visual img');if(hero){hero.src=HERO;hero.alt='Orangotango-de-Sumatra';hero.classList.add('zoomable-image');hero.style.objectFit='contain';hero.style.objectPosition='center bottom';}
      const grid=root.querySelector('.unique-grid');if(grid)grid.innerHTML=TRAITS.map(t=>`<div class="unique-item v40-trait"><div class="crop"><img class="zoomable-image" src="${HERO}" alt="${t[0]}" style="width:100%!important;height:100%!important;object-fit:cover!important;object-position:${t[2]}!important;transform:scale(${t[3]})!important;transform-origin:${t[2]}!important"></div><div><h4>${t[0]}</h4><p>${t[1]}</p></div></div>`).join('');
      const card=root.querySelector('.where-card');if(card){card.querySelector(':scope > .heading')?.remove();let img=card.querySelector('img');const dyn=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');if(dyn&&dyn.tagName!=='IMG'){img=document.createElement('img');dyn.replaceWith(img);}if(!img){img=document.createElement('img');card.prepend(img);}img.src=MAP;img.alt='Mapa editorial da distribuição do Orangotango-de-Sumatra';img.className='v56-map zoomable-image';}
      const dietCard=root.querySelector('.v40-diet-card,.diet-card');if(dietCard)dietCard.innerHTML=`<div class="heading"><span class="brush">DIETA: PRINCIPALMENTE FRUGÍVORA</span></div><p class="v40-diet-intro">Frutos formam a maior parte da dieta quando disponíveis; folhas, rebentos, casca e insetos complementam a alimentação.</p><div class="v40-diet-grid v56-diet">${DIET.map(d=>`<article><img class="zoomable-image" src="${d[0]}" alt="${d[1]}" loading="lazy" referrerpolicy="no-referrer"><b>${d[1]}</b><small>${d[2]}</small></article>`).join('')}</div>`;
      root.querySelectorAll('img').forEach(img=>img.classList.add('zoomable-image'));
    }catch(err){console.error('Orangutan assets',err);}finally{applying=false;}
  }
  function openModal(img){const modal=document.getElementById('imageModal'),mi=document.getElementById('imageModalImg'),cap=document.getElementById('imageModalCaption');if(!modal||!mi)return;mi.src=img.currentSrc||img.src;mi.alt=img.alt||'Imagem ampliada';if(cap)cap.textContent=img.alt||'';modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;apply();});}
  function start(){const root=document.getElementById('detailContent');if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});document.addEventListener('click',e=>{const r=document.getElementById('detailContent'),img=e.target.closest?.('#detailContent img');if(img&&isOrangutan(r)){e.preventDefault();e.stopPropagation();openModal(img);return;}setTimeout(schedule,0);},true);schedule();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();