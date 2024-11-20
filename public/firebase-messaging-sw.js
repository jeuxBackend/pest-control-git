// Import scripts for Firebase Messaging
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Your Firebase configuration (same as in firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyALYlCcGzd4iIZMbkNWv6ST-n4cCmNGLpE",
  authDomain: "pest-control-7b557.firebaseapp.com",
  projectId: "pest-control-7b557",
  storageBucket: "pest-control-7b557.appspot.com",
  messagingSenderId: "1050948495114",
  appId: "1:1050948495114:web:1be0bec5e2d0b63490bcf3",
  measurementId: "G-CP0Q26QB4M",
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/your-icon.png', // Replace with your notification icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
