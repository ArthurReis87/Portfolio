// ------------------------ Navbar
let lastY = scrollY;
const navbar = document.getElementById('navbar');
const navElements = document.querySelectorAll('.txtNavbar, #navbar');

addEventListener('scroll', () => {
  const currentY = scrollY;
  const shouldShow = currentY < lastY && navbar.getBoundingClientRect().top < 90;
  navbar.style.top = shouldShow ? '0' : '-90px';
  
  navElements.forEach(el => el.classList.toggle('scrolled', currentY > 90));
  lastY = currentY;
});

// ------------------------ Toggles (Ícone tema e idioma)
document.addEventListener('DOMContentLoaded', () => {
  // Adiciona elementos na navbar
  navbar.append(createLanguageToggle(), createThemeToggle());
  
  // Configura tema
  const themeToggle = document.querySelector('.toggle-theme');
  const [sunIcon, moonIcon] = themeToggle.querySelectorAll('.theme-icon');
  
  moonIcon.style.opacity = '0';
  moonIcon.style.transform = 'scale(.5) rotate(-15deg)';
  
  const updateTheme = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.style.color = isDark ? '#FFF' : '#0A0A0A';
    
    sunIcon.style.opacity = isDark ? '0' : '1';
    sunIcon.style.transform = isDark ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(-46deg)';
    
    moonIcon.style.opacity = isDark ? '1' : '0';
    moonIcon.style.transform = isDark ? 'scale(1) rotate(-15deg)' : 'scale(0) rotate(-180deg)';
  };

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateTheme();
  });

  // Configura idioma
  const langToggle = document.querySelector('.language-toggle');
  const menu = langToggle.querySelector('.language-menu');
  
  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  document.addEventListener('click', () => menu.classList.remove('open'));
  
  menu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      loadLanguage(btn.dataset.lang);
      menu.classList.remove('open');
    });
  });

  // Inicializações
  loadLanguage(localStorage.getItem('lang') || 'pt-BR');
  updateTheme();
  addEventListener('scroll', updateTheme);
});

// ------------------------ Funções utilitárias
function createLanguageToggle() {
  const container = document.createElement('div');
  container.className = 'language-toggle';
  container.innerHTML = `<i class="fas fa-globe"></i>
    <div class="language-menu">
      <button data-lang="pt-BR">🇧🇷 Português</button>
      <button data-lang="en-US">🇺🇸 English</button>
    </div>`;
  return container;
}

function createThemeToggle() {
  const toggle = document.createElement('div');
  toggle.className = 'toggle-theme';
  toggle.innerHTML = `<i class="fas fa-sun theme-icon sun"></i><i class="fas fa-moon theme-icon moon"></i>`;
  return toggle;
}

async function loadLanguage(lang) {
  const res = await fetch(`assets/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) el.innerText = data[key];
  });

  localStorage.setItem('lang', lang);
}