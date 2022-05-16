import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyAHBTNC-n98StWPeStc0sTWxVkOhzqcgpA",
      authDomain: "community-localguide.firebaseapp.com",
      projectId: "community-localguide",
      storageBucket: "community-localguide.appspot.com",
      messagingSenderId: "381203342593",
      appId: "1:381203342593:web:6990ce75e34ee3bf1ca700",
      measurementId: "G-GNE0C6EKCR"
    };
    
      // Initialize Firebase
      
const app = initializeApp(firebaseConfig);

/* const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://intra-hospital-navigation.web.app/',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  }; */

export async function signup(email,password)
{
const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    sendEmailVerification(auth.currentUser)
    .then(() => {

      alert ('Please check your email for email verification')
      $('#loader').hide();
      window.location = 'signin.html';
    
    });

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });



//Handle Account Status
/* auth.onAuthStateChanged(user => {
  if(user) {
    window.location = 'signin.html'; //After successful login, user will be redirected to home.html
  }
}); */
}