// ── SCROLL PROGRESS BAR + BACK TO TOP + ACTIVE NAV ──
const navSections = ['about','education','skills','projects','certificates','contact'];

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress-bar').style.width = (scrolled / total * 100) + '%';
  document.getElementById('navbar').classList.toggle('scrolled', scrolled > 50);
  document.getElementById('back-to-top').classList.toggle('visible', scrolled > 400);

  // Active nav highlight
  let current = '';
  navSections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) current = id;
  });
  document.querySelectorAll('#nav-links a[href^="#"]').forEach(a => {
    a.classList.toggle('active-nav', a.getAttribute('href') === '#' + current);
  });
});

// ── DARK / LIGHT MODE ──
const themeBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☀️';
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// ── SCROLL REVEAL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── PROJECT FILTER ──
function filterProjects(filter, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.card[data-filter]').forEach(card => {
    const match = filter === 'all' || card.dataset.filter === filter;
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.display = match ? 'flex' : 'none';
      if (match) {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
      }
    }, 200);
  });
}

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
}

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  document.getElementById('form-msg').textContent = '✅ Thanks! Your message has been sent.';
  e.target.reset();
}

// ── PROJECT MODAL DATA ──
const projects = {
  portal: {
    icon: '🌐',
    title: 'Internship Portal',
    subtitle: 'Full Stack Web Application',
    date: 'Feb 2026 – Mar 2026',
    description: 'Developed a full stack web application using Node.js, Express.js, and MongoDB for managing internship applications with a responsive user interface.',
    highlights: [
      'Designed REST APIs using Node.js and Express.js',
      'Built responsive frontend for seamless user interaction',
      'Integrated MongoDB for efficient data management',
      'Implemented user authentication and session handling',
    ],
    tags: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'HTML', 'CSS', 'JavaScript'],
  },
  agent: {
    icon: '🤖',
    title: 'Automated Job Application Agent',
    subtitle: 'Automation & Dashboard Tool',
    date: 'Feb 2026 – Mar 2026',
    description: 'Built an automation system using Python, SQLite, and Streamlit to streamline job applications with an interactive dashboard for tracking and visualization.',
    highlights: [
      'Developed end-to-end automation pipeline for job applications',
      'Built interactive dashboard for tracking and visualization',
      'Used SQLite for persistent local data storage',
      'Designed clean Streamlit UI for real-time status updates',
    ],
    tags: ['Python', 'SQLite', 'Streamlit', 'Automation', 'Data Visualization'],
  },
  weather: {
    icon: '⛅',
    title: 'Real-Time Weather App',
    subtitle: 'Frontend Web Application',
    date: 'Jan 2026 – Feb 2026',
    description: 'Built a responsive weather application using HTML, CSS, and JavaScript with real-time API integration and geolocation support.',
    highlights: [
      'Designed responsive UI for seamless experience across all devices',
      'Integrated Weather API to fetch and display live weather data',
      'Implemented geolocation to provide automatic location-based updates',
      'Handled API errors gracefully with user-friendly messages',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Weather API', 'Geolocation', 'Responsive Design'],
  },
};

function openModal(id) {
  const p = projects[id];
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-header">
      <div class="modal-icon">${p.icon}</div>
      <div>
        <h2>${p.title}</h2>
        <p>${p.subtitle}</p>
      </div>
    </div>
    <span class="modal-date">📅 ${p.date}</span>
    <div class="modal-section">
      <h4>Overview</h4>
      <p>${p.description}</p>
    </div>
    <div class="modal-section">
      <h4>Key Highlights</h4>
      <ul>${p.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
    </div>
    <div class="modal-section">
      <h4>Tech Stack</h4>
      <div class="modal-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  `;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
