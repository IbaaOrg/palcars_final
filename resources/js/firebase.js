
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import firebase from 'firebase/app'; // Import firebase from the firebase package
// import 'firebase/auth'; // Import the specific modules you need from firebase
// import 'firebase/messaging';
const firebaseConfig = {
  apiKey: "AIzaSyA3iRZYZAgzBNEhIesTE20Pap_LQmnvFu4",
  authDomain: "palcars.firebaseapp.com",
  projectId: "palcars",
  storageBucket: "palcars.appspot.com",
  messagingSenderId: "371184350256",
  appId: "1:371184350256:web:7bbdfbdaac43ec15d6a9f5"
};
const generateToken = async () => {
 
  const permission = await Notification.requestPermission();
  if (permission == 'granted') {
    console.log(permission)
    const token = await getToken(messaging, {
      vapidKey: "BIaIRR_akjZY3HQZacFMZncDS_XFaBBGAakBLVSImr-duvPz8xXutCMDDUWPBimQNwXi9UNj4S6Yy_HNo3ei91k"
    });
    console.log(token)
    onMessage(messaging,(notification)=>{
      console.log(notification);
    })
  } else {
    console.error("Permission denied for notifications");
  }

};


// Initialize Firebase
const app =initializeApp(firebaseConfig);
const auth = getAuth(app);
const google = new GoogleAuthProvider();
const messaging =getMessaging();
generateToken();
// function initFirebaseMessagingRegistration() {
//         messaging
//         .requestPermission()
//         .then(function () {
//             return messaging.getToken()
//         })
//         .then(function(token) {
//             console.log(token);

//             $.ajaxSetup({
//                 headers: {
//                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//                 }
//             });

//             $.ajax({
//                 url: '{{ route("save-token") }}',
//                 type: 'POST',
//                 data: {
//                     token: token
//                 },
//                 dataType: 'JSON',
//                 success: function (response) {
//                     alert('Token saved successfully.');
//                 },
//                 error: function (err) {
//                     console.log('User Chat Token Error'+ err);
//                 },
//             });

//         }).catch(function (err) {
//             console.log('User Chat Token Error'+ err);
//         });
//  }

// messaging.onMessage(function(payload) {
//     const noteTitle = payload.notification.title;
//     const noteOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.icon,
//     };
//     new Notification(noteTitle, noteOptions);
// });

export { auth, google, messaging };
// export default firebase
