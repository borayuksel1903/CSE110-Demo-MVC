'use-strict';

/* initialize the database */
var admin = require('firebase-admin');
var serviceAccount = require('path/to/serviceaccount.json'); //TODO: add your service account sdk file here

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();


/* DATA ACCESS OBJECTS (DAO) */

/* CREATE */
function createTutor(name, years, cseCourse) {
    db.collection('course').doc(cseCourse).update({
        tutors: admin.firestore.FieldValue.arrayUnion({
            name,
            years
        })
    })
}

/* READ */
function getTutors(cseCourse) {
    return db.collection('course').doc(cseCourse).get();
}

/* UPDATE */
function updateTutor(tutors, cseCourse) {
    db.collection('course').doc(cseCourse).update({
        tutors
    })
}

/* DELETE */
function deleteTutor(tutor, cseCourse) {
    db.collection('course').doc(cseCourse).update({
        tutors: admin.firestore.FieldValue.arrayRemove(tutor)
    })
}

module.exports = {createTutor, updateTutor, deleteTutor, getTutors};