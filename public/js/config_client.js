// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getFirestore, addDoc, collection, GeoPoint, doc, setDoc, updateDoc, getDocs, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
import { getAuth, setPersistence, signOut, signInWithPopup, signInWithRedirect, GoogleAuthProvider, inMemoryPersistence, browserSessionPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

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
//const database1 = getDatabase();





export async function fetch_data(collection_name)
{
    //console.log(collection_name)
    var all_record=[]
const querySnapshot = await getDocs(collection(db, collection_name));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.id, " => ", doc.data());

  all_record.push(doc.id+"_"+doc.data().name+"_"+doc.data().user)
});

return all_record
}


export async function get_path(collection1,doc_id)
{
  var replaced = ''
  var all_places = []
  //console.log(collection1)
  //console.log(doc_id)

  const querySnapshot1 = await getDocs(collection(db, collection1));
  const querySnapshot2 = await getDocs(collection(db, collection1+'_places'));
  var res_geojson = '{ "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiLineString", "coordinates": [ [';

querySnapshot1.forEach((doc) => {
  //console.log(doc.id, " => ", doc.data()['0']);

  if (doc.id.includes(doc_id))
  {
  // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data()['0']);
      //console.log(doc.id, " => ", Object.keys(doc.data()).length);
      for (var u=0;u<Object.keys(doc.data()).length;u++)
      { 
        var coord = [doc.data()[u]._long,doc.data()[u]._lat]
        
        res_geojson += '['+coord.toString()+'],'

      }
      res_geojson += '] ] } }'
      var lastIndex = res_geojson.lastIndexOf(',')
        
        if (lastIndex !== -1) {
          replaced = res_geojson.substring(0, lastIndex) +''+res_geojson.substring(lastIndex + 1);
      } 

      
  }

  //all_record.push(doc.id+"_"+doc.data().name)
});
//console.log(replaced)


          querySnapshot2.forEach((doc) => {
            //console.log(doc.id, " => ", doc.data()['0']);

            if (doc.id.includes(doc_id))
            {
            
              all_places.push(doc.data())

              
                
            }

            //all_record.push(doc.id+"_"+doc.data().name)
          });
 

return [replaced,all_places]

}

export async function fetch_details(id,category)
{

  var get_record = doc(db,category,id);

  const docSnap = await getDoc(get_record);

  if (docSnap.exists()) {

    return docSnap.data()
      
    } else {

      return 0

      
    }


}

// export async function get_places(collection2,doc_id)
// {
//   var all_places = []
//   //console.log(collection1)
//   //console.log(doc_id)

//   const querySnapshot2 = await getDocs(collection(db, collection2+'_places'));
  

// querySnapshot2.forEach((doc) => {
//   //console.log(doc.id, " => ", doc.data()['0']);

//   if (doc.id.includes(doc_id))
//   {
  
//     all_places.push(doc.data())

    
      
//   }

//   //all_record.push(doc.id+"_"+doc.data().name)
// });
// //console.log(replaced)

// return all_places

// }

export async function geturl(imagename)
{
  //$("#img1").attr("src",'');

  const storage = getStorage();

  getDownloadURL(ref(storage, imagename))
  .then((url) => {

    $("#img1").attr("src",url);
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();

    // // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });

  
}


export async function putreport(place_id,category)
{

  var washingtonRef = doc(db, category, place_id);

  var docSnap = await getDoc(washingtonRef);

  await updateDoc(washingtonRef, {
    "report": docSnap.data().report+1
  });

  alert ('Report Submitted')

}

export async function reportuser(place_id,username,data)
{
  var dict = {}



  //check for same ip report for same place


  var get_record = doc(db,'reports', username);

  var docSnap = await getDoc(get_record);

  try 
  {

  var keys = Object.keys(docSnap.data())
  }
  catch
  {
    var keys = []
  }

  if (keys.includes (data.toString()))
  {
    

    return 0
  }
  else {

      dict[data] = place_id
   


  var washingtonRef = doc(db, 'reports', username);


  await setDoc(washingtonRef,dict);

    

  

  return 1
    
  }






        


        
      
    //})

}

export async function delete_record(place_id,unique_id,category,floor,mail,photo)
{

  

  

  await deleteDoc(doc(db, category, place_id));
  await deleteDoc(doc(db, mail, unique_id));

  for (var i=0;i<floor;i++)
  {
    console.log(i)

    await deleteDoc(doc(db, mail+'_places', 'p'+(i+1)+'_'+unique_id));

    

  }

  // Create a reference to the file to delete
    const desertRef = ref(storage,photo) ;

    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });



}



