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
import TeacherCourseSettings from './components/Teacher/TeacherCourseSettings.js'
import TeacherCoursesList from './components/Teacher/TeacherCoursesList.js'
import TeacherCourse from './components/Teacher/TeacherCourse.js'

import TeacherCourseTask from './components/Teacher/TeacherCourseTask.js'
import TeacherCourseTasksSettings from './components/Teacher/TeacherCourseTasksSettings.js'

function App() {

  localStorage.setItem("api_path", "http://localhost:8080/")



  return (
    <>

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={< Register />} />
        <Route path="*" element={<NotFound />}></Route>

        <Route element={<PrivateRoutes />}>
          {console.log("session user z app.js: " + sessionStorage.getItem('user'))}
          {/* user routs */}
          {(JSON.parse(sessionStorage.getItem('user'))?.role == "student") ? <>
            {console.log("z app.js to jest user")}
            <Route path="" element={< AllCourses />} />
            <Route path="/" element={< AllCourses />} />
            <Route path="/courses" element={< AllCourses />} />
            <Route path="/usercourses" element={< UserCourses />} />
            <Route path="/usercourse" element={<NotFound />} />
            <Route path="/usercourse/:course_id" element={< UserCourse />} />
            <Route path="/usertask" element={<NotFound />} />
            <Route path="/usertask/:task_id" element={< Task />} />
            <Route path="/userslist" element={< UsersList />} />
          </> : <></>}

          {/* teacher routs */}
          {(JSON.parse(sessionStorage.getItem('user'))?.role == "tutor") ? <>
            <Route path="" element={< TeacherCoursesList />} />
            <Route path="/" element={< TeacherCoursesList />} />
            <Route path="/teacher/courseslist" element={< TeacherCoursesList />} />  {/* lista kursow */}
            <Route path="/teacher/course/:course_id" element={< TeacherCourse />} /> {/* podglad konkretnego kursu */}
            <Route path="/teacher/course/settings/:course_id" element={< TeacherCourseSettings />} /> {/* edycja konkretnego kursu*/}
            <Route path="/teacher/course/tasks" element={< TeacherCourse />} />
            <Route path="/teacher/course/tasks/:task_id" element={< TeacherCourseTask />} />  {/* podglad zadania*/}
            <Route path="/teacher/course/tasks/settings/:task_id" element={< TeacherCourseTasksSettings />} /> {/* edycja zadania*/}
          </> : <></>}

          {/* admin routs */}
          {(JSON.parse(sessionStorage.getItem('user'))?.role == "tutor") ? <>


          </> : <></>}
        </Route>

      </Routes>
    </>
  );

}

export default App;
