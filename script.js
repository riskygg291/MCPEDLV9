/* =====================================
   MCPEDLV5
   SCRIPT.JS
   PART 1
===================================== */

// Loading Screen
window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    },2000);

});

// ==============================
// Dark & Light Mode
// ==============================

const themeBtn=document.getElementById("theme");

if(localStorage.getItem("theme")=="light"){

    document.body.classList.add("light");

    themeBtn.innerHTML="☀️";

}

themeBtn.onclick=()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        localStorage.setItem("theme","light");

        themeBtn.innerHTML="☀️";

    }else{

        localStorage.setItem("theme","dark");

        themeBtn.innerHTML="🌙";

    }

};

// ==============================
// Bahasa Indonesia / English
// ==============================

const langBtn=document.getElementById("lang");

let language="EN";

langBtn.onclick=()=>{

    if(language=="EN"){

        language="ID";

        langBtn.innerHTML="ID";

        document.querySelector(".hero h1").innerHTML=
        "Website Addon Minecraft Bedrock Terbaik";

        document.querySelector(".hero p").innerHTML=
        "Upload, bagikan, dan download addon Minecraft dengan mudah.";

        document.querySelector(".upload").innerHTML=
        "Upload Addon";

        document.querySelector(".explore").innerHTML=
        "Jelajahi";

    }else{

        language="EN";

        langBtn.innerHTML="EN";

        document.querySelector(".hero h1").innerHTML=
        "The Best Minecraft Bedrock Addon Website";

        document.querySelector(".hero p").innerHTML=
        "Upload, discover and download amazing Minecraft Bedrock addons.";

        document.querySelector(".upload").innerHTML=
        "Upload Addon";

        document.querySelector(".explore").innerHTML=
        "Explore";

    }

};

// ==============================
// Fade Animation
// ==============================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".fade-up").forEach(el=>{

observer.observe(el);

});

// ==============================
// Button Hover Sound (Opsional)
// ==============================

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-3px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="";

});

});
/* =====================================
   MCPEDLV5
   SCRIPT.JS
   PART 2
===================================== */

// =============================
// Mobile Menu
// =============================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector("nav ul");

if(menuBtn && navMenu){

    menuBtn.onclick = ()=>{

        navMenu.classList.toggle("active");

    };

}

// =============================
// Search Addon
// =============================

const searchInput = document.querySelector(".search-box input");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value = searchInput.value.toLowerCase();

document.querySelectorAll(".card,.addon-card").forEach(card=>{

const title = card.innerText.toLowerCase();

card.style.display =
title.includes(value)
? "block"
: "none";

});

});

}

// =============================
// Copy Download Link
// =============================

document.querySelectorAll(".copy-link").forEach(btn=>{

btn.addEventListener("click",()=>{

const link = btn.dataset.link;

navigator.clipboard.writeText(link);

showToast("Download link copied!");

});

});

// =============================
// Toast Notification
// =============================

function showToast(text){

let toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=text;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.remove();

},3000);

}

// =============================
// Scroll To Top
// =============================

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.className="top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.opacity="1";

}else{

topBtn.style.opacity="0";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// =============================
// Card Hover Animation
// =============================

document.querySelectorAll(".card,.addon-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.transform=`
perspective(800px)
rotateX(${-(y-rect.height/2)/18}deg)
rotateY(${(x-rect.width/2)/18}deg)
scale(1.03)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});
