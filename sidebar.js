const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";

function initSidebar() {
    const menuBtn = document.getElementById('menu-btn');
    const body = document.body;

    if (menuBtn) {
        // ביטול אירועים קודמים כדי למנוע כפילויות
        menuBtn.onclick = null; 
        
        menuBtn.onclick = function(e) {
            e.stopPropagation();
            body.classList.toggle('nav-open');
            console.log("Menu toggled. Current class:", body.className);
        };
    } else {
        console.error("Menu button (menu-btn) not found in this page!");
    }

    // סגירה בלחיצה מחוץ לתפריט
    document.onclick = function(e) {
        if (body.classList.contains('nav-open') && !e.target.closest('#side-nav')) {
            body.classList.remove('nav-open');
        }
    };

    // טעינת רשימת הפרויקטים
    loadSideList();
}

async function loadSideList() {
    const sideList = document.getElementById('side-project-list');
    if (!sideList) return;

    try {
        const res = await fetch(`${baseURL}/list.txt?v=${Date.now()}`);
        const folders = (await res.text()).split(/\r?\n/).filter(f => f.trim() !== "");
        
        sideList.innerHTML = ""; // ניקוי לפני טעינה
        for (const f of folders) {
            const infoRes = await fetch(`${baseURL}/images/${f}/info.txt`);
            if (infoRes.ok) {
                const title = (await infoRes.text()).split('\n')[0].trim();
                sideList.innerHTML += `<a href="project.html?folder=${f}">${title}</a>`;
            }
        }
    } catch (e) {
        console.error("Error loading project list:", e);
    }
}

// הרצה ברגע שהדף מוכן
if (document.readyState === "complete" || document.readyState === "interactive") {
    initSidebar();
} else {
    document.addEventListener("DOMContentLoaded", initSidebar);
}
