const items=[...document.querySelectorAll('.archive-item')];
const places=items.map(x=>x.dataset.place);
const box=document.querySelector('.lightbox');
const viewer=box.querySelector('img');
const counter=box.querySelector('.counter');
const place=box.querySelector('.place');
let index=0;
function show(i){
  index=(i+items.length)%items.length;
  const img=items[index].querySelector('img');
  viewer.src=img.src;
  viewer.alt=img.alt;
  counter.textContent=`${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
  place.textContent=places[index];
}
function openBox(i){show(i);box.classList.add('open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeBox(){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=''}
items.forEach((item,i)=>item.addEventListener('click',()=>openBox(i)));

document.querySelectorAll('.photo').forEach(photo=>photo.addEventListener('click',()=>openBox(Number(photo.dataset.index))));
box.querySelector('.close').onclick=closeBox;
box.querySelector('.prev').onclick=()=>show(index-1);
box.querySelector('.next').onclick=()=>show(index+1);
box.addEventListener('click',e=>{if(e.target===box)closeBox()});
document.addEventListener('keydown',e=>{
 if(!box.classList.contains('open'))return;
 if(e.key==='Escape')closeBox();
 if(e.key==='ArrowLeft')show(index-1);
 if(e.key==='ArrowRight')show(index+1);
});

const tabs=[...document.querySelectorAll('.country-tab')];
const panels=[...document.querySelectorAll('.country-panel')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  const country=tab.dataset.country;
  tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',active?'true':'false')});
  panels.forEach(panel=>{const active=panel.dataset.panel===country;panel.classList.toggle('active',active);panel.hidden=!active});
  if(location.hash==='#nottingham') history.replaceState(null,'','#series');
}));
