document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        document.querySelector('.image-container').scrollBy({
            left: 100,
            behavior: 'smooth'
        });
    } else {
        document.querySelector('.image-container').scrollBy({
            left: -100,
            behavior: 'smooth'
        });
    }
});
