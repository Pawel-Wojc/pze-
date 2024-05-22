import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AllCourses from './components/Student/AllCourses.js';
import UserCourses from './components/Student/UserCourses.js';
import UserCourse from './components/Student/UserCourse.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import UsersList from './components/HeadAdmin/UsersListComponent.js';
import NotFound from './components/NotFound.js';
import AuthService from './components/Services/AuthService.js';
import PrivateRoutes from './components/Utils/PrivateRoutes.js'
import Task from './components/Student/Task.js';
import TeacherCoursesList from './components/Teacher/TeacherCoursesList.js'
import TeacherCourseDetails from './components/Teacher/TeacherCourseDetails.js'

import TeacherCourseTask from './components/Teacher/TeacherCourseTask.js'


import { CurrentUserContext } from './components/Utils/CurrentUserContext.js';

function App() {

  localStorage.setItem("api_path", "http://localhost:8080/")


  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    if (sessionStorage.getItem("user_jwt")) { //if page was refresched
      AuthService.getCurrentUser().then(
        (res) => {
          setCurrentUser(res)
        }, (error) => {
        }
      )
    }
  }, []);




  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={< Register />} />
          <Route path="*" element={<NotFound />}></Route>

          <Route element={<PrivateRoutes />}>        
            {/* user routs */}
            {(currentUser?.role === "student") ? <>
              <Route path="" element={< AllCourses />} />
              <Route path="/" element={< AllCourses />} />
              <Route path="/courses" element={< AllCourses />} />
              <Route path="/usercourses" element={< UserCourses />} />
              <Route path="/usercourse" element={<NotFound />} />
              <Route path="/usercourse/:course_id" element={< UserCourse />} />
              <Route path="/usertask" element={<NotFound />} />
              <Route path="/usertask/:task_id" element={< Task />} />
              
            </> : <></>}

            {/* teacher routs */}
            {(currentUser?.role === "tutor") ? <>
              <Route path="" element={< TeacherCoursesList />} />
              <Route path="/" element={< TeacherCoursesList />} />
              <Route path="/teacher/courseslist" element={< TeacherCoursesList />} />  {/* lista kursow */}
              <Route path="/teacher/course/:course_id" element={< TeacherCourseDetails />} /> {/* podglad konkretnego kursu */}
              <Route path="/teacher/course/tasks/:task_id" element={< TeacherCourseTask />} />  {/* podglad zadania*/}
            </> : <></>}

            {/* admin routs */}
            {(currentUser?.role === "admin") ? <>
            <Route path="" element={< UsersList />} />
            <Route path="/" element={< UsersList />} />
            <Route path="/userslist" element={< UsersList />} />


            </> : <></>}
          </Route>

        </Routes>
      </CurrentUserContext.Provider>
    </>
  );

}

export default App;
