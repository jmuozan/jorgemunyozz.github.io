let currentIndex = 1;
let totalSlides = 15;

const updateActiveSlide = () => {
  document.querySelectorAll(".img-top img, .img-bottom img").forEach((el, index) => {
    if (index === currentIndex) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};

const handleSlider = () => {
  if (currentIndex < totalSlides) {
    currentIndex++;
  } else {
    currentIndex = 1;
  }

  gsap.to(".slide-titles", {
    onStart: () => {
      setTimeout(() => {
        updateActiveSlide();
      }, 100);

      updateImages(currentIndex + 1);
    },
    x: `-${(currentIndex - 1) * 11.1111}%`,
    duration: 2,
    ease: "power4.out",
  });
};

const updateImages = (imageNumber) => {
  // Define supported formats
  const formats = ['jpg', 'png', 'gif'];
  let imgSrc;

  // Function to check if an image exists
  const checkImageExists = (src, callback) => {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = src;
  };

  // Find the first available image format
  let formatFound = false;
  formats.some((format) => {
    const src = `../IMG/GALLERY/img${imageNumber}.${format}`;
    
    checkImageExists(src, (exists) => {
      if (exists && !formatFound) {
        imgSrc = src;
        formatFound = true;

        // Create image elements
        const imgTop = document.createElement("img");
        const imgBottom = document.createElement("img");

        imgTop.src = imgSrc;
        imgBottom.src = imgSrc;

        imgTop.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
        imgBottom.style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
        imgTop.style.transform = "scale(2)";
        imgBottom.style.transform = "scale(2)";

        // Append image elements to containers
        document.querySelector(".img-top").appendChild(imgTop);
        document.querySelector(".img-bottom").appendChild(imgBottom);
        
        // Animate images with GSAP
        gsap.to([imgTop, imgBottom], {
          clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
          transform: "scale(1)",
          duration: 2,
          ease: "power4.out",
          stagger: 0.15,
          onComplete: trimExcessImages,
        });

        return true; // End search for image when a valid format is found
      }
    });
    
    return formatFound;
  });
};

function trimExcessImages() {
  const selectors = [".img-top", ".img-bottom"];

  selectors.forEach((selector) => {
    const container = document.querySelector(selector);
    const images = Array.from(container.querySelectorAll("img"));
    const excessCount = images.length - 5;

    if (excessCount > 0) {
      images
        .slice(0, excessCount)
        .forEach((image) => container.removeChild(image));
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", handleSlider);

  updateImages(2);  // Load the second image to begin
  updateActiveSlide();
});