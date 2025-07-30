// imagem de fundo responsividade
addEventListener('scroll', () => {
  const scrolled = scrollY, bg = document.querySelector('.backImg');
  bg.style.transform = `translateY(${scrolled * -0.3}px)`;
});

// projetos responsividade


// navbar
let lastY = scrollY;
const navbar = document.getElementById('navbar'), all = document.querySelectorAll('.txtNavbar, #navbar');

addEventListener('scroll', () => {
  navbar.style.top = ((currentY = scrollY) < lastY && navbar.getBoundingClientRect().top < 90) ? '0' : '-90px';
  
  all.forEach(el => el.classList.toggle('scrolled', currentY > 90));

  lastY = currentY;
});

// ícone tema
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar'), themeToggle = createThemeToggle();
  navbar.appendChild(themeToggle);

  const sunIcon = themeToggle.querySelector('.sun'), moonIcon = themeToggle.querySelector('.moon');

  moonIcon.style.opacity = '0';
  moonIcon.style.transform = 'scale(.5) rotate(-15deg)';

  // Atualiza aparência do botão conforme scroll e tema
  const updateThemeButton = () => {
    const isScrolled = navbar.classList.contains('scrolled');
    const isDarkMode = document.body.classList.contains('dark');
    
    themeToggle.style.color = (isScrolled && !isDarkMode) ? '#1c1c1c' : '#FFF';
  };

  // Alterna tema e anima ícones
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDarkMode = document.body.classList.contains('dark');

    sunIcon.style.opacity = isDarkMode ? '0' : '1';
    sunIcon.style.transform = isDarkMode ? 'scale(.3) rotate(45deg)' : 'scale(1) rotate(0deg)';

    moonIcon.style.opacity = isDarkMode ? '1' : '0';
    moonIcon.style.transform = isDarkMode ? 'scale(1) rotate(-15deg)' : 'scale(.3) rotate(-90deg)';

    updateThemeButton();
  });

  // Cria o elemento do botão de tema
  function createThemeToggle() {
    const toggleElement = document.createElement('div');
    toggleElement.className = 'toggle-theme';
    toggleElement.innerHTML = `<i class="fas fa-sun theme-icon sun"></i> <i class="fas fa-moon theme-icon moon"></i>`;
    return toggleElement;
  }

  window.addEventListener('scroll', updateThemeButton);
  updateThemeButton();
});