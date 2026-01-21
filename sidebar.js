const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

function injectSidebar() {
    // מונע הזרקה כפולה
    if (document.getElementById('side-nav')) return;

    const navHTML = `
    <nav id="side-nav">
        <div class="nav-links">
            <a href="index.html">Projects</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
        <div class="project-index-title">Project Index</div>
        <div id="side-project-list" class="project-list-nav"></div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
    loadProjectIndex();
    setupMenuToggle();
}

async function loadProjectIndex() {
    const sideList = document.getElementById('side-project-list');
    if (!sideList) return;
    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        let html = "";
        for (const f of folders) {
            const infoRes = await fetch(`${baseURL}/images/${f}/info.txt`);
            const title = infoRes.ok ? (await infoRes.text()).split('\n')[0].trim() : f;
            html += `<a href="project.html?folder=${f}">${title}</a>`;
        }
        sideList.innerHTML = html;
    } catch (e) { console.error("Sidebar load failed", e); }
}

function setupMenuToggle() {
    const btn = document.getElementById('menu-btn');
    if (btn) {
        btn.onclick = (e) => {
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
        };
    }
    document.onclick = (e) => {
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            document.body.classList.remove('nav-open');
        }
    };
}

// הפעלה ברגע שהדף נטען
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSidebar);
} else {
    injectSidebar();
}
