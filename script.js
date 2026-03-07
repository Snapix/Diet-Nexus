// 1. Initial Intro Sequence (6 Seconds)
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to(".intro-text", { duration: 2, opacity: 1, y: -20, ease: "power4.out" })
      .to("#intro-overlay", { 
          duration: 1.5, 
          opacity: 0, 
          display: "none", 
          delay: 2.5 // Total sequence roughly 6s
      })
      .to("#main-content", { duration: 1, opacity: 1 });
});

// 2. Custom Magnetic/Blob Cursor (Reused from Touchless Project)
// Implementation remains as per your script.js file but with green accents
const cursorBlob = document.querySelector('.cursor-blob');
if (cursorBlob) {
    cursorBlob.style.background = "radial-gradient(circle, #22c55e 0%, #3b82f6 100%)";
}

// 3. ScrollReveal for Profile (Using logic from Assets2.txt)
gsap.from(".reveal-section", {
    scrollTrigger: {
        trigger: ".reveal-section",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
    },
    opacity: 0.1,
    y: 50,
    filter: "blur(10px)"
});
