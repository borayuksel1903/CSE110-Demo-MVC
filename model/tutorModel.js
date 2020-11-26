'use-strict';

/* initialize the database */
// var admin = require('firebase-admin');
// var serviceAccount = require('path/to/serviceaccount.json'); //TODO: add your service account sdk file here

var firebase = require('firebase');
firebaseApp = firebase.initializeApp({
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

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });
// var db = admin.firestore();


/* DATA ACCESS OBJECTS (DAO) */

/* CREATE */
function createTutor(name, years, cseCourse) {
    // db.collection('course').doc(cseCourse).update({
    //     tutors: admin.firestore.FieldValue.arrayUnion({
    //         name,
    //         years
    //     })
    // })
    var tutorData = {
        name,
        years
    }
    var tutorKey = db.ref('course').child(cseCourse).push().key;
    var updates = {};
    updates['/course/' + cseCourse + '/' + tutorKey] = tutorData;

    db.ref().update(updates);
}

/* READ */
function getTutors(cseCourse) {
    // return db.collection('course').doc(cseCourse).get();
    return db.ref('course').child(cseCourse).once('value').then(function(snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    })
}

/* UPDATE */
function updateTutor(tutors, cseCourse) {
    // db.collection('course').doc(cseCourse).update({
    //     tutors
    // })
    var updates = {};
    tutors.forEach(tutor => {
        updates['/course/' + cseCourse + '/' + tutor.key] = {name: tutor.name, years: tutor.years};
    })

    db.ref().update(updates);
}

/* DELETE */
function deleteTutor(tutor, cseCourse) {
    // db.collection('course').doc(cseCourse).update({
    //     tutors: admin.firestore.FieldValue.arrayRemove(tutor)
    // })
    db.ref('course').child(cseCourse + '/' + tutor.key).remove();
}

module.exports = {createTutor, updateTutor, deleteTutor, getTutors};