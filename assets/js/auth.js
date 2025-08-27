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
