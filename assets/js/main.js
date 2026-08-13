/* 
  MAIN LANDING PAGE INTERACTIVITY
  RoboKidsLab Academy - Kids Coding & Robotics Workshop
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

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });

  showToast(`Theme switched to ${newTheme.toUpperCase()} mode!`, newTheme === 'dark' ? '🌙' : '☀️');
}

// RTL / LTR Language Direction Toggle (Keep Icon Only)
function toggleRTL() {
  const html = document.documentElement;
  const currentDir = html.getAttribute('dir');
  const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
  html.setAttribute('dir', newDir);

  const rtlIconSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m-8 6H4m0 0l4 4m-4-4l4-4"/></svg>`;

  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  rtlBtns.forEach(btn => {
    btn.innerHTML = rtlIconSVG;
  });

  showToast(`Language direction set to ${newDir.toUpperCase()}!`, '⇄');
}

// Filter Programs by Age/Track
function filterPrograms(category, btnElement) {
  const cards = document.querySelectorAll('.program-card');
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach(tab => tab.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

// Login Modal Controls
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

function handleLogin(e) {
  e.preventDefault();
  closeLoginModal();
  showToast('🎉 Welcome back! Redirecting to Leo\'s Student Dashboard...', '🔑');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1200);
}

// Enrollment Modal Controls
function openEnrollModal(courseName) {
  const modal = document.getElementById('enrollModal');
  const title = document.getElementById('enrollCourseTitle');
  if (title) title.innerText = `Enroll in ${courseName}`;
  if (modal) modal.classList.add('active');
}

function closeEnrollModal() {
  const modal = document.getElementById('enrollModal');
  if (modal) modal.classList.remove('active');
}

function handleEnrollSubmit(e) {
  e.preventDefault();
  closeEnrollModal();
  showToast('🚀 Seat Reserved! We sent an enrolment confirmation email to your parent.', '✨');
}

// Toast Notifications
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

// Close modals when clicking outside modal content
window.addEventListener('click', (e) => {
  const loginModal = document.getElementById('loginModal');
  const enrollModal = document.getElementById('enrollModal');

  if (e.target === loginModal) closeLoginModal();
  if (e.target === enrollModal) closeEnrollModal();
});
