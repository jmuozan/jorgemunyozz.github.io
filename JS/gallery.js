document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const imageContainer = document.getElementById('image-container');
    const images = imageContainer.querySelectorAll('img');
    const totalImages = images.length;
    const halfLength = totalImages / 6;

    container.scrollLeft = imageContainer.scrollWidth / 4;

    container.addEventListener('wheel', (event) => {
        event.preventDefault();
        container.scrollBy({
            left: event.deltaY * 4, // Adjust the multiplier for faster/slower scroll
            behavior: 'smooth'
        });
    });

    container.addEventListener('scroll', () => {
        if (container.scrollLeft >= imageContainer.scrollWidth / 2) {
            container.scrollLeft = container.scrollLeft - (imageContainer.scrollWidth / 2);
        } else if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollLeft + (imageContainer.scrollWidth / 2);
        }
    });
});
