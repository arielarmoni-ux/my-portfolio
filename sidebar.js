document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const body = document.body;

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            body.classList.toggle('nav-open');
        });
    }

    document.addEventListener('click', (e) => {
        if (body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            body.classList.remove('nav-open');
        }
    });
});
