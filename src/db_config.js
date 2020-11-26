var firebase = require('firebase');
var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCufWetmKePEKGe919WdSLBEMKpvGid2XM",
    authDomain: "cse110-demo-mvc.firebaseapp.com",
    databaseURL: "https://cse110-demo-mvc.firebaseio.com",
    projectId: "cse110-demo-mvc",
    storageBucket: "cse110-demo-mvc.appspot.com",
    messagingSenderId: "103874461797",
    appId: "1:103874461797:web:e7338d5b4d46eff480c68c",
    measurementId: "G-XQ08DVLFV8"
})

var db = firebaseApp.database();

module.exports = db; 