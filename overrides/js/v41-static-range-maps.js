(()=>{
const MAPS={'PANDA-GIGANTE':'assets/generated-v39/giant-panda/map_range.webp.b64'};
const cache=new Map();
async function source(path){if(cache.has(path))return cache.get(path);const text=(await fetch(path,{cache:'force-cache'})).text();const b64=(await text).trim();const bin=atob(b64);const bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));cache.set(path,url);return url}
async function apply(){const root=document.querySelector('#detailContent');if(!root)return;const title=root.querySelector('.info-title h1')?.textContent?.trim().toUpperCase();const path=MAPS[title];if(!path)return;const card=root.querySelector('.where-card');if(!card||card.querySelector('.v41-static-map'))return;const target=card.querySelector('#detailMap,.range-map,.leaflet-container');if(!target)return;const img=document.createElement('img');img.className='v41-static-map';img.alt='Mapa estático da distribuição geográfica do panda-gigante';img.draggable=false;img.src=await source(path);target.replaceWith(img)}
let queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;apply().catch(console.error)})}
const start=()=>{const d=document.querySelector('#detailContent');if(d)new MutationObserver(schedule).observe(d,{childList:true,subtree:true});schedule()};
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();document.addEventListener('click',()=>setTimeout(schedule,0),true);
})();