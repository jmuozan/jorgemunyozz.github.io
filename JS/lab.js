document.addEventListener("DOMContentLoaded", function() {
    document.documentElement.scrollLeft = 0;

    document.querySelector('.home-link').addEventListener('click', function(event) {
        event.preventDefault();
        const href = this.href;
        triggerTransition(href);
    });

    function triggerTransition(href) {
        const transitionBlock = document.createElement('div');
        transitionBlock.classList.add('transition-block');
        document.body.appendChild(transitionBlock);

        const transitionBlockBackground = document.createElement('div');
        transitionBlockBackground.classList.add('transition-block-background');
        document.body.appendChild(transitionBlockBackground);

        setTimeout(() => {
            transitionBlock.classList.add('show');
        }, 10);

        transitionBlock.addEventListener('transitionend', () => {
            transitionBlockBackground.style.top = '0';
            transitionBlockBackground.addEventListener('transitionend', () => {
                window.location.href = href;
            });
        });
    }

    // Auto-scroll carousel (example functionality)
    const carousel = document.querySelector('.carousel');
    let scrollPosition = 0;
    let scrollInterval;

    function startAutoScroll() {
        scrollInterval = setInterval(() => {
            scrollPosition += 1;
            carousel.scrollTop = scrollPosition;
            if (scrollPosition >= carousel.scrollHeight - carousel.clientHeight) {
                scrollPosition = 0;
            }
        }, 50);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    startAutoScroll();

    // New code for enlarging image
    const images = document.querySelectorAll('.carousel img');
    const enlargedImageContainer = document.getElementById('enlargedImageContainer');
    const enlargedImage = document.getElementById('enlargedImage');

    images.forEach(image => {
        image.addEventListener('click', function() {
            stopAutoScroll();
            const rect = this.getBoundingClientRect();
            enlargedImage.src = this.src;

            // Set initial position and size
            enlargedImageContainer.style.top = `${rect.top}px`;
            enlargedImageContainer.style.left = `${rect.left}px`;
            enlargedImageContainer.style.width = `${rect.width}px`;
            enlargedImageContainer.style.height = `${rect.height}px`;
            enlargedImageContainer.style.transform = 'translate(0, 0)';
            enlargedImageContainer.style.display = 'flex';

            // Trigger reflow to ensure the transition starts
            window.getComputedStyle(enlargedImageContainer).transform;

            // Set final position and size
            requestAnimationFrame(() => {
                enlargedImageContainer.classList.add('show');
                enlargedImageContainer.style.top = '35%';
                enlargedImageContainer.style.left = '50%';
                enlargedImageContainer.style.transform = 'translate(-50%, -35%)';
                enlargedImageContainer.style.width = '55vw';
                enlargedImageContainer.style.height = 'auto'; // Maintain aspect ratio
            });
        });
    });

    enlargedImageContainer.addEventListener('click', function() {
        enlargedImageContainer.classList.remove('show');
        enlargedImageContainer.style.display = 'none';
        startAutoScroll();
    });
});
