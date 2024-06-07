document.addEventListener('DOMContentLoaded', function () {
  // Apply hover animation to links in links-row
  document.querySelectorAll('.links-row a').forEach(link => {
    link.addEventListener('mouseover', function () {
      if (!this.classList.contains('animating')) {
        this.classList.add('animating');
        setTimeout(() => {
          this.classList.remove('animating');
        }, 600); // duration of the animation + cooldown period
      }
    });

    // Add click event for transition effect
    link.addEventListener('click', function (event) {
      event.preventDefault();
      triggerTransition(this.href);
    });
  });

  // Apply hover animation to links in links-column
  document.querySelectorAll('.links-column a').forEach(link => {
    link.addEventListener('mouseover', function () {
      if (!this.classList.contains('animating')) {
        this.classList.add('animating');
        setTimeout(() => {
          this.classList.remove('animating');
        }, 600); // duration of the animation + cooldown period
      }
    });

    // Ensure links open in a new tab
    link.addEventListener('click', function (event) {
      event.stopPropagation();  // Prevent triggering any parent event listeners
    });
  });

  // Add hover and click event to MEDIA link
  const mediaLink = document.querySelector('.media-link');
  mediaLink.addEventListener('mouseover', toggleMediaMenu);
  mediaLink.addEventListener('click', toggleMediaMenu);

  // Ensure visibility settings are applied on load
  initializeVisibility();
});

function initializeVisibility() {
  const mediaMenu = document.querySelector('.media-menu .links-column');
  if (mediaMenu.classList.contains('show')) {
    mediaMenu.style.opacity = '1';
  } else {
    mediaMenu.style.opacity = '0';
  }
}

function updateTime() {
  const now = new Date();
  const options = { hour: '2-digit', minute: '2-digit' };
  const timeString = now.toLocaleTimeString([], options);
  document.getElementById('current-time').innerText = timeString;
}

setInterval(updateTime, 1000);
updateTime();  // Initial call to set the time immediately

function toggleDropdown() {
  const options = document.getElementById('language-options');
  const selectedLang = document.getElementById('selected-language').innerText.toLowerCase();
  document.querySelectorAll('.dropdown-content div').forEach(option => {
    if (option.dataset.lang === selectedLang) {
      option.style.display = 'none';
    } else {
      option.style.display = 'block';
    }
  });
  options.classList.toggle('show');
}

function toggleMenu() {
  const menu = document.querySelector('.location-language');
  menu.classList.toggle('show-menu');
}

document.querySelectorAll('.dropdown-content div').forEach(option => {
  option.addEventListener('mouseover', function () {
    if (!this.classList.contains('animating')) {
      this.classList.add('animating');
      setTimeout(() => {
        this.classList.remove('animating');
      }, 600); // duration of the animation + cooldown period
    }
  });

  option.addEventListener('click', function () {
    const selectedLang = document.getElementById('selected-language');
    const previousLang = selectedLang.innerText.toLowerCase();
    selectedLang.innerText = this.innerText;
    document.getElementById(`lang-${previousLang}`).style.display = 'block';
    this.style.display = 'none';
    document.getElementById('language-options').classList.remove('show');
  });
});

window.onload = function () {
  const selectedLang = document.getElementById('selected-language').innerText.toLowerCase();
  document.getElementById(`lang-${selectedLang}`).style.display = 'none';

  const video1 = document.getElementById('video1');
  video1.style.width = 'calc(100% - 200px)';
  video1.style.height = 'calc(100vh - 100px)';
  video1.style.top = '50px';
  video1.style.left = '0';
  video1.style.position = 'absolute';

  window.scrollTo(0, 0);

  const textContainer = document.querySelector('.bottom-right');
  const newLayout = document.querySelector('.new-layout');
  const textContainerRect = textContainer.getBoundingClientRect();
  const offset = window.innerWidth - textContainerRect.right;
  const targetScrollX = textContainerRect.right + offset;
  newLayout.style.left = `${targetScrollX}px`;

  const arrowContainer = document.querySelector('.arrow-container');
  arrowContainer.addEventListener('click', () => {
    immediateScroll(targetScrollX);
    animateVerticalVideo(); // Trigger animation
  });

  window.targetScrollX = targetScrollX;

  // Ensure visibility settings are applied on load
  initializeVisibility();
}

function animateVerticalVideo() {
  const verticalVideo = document.querySelector('.vertical-video-background');
  verticalVideo.classList.add('animate-in');
}

window.addEventListener('wheel', (event) => {
  event.preventDefault();

  if (event.deltaY > 0 || event.deltaX < 0) {
    immediateScroll(window.targetScrollX);
    animateVerticalVideo(); // Trigger animation
  } else if (event.deltaY < 0) {
    immediateScroll(0);
  }
});

window.onclick = function (event) {
  if (!event.target.matches('#selected-language')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function toggleMediaMenu() {
  const mediaMenu = document.querySelector('.media-menu .links-column');
  mediaMenu.classList.toggle('show');
  if (mediaMenu.classList.contains('show')) {
    mediaMenu.style.opacity = '1';
  } else {
    mediaMenu.style.opacity = '0';
  }
}

// Hybrid scroll implementation
function immediateScroll(targetX) {
  window.scrollTo({
    left: targetX,
    behavior: 'smooth'
  });
}

// Function to trigger the transition effect
function triggerTransition(href) {
  const transitionBlock = document.createElement('div');
  transitionBlock.classList.add('transition-block');
  document.body.appendChild(transitionBlock);

  const transitionBlockBackground = document.createElement('div');
  transitionBlockBackground.classList.add('transition-block-background');
  document.body.appendChild(transitionBlockBackground);

  // Trigger the transition
  setTimeout(() => {
    transitionBlock.classList.add('show');
  }, 10); // Slight delay to ensure the transition is visible

  // Add event listener for transition end
  transitionBlock.addEventListener('transitionend', () => {
    // Start the second transition
    transitionBlockBackground.style.top = '0';
    transitionBlockBackground.addEventListener('transitionend', () => {
      window.location.href = href; // Redirect to the new page after transition
    });
  });
}
