function lazyLoadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) return;

  // Створення нового зображення для завантаження
  const tempImg = new Image();
  tempImg.src = src;
  tempImg.onload = () => {
    img.src = src;
    img.classList.add('loaded'); // Додати клас для плавного відображення
  };
}

// IntersectionObserver конфігурація
const observerOptions = {
  root: null, // viewport
  threshold: 0.1 // 10% видимості
};

// Callback, який виконується при появі зображення в зоні видимості
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lazyLoadImage(entry.target);
      observer.unobserve(entry.target); // Припинити спостереження після завантаження
    }
  });
}, observerOptions);

// Пошук усіх зображень з класом .lazy
const lazyImages = document.querySelectorAll('img.lazy');

// Додатковий варіант: почати завантаження лише після натискання кнопки
document.getElementById('loadBtn').addEventListener('click', () => {
  lazyImages.forEach(img => {
    imageObserver.observe(img); // Додати до спостереження
  });
});