document.addEventListener("DOMContentLoaded", function() {
    // Scroll to the leftmost part of the container on page load
    document.documentElement.scrollLeft = 0;

    // Apply transition effect to HOME link
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

        // Trigger the transition
        setTimeout(() => {
            transitionBlock.classList.add('show');
        }, 10); // Slight delay to ensure the transition is visible

        // Add event listener for transition end
        transitionBlock.addEventListener('transitionend', () => {
            // Start the second transition
            transitionBlockBackground.style.top = '0';
            transitionBlockBackground.addEventListener('transitionend', () => {
                window.location.href = href; // Redirect to the new page after transition
            });
        });
    }
});
