// Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
    import { getFirestore, addDoc, collection, GeoPoint, doc, setDoc, updateDoc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
    import { getAuth, onAuthStateChanged, setPersistence, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, inMemoryPersistence, browserSessionPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
    import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";
    //import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

    // import { getFirestore, doc, setDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
    // import { auth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js'
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
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
    const analytics = getAnalytics(app);
    const db = getFirestore(app);
    // const database1 = getDatabase();
    const storage = getStorage();
    var mail = ''
    //var count = 1
    //var count1 = 1

    const provider = new GoogleAuthProvider();




  //#################### Random ID Generate

  function randomStr(len, arr) {
    var ans = '';
    for (var i = len; i > 0; i--) {
        ans += 
          arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
  
  export function GFG_Fun() {
    return randomStr(20, '12345abcde');
  }

  // export function auto_sign()
  // {
  //   const auth = getAuth();

  //   setPersistence(auth, browserLocalPersistence)
  //   .then(() => {
  //     //const provider = new GoogleAuthProvider();
      
  //     // In memory persistence will be applied to the signed in Google user
  //     // even though the persistence was set to 'none' and a page redirect
  //     // occurred.
  //     return signInWithRedirect(auth, provider);
  //   })
  //   .catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });

  //}

export function signin()
{
  const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
              
              $('#login').html('Hello '+user.email+',')
              mail = user.email
              

              //console.log(mail)
          // ...
            } else {
          // User is signed out

          //alert('hii')

          // window.location = 'signin.html';
          // ...
            }
        });

}
export function signout()
{
  const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  $('#login').html('')
  window.location = 'signin.html';
  
}).catch((error) => {
  // An error happened.
});
}




/*     export function signin()
    {

    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    mail = user.email
    mail = mail.split('@')[0]
    $('#login').html('Signed in As '+mail)
    setPersistence(auth, browserLocalPersistence)

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });





} */


export async function search_placeid(category)
{
  var all_record=[]
  const querySnapshot = await getDocs(collection(db, category));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
  
    all_record.push(doc.id+"_"+doc.data().name+"_"+doc.data().user)
  });

  return all_record

}

export async function region_details(place_details,place_id,id,point_length)
{
  var id1 = place_id+'_'+id

  var place_type = place_details[4].toLowerCase();

  await setDoc(doc(db, place_type, place_id), {
    name: place_details[0],
    district: place_details[1],
    state: place_details[2],
    pin:place_details[3],
    user:mail,
    report:0,
    id:id1,
    point_no:point_length
  });

}

var add_count = 0
var storage_count = 0

    export async function add_record(array,id,place_id)
    { 

      var id = place_id+'_'+id

       
      
      
      
      for (var i=0;i<array.length;i++)
      {
        var record = {}
        
      try {

        if (mail != '')
        {
        if (i == 0)
        {
          record[i] = new GeoPoint (array[i][1], array[i][0])

      //var docRef = await addDoc(collection(db, mail), record);
      
      var docRef = await setDoc(doc(db, mail, id),record);
    //   {

    //     'j': new GeoPoint ( array[i][1], array[i][0] )
    //  }
     
      //console.log("Document written with ID: ", docRef.id);
      
    }
    else 
    {
      console.log(i)
      record[i] = new GeoPoint ( array[i][1], array[i][0] )
      var washingtonRef = doc(db, mail, id);
      

      // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, record);
          //     {
          // //capital: true
          // i: new GeoPoint ( array[i][1], array[i][0] )
          //     }
              // );
    }
  
    }
  
  else 
  {
    alert('Please Login First')
  }
  }
    catch (e) {
      console.error("Error adding document: ", e);
    }
    
    //console.log(i)
  }
  

    }

    export function storage_photo(filename,file,id,count1,place_id,place_details)
    {
      storage_count = 0
      
      //console.log(count1)
      var id = place_id+'_'+id
      var place_type = place_details[4].toLowerCase();
      
      var ext = filename.split('.')
      const storageRef = ref(storage, place_type+"/"+"p"+count1+'_'+id+"."+ext[1]);

      // Get metadata properties
      //getMetadata(storageRef)
        //.then((metadata) => {
  // Metadata now contains the metadata for 'images/forest.jpg'
          
            //count1 +=1
            //console.log('File Found')
            //storageRef = ref(storage, "p"+count+'_'+id+"."+ext[1]);

           // const storageRef1 = ref(storage, "p"+count1+'_'+id+"."+ext[1]);
      
      
            const uploadTask = uploadBytesResumable(storageRef, file);
            // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //const img = document.getElementById('upload');
        $('#upload').attr('alt', progress + '% done')
        //img.alt =  progress + '% done'
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
      
      
      
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          storage_count +=1
          console.log('File available at', downloadURL);
          //const img = document.getElementById('upload');
          //img.setAttribute('src', downloadURL);
          $('#upload').attr('src',downloadURL)

          

          console.log(storage_count)
          console.log(add_count)

          if (storage_count+1 == add_count)
          {
            alert('Data Successfully Saved')
            $('#submit').attr('id','store1')
            $('#start').prop('disabled', true);
            $('#stop').prop('disabled', true);
            $('#store1').prop('disabled', true);
            $('#clear').prop('disabled', true);
            $('#new').prop('disabled', false);
          }
          

          

          /* var photo_url = downloadURL
          var docRef = doc(db, mail+"_places", "p"+count1+'_'+id);
          await updateDoc(docRef, photo_url);
          alert ('Record Successfully Saved') */

/*           set(ref(db, 'pictures/' + "p"+count1+'_'+id+"."+ext[1]), {
            name: "p"+count1+'_'+id+"."+ext[1],
            url: downloadURL
          }); */
          
        });
        
      }
      );

      
                     

        //})
        //.catch((error) => {
  // Uh-oh, an error occurred!
          //console.log('No File Found')


          //const storageRef1 = ref(storage, "p"+count1+'_'+id+"."+ext[1]);
      
      
    //       const uploadTask = uploadBytesResumable(storageRef1, file);
    //       // Listen for state changes, errors, and completion of the upload.
    // uploadTask.on('state_changed',
    // (snapshot) => {
    //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   //const img = document.getElementById('upload');
    //   $('#upload').attr('alt', progress + '% done')
    //   //img.alt =  progress + '% done'
    //   console.log('Upload is ' + progress + '% done');
    //   switch (snapshot.state) {
    //     case 'paused':
    //       console.log('Upload is paused');
    //       break;
    //     case 'running':
    //       console.log('Upload is running');
    //       break;
    //   }
    // }, 
    // (error) => {
    //   // A full list of error codes is available at
    //   // https://firebase.google.com/docs/storage/web/handle-errors
    //   switch (error.code) {
    //     case 'storage/unauthorized':
    //       // User doesn't have permission to access the object
    //       break;
    //     case 'storage/canceled':
    //       // User canceled the upload
    //       break;
    
    
    
    //     case 'storage/unknown':
    //       // Unknown error occurred, inspect error.serverResponse
    //       break;
    //   }
    // }, 
    // () => {
    //   // Upload completed successfully, now we can get the download URL
    //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     //const img = document.getElementById('upload');
    //     //img.setAttribute('src', downloadURL);
    //     $('#upload').attr('src',downloadURL)
    //     //var marker1 = L.marker(point, {icon: greenIcon})
    //     //marker1.addTo(map)
    //     //$('#myModal').modal('hide');
    //   });
    // }
    // );
    //       });
      //console.log(count1)



    }

export async function upload_data(array,detail_array,id,count,place_id,file_name,place_details)
  {
    var id = place_id+'_'+id
    var ext1 = file_name.split('.')[1]
    var place_type = place_details[4].toLowerCase();
    
    var data = {
      name:detail_array[0],
      floor:detail_array[1],
      photo_name: place_type+"/"+"p"+count+'_'+id+"."+ext1,
      
      location:new GeoPoint ( array[1], array[0] )
    
    
    }
    console.log(id)
    add_count = detail_array[1]

    for (var i=0;i<detail_array[1];i++)
    {

      //data['floor'+(i+1)] = detail_array[i+3]
      //console.log(detail_array[i+2])
      data[i+1] = detail_array[i+2]

      // data.push(
      //   {

      //   }
      // )
    }
    //console.log(data)
      if (mail !='')
      {
        //if (doc(db, mail+"_places", id).exists)
        //{
          //console.log('record exists')
        //}
        //else 
        //{
        //var docSnap = await getDoc(doc(db, mail+"_places", "p"+count+"_"+id));
        //console.log(docSnap.exists())

        // if (!docSnap.exists())
        // {
          var save_doc = await setDoc(doc(db, mail+"_places", "p"+count+"_"+id),data);

        // }
        // else 
        // {
        //   count +=1
        //   var save_doc = await setDoc(doc(db, mail+"_places", "p"+count+"_"+id),data);

        // }      
        
        //}
      }
      else 
      {
        alert ('Please Login First')
      }
      
   }


 

   

    //add_record('Souvik','Mitra')