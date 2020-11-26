// const {createTutor, getTutors, updateTutor, deleteTutor} = require('../model/tutorModel');
const express = require('express');
const router = express.Router();
const getTutors = require('../model/getTutors');
const updateTutors = require('../model/updateTutors');
const deleteTutor = require('../model/deleteTutor');

/* All these routes are fetched / called from view components */
/* REST API's */

/* get tutor list */
router.get('/tutor_list', (req, res) => {
    getTutors(req.query.cseCourse)
    .then(doc => res.send(doc))
});

// /* add to the tutor list */
// router.post('/tutor_list/add_tutor', (req, res) => {
//     // createTutor(req.body.name, req.body.years, req.body.cseCourse);
// });

// /* remove a tutor from the tutor list */
// router.post('/tutor_list/remove_tutor', (req, res) => {
//     // deleteTutor(req.body.tutor, req.body.cseCourse);
// })

// /* update a tutor on the database */
router.post('/tutor_list/update_tutor', (req, res) => {
    updateTutors(req.body.tutors, req.body.cseCourse);
})

module.exports = router;