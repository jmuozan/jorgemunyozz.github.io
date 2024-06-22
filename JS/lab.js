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
    setInterval(() => {
        scrollPosition += 1;
        carousel.scrollTop = scrollPosition;
        if (scrollPosition >= carousel.scrollHeight - carousel.clientHeight) {
            scrollPosition = 0;
        }
    }, 50);
});
