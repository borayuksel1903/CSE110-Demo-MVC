import React from 'react';
import { TutorList } from '../src/view/TutorList';
import { HireTutor } from '../src/view/Hire';
import {configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: (f) => f(),
}));

describe('Testing if MVC violations exist', () => {
  beforeEach(() => {
    fetch.resetMocks();
  })
  
  it('Testing if getTutors violates MVC', () => {
    fetch.mockResponse(JSON.stringify({'-MJxdmdFCjGv4KtfZKVr': { name: 'Tiffany', years: '3' },
    '-MJxgdPaNk7xlYn9SdOE': { name: 'Bora', years: '3' }}));

    let props = {
      location: {
        cseCourse: 110
      }
    };

    const tutorList = shallow(<TutorList {...props} />);
    expect(fetch).toBeCalledWith('http://localhost:8000/tutor_list?cseCourse=110', {"headers": {"Content-Type": "application/json"}, "method": "GET"});
  });

  it('Testing if fireTutor violates MVC', () => {
    fetch.mockResponse(JSON.stringify({'-MJxdmdFCjGv4KtfZKVr': { name: 'Tiffany', years: '3' },
    '-MJxgdPaNk7xlYn9SdOE': { name: 'Bora', years: '3' }}));

    let props = {
      location: {
        cseCourse: 110
      },
      tutors: [{name: 'Bora', years: 3}]
    };

    const tutorList = shallow(<TutorList {...props} />);

    // check if row exists
    const rows = tutorList.find('.tutors-table-row');
    expect(rows.length).toBe(props.tutors.length)

    // check if the row includes the name from the props we passed in
    const firstRow = rows.first().find('td').map(column => column.text());
    expect(firstRow[0].includes(props.tutors[0].name)).toBe(true);

    // simulate clicking fire and see if correct route has been called
    rows.first().find('.fire-button').simulate('click');
    expect(fetch).toBeCalledWith("http://localhost:8000/tutor_list/remove_tutor", {"body": "{\"tutor\":{\"name\":\"Bora\",\"years\":3},\"cseCourse\":110}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
  });

  it('Testing if updateTutor violates MVC', () => {
    fetch.mockResponse(JSON.stringify({'-MJxdmdFCjGv4KtfZKVr': { name: 'Tiffany', years: '3' },
    '-MJxgdPaNk7xlYn9SdOE': { name: 'Bora', years: '2' }}));

    let props = {
      location: {
        cseCourse: 110
      },
      tutors: [{name: 'Bora', years: 3}]
    };

    const tutorList = shallow(<TutorList {...props} />);
    
    // check if row exists
    let rows = tutorList.find('.tutors-table-row');
    expect(rows.length).toBe(props.tutors.length)

    // check if the row includes the name from the props we passed in
    let firstRow = rows.first().find('td').map(column => column.text());
    expect(firstRow[0].includes(props.tutors[0].name)).toBe(true);

    // simulate clicking fire and see if correct route has been called
    rows.first().find('.edit-tutor-button').simulate('click');
    rows = tutorList.find('.tutors-table-row');
    firstRow = rows.first().find('td').map(column => column.text());

    rows.first().find('.save-button').simulate('click');
    expect(fetch).toBeCalledWith("http://localhost:8000/tutor_list/update_tutor", {"body": "{\"tutors\":[{\"name\":\"Bora\",\"years\":3}],\"cseCourse\":110}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
  });

  it('Testing if hidden MVC violation is fixed', () => {
    fetch.mockResponse(JSON.stringify({'-MJxdmdFCjGv4KtfZKVr': { name: 'Tiffany', years: '3' },
    '-MJxgdPaNk7xlYn9SdOE': { name: 'Bora', years: '3' }}));

    let props = {
      location: {
        cseCourse: 110
      },
      tutor: {
        name: 'Bora',
        years: 3
      }
    };

    const hirePage = shallow(<HireTutor {...props} />);
    
    hirePage.find('.hire-button').simulate('click')
    expect(fetch).toBeCalledWith("http://localhost:8000/tutor_list/add_tutor", {"body": "{\"name\":\"Bora\",\"years\":3,\"cseCourse\":110}", "headers": {"Content-Type": "application/json"}, "method": "POST"});
  });
});
