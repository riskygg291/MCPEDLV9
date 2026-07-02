/* ===================================
   MCPEDLV5
   addon.js
   COMMENT + RATING SYSTEM
   PART 1
=================================== */

import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

const ratingStars = document.querySelectorAll(".star");
let selectedRating = 0;
// =========================
// STAR RATING
// =========================

ratingStars.forEach((star, index) => {

    star.addEventListener("click", () => {

        selectedRating = index + 1;

        ratingStars.forEach((s, i) => {

            if (i <= index) {
                s.classList.add("active");
            } else {
                s.classList.remove("active");
            }

        });

    });

});
// =========================
// SEND COMMENT
// =========================

commentForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const text = document.getElementById("commentInput").value;

    const user = auth.currentUser;

    if (!user) {
        alert("Login dulu!");
        return;
    }

    if (!text) return;

    await addDoc(collection(db, "comments"), {

        text,
        rating: selectedRating,

        addonId: window.addonId || "global",

        user: {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL
        },

        createdAt: serverTimestamp()

    });

    document.getElementById("commentInput").value = "";

});
// =========================
// LOAD COMMENTS REALTIME
// =========================

const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {

    commentList.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        const div = document.createElement("div");

        div.className = "comment";

        div.innerHTML = `
            <div class="user">
                <img src="${data.user.photo}" />
                <span>${data.user.name}</span>
            </div>

            <div class="text">${data.text}</div>

            <div class="stars">
                ⭐ ${data.rating || 0}/5
            </div>
        `;

        commentList.appendChild(div);

    });

});
