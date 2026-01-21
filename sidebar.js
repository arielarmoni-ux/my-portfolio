const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

async function injectSidebar() {
    // 1. בונה את המבנה של הסיידבר
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

    // 2. מזריק אותו לתחילת ה-Body
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 3. מחבר את כפתור ההמבורגר ( menu-btn)
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
        };
    }

    // 4. סגירה בלחיצה מחוץ לסיידבר
    document.onclick = (e) => {
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            document.body.classList.remove('nav-open');
        }
    };

    // 5. טעינת רשימת הפרויקטים לתוך הסיידבר
    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        const sideList = document.getElementById('side-project-list');
        
        for (const f of folders) {
            const iR = await fetch(`${baseURL}/images/${f}/info.txt`);
            if (iR.ok) {
                const title = (await iR.text()).split('\n')[0].trim();
                sideList.innerHTML += `<a href="project.html?folder=${f}">${title}</a>`;
            }
        }
    } catch (e) { console.error("Sidebar load failed", e); }
}

// מריץ את הפונקציה מיד כשהסקריפט נטען
injectSidebar();
