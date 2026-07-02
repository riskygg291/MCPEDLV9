/* ===================================
   MCPEDLV5
   upload.js
   PART 1
=================================== */

const form = document.getElementById("uploadForm");
const thumbnailInput = document.getElementById("thumbnail");
const addonInput = document.getElementById("addonFile");

// Preview container (akan kita buat secara dinamis)
let previewBox = document.createElement("div");
previewBox.className = "preview";
previewBox.innerHTML = "<p>No preview</p>";

document.querySelector(".upload-card").appendChild(previewBox);

// =========================
// Thumbnail Preview
// =========================

thumbnailInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(e){

        previewBox.innerHTML = `<img src="${e.target.result}">`;

    }

    reader.readAsDataURL(file);

});

// =========================
// File Info Display
// =========================

addonInput.addEventListener("change", function(){

    const file = this.files[0];

    if(!file) return;

    const info = document.createElement("div");

    info.className = "upload-info";

    info.innerHTML = `
        <span>📦 ${file.name}</span>
        <span>${(file.size/1024/1024).toFixed(2)} MB</span>
    `;

    document.querySelector(".upload-card").appendChild(info);

});

// =========================
// Form Submit (dummy dulu)
// =========================

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("addonName").value;
    const desc = document.getElementById("description").value;

    if(!name || !desc){

        alert("Please fill all fields!");
        return;

    }

    alert("Upload simulation success (Firebase belum dihubungkan)");

});
/* ===================================
   MCPEDLV5
   upload.js
   PART 2 (FIREBASE REAL UPLOAD)
=================================== */

import { auth, db, storage } from "./firebase.js";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// =========================
// Elements
// =========================

const form = document.getElementById("uploadForm");
const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

const progress = document.createElement("div");
progress.className = "progress";
progress.appendChild(progressBar);

document.querySelector(".upload-card").appendChild(progress);

// =========================
// Upload Handler
// =========================

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("addonName").value;
    const desc = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const file = document.getElementById("addonFile").files[0];
    const thumb = document.getElementById("thumbnail").files[0];

    if (!name || !desc || !file) {
        alert("Lengkapi semua data!");
        return;
    }

    const user = auth.currentUser;

    if (!user) {
        alert("Kamu harus login dulu!");
        return;
    }

    try {

        const fileRef = ref(storage, "addons/" + Date.now() + "-" + file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {

                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                progressBar.style.width = percent + "%";

            },
            (error) => {

                console.log(error);
                alert("Upload gagal!");

            },
            async () => {

                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Simpan ke Firestore
                await addDoc(collection(db, "addons"), {

                    name,
                    desc,
                    category,
                    fileURL: downloadURL,

                    author: {
                        uid: user.uid,
                        name: user.displayName,
                        photo: user.photoURL
                    },

                    createdAt: serverTimestamp(),

                    likes: 0

                });

                alert("Upload berhasil!");

                window.location.href = "index.html";

            }
        );

    } catch (err) {

        console.error(err);
        alert("Error upload!");

    }

});
