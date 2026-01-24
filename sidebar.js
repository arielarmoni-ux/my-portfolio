const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

async function injectSidebar() {
    if (document.getElementById('side-nav')) return;

    const navHTML = `
    <nav id="side-nav">
        <div class="nav-links">
            <a href="index.html" style="display:block; font-size:14px; text-transform:uppercase; letter-spacing:1.5px; text-decoration:none; color:#000; margin-bottom:15px;">Projects</a>
            <a href="about.html" style="display:block; font-size:14px; text-transform:uppercase; letter-spacing:1.5px; text-decoration:none; color:#000; margin-bottom:15px;">About</a>
            <a href="contact.html" style="display:block; font-size:14px; text-transform:uppercase; letter-spacing:1.5px; text-decoration:none; color:#000; margin-bottom:15px;">Contact</a>
        </div>
        <div class="project-index-title" style="margin-top:40px; padding-top:20px; border-top:1px solid #eee; font-size:11px; text-transform:uppercase; color:#888; letter-spacing:2px; margin-bottom:20px;">Project Index</div>
        <div id="side-project-list"></div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    const initMenu = () => {
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
            menuBtn.onclick = (e) => {
                e.stopPropagation();
                document.body.classList.toggle('nav-open');
            };
        }
    };
    initMenu();

    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            document.body.classList.remove('nav-open');
        }
    });

    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        const sideList = document.getElementById('side-project-list');
        for (const f of folders) {
            const iR = await fetch(`${baseURL}/images/${f}/info.txt`);
            if (iR.ok) {
                const title = (await iR.text()).split('\n')[0].trim();
                sideList.innerHTML += `<a href="project.html?folder=${f}" style="display:block; margin-bottom:10px; text-decoration:none; color:#000; font-size:14px; transition:0.3s;">${title}</a>`;
            }
        }
    } catch (e) { console.error(e); }
}
injectSidebar();
