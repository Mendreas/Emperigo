(()=>{
const SVG=(path)=>`<svg class="svg-icon" viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
const ICONS={
 habitat:'<path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-6h6v6"/>',
 hunting:'<path d="M12 2v4m0 12v4M2 12h4m12 0h4"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
 fishing:'<path d="M3 12c4-5 9-6 14-2l4-3v10l-4-3c-5 4-10 3-14-2Z"/><circle cx="14" cy="11" r="1"/>',
 pollution:'<path d="M5 5h14l-2 16H7L5 5Z"/><path d="M8 5V3h8v2M8 11c3 2 5-2 8 0"/>',
 climate:'<path d="M10 4a2 2 0 0 1 4 0v9.3a5 5 0 1 1-4 0V4Z"/><path d="M12 8v8"/>',
 disease:'<circle cx="12" cy="12" r="4"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l3 3m8 8 3 3M19 5l-3 3m-8 8-3 3"/>',
 conflict:'<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-4 2-7 5-7s5 3 5 7m-2 0c0-4 2-7 5-7s5 3 5 7"/>',
 genetic:'<path d="M8 3c8 4 8 14 0 18m8-18C8 7 8 17 16 21M8 7h8M7 12h10M8 17h8"/>',
 fire:'<path d="M13 2c2 5-1 6 2 9 1-3 3-3 4-5 2 4 2 7 0 11-2 4-8 6-12 2-4-4-2-9 2-12 0 3 2 4 4 5 1-3-2-5 0-8Z"/>'
};
function keyFor(text){const t=(text||'').toLowerCase();
 if(/caça|furtiv|tráfico|comércio ilegal|coleta ilegal/.test(t))return'hunting';
 if(/pesca|captura acidental|bycatch/.test(t))return'fishing';
 if(/plástic|poluição|contamina/.test(t))return'pollution';
 if(/clim|temperatura|cheia|seca/.test(t))return'climate';
 if(/doença|patógeno/.test(t))return'disease';
 if(/conflito|retalia/.test(t))return'conflict';
 if(/genét|população pequena|isolamento/.test(t))return'genetic';
 if(/incênd|queimada/.test(t))return'fire';
 return'habitat';}
function apply(){const root=document.getElementById('detailContent');if(!root)return;root.querySelectorAll('.threat-item').forEach(item=>{const b=item.querySelector('b');const ico=item.querySelector('.ico');if(!ico||!b)return;const k=keyFor(b.textContent);ico.dataset.v61Threat=k;ico.innerHTML=SVG(ICONS[k]);});}
function schedule(){requestAnimationFrame(()=>requestAnimationFrame(apply));}
document.addEventListener('click',schedule,false);window.addEventListener('pageshow',schedule);document.readyState==='loading'?document.addEventListener('DOMContentLoaded',schedule):schedule();
})();