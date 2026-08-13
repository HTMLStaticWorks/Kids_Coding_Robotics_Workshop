/* 
  STUDENT DASHBOARD INTERACTIVITY & ROBOT CODE SIMULATOR
  RoboKidsLab Academy
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

// Handle Student Log Out -> Redirects to Index Homepage
function handleLogout() {
  showToast('👋 Logging out of Leo\'s Student Dashboard...', '🚪');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}

// Tab Switching
function switchDashTab(tabId, btnElement) {
  const sections = document.querySelectorAll('.dash-section');
  const buttons = document.querySelectorAll('.sidebar-menu-btn');

  sections.forEach(sec => sec.style.display = 'none');
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(`tab-${tabId}`);
  if (targetSec) targetSec.style.display = 'block';
  
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    buttons.forEach(btn => {
      if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
        btn.classList.add('active');
      }
    });
  }

  if (tabId === 'playground') {
    initRobotCanvas();
  }
}

// Module Accordion Toggle
function toggleModule(headerEl) {
  const body = headerEl.nextElementSibling;
  if (body) {
    body.classList.toggle('open');
  }
}

// Update Lesson Checklist & Progress Bar
function updateProgress(checkbox) {
  const total = document.querySelectorAll('.check-input').length;
  const checked = document.querySelectorAll('.check-input:checked').length;
  const percent = Math.round((checked / total) * 100);

  const progressBar = document.querySelector('.progress-bar-inner');
  const percentText = document.querySelector('.progress-header div:last-child');

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (percentText) percentText.innerText = `${percent}% Done`;

  showToast(`Great work! Lesson status updated (+50 XP)`, '🌟');
}

// File Upload Simulation
function simulateFileUpload() {
  const text = document.getElementById('fileNameText');
  if (text) {
    text.innerText = '✅ Selected: Leos_Space_Rover_v2.py (1.2 MB)';
    showToast('File attached successfully! Click Submit Project Work.', '📎');
  }
}

function handleProjectSubmit(e) {
  e.preventDefault();
  showToast('🚀 Project Submitted to Instructor Sarah! Graded within 24 hours.', '🏆');
}

// Voice Note Simulation
function playVoiceNote() {
  showToast('🔊 Playing audio note: "Fantastic job Leo! Your logic loops were spot on..."', '🎙️');
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

/* ===================================================
   INTERACTIVE CANVAS ROBOT SIMULATOR
====================================================== */
let robotState = {
  x: 150,
  y: 150,
  angle: -90, // facing up
  color: '#4F46E5',
  trail: []
};

function initRobotCanvas() {
  const canvas = document.getElementById('robotCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  resetRobot();
}

function drawRobot() {
  const canvas = document.getElementById('robotCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Grid Lines
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 30) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Draw Robot Path Trail
  if (robotState.trail.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = robotState.color;
    ctx.lineWidth = 3;
    ctx.moveTo(robotState.trail[0].x, robotState.trail[0].y);
    for (let i = 1; i < robotState.trail.length; i++) {
      ctx.lineTo(robotState.trail[i].x, robotState.trail[i].y);
    }
    ctx.stroke();
  }

  // Draw Robot Body
  ctx.save();
  ctx.translate(robotState.x, robotState.y);
  ctx.rotate((robotState.angle * Math.PI) / 180);

  // Main Chassis Box
  ctx.fillStyle = robotState.color;
  ctx.beginPath();
  ctx.roundRect(-16, -16, 32, 32, 8);
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Wheels
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(-20, -12, 4, 8);
  ctx.fillRect(-20, 4, 4, 8);
  ctx.fillRect(16, -12, 4, 8);
  ctx.fillRect(16, 4, 4, 8);

  // Headlight / Eye
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(0, -8, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function resetRobot() {
  robotState = {
    x: 150,
    y: 150,
    angle: -90,
    color: '#4F46E5',
    trail: [{ x: 150, y: 150 }]
  };
  drawRobot();
  const status = document.getElementById('robotStatusText');
  if (status) status.innerText = 'Status: Rover reset to starting coordinates (150, 150)';
}

function runRobotCode() {
  const code = document.getElementById('codeEditor').value;
  const lines = code.split('\n');
  const status = document.getElementById('robotStatusText');

  resetRobot();

  let stepCount = 0;
  lines.forEach((line, index) => {
    line = line.trim();
    if (line.includes('move_forward')) {
      const match = line.match(/\d+/);
      const dist = match ? parseInt(match[0]) : 40;
      setTimeout(() => {
        const rad = (robotState.angle * Math.PI) / 180;
        robotState.x = Math.min(Math.max(20, robotState.x + Math.cos(rad) * dist), 280);
        robotState.y = Math.min(Math.max(20, robotState.y + Math.sin(rad) * dist), 200);
        robotState.trail.push({ x: robotState.x, y: robotState.y });
        drawRobot();
      }, stepCount * 400);
      stepCount++;
    } else if (line.includes('turn_right')) {
      const match = line.match(/\d+/);
      const deg = match ? parseInt(match[0]) : 90;
      setTimeout(() => {
        robotState.angle += deg;
        drawRobot();
      }, stepCount * 400);
      stepCount++;
    } else if (line.includes('turn_left')) {
      const match = line.match(/\d+/);
      const deg = match ? parseInt(match[0]) : 90;
      setTimeout(() => {
        robotState.angle -= deg;
        drawRobot();
      }, stepCount * 400);
      stepCount++;
    } else if (line.includes('change_color')) {
      const match = line.match(/["'](#?[a-zA-Z0-9]+)["']/);
      const color = match ? match[1] : '#F59E0B';
      setTimeout(() => {
        robotState.color = color;
        drawRobot();
      }, stepCount * 400);
      stepCount++;
    }
  });

  setTimeout(() => {
    if (status) status.innerText = 'Status: ✅ Robot execution complete! +100 XP';
    showToast('🎉 Code executed successfully on Robot Rover Canvas!', '🤖');
  }, stepCount * 400 + 200);
}

// Initial draw on page load if on dashboard
document.addEventListener('DOMContentLoaded', () => {
  initRobotCanvas();
});
