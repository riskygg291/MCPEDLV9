/* =========================================
   MCPEDLV5
   login.js
   PART 1
========================================= */

import { auth } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Tombol
const googleBtn = document.getElementById("googleLogin");
const guestBtn = document.querySelector(".guest");

// Provider Google
const provider = new GoogleAuthProvider();

/* ===========================
   Login Google
=========================== */

googleBtn.addEventListener("click", async () => {

    googleBtn.disabled = true;
    googleBtn.innerHTML = "Connecting...";

    try{

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        console.log("Login Success");

        console.log(user.displayName);
        console.log(user.email);
        console.log(user.photoURL);

        localStorage.setItem("username", user.displayName);
        localStorage.setItem("email", user.email);
        localStorage.setItem("photo", user.photoURL);

        alert("Welcome " + user.displayName);

        window.location.href = "index.html";

    }catch(error){

        console.error(error);

        alert(error.message);

        googleBtn.disabled = false;
        googleBtn.innerHTML = `
        <i class="fa-brands fa-google"></i>
        <span>Continue with Google</span>
        `;

    }

});

/* ===========================
   Guest Login
=========================== */

guestBtn.addEventListener("click", async ()=>{

    try{

        await signInAnonymously(auth);

        localStorage.setItem("username","Guest");
        localStorage.setItem("photo","");

        alert("Logged in as Guest");

        window.location.href="index.html";

    }catch(error){

        alert(error.message);

    }

});
