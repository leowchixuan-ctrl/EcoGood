
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Hero animations (only if hero exists)
  if (document.querySelector(".hero-full")) {
    gsap.from(".hero-full h1", {
      y: 40, opacity: 0, duration: 1, ease: "power3.out"
    });
    gsap.from(".hero-full p", {
      y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out"
    });
    gsap.from(".hero-full .hero-box", {
      opacity: 0, scale: 0.95, duration: 1, delay: 0.4, ease: "power2.out"
    });
  }

  // Parallax section content
  if (document.querySelector(".section-parallax")) {
    gsap.from(".section-parallax .inner", {
      scrollTrigger: {
        trigger: ".section-parallax",
        start: "top 80%",
      },
      y: 60, opacity: 0, duration: 1, ease: "power3.out"
    });
  }

  // Product cards stagger
  if (document.querySelector("#productsGrid")) {
    ScrollTrigger.batch("#productsGrid .fade-in", {
      onEnter: batch => gsap.to(batch, {opacity:1, y:0, stagger:0.15, overwrite:true, duration:0.8, ease:"power2.out"}),
      start: "top 90%"
    });
  }

  // About page
  if (document.querySelector(".about-page")) {
    gsap.from(".about-page img", {
      scrollTrigger: { trigger: ".about-page", start: "top 85%" },
      x: -60, opacity: 0, duration: 1, ease: "power3.out"
    });
    gsap.from(".about-page .content", {
      scrollTrigger: { trigger: ".about-page", start: "top 85%" },
      x: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2
    });
  }

  // FAQ page
  if (document.querySelector("#faqAccordion")) {
    gsap.from("#faqAccordion .accordion-item", {
      scrollTrigger: { trigger: "#faqAccordion", start: "top 90%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power2.out", stagger: 0.2
    });
  }
});
