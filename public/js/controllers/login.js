import "bootstrap";
import "../../css/login.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  emailPasswordLogIn,
  signInWithGoogle,
  signInWithGithub,
  resetPassword,
  isUserAuth,
} from "../firebase/fb";
let state = 0;
// Selectors
const logInForm = document.querySelector("#login-form");
const errorMsg = document.querySelector("#error-msg");
const resetPasswordForm = document.querySelector("#reset-password");
const sentMsg = document.querySelector("#sent-msg");
const sentErrorMsg = document.querySelector("#sent-error-msg");
// Email and password log in
logInForm.addEventListener("submit", (e) => {
  state = 1;
  e.preventDefault();
  const email = logInForm["email-login"].value;
  const password = logInForm["password-login"].value;
  emailPasswordLogIn(email, password, errorMsg);
});
// Google sign in
const googleBtn = document.querySelector("#google-login");
googleBtn.addEventListener("click", (e) => {
  state = 1;
  e.preventDefault();
  signInWithGoogle();
});
// Github sign in
const githubBtn = document.querySelector("#github-login");
githubBtn.addEventListener("click", (e) => {
  state = 1;
  e.preventDefault();
  signInWithGithub();
});
// Reset password
resetPasswordForm.addEventListener("submit", (e) => {
  state = 1;
  e.preventDefault();
  const email = resetPasswordForm["email-reset"].value;
  resetPassword(email, sentMsg, sentErrorMsg);
});
// Check auth status and redirect
isUserAuth(state);
