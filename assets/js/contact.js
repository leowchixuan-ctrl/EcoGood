document.addEventListener('DOMContentLoaded', ()=>{
  const nameI = document.getElementById('cName');
  const emailI = document.getElementById('cEmail');
  const messageI = document.getElementById('cMessage');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  const draft = JSON.parse(sessionStorage.getItem('eg_contact_draft') || '{}');
  if(draft.name) nameI.value = draft.name;
  if(draft.email) emailI.value = draft.email;
  if(draft.message) messageI.value = draft.message;

  function saveDraft(){
    sessionStorage.setItem('eg_contact_draft', JSON.stringify({
      name: nameI.value, email: emailI.value, message: messageI.value
    }));
  }
  nameI.addEventListener('input', saveDraft);
  emailI.addEventListener('input', saveDraft);
  messageI.addEventListener('input', saveDraft);

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      form.classList.add('was-validated');
      return;
    }
    status.textContent = 'Thanks! We will reply soon.';
    sessionStorage.removeItem('eg_contact_draft');
    form.reset();
    form.classList.remove('was-validated');
  });
});
