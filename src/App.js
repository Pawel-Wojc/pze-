import './App.css';
import AppHeader from './components/header';
import Courses from './components/courses';
import MyCourses from './components/mycourses';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import { useState } from 'react';
function App() {

  const [user, setUser] = useState("null");
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
