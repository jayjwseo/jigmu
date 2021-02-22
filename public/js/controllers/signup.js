import "bootstrap";
import "../../css/signup.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  emailPasswordSignUp,
  signInWithGoogle,
  signInWithGithub,
  isUserAuth,
} from "../firebase/fb";
let state = 0;
// Email and password sign up
const signUpForm = document.querySelector("#signup-form");
const errorMsg = document.querySelector("#error-msg");
signUpForm.addEventListener("submit", (e) => {
  state = 1;
  e.preventDefault();
  const name = signUpForm["name-signup"].value;
  const email = signUpForm["email-signup"].value;
  const password = signUpForm["password-signup"].value;
  emailPasswordSignUp(name, email, password, errorMsg);
});
// Google sign in
const googleBtn = document.querySelector("#google-signup");
googleBtn.addEventListener("click", (e) => {
  state = 1;
  e.preventDefault();
  signInWithGoogle();
});
// Github sign in
const githubBtn = document.querySelector("#github-signup");
githubBtn.addEventListener("click", (e) => {
  state = 1;
  e.preventDefault();
  signInWithGithub();
});
// Check auth status and redirect
isUserAuth(state);
