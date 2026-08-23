(()=>{
const CARD='assets/giant-panda.jpg';
function apply(){
 const root=document.querySelector('#detailContent');
 if(!root)return;
 const title=root.querySelector('.info-title h1')?.textContent?.trim().toUpperCase();
 if(title!=='PANDA-GIGANTE')return;
 const img=root.querySelector('#detail-conservation .closing .polaroid img');
 if(!img)return;
 if(!img.src.endsWith('/assets/giant-panda.jpg')){
   img.src=CARD;
   img.alt='Panda-Gigante — fotografia original';
 }
}
let queued=false;
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply()})}
const start=()=>{const d=document.querySelector('#detailContent');if(d)new MutationObserver(schedule).observe(d,{childList:true,subtree:true});schedule()};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
document.addEventListener('click',()=>setTimeout(schedule,0),true);
})();