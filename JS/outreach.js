document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");

    // Scroll to the leftmost part of the container on page load
    container.scrollLeft = 0;

    container.addEventListener("wheel", function(event) {
        event.preventDefault();

        // Determine scroll direction and adjust the scroll distance
        const scrollDirection = (event.deltaY || event.detail || event.wheelDelta);
        const scrollDistance = scrollDirection * 5; // Adjust multiplier as needed

        // Scroll horizontally
        container.scrollLeft += scrollDistance;
    });

    // Apply transition effect to HOME link and _blank links
    document.querySelectorAll('.home-link, a[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.href;
            const targetBlank = this.target === "_blank";
            triggerTransition(href, targetBlank);
        });
    });

    function triggerTransition(href, targetBlank) {
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
                if (targetBlank) {
                    window.open(href, '_blank'); // Open in a new tab
                } else {
                    window.location.href = href; // Redirect to the new page
                }
            });
        });
    }
});
