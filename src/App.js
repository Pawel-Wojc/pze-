import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AppHeader from './components/HeaderComponent';

import Courses from './components/Courses/CoursesComponent';
import MyCourses from './components/Student/MyCoursesComponent';
import Course from './components/Courses/CourseComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Users from './components/HeadAdmin/UsersListComponent.js';
import NotFound from './components/NotFoundComponent.js';


function App() {

  const [user, setUser] = useState(
    //{
    // Name: "Adam",
    // Surname: "Kowalski",
    // Email: "JanKowalski@wp.pl",
    // Role: "Teacher"
    //}
  );

  return (
    <>    
          <AppHeader />
          <Routes>
            <Route path="/" element={<MyCourses/>} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/course" element={<Course/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </>
  );
}

export default App;
