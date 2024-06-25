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

    // Define different content for each image
    const imageContents = [
        `<div class="project-info-container">
            <div class="project-info-left">[PROJECT INFO 1]</div>
            <div class="project-info-right">
                <div class="project-info-title">(Re)Discover Iconic Designs 1</div>
                <div class="project-info-description">Description for Image 1</div>
            </div>
        </div>`,
        `<div class="project-info-container">
            <div class="project-info-left">[PROJECT INFO 2]</div>
            <div class="project-info-right">
                <div class="project-info-title">(Re)Discover Iconic Designs 2</div>
                <div class="project-info-description">Description for Image 2</div>
            </div>
        </div>`,
        `<div class="project-info-container">
            <div class="project-info-left">[PROJECT INFO 3]</div>
            <div class="project-info-right">
                <div class="project-info-title">(Re)Discover Iconic Designs 3</div>
                <div class="project-info-description">Description for Image 3</div>
            </div>
        </div>`
    ];

    function createNewContent(content) {
        const newContent = document.createElement('div');
        newContent.classList.add('new-content');
        newContent.innerHTML = content;
        enlargedImageContainer.appendChild(newContent);
    }

    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            // Remove existing new content
            const existingContent = document.querySelector('.new-content');
            if (existingContent) {
                existingContent.remove();
            }

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
