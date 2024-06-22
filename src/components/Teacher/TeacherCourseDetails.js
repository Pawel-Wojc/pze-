import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TeacherCourseDetailsUserList from './TeacherCourseDetailsUserList'
import TeacherCourseDetailsTasksList from './TeacherCourseDetailsTasksList'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import editLogo from "./../../Icons/Pencil.svg"
import AddNewTutorToCourse from './AddNewTutorToCourse';
import Loading from '../Utils/Loading';

export default function TeacherCourseDetails() {

  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");

  const [view, setView] = useState("tasks");
  
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [courseTitle, setCourseTitlle] = useState("")
  let { course_id } = useParams();

  const getCourseDetails = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/and/tasks/" + course_id, config)
      .then(res => {
        return res     
      })
      .catch(err => {
        console.error(err)
      })
    return data
  }
  const { refetch, isLoading, isError, error, data } = useQuery("teacher_course", getCourseDetails, { cacheTime: 0, refetchOnWindowFocus: false })


  const saveCourseTitle = async () => {
    data.title = courseTitle;
    let config = {
      method: 'post',
      url: localStorage.getItem("api_path") + "course/update",
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
      data: data
    }
    await axios.request(config).then(res => {
      if (res.status === 200) {
        settoastText("Course title saved")
        settoastVariant("success")
        setShowToast(true)
      } else {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
      }
      refetch()
      return res
    })
      .catch(err => {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
        console.error(err);
        return err
      })
  }

  if (isLoading) {
    return <Loading></Loading> 
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (
    <div className='container' style={styles.container}>
      <ToastContainer position='top-end'>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
          <Toast.Header>{toastText}</Toast.Header>
        </Toast>
      </ToastContainer>

      {!isEditingTitle ?
        <div style={styles.titleRow}>
          <h2 style={styles.titleRow.title}>{data.title}</h2>
          <Button variant='light' onClick={() => { setIsEditingTitle(!isEditingTitle); setCourseTitlle(data.title) }}>
              <img alt= "Edit" src={editLogo}></img>
          </Button>
          <div style={styles.titleRow.newTutorButton}>
            <AddNewTutorToCourse></AddNewTutorToCourse>
          </div>
        </div>
      : 
      <div style={styles.titleEditRow}>
          <Form style={styles.form}>
            <FloatingLabel controlId="coursename" label="Name" style={{margin: 0}}>
              <Form.Control
                name="name"
                onChange={(event) => setCourseTitlle(event?.target.value)}
                value={courseTitle}
                type="text"
              />
              </FloatingLabel>
          </Form>
          <Button
            variant="light"
            onClick={() => { setIsEditingTitle(!isEditingTitle); saveCourseTitle(); }}
            style={styles.button}
          >
            Save
          </Button>
    </div>}
      
      <div style={styles.navigationMenu}>
        <Button onClick={() => setView("tasks")} style={styles.navigationMenu.button}>Tasks</Button>
        <Button onClick={() => setView("users")} style={styles.navigationMenu.button}>Users</Button>
      </div>
      {view === "users" && <TeacherCourseDetailsUserList></TeacherCourseDetailsUserList>}
      {view === "tasks" && <TeacherCourseDetailsTasksList></TeacherCourseDetailsTasksList>}
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  titleRow: {
    width: "80%",
    height: "3rem",
    marginTop: "1%",
    marginBottom: "1%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    title: {
      marginRight: "1%"
    },

    newTutorButton: {
      height: "90%",
      width: "15%",
      marginLeft: "auto",
      marginRight: "5%"
    }
  },

  titleEditRow: {
    width: "70%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "4rem",
    marginBottom: "0.5%"
  },

  form: {
    flex: 10,
    marginRight: "1%",
  },

  button: {
    flex: 1.5,
    height: "100%",
  },

  navigationMenu: {
    width: "80%",
    marginBottom: "1%",
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
  }
}
