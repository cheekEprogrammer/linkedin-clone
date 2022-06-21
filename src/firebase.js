import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    // eslint-disable-next-line
    query,
    // eslint-disable-next-line
    orderBy,
    // eslint-disable-next-line
    onSnapshot,
    collection,
    // eslint-disable-next-line
    getDoc, 
    // eslint-disable-next-line
    getDocs, 
    addDoc,
    // eslint-disable-next-line
    updateDoc,
    // eslint-disable-next-line
    doc, 
    serverTimestamp, 
    // eslint-disable-next-line
    arrayUnion
} from "firebase/firestore";
import { 
    getAuth,
    onAuthStateChanged,
    updateProfile, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword
} from "firebase/auth";

// *** TODO: PUT IN ENV FILE *** //
const firebaseConfig = {

    // ADD FIREBASE CONFIG DATA

};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
export { updateProfile, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword};

export const streamPosts = (snapshot) => {
    const itemsColRef = collection(db, 'posts');
    const itemsQuery = query(itemsColRef, orderBy('created','desc'));
    return onSnapshot(itemsQuery, snapshot);
};

export const createPost = (name, description, message, photoUrl) => {
    const postColRef = collection(db, 'posts');
    return (
        addDoc(postColRef, {
            created: serverTimestamp(),
            createdBy: name,
            description: description,
            message: message,
            photoUrl: photoUrl,
        })
        )
};

// export const getPosts = () => {
//         const posts = [];
        
//         const events = collection(db, "posts");
        
//         events.get().then((querySnapshot) => {
        
//         querySnapshot.forEach((doc) => {
//            posts.push({ id: doc.id, ...doc.data() })
//         })
//         console.log(posts);
//      })



        
//         return posts;

// }




// export const getMarker() {
//     const snapshot = await firebase.firestore().collection('events').get()
//     return snapshot.docs.map(doc => doc.data());
// };






// export const createGroceryList = (userName, userId) => {
//     const groceriesColRef = collection(db, 'groceryLists')
//     return addDoc(groceriesColRef, {
//             created: serverTimestamp(),
//             createdBy: userId,
//             users: [{ 
//                 userId: userId,
//                 name: userName
//             }]
//         });
// };

// export const getGroceryList = (groceryListId) => {
//     const groceryDocRef = doc(db, 'groceryLists', groceryListId)
//     return getDoc(groceryDocRef);
// };

// export const getGroceryListItems = (groceryListId) => {
//     const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//     return getDocs(itemsColRef)
// }

// export const streamGroceryListItems = (groceryListId, snapshot, error) => {
//     const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//     const itemsQuery = query(itemsColRef, orderBy('created'))
//     return onSnapshot(itemsQuery, snapshot, error);
// };

// export const addUserToGroceryList = (userName, groceryListId, userId) => {
//     const groceryDocRef = doc(db, 'groceryLists', groceryListId)
//     return updateDoc(groceryDocRef, {
//             users: arrayUnion({ 
//                 userId: userId,
//                 name: userName
//             })
//         });
// };

// export const addGroceryListItem = (item, groceryListId, userId) => {
//     return getGroceryListItems(groceryListId)
//         .then(querySnapshot => querySnapshot.docs)
//         .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
//         .then( (matchingItem) => {
//             if (!matchingItem) {
//                 const itemsColRef = collection(db, 'groceryLists', groceryListId, 'items')
//                 return addDoc(itemsColRef, {
//                         name: item,
//                         created: serverTimestamp(),
//                         createdBy: userId
//                     });
//             }
//             throw new Error('duplicate-item-error');
//         });
// };


















// import { initializeApp } from 'firebase/app';

// // import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAXQsmsSly2FG8Zko1ExnLBgx1_nj8iv-0",
//     authDomain: "linkedin-clone-c77ad.firebaseapp.com",
//     projectId: "linkedin-clone-c77ad",
//     storageBucket: "linkedin-clone-c77ad.appspot.com",
//     messagingSenderId: "268510757998",
//     appId: "1:268510757998:web:4dc407f293af8d8c3e927f",
//     measurementId: "G-WR7V51FT1T"
//   };
  
//   const firebaseApp = initializeApp(firebaseConfig);
//   const db = getFirestore(firebaseApp);
// //   const auth = firebaseApp.auth();

// const docRef =  addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
//   });

//   console.log("Document written with ID: ", docRef.id);

//   export { db };