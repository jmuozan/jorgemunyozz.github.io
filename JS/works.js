document.addEventListener('DOMContentLoaded', () => {
    const contentItems = document.querySelectorAll('.content div');
    const hoverImage = document.getElementById('hover-image');

    contentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.getAttribute('data-image');
            hoverImage.style.backgroundImage = `url(${imageUrl})`;
            hoverImage.classList.add('visible');
        });

        item.addEventListener('mouseleave', () => {
            hoverImage.classList.remove('visible');
        });
    });
});
