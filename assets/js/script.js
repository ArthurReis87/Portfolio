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
  
  all.forEach(element => element.classList.toggle('scrolled', currentY > 90));

  lastY = currentY;
});

// ícone tema
const toggleTheme = () => {
  document.body.classList.toggle('dark');
};

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.createElement('div');
  toggle.className = 'toggle-theme';
  toggle.innerHTML = `<i class="fas fa-sun theme-icon sun"></i> <i class="fas fa-moon theme-icon moon"></i>`;
  
  const sun = toggle.querySelector('.sun'), moon = toggle.querySelector('.moon');
  
  navbar.appendChild(toggle);
  moon.style.opacity = '0';
  moon.style.transform = 'scale(.5) rotate(-15deg)';
  
  let darkMode = false;

  toggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.dataset.theme = darkMode ? 'dark' : 'light';

    if (darkMode) {
      sun.style.opacity = '0';
      sun.style.transform = 'scale(.3) rotate(45deg)';
      moon.style.opacity = '1';
      moon.style.transform = 'scale(1) rotate(-15deg)';
      toggleTheme()
    } else {
      sun.style.opacity = '1';
      sun.style.transform = 'scale(1) rotate(0deg)';
      moon.style.opacity = '0';
      moon.style.transform = 'scale(.3) rotate(-90deg)';
      toggleTheme()
    }
  });

  // troca a cor do ícone dependendo da classe atual da navbar
  addEventListener('scroll', () => {
    const scrolled = navbar.classList.contains('scrolled');
    toggle.style.color = scrolled ? '#1c1c1c' : '#FFF';
  });
});