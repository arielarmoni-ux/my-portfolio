// לוגיקת פתיחה/סגירה
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
    menuBtn.onclick = function(e) {
        e.stopPropagation();
        document.body.classList.toggle('nav-open');
    };
}

// סגירה בלחיצה בחוץ
document.onclick = function(e) {
    if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
        document.body.classList.remove('nav-open');
    }
};

// טעינת רשימת הפרויקטים (מותאם ל-GitHub Pages)
const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";
async function loadSideList() {
    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        const sideList = document.getElementById('side-project-list');
        if (!sideList) return;
        
        for (const f of folders) {
            const infoRes = await fetch(`${baseURL}/images/${f}/info.txt`);
            if (infoRes.ok) {
                const title = (await infoRes.text()).split('\n')[0].trim();
                sideList.innerHTML += `<a href="project.html?folder=${f}">${title}</a>`;
            }
        }
    } catch (e) { console.log("Sidebar load error", e); }
}
loadSideList();
