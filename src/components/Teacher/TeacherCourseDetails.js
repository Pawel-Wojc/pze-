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
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id, config)
      .then(res => {
        console.log(res)
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
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (
    <div className='container'>
        <AddNewTutorToCourse></AddNewTutorToCourse>
        <ToastContainer position='top-end'>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
          <Toast.Header>{toastText}</Toast.Header>
        </Toast>
      </ToastContainer>

      {!isEditingTitle ? <h3> {data.title}
        <Button variant='light' onClick={() => { setIsEditingTitle(!isEditingTitle); setCourseTitlle(data.title) }}><img alt= "Edit" src={editLogo}></img></Button> </h3>
        : <>
          <FloatingLabel controlId="coursename" label="Name" className="mb-3">
            <Form.Control
              name="name"
              onChange={(event) => setCourseTitlle(event?.target.value)}
              value={courseTitle}
              type='text'
            />
          </FloatingLabel>
          <Button variant='light' onClick={() => { setIsEditingTitle(!isEditingTitle); saveCourseTitle() }}>Save</Button>
        </>}
      
      <Button onClick={() => setView("tasks")}>Tasks</Button> {' '}
      <Button onClick={() => setView("users")} >Users</Button>{' '}
      <br></br>
      <br></br>
      {view === "users" && <TeacherCourseDetailsUserList></TeacherCourseDetailsUserList>}
      {view === "tasks" && <TeacherCourseDetailsTasksList></TeacherCourseDetailsTasksList>}
    </div>
  )

}
