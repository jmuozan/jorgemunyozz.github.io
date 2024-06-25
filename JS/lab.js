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

    // New code for enlarging image and showing unique content
    const images = document.querySelectorAll('.carousel img');
    const enlargedImageContainer = document.getElementById('enlargedImageContainer');
    const enlargedImage = document.getElementById('enlargedImage');

    const imageContents = [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem, voluptatum iure sequi obcaecati quibusdam tempora illum repudiandae reiciendis ducimus blanditiis laudantium sint adipisci quasi delectus ipsa doloribus! Illum, modi.Hic odio rem placeat eligendi eaque! Deserunt doloremque placeat eius consectetur vero, laboriosam repudiandae facere ipsum consequuntur iste aliquid illo commodi. Minus ab non iste rem. Dignissimos, voluptatibus excepturi? Nostrum?Harum aliquid adipisci molestiae asperiores omnis nobis accusantium ducimus sapiente quibusdam porro esse laborum rerum amet, laudantium exercitationem architecto repudiandae earum, optio impedit vel accusamus. Beatae sit nostrum rerum! Modi.Totam ea, quos non officia impedit vel est et sit reiciendis beatae ducimus optio, animi, incidunt aperiam ad excepturi possimus voluptatum dolorum porro tempore facere. Qui quod delectus deleniti. Magnam.Vitae totam a alias quo autem obcaecati temporibus quae ullam, necessitatibus corrupti quaerat maxime praesentium rem reprehenderit optio repudiandae incidunt ratione. Et magni libero illo! Impedit sapiente velit eius asperiores",
        // Additional contents...
    ];

    function createNewContent(content) {
        const newContent = document.createElement('div');
        newContent.classList.add('new-content');
        newContent.innerHTML = `<p>${content}</p>`;
        enlargedImageContainer.appendChild(newContent);
        console.log("New content added:", content); // Debugging line
    }

    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            const rect = this.getBoundingClientRect();
            enlargedImage.src = this.src;

            // Remove existing new content
            const existingContent = document.querySelector('.new-content');
            if (existingContent) {
                existingContent.remove();
            }

            // Set initial position and size
            enlargedImageContainer.style.top = `${rect.top}px`;
            enlargedImageContainer.style.left = `${rect.left}px`;
            enlargedImageContainer.style.width = `${rect.width}px`;
            enlargedImageContainer.style.height = `${rect.height}px`;
            enlargedImageContainer.style.transform = 'translate(0, 0)';
            enlargedImageContainer.style.display = 'flex';

            // Trigger reflow to ensure the transition starts
            window.getComputedStyle(enlargedImageContainer).transform;

            // Set final position and size with animation
            requestAnimationFrame(() => {
                enlargedImageContainer.classList.add('show');
                enlargedImageContainer.style.top = '50%';
                enlargedImageContainer.style.left = '50%';
                enlargedImageContainer.style.transform = 'translate(-50%, -50%)';
                enlargedImageContainer.style.width = 'auto';
                enlargedImageContainer.style.height = 'auto';

                // Add new content after 1 second
                setTimeout(() => {
                    createNewContent(imageContents[index]);
                    document.querySelector('.new-content').classList.add('fade-in');
                }, 1000);
            });
        });
    });

    enlargedImageContainer.addEventListener('click', function() {
        enlargedImageContainer.classList.remove('show');
        enlargedImageContainer.style.display = 'none';
        // Remove new content when closing the image
        const newContent = document.querySelector('.new-content');
        if (newContent) {
            newContent.remove();
        }
    });
});
