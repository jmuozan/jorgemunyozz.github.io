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
  