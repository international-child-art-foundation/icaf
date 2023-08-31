import ICAFCarousel from './ICAFCarousel.js';

$(document).ready(function () {
    let carousel = new ICAFCarousel('.carousel-wrapper');
    carousel.play();

    function getGridItemWidth() {
        const gridItem = container.children[0];
        const gridContainerStyle = window.getComputedStyle(container);
        
        if (gridItem) {
            const gridItemStyle = window.getComputedStyle(gridItem);
            const marginLeft = parseFloat(gridItemStyle.marginLeft) || 0;
            const marginRight = parseFloat(gridItemStyle.marginRight) || 0;
            const gap = parseFloat(gridContainerStyle.gap) || 0;
            return gridItem.offsetWidth + marginLeft + marginRight + gap;
        } else {
            return 0;
        }
    }
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    const threshold = 100;
    
    const container = document.querySelector('#whatWeDo');
    
    container.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, false);
    
    container.addEventListener('touchmove', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
    
        let diffX = touchStartX - touchEndX;
        let diffY = touchStartY - touchEndY;
    
        if (Math.abs(diffX) > Math.abs(diffY)) {
            event.preventDefault();
        }
    }, { passive: false });
    
    container.addEventListener('touchend', function(event) {
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        let diffX = touchStartX - touchEndX;
        let scrollAmount = getGridItemWidth();
        
        if (Math.abs(diffX) > threshold) {
            if (touchEndX < touchStartX) {
                // Swipe Left
                container.scrollBy({ top: 0, left: scrollAmount, behavior: 'smooth' });
            } else {
                // Swipe Right
                container.scrollBy({ top: 0, left: -scrollAmount, behavior: 'smooth' });
            }
        }
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateDots() {
        const cardWidth = getGridItemWidth();
        const index = Math.round(container.scrollLeft / cardWidth);
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
    
    function scrollToPage(index) {
        const cardWidth = getGridItemWidth();
        const targetScroll = index * cardWidth;
        container.scrollTo({ top: 0, left: targetScroll, behavior: 'smooth' });
    }
    
    // Attach click event listeners to the dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            scrollToPage(index);
        });
    });
    
    container.addEventListener('scroll', updateDots);
    
    // Run the function once to set the initial state
    updateDots();

    const videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(function(videoContainer) {
        videoContainer.addEventListener('click', loadVideo);
    });

    function loadVideo(event) {
        const videoContainer = event.currentTarget;
        const videoSrc = videoContainer.getAttribute('data-video-src');
        
        videoContainer.innerHTML = `
            <video controls autoplay>
                <source src="${videoSrc}" type="video/mp4">
                Something went wrong?
            </video>
        `;
        videoContainer.removeEventListener('click', loadVideo);
    }
});