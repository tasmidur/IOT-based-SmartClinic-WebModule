const firebaseConfig = {
    apiKey: "AIzaSyDnZ9tqxqw6ZobreFCOVg6ZysqcB_fg1MU",
    authDomain: "hum-and-temp-test.firebaseapp.com",
    databaseURL: "https://hum-and-temp-test.firebaseio.com",
    projectId: "hum-and-temp-test",
    storageBucket: "hum-and-temp-test.appspot.com",
    messagingSenderId: "911595237525",
    appId: "1:911595237525:web:413e363ebc4d9802016b9c",
    measurementId: "G-B32MX4FWDP"
  };
firebase.initializeApp(firebaseConfig);
let database = firebase.database(); 