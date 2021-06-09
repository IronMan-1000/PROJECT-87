import firebase from "firebase";
require("@firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDuFm_UPiBoeHJE9_bnUhGeQtpG2Wq-WYc",
  authDomain: "barter-app-42bcb.firebaseapp.com",
  projectId: "barter-app-42bcb",
  storageBucket: "barter-app-42bcb.appspot.com",
  messagingSenderId: "171344361625",
  appId: "1:171344361625:web:68649ae062a2d05aa0e008"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();