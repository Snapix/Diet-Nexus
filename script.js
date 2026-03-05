document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // BLUR TEXT ANIMATION (Hero Title)
    // ================================
    const blurTextElement = document.querySelector('.blur-text');
    if (blurTextElement) {
        const text = blurTextElement.getAttribute('data-text');
        const chars = text.split('');
        blurTextElement.textContent = '';
        
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            blurTextElement.appendChild(span);
            
            setTimeout(() => {
                span.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                span.style.opacity = '1';
                span.style.filter = 'blur(0px)';
                span.style.transform = 'translateY(0)';
            }, 300 + index * 50);
        });
    }

    // ================================
    // CUSTOM CURSOR
    // ================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorBlob = document.querySelector('.cursor-blob');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let blobX = mouseX, blobY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        blobX += (mouseX - blobX) * 0.12;
        blobY += (mouseY - blobY) * 0.12;
        
        if (cursorDot) cursorDot.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
        if (cursorBlob) cursorBlob.style.transform = `translate(${blobX - 25}px, ${blobY - 25}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .feature-card, .download-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorBlob) cursorBlob.classList.add('hover');
            if (cursorDot) cursorDot.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px) scale(1.5)`;
        });
        el.addEventListener('mouseleave', () => {
            if (cursorBlob) cursorBlob.classList.remove('hover');
        });
    });

    // ================================
    // ANIMATED LIGHT NEON BACKGROUND
    // ================================
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let blobs = [];
    
    // Light, airy neon blue and green colors
    const colors = [
        'rgba(16, 185, 129, 0.08)',  // Light Emerald
        'rgba(14, 165, 233, 0.08)',  // Light Sky Blue
        'rgba(52, 211, 153, 0.05)',  // Neon Green wash
        'rgba(56, 189, 248, 0.05)'   // Neon Blue wash
    ];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        blobs = [];
        for (let i = 0; i < 5; i++) {
            blobs.push({
                x: Math.random() * width, y: Math.random() * height,
                r: Math.random() * 400 + 300,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
                color: colors[i % colors.length]
            });
        }
    }

    function drawBackground() {
        ctx.clearRect(0, 0, width, height);
        blobs.forEach((blob) => {
            const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
            gradient.addColorStop(0, blob.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath(); ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2); ctx.fill();
            
            blob.x += blob.vx; blob.y += blob.vy;
            if (blob.x < -blob.r) blob.x = width + blob.r;
            if (blob.x > width + blob.r) blob.x = -blob.r;
            if (blob.y < -blob.r) blob.y = height + blob.r;
            if (blob.y > height + blob.r) blob.y = -blob.r;
        });
        requestAnimationFrame(drawBackground);
    }
    initCanvas(); drawBackground();
    window.addEventListener('resize', initCanvas);

    // ================================
    // MAGNETIC BUTTONS
    // ================================
    const magnetBtns = document.querySelectorAll('.magnet-btn');
    magnetBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            btn.style.transform = `translate(${x}px, ${y}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ================================
    // SCROLL REVEAL ANIMATIONS
    // ================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-section').forEach(section => {
        revealObserver.observe(section);
    });
});
