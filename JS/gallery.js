document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const imageContainer = document.getElementById('image-container');
    const images = Array.from(imageContainer.querySelectorAll('img'));
    const totalImages = images.length;

    container.scrollLeft = imageContainer.scrollWidth / 4;

    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollBy({
            left: event.deltaY * 4, // Adjust the multiplier for faster/slower scroll
            behavior: 'smooth'
        });
    });

    container.addEventListener('scroll', () => {
        if (container.scrollLeft >= imageContainer.scrollWidth - container.clientWidth) {
            images.forEach(img => {
                const clone = img.cloneNode();
                imageContainer.appendChild(clone);
            });
        } else if (container.scrollLeft <= 0) {
            const currentScrollWidth = imageContainer.scrollWidth;
            images.reverse().forEach(img => {
                const clone = img.cloneNode();
                imageContainer.insertBefore(clone, imageContainer.firstChild);
            });
            container.scrollLeft = currentScrollWidth / 4;
        }
    });
});
