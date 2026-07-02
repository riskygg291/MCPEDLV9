import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    collection,
    query,
    where,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// =========================
// ELEMENTS
// =========================

const profilePic = document.getElementById("profilePic");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const logoutBtn = document.getElementById("logoutBtn");
const myAddonList = document.getElementById("myAddonList");

// =========================
// CHECK LOGIN USER
// =========================

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // tampilkan data user
    profilePic.src = user.photoURL;
    profileName.innerText = user.displayName;
    profileEmail.innerText = user.email;

    loadMyAddons(user.uid);

});

// =========================
// LOAD USER ADDONS
// =========================

function loadMyAddons(uid) {

    const q = query(
        collection(db, "addons"),
        where("author.uid", "==", uid)
    );

    onSnapshot(q, (snapshot) => {

        myAddonList.innerHTML = "";

        snapshot.forEach((doc) => {

            const data = doc.data();

            const div = document.createElement("div");

            div.className = "addon-card";

            div.innerHTML = `
                <img src="${data.fileURL}" />

                <div class="addon-info">

                    <h3>${data.name}</h3>

                    <p>${data.desc.slice(0,80)}...</p>

                    <span>${data.category}</span>

                </div>
            `;

            myAddonList.appendChild(div);

        });

    });

}

// =========================
// LOGOUT
// =========================

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    localStorage.clear();

    window.location.href = "login.html";

});
