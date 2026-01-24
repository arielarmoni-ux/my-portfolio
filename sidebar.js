const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

async function initSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
        };
    }

    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            document.body.classList.remove('nav-open');
        }
    });

    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        const sideList = document.getElementById('side-project-list');
        if (sideList) {
            for (const f of folders) {
                const iR = await fetch(`${baseURL}/images/${f}/info.txt`);
                if (iR.ok) {
                    const title = (await iR.text()).split('\n')[0].trim();
                    sideList.innerHTML += `<a href="project.html?folder=${f}">${title}</a>`;
                }
            }
        }
    } catch (e) { console.log("Sidebar load error", e); }
}

initSidebar();
