// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 6-Second Intro Orchestration
const runIntro = () => {
    const tl = gsap.timeline();

    tl.from(".mascot-intro", { scale: 0.5, opacity: 0, duration: 1.5, ease: "back.out" })
      .from(".intro-logo", { y: 20, opacity: 0, duration: 1 }, "-=0.5")
      .to("#intro-overlay", { 
          opacity: 0, 
          duration: 1, 
          delay: 3.5, // Total time around 6s
          onComplete: () => {
              document.getElementById('intro-overlay').style.display = 'none';
              document.getElementById('main-content').style.visibility = 'visible';
              gsap.to("#main-content", { opacity: 1, duration: 1 });
          }
      });
};

runIntro();

// Scroll Reveal Effect from Assets
gsap.utils.toArray(".reveal-section").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out"
    });
});

// Cursor logic (same as your TouchlessTouch project)
document.addEventListener('mousemove', (e) => {
    gsap.to(".cursor-dot", { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(".cursor-blob", { x: e.clientX, y: e.clientY, duration: 0.3 });
});
