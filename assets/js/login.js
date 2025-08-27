document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const remember = document.getElementById('rememberMe');
  const msg = document.getElementById('loginMsg');
  const user = document.getElementById('username');
  const pass = document.getElementById('password');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (user.value && pass.value) {
        // Save to sessionStorage
        sessionStorage.setItem('eg_user', user.value);

        // Save to cookie if "Remember me" checked
        if (remember.checked) {
          setCookie('eg_username', user.value, 7);
        }

        msg.textContent = 'Logged in! Navigate anywhere to see your greeting.';

        // Reset form
        user.value = '';
        pass.value = '';
        remember.checked = false;

        // Reload page so auth.js updates navbar
        setTimeout(() => location.href = "index.html", 800);
      } else {
        msg.textContent = 'Please enter username and password.';
      }
    });
  }
});
