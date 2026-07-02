// =========================
// MCPEDLV5 SETTINGS
// =========================

// THEME
const themeBtn = document.getElementById("themeToggle");

themeBtn.onclick = () => {

    document.body.classList.toggle("light");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light") ? "light" : "dark"
    );

};

// LOAD THEME
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
}

// =========================
// LANGUAGE
// =========================

const langBtn = document.getElementById("langToggle");

let lang = localStorage.getItem("lang") || "EN";

langBtn.innerText = lang;

langBtn.onclick = () => {

    lang = lang === "EN" ? "ID" : "EN";

    localStorage.setItem("lang", lang);

    langBtn.innerText = lang;

};

// =========================
// EDIT NAME (LOCAL)
// =========================

const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveName");

saveBtn.onclick = () => {

    const name = nameInput.value;

    if(!name) return;

    localStorage.setItem("customName", name);

    alert("Name saved!");

};