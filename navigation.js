const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

function injectNavigation() {
    const wrapper = document.getElementById('site-wrapper');
    if (!wrapper) return;

    // הזרקת ההדר (העיצוב נשלט ע"י ה-CSS)
    if (!document.querySelector('header')) {
        wrapper.insertAdjacentHTML('afterbegin', `
            <header>
                <div class="header-left">
                    <button class="menu-toggle" id="menu-btn">
                        <span></span><span></span><span></span>
                    </button>
                    <a href="index.html" class="logo">ARIEL ARMONI</a>
                    <span class="sub-logo">Exhibition Architecture</span>
                </div>
            </header>
        `);
    }

    // הזרקת הסיידבר
    if (!document.getElementById('side-nav')) {
        document.body.insertAdjacentHTML('afterbegin', `
            <nav id="side-nav">
                <div class="nav-links">
                    <a href="index.html">Projects</a>
                    <a href="about.html">About</a>
                    <a href="contact.html">Contact</a>
                </div>
                <div class="project-index-title" style="margin-top:40px; font-size:11px; color:#888; text-transform:uppercase; letter-spacing:2px; padding-top:20px; border-top:1px solid #eee;">Project Index</div>
                <div id="side-project-list" style="margin-top:15px;"></div>
            </nav>
        `);
    }

    // הפעלת כפתור התפריט
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            document.body.classList.toggle('nav-open');
        };
    }

    // סגירה בלחיצה בחוץ
    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            document.body.classList.remove('nav-open');
        }
    });

    loadSidebarProjects();
}

async function loadSidebarProjects() {
    const sideList = document.getElementById('side-project-list');
    if (!sideList) return;
    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        for (const f of folders) {
            const iR = await fetch(`${baseURL}/images/${f}/info.txt`);
            if (iR.ok) {
                const title = (await iR.text()).split('\n')[0].trim();
                sideList.innerHTML += `<a href="project.html?folder=${f}" style="display:block; font-size:14px; text-decoration:none; color:#000; margin-bottom:10px; transition:0.3s;">${title}</a>`;
            }
        }
    } catch (e) { console.error("Sidebar projects load failed", e); }
}

// חזרה למעלה
window.addEventListener('scroll', () => {
    const btn = document.getElementById("back-to-top");
    if (btn) btn.style.display = window.scrollY > 500 ? "block" : "none";
});

// הרצה כשהדף מוכן
document.addEventListener('DOMContentLoaded', injectNavigation);
if (document.readyState !== 'loading') injectNavigation();
