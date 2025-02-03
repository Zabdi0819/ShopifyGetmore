let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const indicators = document.querySelectorAll('.indicator');

const leftArrow = document.querySelector('.carousel-nav-left');
const rightArrow = document.querySelector('.carousel-nav-right');

// Flecha derecha
rightArrow.addEventListener('click', () => {
  if (currentIndex < totalItems - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Flecha izquierda
leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Clic en los indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

function updateCarousel() {
  const offset = -currentIndex * 100;
  document.querySelector('.carousel-items').style.transform = `translateX(${offset}%)`;

  // Actualizar los indicadores
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });

  // Desactivar o activar flechas según la posición
  leftArrow.classList.toggle('inactive', currentIndex === 0);
  rightArrow.classList.toggle('inactive', currentIndex === totalItems - 1);
}

// Inicializar el estado del carrusel
updateCarousel();


// --- Código del Slider Deslizable ---
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const sliderContainer = document.querySelector('.slider-container');
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  // Iniciar arrastre (mousedown)
  slider.addEventListener('mousedown', (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado de arrastre
    isDragging = true;
    startX = e.clientX;
    sliderContainer.classList.add('active'); // Cambiar el cursor a "grabbing"
    slider.style.transition = 'none'; // Desactivar transiciones durante el arrastre

    // Asegurar que el mouseup sea detectado incluso fuera del slider
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  });

  // Función para manejar el movimiento del mouse
  function onDrag(e) {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diffX = currentX - startX;

    currentTranslate = prevTranslate + diffX;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  // Detener el arrastre (mouseup)
  function stopDrag() {
    if (!isDragging) return;

    isDragging = false; // Cambiar el estado a false para detener el arrastre
    prevTranslate = currentTranslate;
    sliderContainer.classList.remove('active'); // Restaurar el cursor a "grab"
    slider.style.transition = 'transform 0.3s ease-out'; // Reactivar transiciones

    // Eliminar los listeners para evitar que continúe moviéndose
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  // Soporte para pantallas táctiles
  slider.addEventListener('touchstart', (e) => {
    e.preventDefault();  // Prevenir el comportamiento predeterminado
    isDragging = true;
    startX = e.touches[0].clientX;
    slider.style.transition = 'none'; // Desactivar transiciones durante el arrastre

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', stopTouch);
  });

  function onTouchMove(e) {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    currentTranslate = prevTranslate + diffX;
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function stopTouch() {
    if (!isDragging) return;

    isDragging = false; // Cambiar el estado a false para detener el arrastre
    prevTranslate = currentTranslate;
    slider.style.transition = 'transform 0.3s ease-out'; // Reactivar transiciones

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', stopTouch);
  }

  // Asegurar que el arrastre se detenga si el mouse sale de la ventana
  window.addEventListener('mouseleave', () => {
    if (isDragging) {
      stopDrag();
    }
  });

  // Asegurar que el arrastre se detenga si el mouse sale del slider
  slider.addEventListener('mouseleave', () => {
    if (isDragging) {
      stopDrag();
    }
  });
});

