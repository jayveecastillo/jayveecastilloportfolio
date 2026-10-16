window.lucide?.createIcons();
const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#main-navigation');
function setMenu(open){
  navigation.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  menu.setAttribute('aria-label',open?'Close menu':'Open menu');
  menu.title=open?'Close menu':'Open menu';
  menu.innerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`;
  window.lucide?.createIcons();
}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});
const dialog=document.querySelector('#image-dialog');
const content=document.querySelector('#enlarged-content');
function openImage(src,alt,offset,height){
  document.querySelector('#image-title').textContent=alt;
  const img=document.createElement('img');img.src=src;img.alt=alt;content.replaceChildren();
  if(offset!==undefined){
    const crop=document.createElement('div');crop.className='site-crop';
    crop.style.setProperty('--crop-height',height);img.style.setProperty('--offset',offset);
    crop.append(img);content.append(crop);
  }else content.append(img);
  dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');
}
document.querySelectorAll('button.site-crop').forEach(button=>button.addEventListener('click',()=>openImage(button.dataset.image,button.querySelector('img').alt,button.dataset.offset,button.dataset.height)));
document.querySelectorAll('.work-card .shot').forEach(shot=>{
  const open=()=>{const img=shot.querySelector('img');openImage(img.src,img.alt)};
  shot.addEventListener('click',open);
});
document.querySelectorAll('[data-workflow-src]').forEach(button=>button.addEventListener('click',()=>openImage(button.dataset.workflowSrc,button.dataset.workflowAlt)));
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#help').value=link.dataset.service}));
document.querySelector('.image-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',event=>{
  const r=dialog.getBoundingClientRect();
  if(event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();
});
const form=document.querySelector('#contact-form');
form.addEventListener('submit',async event=>{
  event.preventDefault();
  const button=form.querySelector('[type=submit]');const status=document.querySelector('#form-status');
  button.disabled=true;status.hidden=false;status.textContent='Sending your enquiry…';
  try{
    const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('Delivery failed');
    status.textContent='Thank you. Your enquiry has been sent. I will reply within one business day.';form.reset();
  }catch{status.textContent='Your enquiry could not be sent. Please email jvcastillo.digital@gmail.com directly, or try again.'}
  finally{button.disabled=false}
});
