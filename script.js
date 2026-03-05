document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Blob Cursor Logic (Vanilla JS version of your React BlobCursor) ---
    const cursor = document.getElementById('blob-cursor');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth interpolation for the liquid feel
    function animateCursor() {
        // The 0.15 acts as the easing factor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Apply transform
        cursor.style.transform = `translate(${cursorX - 17.5}px, ${cursorY - 17.5}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();


    // --- 2. Magnet Button Logic (Vanilla JS version of your React Magnet) ---
    const magnetBtns = document.querySelectorAll('.magnet-btn');
    
    magnetBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            
            // Calculate center of the button
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from center
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            
            // Magnet strength multiplier (adjust this to make it pull more or less)
            const strength = 0.2; 
            const x = distX * strength; 
            const y = distY * strength;
            
            // Apply the magnetic pull
            btn.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
        });

        // Snap back to place when mouse leaves
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
        
        // --- 3. Cursor Interaction with Buttons ---
        btn.addEventListener('mouseenter', () => {
            cursor.style.width = '60px';
            cursor.style.height = '60px';
            cursor.style.backgroundColor = '#10B981'; // Switch to Green
        });
        
        btn.addEventListener('mouseleave', () => {
            cursor.style.width = '35px';
            cursor.style.height = '35px';
            cursor.style.backgroundColor = '#0EA5E9'; // Back to Blue
        });
    });
});