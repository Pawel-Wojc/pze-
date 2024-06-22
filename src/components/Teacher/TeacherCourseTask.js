import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import TeacherCourseTasksEdit from './TeacherCourseTaskEdit';
import TeacherCourseTasksPreview from './TeacherCourseTaskPreview'


export default function TeacherCourseTask() {
  const [view, setView] = useState("preview");
  let { task_id } = useParams();


  return (
    <div className='container' style={styles.container}>
      <div style={styles.navigationMenu}>
        <Button onClick={() => setView("edit")} style={styles.navigationMenu.button}>Edit</Button>
        <Button onClick={() => setView("preview")} style={styles.navigationMenu.button}>Preview</Button>
      </div>

      <div style={styles.body}>
        {/* <Button onClick={() => setView("users")}>Users</Button>{' '} */}
        {view === "edit" && <TeacherCourseTasksEdit task_id={task_id}></TeacherCourseTasksEdit>}
        {view === "preview" && <TeacherCourseTasksPreview task_id={task_id}></TeacherCourseTasksPreview>}

      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  navigationMenu: {
    width: "80%",
    marginTop: "2%",
    marginBottom: "2%",
    borderTop: "solid",
    paddingLeft: "2%",
    borderBottomColor: 'black',
    borderTopWidth: 2,

    button: {
      marginLeft: "1%",
      width: "10%",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px"
    }
  },

  body: {
    width: "80%"
  }
}
