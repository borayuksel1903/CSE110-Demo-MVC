//import { db } from '../src/db_config';
const db = require('../src/db_config');

function deleteTutor(cseCourse, tutor) {
    db.ref('course').child(cseCourse + '/' + tutor.key).remove();
}

