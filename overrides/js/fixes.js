(() => {
  const AMUR_HABITAT = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Im_Wald_der_Amurleoparden.jpg';

  function ensureModal(){
    let modal=document.getElementById('imageModal');
    if(modal) return modal;
    modal=document.createElement('div');
    modal.id='imageModal';
    modal.className='image-modal';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<button class="image-modal-close" id="imageModalClose" aria-label="Fechar">×</button><div class="image-modal-stage"><img id="imageModalImg" alt=""><div class="image-modal-caption" id="imageModalCaption"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{if(e.target===modal||e.target.classList.contains('image-modal-stage')) closeModal();});
    modal.querySelector('#imageModalClose').addEventListener('click',closeModal);
    return modal;
  }
  function openModal(img){
    const modal=ensureModal();
    const target=modal.querySelector('#imageModalImg');
    const caption=modal.querySelector('#imageModalCaption');
    target.src=img.currentSrc||img.src;
    target.alt=img.alt||'Imagem ampliada';
    caption.textContent=img.alt||'';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }
  function closeModal(){
    const modal=document.getElementById('imageModal'); if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
  function patchDetail(){
    const detail=document.getElementById('detailContent'); if(!detail) return;
    const heading=[...detail.querySelectorAll('h1')].find(x=>x.textContent.includes('Leopardo-de-Amur'));
    if(heading){
      const habitat=detail.querySelector('.habitat-image img');
      if(habitat && habitat.src!==AMUR_HABITAT){
        habitat.src=AMUR_HABITAT;
        habitat.alt='Habitat do Leopardo-de-Amur — floresta de Kedrovaya Pad, Extremo Oriente Russo';
      }
      const credit=detail.querySelector('.habitat-credit-line');
      if(credit) credit.textContent='Kedrovaya Pad, Extremo Oriente Russo — Sibirjako / Wikimedia Commons, CC BY-SA 4.0.';
    }
    detail.querySelectorAll('img').forEach(img=>{
      if(img.dataset.modalBound) return;
      img.dataset.modalBound='1';
      img.classList.add('zoomable-image');
      img.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openModal(img);});
    });
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
  document.addEventListener('DOMContentLoaded',()=>{
    ensureModal();
    const detail=document.getElementById('detailContent');
    if(detail){new MutationObserver(patchDetail).observe(detail,{childList:true,subtree:true});patchDetail();}
  });
})();