(()=>{
  const NAME='ORANGOTANGO-DE-SUMATRA';
  const COMMONS='https://commons.wikimedia.org/wiki/Special:FilePath/';
  const HERO=COMMONS+encodeURIComponent('Sumatran Orangutan Pongo abelii (7930411566).jpg');
  const HABITAT=COMMONS+encodeURIComponent('Orang utan sumatra.jpg');
  const DIET=[
    [COMMONS+encodeURIComponent('Ficus racemosa fruits.jpg'),'FIGOS E FRUTOS','Base energética'],
    [COMMONS+encodeURIComponent('Young leaves and shoots.jpg'),'FOLHAS E REBENTOS','Complemento frequente'],
    [COMMONS+encodeURIComponent('Tree bark close-up.jpg'),'CASCA','Recurso em períodos de escassez'],
    [COMMONS+encodeURIComponent('Termites in wood.jpg'),'INSETOS','Complemento proteico']
  ];
  const mapSvg=`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900"><rect width="1400" height="900" fill="#bed5db"/><path d="M250 115 290 92 340 105 390 145 430 190 470 235 520 285 565 340 610 395 655 455 705 520 760 585 820 650 875 710 900 755 870 790 825 780 770 735 710 680 650 620 595 555 540 490 485 420 430 350 380 285 335 225 295 170Z" fill="#e0dabf" stroke="#717969" stroke-width="5"/><path d="M285 135 330 128 375 165 420 215 470 270 520 330 575 395 630 460 690 535 750 605 810 670 850 725 835 750 795 720 735 660 675 600 615 535 555 465 500 395 445 325 390 255 340 190Z" fill="#5b793e"/><path d="M285 135 330 128 375 165 420 215 455 255 430 285 390 265 350 225 315 185Z" fill="#dfa630"/><rect x="45" y="40" width="350" height="68" rx="16" fill="#705c32"/><text x="70" y="87" fill="white" font-family="Arial,sans-serif" font-size="42" font-weight="700">ONDE VIVE?</text><text x="190" y="150" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">ACEH</text><text x="430" y="300" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">SUMATRA DO NORTE</text><text x="575" y="475" fill="#1c2b24" font-family="Arial,sans-serif" font-size="46" font-weight="700">SUMATRA</text><rect x="910" y="500" width="440" height="190" rx="20" fill="#f6f0dc" stroke="#969178" stroke-width="2"/><text x="945" y="550" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">LEGENDA</text><rect x="945" y="580" width="35" height="35" fill="#5b793e"/><text x="1000" y="607" fill="#1c2b24" font-family="Arial,sans-serif" font-size="23">Distribuição histórica</text><rect x="945" y="630" width="35" height="35" fill="#dfa630"/><text x="1000" y="657" fill="#1c2b24" font-family="Arial,sans-serif" font-size="23">Distribuição atual</text><path d="M1280 160v85" stroke="#1c2b24" stroke-width="5"/><path d="m1280 135-15 30h30Z" fill="#1c2b24"/><text x="1268" y="110" fill="#1c2b24" font-family="Arial,sans-serif" font-size="28" font-weight="700">N</text><text x="930" y="790" fill="#1c2b24" font-family="Arial,sans-serif" font-size="25">Norte de Sumatra, Indonésia</text></svg>`;
  const MAP='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(mapSvg);
  let scheduled=false;
  const isSpecies=root=>root?.querySelector('.info-title h1')?.textContent?.trim().toUpperCase()===NAME;
  function apply(){
    scheduled=false;
    const root=document.getElementById('detailContent'); if(!isSpecies(root)) return;
    const info=root.querySelector('.infographic'); info?.classList.add('v40-engine','v55-sumatran-orangutan');
    const hero=root.querySelector('.animal-visual img');
    if(hero && hero.dataset.v55!=='hero'){
      hero.src=HERO; hero.alt='Orangotango-de-Sumatra'; hero.dataset.v55='hero'; hero.classList.add('v40-hero');
      hero.style.objectFit='contain'; hero.style.objectPosition='center bottom';
    }
    const traitCfg=[
      ['BRAÇOS MUITO LONGOS','Braços poderosos e muito compridos permitem deslocar-se entre as copas sem descer ao solo.','50% 50%','1.55'],
      ['PELAGEM RUIVA','A pelagem longa e avermelhada distingue imediatamente este grande primata de Sumatra.','42% 42%','2.35'],
      ['FACE EXPRESSIVA','Olhos frontais e grande mobilidade facial acompanham uma elevada inteligência e comunicação visual.','50% 28%','2.75'],
      ['MÃOS PREÊNSEIS','Mãos e pés fortes agarram ramos com precisão e sustentam a vida quase exclusivamente arborícola.','45% 78%','2.45']
    ];
    let grid=root.querySelector('.unique-grid');
    if(grid){
      const template=grid.querySelector('.unique-item');
      while(grid.children.length<4 && template) grid.appendChild(template.cloneNode(true));
      [...grid.querySelectorAll('.unique-item')].slice(0,4).forEach((item,i)=>{
        const c=traitCfg[i], img=item.querySelector('.crop img'), h=item.querySelector('h4'), p=item.querySelector('p');
        if(h) h.textContent=c[0]; if(p) p.textContent=c[1];
        if(img){img.src=HERO;img.alt=c[0];img.style.setProperty('width','100%','important');img.style.setProperty('height','100%','important');img.style.setProperty('object-fit','cover','important');img.style.setProperty('object-position',c[2],'important');img.style.setProperty('transform',`scale(${c[3]})`,'important');img.style.setProperty('transform-origin',c[2],'important');}
      });
    }
    const habitat=root.querySelector('.habitat-card img,.habitat-photo img'); if(habitat){habitat.src=HABITAT;habitat.alt='Floresta tropical de Sumatra, habitat do orangotango-de-Sumatra';}
    const card=root.querySelector('.where-card');
    if(card){card.querySelector(':scope > .heading')?.remove();let map=card.querySelector('img');const dyn=card.querySelector('.leaflet-container,#speciesRangeMap,.species-range-map');if(dyn&&dyn.tagName!=='IMG'){map=document.createElement('img');dyn.replaceWith(map);}if(map){map.src=MAP;map.alt='Mapa editorial da distribuição do Orangotango-de-Sumatra';map.className='v43-static-map zoomable-image';Object.assign(map.style,{display:'block',width:'100%',height:'auto',maxHeight:'none',aspectRatio:'auto',objectFit:'contain',objectPosition:'center'});}}
    const dietCard=[...root.querySelectorAll('.v40-diet-card,.diet-card')][0];
    if(dietCard){const title=dietCard.querySelector('.heading');if(title)title.textContent='DIETA: PRINCIPALMENTE FRUGÍVORA';const intro=dietCard.querySelector('.v40-diet-intro,.diet-intro');if(intro)intro.textContent='Frutos formam a maior parte da dieta quando disponíveis; folhas, rebentos, casca e insetos complementam a alimentação.';const dg=dietCard.querySelector('.v40-diet-grid');if(dg){const art=dg.querySelector('article');while(dg.children.length<4&&art)dg.appendChild(art.cloneNode(true));[...dg.querySelectorAll('article')].slice(0,4).forEach((a,i)=>{const img=a.querySelector('img'),b=a.querySelector('b'),s=a.querySelector('small');if(img){img.src=DIET[i][0];img.alt=DIET[i][1];img.referrerPolicy='no-referrer';}if(b)b.textContent=DIET[i][1];if(s)s.textContent=DIET[i][2];});}}
    }
  }
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(apply);}
  function start(){const root=document.getElementById('detailContent');if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});document.addEventListener('click',()=>setTimeout(schedule,0),true);window.addEventListener('resize',schedule,{passive:true});schedule();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
