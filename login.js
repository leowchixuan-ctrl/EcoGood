document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('loginForm');
  const remember = document.getElementById('rememberMe');
  const msg = document.getElementById('loginMsg');
  const user = document.getElementById('username');
  const pass = document.getElementById('password');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(user.value && pass.value){
      if(remember.checked){
        setCookie('eg_username', user.value, 7);
      }
      msg.textContent = 'Logged in! Navigate anywhere to see your greeting.';
      user.value = ''; pass.value = ''; remember.checked = false;
    }else{
      msg.textContent = 'Please enter username and password.';
    }
  });
});
