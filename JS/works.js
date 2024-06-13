document.addEventListener('DOMContentLoaded', () => {
    const contentItems = document.querySelectorAll('.content-item div');
    const dynamicParagraph = document.querySelector('.dynamic-paragraph');

    const paragraphs = {
        "REENCUENTRO": "DESIGNIGN AN EMOTIONAL COLLECTION OF FURNITURE INSPIRED IN THE FISHERMANS OF L'ALBUFERA",
        "AI.RTISANSHIP": "DESIGNING A NEW WAY TO TEACH CRAFTS",
        "SLOW FURNITURE": "DESIGNING AN EVOLUTIONARY, DURABLE AND EMOTIONAL PIECE OF FURNITURE",
        "HAPPY MEAL OF THE FUTURE": "DESIGNING AND PROTOTYPING THE FUTURE OF HAPPY MEAL TOYS",
        "GRESAL": "DESIGNING A CRAFTS PIECE",
        "TALENT-HOP": "DESIGNING SUSTAINABLE PACKAGING SOLUTIONS"
    };

    contentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.getAttribute('data-image');
            const itemText = item.textContent.trim().replace(/\s+/g, ' '); // Handle multiline text
            document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
            document.body.classList.add('animate-bg');
            dynamicParagraph.textContent = paragraphs[itemText] || "";
            item.style.textDecoration = 'underline';
        });

        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('animate-bg');
            dynamicParagraph.textContent = "";
            item.style.textDecoration = 'none';
        });
    });

    // Apply hover animation to links
    document.querySelectorAll('.content-item a').forEach(link => {
        link.addEventListener('mouseover', function () {
            if (!this.classList.contains('animating')) {
                this.classList.add('animating');
                setTimeout(() => {
                    this.classList.remove('animating');
                }, 600); // duration of the animation + cooldown period
            }
        });

        // Add click event for transition effect
        link.addEventListener('click', function (event) {
            event.preventDefault();
            triggerTransition(this.href);
        });
    });

    function triggerTransition(href) {
        const transitionBlock = document.querySelector('.transition-block');
        const transitionBlockBackground = document.querySelector('.transition-block-background');

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
