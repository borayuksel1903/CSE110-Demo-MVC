import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

export function CseClasses() {
    const [cseCourse, setCseCourse] = useState("");
    const history = useHistory();
    
    /* navigate to TutorList component with the class specified */
    function handleSubmit () {
        history.push({
            pathname: "/tutor_list",
            cseCourse
        });
    }

    return (
        <div className="container">
            <header className="App-header">
                <h1>CSE 110 MVC DEMO</h1>
                <Form className="form">
                    <Form.Group>
                        <Form.Label className="label" id="label">Choose a CSE Class: </Form.Label>
                        <Form.Control as="select" onChange={(e) => setCseCourse(e.target.value)}>
                            <option value="default">--- Select ---</option>
                            <option value="12">CSE 12</option>
                            <option value="15L">CSE 15L</option>
                            <option value="110">CSE 110</option>
                        </Form.Control>
                    </Form.Group>   
                    <Form.Group>
                        <Form.Label className="label">Return the list of tutors: </Form.Label>
                        <Button variant="primary" onClick={handleSubmit}>Show Tutors</Button>
                    </Form.Group>
                </Form>
            </header>
        </div>
    );
}