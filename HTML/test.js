document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".container");

    container.addEventListener("wheel", function(event) {
        event.preventDefault();

        // Determine scroll direction and adjust the scroll distance
        const scrollDirection = (event.deltaY || event.detail || event.wheelDelta);
        const scrollDistance = scrollDirection * 5; // Adjust multiplier as needed

        // Scroll horizontally
        container.scrollLeft += scrollDistance;
    });
});
