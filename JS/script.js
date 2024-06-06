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
  option.addEventListener('mouseover', function() {
      if (!this.classList.contains('animating')) {
          this.classList.add('animating');
          setTimeout(() => {
              this.classList.remove('animating');
          }, 600); // duration of the animation + cooldown period
      }
  });

  option.addEventListener('click', function() {
      const selectedLang = document.getElementById('selected-language');
      const previousLang = selectedLang.innerText.toLowerCase();
      selectedLang.innerText = this.innerText;
      document.getElementById(`lang-${previousLang}`).style.display = 'block';
      this.style.display = 'none';
      document.getElementById('language-options').classList.remove('show');
  });
});

window.onload = function() {
  const selectedLang = document.getElementById('selected-language').innerText.toLowerCase();
  document.getElementById(`lang-${selectedLang}`).style.display = 'none';

  // Change video size and position after page load
  const video = document.getElementById('video1');
  video.style.width = 'calc(100% - 200px)';
  video.style.height = 'calc(100vh - 100px)';
  video.style.top = '50px';
  video.style.left = '0';
  video.style.position = 'absolute';

  // Scroll to the leftmost part of the page on load
  window.scrollTo(0, 0);

  // Dynamically set the position of new-layout
  const newLayout = document.querySelector('.new-layout');
  const bodyWidth = document.body.scrollWidth;
  newLayout.style.left = `${bodyWidth - window.innerWidth + window.innerWidth * 0.5}px`; // Adjust as needed

  // Add event listener to the arrow-container div
  const arrowContainer = document.querySelector('.arrow-container');
  arrowContainer.addEventListener('click', () => {
    immediateScroll(document.body.scrollWidth - window.innerWidth);
  });
}

window.onclick = function(event) {
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

function reloadPage() {
  location.reload();
}

// Hybrid scroll implementation
function immediateScroll(targetX) {
  window.scrollTo({
    left: targetX,
    behavior: 'auto'
  });
}

window.addEventListener('wheel', (event) => {
  // Prevent default vertical and horizontal scroll behavior
  event.preventDefault();

  // If scrolling down or left, scroll to the far right side of the screen
  if (event.deltaY > 0 || event.deltaX < 0) {
    immediateScroll(document.body.scrollWidth - window.innerWidth);
  } else if (event.deltaY < 0) {
    immediateScroll(0); // If scrolling up, scroll to the left side
  }
});
