// --- Cookie Helpers ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const welcomeUser = document.getElementById('welcomeUser');
  const authBtn = document.getElementById('authBtn');

  // --- Helpers ---
  function showGreeting(username) {
    if (welcomeUser) {
      welcomeUser.textContent = "Hi, " + username;
    }
    if (authBtn) {
      authBtn.innerHTML = `<button class="btn btn-danger" id="logoutBtn">Logout</button>`;
      document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    }
  }

  function showLoginBtn() {
    if (welcomeUser) {
      welcomeUser.textContent = "";
    }
    if (authBtn) {
      authBtn.innerHTML = `<a class="btn btn-success" href="login.html">Login</a>`;
    }
  }

  function logoutUser() {
  sessionStorage.removeItem('eg_user');
  setCookie('eg_username', '', -1); // delete cookie
  showLoginBtn();
}

  // --- Check existing login state ---
  let activeUser = sessionStorage.getItem('eg_user');
  if (!activeUser) {
    const cookieUser = getCookie('eg_username');
    if (cookieUser) {
      sessionStorage.setItem('eg_user', cookieUser);
      activeUser = cookieUser;
    }
  }

  if (activeUser) {
    showGreeting(activeUser);
  } else {
    showLoginBtn();
  }
});
