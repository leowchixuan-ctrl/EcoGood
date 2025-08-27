// Smooth scroll and small UX improvements
(function(){
  document.addEventListener('DOMContentLoaded', ()=>{
    updateCartCount();
    const un = getCookie('eg_username');
    const welcome = document.getElementById('welcomeUser');
    if(un && welcome){ welcome.textContent = `Hi, ${un}!`; }
    const year = document.getElementById('year'); if(year) year.textContent = new Date().getFullYear();

    const form = document.getElementById('newsletterForm');
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      document.getElementById('newsletterMsg').textContent = 'Subscribed!';
      form.reset();
    });

    // Fade-in on scroll using IntersectionObserver
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, {root:null, rootMargin:'0px 0px -6% 0px', threshold:0.08});
    document.querySelectorAll('.fade-in').forEach(el=> io.observe(el));
  });

  function initLenis(){
    try{
      if(window.Lenis){
        const lenis = new window.Lenis({duration:1.2, easing: (t)=>Math.min(1,1.001-Math.pow(2,-10*t))});
        function raf(time){
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    }catch(e){ console.warn('Lenis init failed', e); }
  }
  window.addEventListener('load', ()=> setTimeout(initLenis, 300));
})();
