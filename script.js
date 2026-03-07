document.addEventListener('DOMContentLoaded', () => {
    // 1. INTRO SEQUENCE (6 Seconds)
    setTimeout(() => {
        const overlay = document.getElementById('intro-overlay');
        const main = document.getElementById('main-content');
        
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        
        main.style.visibility = 'visible';
        main.style.opacity = '1';
        
        // Trigger GSAP Blur-In effect (Mimicking the React BlurText)
        gsap.fromTo(".blur-in", 
            { filter: "blur(10px)", opacity: 0, y: 30 },
            { filter: "blur(0px)", opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" }
        );
        
        // Initialize CountUp numbers after Intro
        initCounters();
    }, 6000); // Exactly 6 Seconds as requested

    // 2. ROTATING TEXT (Mimicking React RotatingText)
    const rotatingWords = ["Clinical Nutrition", "Holistic Health", "Diabetes Care", "Diet Chart Design"];
    let wordIndex = 0;
    const textElement = document.getElementById("rotating-text");
    
    setInterval(() => {
        textElement.style.opacity = 0; // fade out
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % rotatingWords.length;
            textElement.innerText = rotatingWords[wordIndex];
            textElement.style.opacity = 1; // fade in
        }, 500); // half second fade
    }, 3000);

    // 3. SCROLL REVEAL (GSAP Equivalent of React ScrollReveal)
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.reveal-up').forEach(element => {
        gsap.fromTo(element, 
            { opacity: 0, y: 50 },
            { 
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }
        );
    });

    gsap.utils.toArray('.scroll-reveal').forEach(section => {
        gsap.fromTo(section,
            { opacity: 0.1, filter: "blur(5px)" },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "bottom 25%",
                    scrub: 1
                },
                opacity: 1,
                filter: "blur(0px)"
            }
        );
    });

    // 4. COUNT UP ANIMATION (Vanilla JS equivalent of React CountUp)
    function initCounters() {
        const counters = document.querySelectorAll('.count-up');
        const speed = 200; 

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };

            // Only run when in viewport
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: updateCount
            });
        });
    }

    // 5. CLICK SPARK (Vanilla Canvas Port of your React Component)
    const canvas = document.getElementById('spark-canvas');
    const ctx = canvas.getContext('2d');
    let sparks = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('click', (e) => {
        const sparkCount = 8;
        const now = performance.now();
        for(let i = 0; i < sparkCount; i++) {
            sparks.push({
                x: e.clientX,
                y: e.clientY,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now
            });
        }
    });

    function drawSparks(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const duration = 400;
        const radius = 25;

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) return false;

            const progress = elapsed / duration;
            // Ease-out
            const eased = progress * (2 - progress); 
            
            const distance = eased * radius;
            const lineLength = 10 * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = '#22c55e'; // Primary Green
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        requestAnimationFrame(drawSparks);
    }
    requestAnimationFrame(drawSparks);
});