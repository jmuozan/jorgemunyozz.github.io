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
            <div class="project-info-left">[PROJECT INFO]</div>
            <div class="project-info-right">
                <div class="project-info-title">Mycelium Growth Algorithm Test with Grasshopper</div>
                <div class="project-info-description">This has been my first attempt at a personal project with grasshopper. I tried to create a growing algorithm of mycelium trying to parametrize everything. I didn't get the results I expected but I managed to get different shapes that looked interesting to me. I rendered the mesh result with keyshot trying to experiment with translucent materials. You can download the file <a href='../OTHER/MODELS/MYCELIUM/Mycelium.gh'>here</a></div>
            </div>
            <iframe width="756" height="491" src="https://www.youtube.com/embed/yVQuy9OzqqA?si=-mGsJMcWWDPAQAXX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>`,
        `<div class="project-info-container">
            <div class="project-info-left">[PROJECT INFO]</div>
            <div class="project-info-right">
                <div class="project-info-title">Pulse</div>
                <div class="project-info-description">Being fascinated by the idea of tapping into the subtle conversations within the botanical world in a group, we decided to try to understand the complex signals emanated from plants detected by the ECG sensor. The project holds promising potential for unlocking profound insights into plant communication and behavior. Understanding these signals could lead to innovative applications, such as enhanced agricultural practices, environmental monitoring, and possibly even fostering more meaningful connections between humans and the botanical world. The project's future success could mark a significant leap forward in our comprehension of nature's intricate language, offering opportunities for sustainable advancements and deeper engagement with the plant kingdom.</div>
            </div>
            <iframe width="756" height="491" src="https://www.youtube.com/embed/3a1IpfX1REI?si=7ArCZdmeiUMWXmAO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <iframe width="756" height="491" src="https://www.youtube.com/embed/v7DfLnNG7B8?si=X3BUVuhMqAvX1lRZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>`,
        `<div class="project-info-container">
            <div class="project-info-left">[PROJECT INFO]</div>
            <div class="project-info-right">
                <div class="project-info-title">Experimenting with new materials in Keyshot</div>
                <div class="project-info-description">Experimenting with multilayered materials playing with different opacity maps to get results.</div>
            </div>
            <img src="../IMG/LAB/3-KEYSHOT_MATERIAL/MATERIAL_GRAPH.png" alt="Image 1">
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
