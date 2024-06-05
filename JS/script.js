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
function smoothScroll(targetX, duration) {
  const startX = window.scrollX;
  const distanceX = targetX - startX;
  let startTime = null;

  function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startX, distanceX, duration);
      window.scrollTo(run, 0);
      if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

let lastScrollTime = 0;
let isTrackpad = false;

window.addEventListener('wheel', (event) => {
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastScrollTime;

  // Determine if the input is from a trackpad
  if (timeDiff < 50) {
    isTrackpad = true;
  } else {
    isTrackpad = false;
  }

  lastScrollTime = currentTime;

  // Prevent default vertical scroll behavior
  event.preventDefault();

  // Adjust scroll distance based on input type
  const scrollDistance = isTrackpad ? event.deltaY * 10 : event.deltaY * 100;
  const targetScrollX = window.scrollX + scrollDistance;
  const duration = isTrackpad ? 100 : 1; // Longer duration for trackpad for smoother scroll

  smoothScroll(targetScrollX, duration);
});
