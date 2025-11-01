const headers = document.querySelectorAll('.header');
const bodies = document.querySelectorAll('.body');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const number = header.dataset.number;

    headers.forEach(h => h.classList.remove('active'));
    bodies.forEach(b => b.classList.remove('active'));

    header.classList.add('active');
    const targetBody = document.querySelector(`.body[data-number="${number}"]`);
    if (targetBody) targetBody.classList.add('active');
  });
});

