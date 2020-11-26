const db = require('../src/db_config');

module.exports = function getTutors(cseCourse) {
    return db.ref('course').child(cseCourse).once('value').then(function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}
