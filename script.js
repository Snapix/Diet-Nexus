window.onload = () => {
    // 6-Second Intro Timer
    setTimeout(() => {
        const intro = document.getElementById('intro-overlay');
        const main = document.getElementById('main-content');
        
        intro.style.transition = 'opacity 1s ease';
        intro.style.opacity = '0';
        
        setTimeout(() => {
            intro.style.display = 'none';
            main.style.opacity = '1';
            main.style.transition = 'opacity 1.5s ease';
        }, 1000);
    }, 5000); // 5s + 1s fade = 6s total
};
