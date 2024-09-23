document.addEventListener('mousemove', function(event) {
    const textElement = document.querySelector('.text-follow');
    const mouseX = event.pageX;
    const mouseY = event.pageY;

    // Offset to prevent the text from being directly under the cursor.
    const offsetX = 15;
    const offsetY = 15;

    // Calculate new positions
    let newX = mouseX + offsetX;
    let newY = mouseY + offsetY;

    // Ensure the text stays within the window bounds by subtracting its width and height
    const maxX = window.innerWidth - textElement.offsetWidth;
    const maxY = window.innerHeight - textElement.offsetHeight;

    // Clamp the position
    newX = Math.min(newX, maxX);
    newY = Math.min(newY, maxY);

    textElement.style.left = newX + 'px';
    textElement.style.top = newY + 'px';
});