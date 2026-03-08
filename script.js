document.addEventListener('DOMContentLoaded', () => {
    // 1. Premium Intro Sequence
    // Gives the dancing mascot a moment to shine, then fades smoothly into the dark UI.
    setTimeout(() => {
        const overlay = document.getElementById('intro-overlay');
        const mainContent = document.getElementById('main-content');
        
        // Fade out the overlay
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        
        // Fade in the main site content
        mainContent.style.visibility = 'visible';
        
        // GSAP animation for the hero section load
        gsap.to(mainContent, {
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            onComplete: initScrollAnimations // Start scroll triggers only after load
        });
        
    }, 2500); // 2.5 seconds intro duration

    // 2. GSAP Scroll Reveal Animations
    // Mimics the high-end scroll effects from your React assets, but in pure vanilla JS.
    function initScrollAnimations() {
        // Ensure ScrollTrigger is registered
        gsap.registerPlugin(ScrollTrigger);

        // Select all elements with the 'reveal-up' class
        const revealElements = gsap.utils.toArray('.reveal-up');

        revealElements.forEach(element => {
            gsap.fromTo(element, 
                { 
                    y: 50, 
                    opacity: 0 
                },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%", // Animation starts when element is 85% from top of screen
                        toggleActions: "play none none reverse" 
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        });

        // Add a slight stagger to the glass cards for a cascading load effect
        const glassCards = gsap.utils.toArray('.glass-card');
        glassCards.forEach((card, index) => {
             gsap.fromTo(card,
                {
                    y: 40,
                    opacity: 0
                },
                {
                    scrollTrigger: {
                        trigger: card.parentElement, // Trigger based on the grid container
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    delay: index * 0.1 // 0.1s stagger between each card
                }
             );
        });
    }
});