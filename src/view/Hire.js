import React, {useState} from 'react';
import {Form as TutorForm, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export function HireTutor(props) {
    const history = useHistory();
    const [name, setName] = useState("");
    const [years, setYears] = useState("");
    const {cseCourse} = props.location;    

    const handleClick = () => {
        /* CONTROLLER CALL */

        /* make a post request with the new tutor we are adding */
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                years,
                cseCourse
            })
        };

        /* make the server call, which will make the database call to add the new tutor to the tutors list */
        fetch('http://localhost:8000/tutor_list/add_tutor', config)
        .catch(error => console.log(error));

        /* END OF CONTROLLER CALL */

        /* reset name and years fields */
        setName("");
        setYears("");
    }

    /* View method to navigate back to the tutor list page */
    const goBack = () => {
        localStorage.setItem('course', cseCourse);
        history.goBack();
    }


    return (
        <div className="container">
            <header className="App-header">
                <h1>Hire a tutor for CSE {cseCourse}</h1>
                <TutorForm>
                    <TutorForm.Group>
                        <TutorForm.Label className="label">Tutor Name</TutorForm.Label>
                        <TutorForm.Control value={name} placeholder="Name" onChange={(event) => setName(event.target.value)} />
                    </TutorForm.Group>
                    <TutorForm.Group>
                        <TutorForm.Label className="label">Tutor Years</TutorForm.Label>
                        <TutorForm.Control value={years} placeholder="Years" type="number" onChange={(event) => setYears(event.target.value)} />
                    </TutorForm.Group>
                    <div>
                        <Button variant="primary" onClick={handleClick}>
                            Add Tutor!
                        </Button>
                    </div>
                    <div className="home-button">
                        <Button variant="info" onClick={goBack} className="home-button">
                            Tutor Page
                        </Button>
                    </div>
                </TutorForm>
            </header>
        </div>
    );
}