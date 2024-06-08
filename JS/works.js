document.querySelectorAll('.link-item').forEach(item => {
    item.addEventListener('mouseover', event => {
        const video = document.getElementById('background-video');
        const image = document.getElementById('background-image');
        video.pause();
        image.src = item.getAttribute('data-image');
        image.style.display = 'block';
    });

    item.addEventListener('mouseout', event => {
        const video = document.getElementById('background-video');
        const image = document.getElementById('background-image');
        video.play();
        image.style.display = 'none';
    });
});
