document.addEventListener('DOMContentLoaded', () => {
    // 1. Clean Intro Sequence
    setTimeout(() => {
        const overlay = document.getElementById('intro-overlay');
        const mainContent = document.getElementById('main-content');
        
        // Fade out overlay
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        
        // Fade in main site
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
        
        // Trigger initial hero animations
        initScrollAnimations();
    }, 2500); // Fast 2.5s intro to respect user time

    // 2. Premium Scroll Reveal (GSAP)
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Target all elements with the 'reveal-up' class
        const revealElements = gsap.utils.toArray('.reveal-up');

        revealElements.forEach(element => {
            gsap.fromTo(element, 
                { 
                    y: 40, 
                    opacity: 0 
                },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%", // Triggers when element is 85% down the viewport
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }
            );
        });
    }

    // 3. Simple Form Prevention (For demonstration)
    const downloadForm = document.querySelector('.download-form');
    if(downloadForm) {
        downloadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = downloadForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = "Sending to WhatsApp...";
            btn.style.background = "#ff9800"; // Switch to orange temporarily
            
            setTimeout(() => {
                btn.innerText = "Guide Sent! Check WA";
                btn.style.background = "#2e7d32"; // Back to green
                downloadForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 3000);
            }, 1500);
        });
    }
});