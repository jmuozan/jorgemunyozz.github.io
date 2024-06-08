document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link-item');
    const hoverImage = document.getElementById('hover-image');

    links.forEach(link => {
        link.addEventListener('mouseover', function () {
            const imageUrl = link.getAttribute('data-image');
            hoverImage.src = imageUrl;
            hoverImage.style.display = 'block';
            hoverImage.style.opacity = '1'; // Fade in the image
        });

        link.addEventListener('mouseout', function () {
            hoverImage.style.opacity = '0'; // Fade out the image
            setTimeout(() => {
                hoverImage.style.display = 'none';
            }, 500); // Match the duration of the transition
        });
    });
});
