// ------------------------ Navbar
let lastY = scrollY;
const navbar = document.getElementById('navbar'), all = document.querySelectorAll('.txtNavbar, #navbar');

addEventListener('scroll', () => {
  navbar.style.top = ((currentY = scrollY) < lastY && navbar.getBoundingClientRect().top < 90) ? '0' : '-90px';
  
  all.forEach(el => el.classList.toggle('scrolled', currentY > 90));

  lastY = currentY;
});

// ------------------------ Ícone tema e idioma
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');

  const languageToggle = createLanguageToggle();
  navbar.appendChild(languageToggle);

  const themeToggle = createThemeToggle();
  navbar.appendChild(themeToggle);

  // ==== Configurações tema ====
  const sunIcon = themeToggle.querySelector('.sun');
  const moonIcon = themeToggle.querySelector('.moon');

  moonIcon.style.opacity = '0';
  moonIcon.style.transform = 'scale(.5) rotate(-15deg)';

  const updateThemeButton = () => {
    const isDark = document.body.classList.contains('dark');
    themeToggle.style.color = isDark ? '#FFF' : '#0A0A0A';
  };

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');

    sunIcon.style.opacity = isDark ? '0' : '1';
    sunIcon.style.transform = isDark ? 'scale(0) rotate(90deg)' : 'scale(1) rotate(-46deg)';

    moonIcon.style.opacity = isDark ? '1' : '0';
    moonIcon.style.transform = isDark ? 'scale(1) rotate(-15deg)' : 'scale(0) rotate(-180deg)';

    updateThemeButton();
  });

  addEventListener('scroll', updateThemeButton);
  updateThemeButton();

  // ==== Configurações idioma ====
  const menu = languageToggle.querySelector('.language-menu');
  languageToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('open');
  });

  // Fecha o menu se clicar fora
  document.addEventListener('click', () => {
    menu.classList.remove('open');
  });

  // Ao clicar em uma opção
  menu.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      console.log('Selecionou idioma:', lang);
      // TODO: aqui você pode trocar textos, recarregar conteúdo, setar cookie etc.
      menu.classList.remove('open');
    });
  });
});

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
  toggle.innerHTML = `<i class="fas fa-sun theme-icon sun"></i> <i class="fas fa-moon theme-icon moon"></i>`;
  return toggle;
}

// ----------------------------- Troca de idioma
async function loadLanguage(lang) {
  const res = await fetch(`assets/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (data[key]) el.innerText = data[key];
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'pt-BR';
  loadLanguage(savedLang);

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      loadLanguage(lang);
    });
  });
});