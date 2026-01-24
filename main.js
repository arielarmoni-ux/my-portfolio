{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const baseURL = "https://arielarmoni-ux.github.io/my-portfolio";\
\
async function initSite() \{\
    // 1. \uc0\u1492 \u1494 \u1512 \u1511 \u1514  \u1492 -Header (\u1500 \u1493 \u1490 \u1493  \u1493 \u1492 \u1502 \u1489 \u1493 \u1512 \u1490 \u1512 )\
    const headerHTML = `\
        <header>\
            <div class="nav-wrapper">\
                <button class="menu-toggle" id="menu-btn">\
                    <span></span><span></span><span></span>\
                </button>\
            </div>\
            <a href="index.html" class="logo">ARIEL ARMONI</a>\
            <div class="sub-logo" style="font-size: 13px; letter-spacing: 2px; color: #888; text-transform: uppercase; margin-top: 8px;">Exhibition Architecture</div>\
        </header>`;\
    \
    // 2. \uc0\u1492 \u1494 \u1512 \u1511 \u1514  \u1492 -Sidebar\
    const navHTML = `\
        <nav id="side-nav">\
            <div class="nav-links">\
                <a href="index.html">Projects</a>\
                <a href="about.html">About</a>\
                <a href="contact.html">Contact</a>\
            </div>\
            <div class="project-index-title">Project Index</div>\
            <div id="side-project-list" class="project-list-nav"></div>\
        </nav>`;\
\
    document.body.insertAdjacentHTML('afterbegin', navHTML);\
    const wrapper = document.getElementById('site-wrapper');\
    if (wrapper) wrapper.insertAdjacentHTML('afterbegin', headerHTML);\
\
    // \uc0\u1500 \u1493 \u1490 \u1497 \u1511 \u1514  \u1492 \u1502 \u1489 \u1493 \u1512 \u1490 \u1512 \
    const menuBtn = document.getElementById('menu-btn');\
    if (menuBtn) \{\
        menuBtn.onclick = (e) => \{\
            e.stopPropagation();\
            document.body.classList.toggle('nav-open');\
        \};\
    \}\
\
    document.onclick = (e) => \{\
        if (document.body.classList.contains('nav-open') && !e.target.closest('#side-nav')) \{\
            document.body.classList.remove('nav-open');\
        \}\
    \};\
\
    // \uc0\u1496 \u1506 \u1497 \u1504 \u1514  \u1512 \u1513 \u1497 \u1502 \u1514  \u1508 \u1512 \u1493 \u1497 \u1511 \u1496 \u1497 \u1501  \u1500 \u1505 \u1497 \u1497 \u1491 \u1489 \u1512 \
    try \{\
        const res = await fetch(`$\{baseURL\}/list.txt?v=$\{Date.now()\}`);\
        const folders = (await res.text()).split(/\\r?\\n/).filter(f => f.trim() !== "");\
        const sideList = document.getElementById('side-project-list');\
        for (const f of folders) \{\
            const iR = await fetch(`$\{baseURL\}/images/$\{f\}/info.txt`);\
            if (iR.ok) \{\
                const title = (await iR.text()).split('\\n')[0].trim();\
                if (sideList) sideList.innerHTML += `<a href="project.html?folder=$\{f\}">$\{title\}</a>`;\
            \}\
        \}\
    \} catch (e) \{ console.error("Load failed", e); \}\
\}\
\
document.addEventListener('DOMContentLoaded', initSite);}