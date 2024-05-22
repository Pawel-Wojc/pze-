import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TeacherCourseTasksEdit from './TeacherCourseTaskEdit';
import TeacherCourseTasksPreview from './TeacherCourseTaskPreview'
import TeacherCourseTasksUsers from './TeacherCourseTaskUsers'

export default function TeacherCourseTask() {
  const [view, setView] = useState("preview");
  let { task_id } = useParams();


  return (
    <div className='container'>
      <br></br>
      <Button onClick={() => setView("edit")}>Edit</Button> {' '}
      <Button onClick={() => setView("preview")} >Preview</Button>{' '}
      {/* <Button onClick={() => setView("users")}>Users</Button>{' '} */}
      <br></br>
      <br></br>
      {view === "edit" && <TeacherCourseTasksEdit task_id={task_id}></TeacherCourseTasksEdit>}
      {view === "preview" && <TeacherCourseTasksPreview task_id={task_id}></TeacherCourseTasksPreview>}
      {view === "users" && <TeacherCourseTasksUsers task_id={task_id}></TeacherCourseTasksUsers>}
    </div>
  )
}
