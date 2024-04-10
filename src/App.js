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
import ProtectedRoute from './components/ProtectedRoute.js';


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
      <AppHeader user={user}/>
        <Routes>
          <Route path="" element={<ProtectedRoute>< Courses/></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute>< Courses/></ProtectedRoute>} />
          <Route path="/mycourses" element={ <ProtectedRoute>< MyCourses/></ProtectedRoute>} />
          <Route path="/course" element={ <ProtectedRoute>< MyCourses/></ProtectedRoute>} />
          <Route path="/login" element={ <ProtectedRoute>< MyCourses/></ProtectedRoute>} />
          <Route path="/register" element={ <ProtectedRoute>< Register/></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute>< Users/></ProtectedRoute>} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </>
    );
 
}

export default App;
