import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getAuth, setPersistence, signOut, signInWithPopup, signInWithEmailAndPassword, sendSignInLinkToEmail, deleteUser } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getFirestore, addDoc, collection, GeoPoint, doc, setDoc, updateDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";


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
const db = getFirestore(app);

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

export async function email_verify(email,password)
{
const auth = getAuth();
// sendSignInLinkToEmail(auth, email)
//   .then(() => {
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     //window.localStorage.setItem('emailForSignIn', email);
//     // ...
//     alert('A Verification email has been sent to you')
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ...
//   });
signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  

  
  if(user.emailVerified) {
    window.location = 'admin.html'; //After successful login, user will be redirected to home.html
  }
  else 
  {
    alert ('Please verify your email')
    $('#loader').hide();
  }
  //alert(user)
  // ...
})
.catch((error) => {
  $('#loader').hide();
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(error.message)

});

//Handle Account Status
//auth.onAuthStateChanged(user => {
 
//});
}


export async function db_check(mail)
{
  var get_record = doc(db,'reports',mail);

  const docSnap = await getDoc(get_record);
  //console.log(Object.keys(docSnap.data()))


  try {

  if (Object.keys(docSnap.data()).length>10)
  {
    deleteUser(user).then(() => {
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });

    return 0
  }

  else 
  {
    return 1
  }
}

catch 
{
  return 1
}

}