import React from 'react';
import './App.css';
import {CseClasses} from './view/CseClasses';
import {TutorList} from './view/TutorList';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { HireTutor } from './view/Hire';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return(
    <Router>
      <div>
        <Switch>
          <Route path="/tutor_list/hire_tutor" component={HireTutor} />
          <Route path="/tutor_list" component={TutorList} />
          <Route path="/" component={CseClasses} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
