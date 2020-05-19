import React, {useEffect, useState} from 'react';
import {Button, Table, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {BsPencil} from 'react-icons/bs';

export function TutorList(props) {
    const history = useHistory();
    const courseNumber = localStorage.getItem('course')
    const [tutors, setTutors] = useState([]);
    const {cseCourse} = props.location;
    const [course] = useState(cseCourse || courseNumber);
    const [nameEdit, setNameEdit] = useState(-1);
    const [yearEdit, setYearEdit] = useState(-1);

    // retrieve Tutor list and store in the tutors array to display the tutors in a table
    useEffect(
        () => {
            /* CONTROLLER CALL */

            /* we are making a get request to a certain route */
            let config = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };

            /* we are making a call to this route, we specified what kind of call (post / get) we are making */
            fetch('http://localhost:8000/tutor_list?cseCourse=' + course, config)
            .then(response => response.json())
            .then(json => setTutors(json))
            .catch(error => console.log(error));
        },
        [course]
    );

    // navigating to Hire Tutor page
    const handleClick = () => {
        history.push({
            pathname: "/tutor_list/hire_tutor",
            cseCourse: course
        })
    }

    /* handles removing a tutor from the list */
    const handleFire = (tutor) => {
        /* find which tutor to remove, and remove them from our tutors list */
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList.splice(tutorIndex, 1);
        setTutors(tutorList);

        /* CONTROLLER CALL */

        /* specify that we are making a post request, since we are updating the database */
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tutor,
                cseCourse: course
            })
        };

        /* make a post request to the server, which will make a database call to update the tutors array with the tutor we just removed */
        fetch('http://localhost:8000/tutor_list/remove_tutor', config)
        .catch(error => console.log(error));
    }

    /* goes back to the home page */
    const goBack = () => {
        history.goBack();
    }

    /*  "handleXXXChange" is used to specify updates in the View, and 
        "handleXXXUpdate" is used to specify updating the database */ 

    /* updates the name of a tutor on the tutor list, just on the view */
    const handleNameChange = (tutor, newName) => {
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList[tutorIndex] = {...tutorList[tutorIndex], name: newName};

        setTutors(tutorList);
    }

    /* updates the year of a tutor on the tutor list, just on the View */
    const handleYearsChange = (tutor, newYears) => {
        const tutorIndex = tutors.findIndex(el => el === tutor);
        const tutorList = [...tutors];
        tutorList[tutorIndex] = {...tutorList[tutorIndex], years: newYears};

        setTutors(tutorList);
    }

    /*  updates the tutor list with the updated names/years on the database.
        Synchronize the view with the database */
    const handleTutorUpdate = () => {
        /* CONTROLLER CALL */

        /* make a post request to server to update the tutors */
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tutors,
                cseCourse: course
            })
        };

        /* make the server call with the new tutor list we have, which will update the database with the new names / years */
        fetch('http://localhost:8000/tutor_list/update_tutor', config)
        .catch(error => console.log(error));
    }

    /* render the html, show view to the user */
    return (
        <div className="container">
            <header className="App-header">
                <h1>Tutor List for CSE {course}</h1>
                <Table striped bordered hover variant="dark" className="table">
                    <thead>
                        <tr >
                            <th className="table-row">Name</th>
                            <th className="table-row">Years</th>
                            <th className="table-row">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor, key) => (
                            <tr key={key}>
                                <td><BsPencil onClick={() => setNameEdit(key)} /> { nameEdit === key ?
                                    ( <div><Form.Control value={tutor.name} onChange={(event) => handleNameChange(tutor, event.target.value)} />
                                    <Button variant="info" onClick={() => {setNameEdit(-1); handleTutorUpdate();}}>Save</Button></div>)
                                    : ( tutor.name )
                                }
                                </td>
                                <td><BsPencil onClick={() => setYearEdit(key)} /> { yearEdit === key ?
                                    ( <div><Form.Control value={tutor.years} onChange={(event) => handleYearsChange(tutor, event.target.value)} />
                                    <Button variant="info" onClick={() => {setYearEdit(-1); handleTutorUpdate();}}>Save</Button></div>)
                                    : ( tutor.years )
                                }
                                </td>
                                <td><Button variant="danger" className="btn-danger" onClick={() => handleFire(tutor)}>Fire</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <Button onClick={handleClick} className="btn-primary">
                        Hire Tutor!
                    </Button>
                </div>
                <div className="home-button">
                    <Button variant="info" onClick={goBack} className="home-button">
                        Home Page
                    </Button>
                </div>

            </header>
        </div>
    );
}
