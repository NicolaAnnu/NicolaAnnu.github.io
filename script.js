const projectsData = [
  {
    title: 'LLMTHESISGROQthesis',
    description: 'LLaMA 3-powered automated code review using Groq API · Python, Transformers, and MiniLM embeddings for CWE-based vulnerability and correctness detection.',
    tech: ['Python', 'Transformers', 'Groq API'],
    stars: '★ 0',
    language: 'Python',
    link: 'https://github.com/NicolaAnnu/LLMTHESISGROQthesis'
  },
  {
    title: 'SerieA-bot-telegram',
    description: 'Automatically sends a reminder 1 day and 60 minutes before the first match of each Serie A matchweek and provides live standings and match schedules',
    tech: ['Python', 'Telegram Bot', 'Requests'],
    stars: '★ 1',
    language: 'Python',
    link: 'https://github.com/NicolaAnnu/SerieA-bot-telegram'
  },
  {
    title: 'neat-mountaincar',
    description: 'NEAT applied to MountainCar to evolve agents. Comparison between 50 vs 200 population sizes to analyze learning speed and performance.',
    tech: ['Python', 'NEAT', 'Gym'],
    stars: '★ 0',
    language: 'Python',
    link: 'https://github.com/NicolaAnnu/neat-mountaincar'
  },
  {
    title: 'NeuralNetwork-ML',
    description: 'Neural network from scratch implemented in Python for master degree Machine Learning course',
    tech: ['Python', 'NumPy', 'Backprop'],
    stars: '★ 0',
    language: 'Notebook and Python',
    link: 'https://github.com/NicolaAnnu/NeuralNetwork-ML'
  },
  {
    title: 'Rodent',
    description: 'Interactive web app with a Java backend and a dynamic frontend built using HTML, CSS, and vanilla JavaScript. Uses Java servlets for handling client-server communication',
    tech: ['Java', 'Servlets', 'Vanilla JS'],
    stars: '★ 0',
    language: 'Java',
    link: 'https://github.com/NicolaAnnu/Rodent'
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  projectsData.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-meta">
        <span class="badge">GitHub</span>
        <span>${project.stars}</span>
        <span>${project.language}</span>
      </div>
      <h3>${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="chips">
        ${project.tech.map((t) => `<span>${t}</span>`).join('')}
      </div>
      <div class="project-actions">
        <a href="${project.link}" target="_blank" rel="noreferrer">Open repo →</a>
        <span aria-hidden="true"></span>
       
      </div>
    `;
    fragment.appendChild(card);
  });

  grid.innerHTML = '';
  grid.appendChild(fragment);
}

function setupSmoothScroll() {
  document.querySelectorAll('[data-scroll], .nav a').forEach((el) => {
    el.addEventListener('click', (event) => {
      const target = el.getAttribute('data-scroll') || el.getAttribute('href');
      if (target && target.startsWith('#')) {
        event.preventDefault();
        const section = document.querySelector(target);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll('.section, .project-card, .about-card, .timeline-item, .contact-form, .hero__content, .hero__visual')
    .forEach((el) => observer.observe(el));
}

function setupScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();

    if (!firstName || !lastName || !email) {
      status.textContent = 'Fill in your name, surname and email address.';
      status.style.color = '#ffb347';
      return;
    }

    status.textContent = 'Invio in corso...';
    status.style.color = 'var(--accent)';

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          status.textContent = 'Thanks! Message sent.';
          form.reset();
        } else {
          status.textContent = 'Error sending. Please try again shortly.';
          status.style.color = '#ff6b6b';
        }
      })
      .catch(() => {
        status.textContent = 'Network error. Check your connection.';
        status.style.color = '#ff6b6b';
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  setupSmoothScroll();
  setupReveal();
  setupScrollProgress();
  setupContactForm();
});
