const db = require('../src/db_config');

module.exports = function updateTutors(tutors, cseCourse) {
    var updates = {};
    tutors.forEach(tutor => {
        updates['/course/' + cseCourse + '/' + tutor.key] = { name: tutor.name, years: tutor.years };
    });

    db.ref().update(updates);
}
