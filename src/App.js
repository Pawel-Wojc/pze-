import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Courses from './components/Courses/AllCourses.js';
import MyCourses from './components/Student/UserCourses.js';
import Course from './components/Courses/UserCourse.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Users from './components/HeadAdmin/UsersListComponent.js';
import NotFound from './components/NotFound.js';
import AuthService from './components/Services/AuthService.js';
import PrivateRoutes from './components/Utils/PrivateRoutes.js'
import Task from './components/Courses/Task.js';

function App() {

  localStorage.setItem("api_path", "http://localhost:8080/")
  const [user, setUser] = useState(

  );
  sessionStorage.setItem("user_jwt", "response.data") //logowanie bez logowania

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
        
        <Routes>
          <Route element={<PrivateRoutes/>}>      
            <Route path="" element={< Courses/>} />
            <Route path="/courses" element={< Courses/>} />
            <Route path="/mycourses" element={ < MyCourses/>} />
            <Route path="/course" element={ < Course/>} />
            <Route path="/users" element={< Users/>} />
            <Route path="/task" element={< Task/>} />
          </Route>
          <Route path="/login" element={ <Login/>} />
          <Route path="/register" element={ < Register/>} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    );
 
}

export default App;
