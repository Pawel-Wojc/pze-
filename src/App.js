import './App.css';
import AppHeader from './components/HeaderComponent';
import Courses from './components/Courses/CoursesComponent';
import MyCourses from './components/Student/MyCoursesComponent';
import { Routes, Route } from 'react-router-dom';
import Login from './components/LoginComponent';
import Register from './components/RegisterComponent';
import { useState } from 'react';
function App() {

  const [user, setUser] = useState({
    Name: "Adam",
    Surname: "Kowalski",
    Email: "JanKowalski@wp.pl",
    Role: "Teacher"
  });

  return (
    <>
      
      {!user ? (
        <Login />
      ) : (
        <>
          <AppHeader />
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mycourses" element={<MyCourses />} />
          </Routes>
        </>
      )
      }
    </>
  );
}

export default App;
