// Firebase App (the core Firebase SDK)
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
const auth = firebase.auth();
// Regenerator-runtime for async functions
import "regenerator-runtime/runtime";
//
import "bootstrap";
import "../../css/signup.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import { signInWithGoogle, signInWithGithub } from "../firebase/fb";
// Check auth status and redirect listener
let state = 0;
auth.onAuthStateChanged((user) => {
  if (user && state === 0) {
    window.location.assign("../board.html");
  }
});
// Email and password sign up
const signUpForm = document.querySelector("#signup-form");
const errorMsg = document.querySelector("#error-msg");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = signUpForm["name-signup"].value;
  const email = signUpForm["email-signup"].value;
  const password = signUpForm["password-signup"].value;
  emailPasswordSignUp(name, email, password, errorMsg);
});
// Google sign in
const googleBtn = document.querySelector("#google-signup");
googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithGoogle();
});
// Github sign in
const githubBtn = document.querySelector("#github-signup");
githubBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signInWithGithub();
});
// Email and password sign up function
function emailPasswordSignUp(name, email, password, errorMsg) {
  if (!firebase.auth().currentUser) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        state = 1; // Prevent auth listener redirect
        const user = auth.currentUser;
        user.sendEmailVerification().catch((error) => {
          console.error("endEmailVerification Error " + error);
        });
        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            window.location.assign("../board.html");
          })
          .catch((error) => {
            console.error("updateProfile Error " + error);
          });
      })
      .catch((error) => {
        console.error("signUp Error" + error);
        errorMsg.textContent = error;
      });
  } else {
    auth.signOut();
  }
}
