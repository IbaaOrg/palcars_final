// importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in the Firebase config object.
// firebase.initializeApp({
//   apiKey: "AIzaSyA3iRZYZAgzBNEhIesTE20Pap_LQmnvFu4",
//   authDomain: "palcars.firebaseapp.com",
//   projectId: "palcars",
//   storageBucket: "palcars.appspot.com",
//   messagingSenderId: "371184350256",
//   appId: "1:371184350256:web:7bbdfbdaac43ec15d6a9f5"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background messages.
// const messaging = firebase.messaging();

// // Customize notification behavior
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });
