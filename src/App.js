import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppHeader from './components/HeaderComponent';

import Courses from './components/Courses/CoursesComponent';
import MyCourses from './components/Student/MyCoursesComponent';
import Course from './components/Courses/CourseComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Users from './components/HeadAdmin/UsersListComponent.js';
import NotFound from './components/NotFoundComponent.js';
import AuthService from './components/Services/AuthService.js';


function App() {

  localStorage.setItem("api_path", "http://localhost:8080/")
  const [user, setUser] = useState(

  );

  useEffect(() => { //tutaj pobiore dane z serwera o uzytkowniku
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
      console.log(user)
    }
  }, []

  )
    return (
      <>
      {user ? <AppHeader user={user}/> : <></>}
        <Routes>
          <Route path="" element={< MyCourses/>} />
          <Route path="/courses" element={<Courses user={user}/>} />
          <Route path="/mycourses" element={<MyCourses user={user} />} />
          <Route path="/course" element={<Course user={user} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users user={user}/>} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    );
 
}

export default App;
