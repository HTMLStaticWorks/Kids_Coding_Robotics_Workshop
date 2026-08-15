/* 
  MAIN INTERACTIVITY & GLOBAL UTILITIES
  Kids Coding & Robotics Workshop
*/

// Mobile Hamburger Menu Toggle (for <= 1024px viewports)
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  if (navMenu && hamburgerBtn) {
    navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  if (navMenu && hamburgerBtn) {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
  }
}

// Dark / Light Theme Toggle (Keep Icon Only)
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });

  showToast(`Theme switched to ${newTheme.toUpperCase()} mode!`, newTheme === 'dark' ? '🌙' : '☀️');
}

// RTL / LTR Language Direction Toggle (Crisp Clean Bi-directional SVG)
function toggleRTL() {
  const html = document.documentElement;
  const currentDir = html.getAttribute('dir');
  const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
  html.setAttribute('dir', newDir);
  localStorage.setItem('dir', newDir);

  const rtlIconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"/></svg>`;

  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlBtns.forEach(btn => {
    btn.innerHTML = rtlIconSVG;
  });

  showToast(`Language direction set to ${newDir.toUpperCase()}!`, '⇄');
}

// Global Modal Open & Close Handlers
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function openEnrollModal(courseName) {
  const modal = document.getElementById('enrollModal');
  const courseInput = document.getElementById('enrollCourseInput');
  if (courseInput && courseName) {
    courseInput.value = courseName;
  }
  if (modal) {
    modal.classList.add('active');
  }
}

function closeEnrollModal() {
  const modal = document.getElementById('enrollModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Handle Form Submissions
function handleLoginSubmit(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('Welcome back! Redirecting to Student Dashboard...', '🔑');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
}

function handleEnrollSubmit(e) {
  e.preventDefault();
  closeEnrollModal();
  showToast('Enrollment request submitted! Our team will contact you.', '🎉');
}

// Toast Helper
function showToast(msg, icon = '✨') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  if (toast && toastMsg && toastIcon) {
    toastMsg.innerText = msg;
    toastIcon.innerText = icon;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }
}

// Close modals when clicking backdrop outside content
window.addEventListener('click', (e) => {
  const loginModal = document.getElementById('loginModal');
  const enrollModal = document.getElementById('enrollModal');

  if (e.target === loginModal) {
    closeLoginModal();
  }
  if (e.target === enrollModal) {
    closeEnrollModal();
  }
});

// Scroll Spy for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      btn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
    const rtlIconSVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4"/></svg>`;
    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => {
      btn.innerHTML = rtlIconSVG;
    });
  }

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Initial call to set active state on load
  updateActiveLink();

  window.addEventListener('scroll', updateActiveLink);

  function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
});

// Floating Top-to-Bottom Scroll Button Handler
window.addEventListener('scroll', () => {
  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    if (window.scrollY > 200) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Eye Icon Password Toggle
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
    btn.setAttribute('aria-label', 'Hide Password');
  } else {
    input.type = 'password';
    btn.textContent = '👁️';
    btn.setAttribute('aria-label', 'Show Password');
  }
}

