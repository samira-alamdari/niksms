/*====================DEFINE GSAP=====================*/
let lenis = new Lenis();
let dataPageType = document.body.getAttribute('data-pagetype');
document.addEventListener("DOMContentLoaded", (event) => {
    if(dataPageType === 'singleProduct') {
        gsap.registerPlugin(ScrollTrigger,MotionPathPlugin)
    } else {
        gsap.registerPlugin(ScrollTrigger)
    }
    // Initialize a new Lenis instance for smooth scrolling
    lenis = new Lenis({
        lerp: 0.5,
        smoothWheel: true,
        duration:1.5
    });

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
        lenis.raf(time * 1200); // Convert time from seconds to milliseconds
    });
// Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
});
/*====================DEFINE GSAP=====================*/
