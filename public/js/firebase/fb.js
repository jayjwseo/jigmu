// Firebase App (the core Firebase SDK)
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
// Import board templates
import { defaultTemplate, sampleData } from "../utils/boardTemplates.js";
// Import clear render
import { clearBoard } from "../services/boardRender.js";
// Import cta task
// import { ctaTask } from "../controllers/index.js";
// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDt9lt-EmNCsA2jb11-9mH-z8ok4E2YJsM",
  authDomain: "jigmu-f90cd.firebaseapp.com",
  projectId: "jigmu-f90cd",
  storageBucket: "jigmu-f90cd.appspot.com",
  messagingSenderId: "688572894291",
  appId: "1:688572894291:web:80e1e222d70546b3dc4aa6",
  measurementId: "G-VQZM0ESLC9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Auth and Firestore references
const auth = firebase.auth();
const db = firebase.firestore();
// Email and password sign up function
function emailPasswordSignUp(name, email, password, errorMsg) {
  if (!firebase.auth().currentUser) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
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
// Email and password login function
function emailPasswordLogIn(email, password, errorMsg) {
  if (!firebase.auth().currentUser) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.assign("../board.html");
      })
      .catch((error) => {
        console.error("logIn Error " + error);
        errorMsg.textContent = error;
      });
  } else {
    auth.signOut();
  }
}
// Google sign in function
function signInWithGoogle() {
  if (!firebase.auth().currentUser) {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(googleProvider)
      .then(() => {
        window.location.assign("../board.html");
      })
      .catch((error) => {
        console.error("signInWithGoogle Error " + error);
      });
  } else {
    auth.signOut();
  }
}
// Github sign in function
function signInWithGithub() {
  if (!firebase.auth().currentUser) {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    auth
      .signInWithPopup(githubProvider)
      .then(() => {
        window.location.assign("../board.html");
      })
      .catch((error) => {
        console.error("signInWithGithub Error " + error);
      });
  } else {
    auth.signOut();
  }
}
// Reset password function
function resetPassword(email, sentMsg, sentErrorMsg) {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      sentErrorMsg.textContent = "";
      sentMsg.textContent = "Successfully sent.";
    })
    .catch((error) => {
      sentMsg.textContent = "";
      console.error("sendPasswordResetEmail Error " + error);
      sentErrorMsg.textContent = error;
    });
}
// Log out function
function logOut() {
  auth
    .signOut()
    .then(() => {
      window.location.assign("../index.html");
    })
    .catch((error) => {
      console.error("logOut Error " + error);
    });
}
// Display username function
function displayUsername(userName) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userName.textContent = user.displayName;
    } else return;
  });
}
// Check auth status and redirect
function isUserNotAuth() {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.assign("../login.html");
    }
  });
}
// Check auth status and redirect
function isUserAuth() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.assign("../board.html");
    }
  });
}
// Database
const docRef = db.collection("boards");
// Realtime listener
function listenData(renderData) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef.doc(user.uid).onSnapshot((ss) => {
        if (!ss.data()) {
          docRef.doc(user.uid).set(defaultTemplate);
        } else {
          clearBoard();
          renderData(ss.data());
        }
      });
    } else {
      console.error("User not logged in");
    }
  });
}
// Update
function updateData(jData) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      docRef.doc(user.uid).set(jData);
    } else {
      console.error("User not logged in");
    }
  });
}

// Export
export {
  emailPasswordSignUp,
  emailPasswordLogIn,
  logOut,
  displayUsername,
  signInWithGoogle,
  signInWithGithub,
  resetPassword,
  isUserNotAuth,
  isUserAuth,
  listenData,
  updateData,
};
