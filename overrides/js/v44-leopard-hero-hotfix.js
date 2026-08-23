(()=>{
  const HERO='assets/generated-v34/amur-leopard/animal.webp?v=4.3.1';
  let queued=false;
  function fix(){
    queued=false;
    const root=document.getElementById('detailContent');
    const title=root?.querySelector('.info-title h1')?.textContent?.trim();
    if(title!=='Leopardo-de-Amur')return;
    const img=root.querySelector('.animal-visual img');
    if(!img)return;
    const src=img.getAttribute('src')||'';
    if(!src.includes('generated-v34/amur-leopard/animal.webp')){
      img.src=HERO;
    }
    img.alt='Leopardo-de-Amur — visual central fotorrealista gerado';
    img.style.opacity='1';
    img.style.objectFit='contain';
    img.style.objectPosition='center bottom';
  }
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(fix);
  }
  function start(){
    const root=document.getElementById('detailContent');
    if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
    document.addEventListener('click',()=>setTimeout(schedule,0),true);
    schedule();
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();