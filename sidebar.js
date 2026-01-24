document.addEventListener('DOMContentLoaded', function() {
    const projectsBtn = document.getElementById('projects-btn');
    
    if (projectsBtn) {
        projectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
        });
    }

    // סגירה בלחיצה על מקום ריק באתר
    document.addEventListener('click', function(e) {
        if (document.body.classList.contains('nav-open')) {
            const sideNav = document.getElementById('side-nav');
            if (!sideNav.contains(e.target) && e.target !== projectsBtn) {
                document.body.classList.remove('nav-open');
            }
        }
    });
});
