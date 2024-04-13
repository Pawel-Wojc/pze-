import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Courses from './components/Courses/CoursesComponent';
import MyCourses from './components/Student/MyCoursesComponent';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import Users from './components/HeadAdmin/UsersListComponent.js';
import NotFound from './components/NotFoundComponent.js';
import AuthService from './components/Services/AuthService.js';
import PrivateRoutes from './components/Utils/PrivateRoutes.js'

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
        
        <Routes>
          <Route element={<PrivateRoutes/>}>      
            <Route path="" element={< Courses/>} />
            <Route path="/courses" element={< Courses/>} />
            <Route path="/mycourses" element={ < MyCourses/>} />
            <Route path="/course" element={ < MyCourses/>} />
            <Route path="/users" element={< Users/>} />
          </Route>
          <Route path="/login" element={ <Login/>} />
          <Route path="/register" element={ < Register/>} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    );
 
}

export default App;
