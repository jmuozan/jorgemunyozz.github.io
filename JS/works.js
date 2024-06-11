document.addEventListener('DOMContentLoaded', () => {
    const contentItems = document.querySelectorAll('.content-item div');

    contentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.getAttribute('data-image');
            document.body.style.setProperty('--bg-image', `url(${imageUrl})`);
            document.body.classList.add('animate-bg');
        });

        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('animate-bg');
        });
    });
});
