import { db } from "./firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// container tempat addon muncul
const addonContainer = document.getElementById("addonContainer");

// ambil data addons dari Firestore
const q = query(collection(db, "addons"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {

    addonContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();
        const id = doc.id;

        const card = document.createElement("div");

        card.className = "addon-card";

        card.innerHTML = `
            <img src="${data.fileURL || ''}" alt="addon">

            <div class="addon-info">

                <h3>${data.name}</h3>

                <p>${data.desc.slice(0,80)}...</p>

                <span class="category">${data.category}</span>

                <div class="author">
                    <img src="${data.author.photo}">
                    <span>${data.author.name}</span>
                </div>

                <a href="addon.html?id=${id}" class="btn">
                    View Details
                </a>

            </div>
        `;

        addonContainer.appendChild(card);

    });

});