document.addEventListener("DOMContentLoaded", function () {
  const imageSources = [
    "../IMG/LAB/2-PULSE/PULSE_3.png",
    "../IMG/LAB/1-MYCELIUM/1-MYCELIUM.png",
    "../IMG/LAB/6_CLAY_PRINTING/CLAY_3.JPG",
    "../IMG/LAB/7-ML_AIRTISANSHIP/ML_1.png",
    "../IMG/LAB/4-WEBSITE/WEBSITE_1.png",
    "../IMG/LAB/5-AI_GRASSHOPPER/GCODE.png",
    "../IMG/LAB/8-HOLOGRAMS/Animation.gif",
    "../IMG/LAB/2-PULSE/PULSE_3.png",
  ];

  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const copyElements = item.querySelectorAll(".info, .name, .tag");

    copyElements.forEach((div) => {
      const copy = div.querySelector("p");
      if (copy) {
        const duplicateCopy = document.createElement("p");
        duplicateCopy.textContent = copy.textContent;
        div.appendChild(duplicateCopy);
      }
    });
  });

  const appendImages = (src) => {
    const preview1 = document.querySelector(".preview-img-1");
  
    const img1 = document.createElement("img");
    img1.src = src;
    img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
  
    // Set a fixed height and let the width adapt based on the image's proportions
    img1.style.height = "100%";  // Image height adapts to the container's height
    img1.style.width = "auto";   // The width adjusts based on the image's aspect ratio
    img1.style.objectFit = "contain"; // Ensures the image fits properly maintaining aspect ratio
  
    preview1.textContent = '';  // Clear previous content if any
    preview1.appendChild(img1);
  
    gsap.to([img1], {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.out",
      onComplete: function () {
        removeExtraImages(preview1);
      },
    });
  };

  function removeExtraImages(container) {
    while (container.children.length > 10) {
      container.removeChild(container.firstChild);
    }
  }

  document.querySelectorAll(".menu-item").forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      mouseOverAnimation(item);
      appendImages(imageSources[index]);
    });

    item.addEventListener("mouseout", () => {
      mouseOutAnimation(item);
    });
  });

  const mouseOverAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "-100%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "0%",
      duration: 0.3,
    });
  };

  const mouseOutAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "0%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "100%",
      duration: 0.3,
    });
  };

  document.querySelector(".menu").addEventListener("mouseout", function () {
    gsap.to(".preview-img img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.out",
    });
  });

  document.addEventListener("mousemove", function (e) {
    const preview = document.querySelector(".preview");
    gsap.to(preview, {
      x: e.clientX + 300,
      y: e.clientY,
      duration: 1,
      ease: "power3.out",
    });
  });
});
