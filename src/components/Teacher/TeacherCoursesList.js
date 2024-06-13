import { React, useState } from "react"
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function TeacherCoursesList() {

  //get course data
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + 'course/get/user/courses',
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  const getData = async () => {
    const { data } = await axios.request(config).then(res => {
      return res;
    })
      .catch(err => {
        console.error(err);
      })
    return data
  }

  const { refetch, isLoading, isError, error, data } = useQuery("teacher_courses_list", getData, { refetchOnWindowFocus: false })

  //toast 
  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");
  //modal add new course 
  const [formValue, setFormValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const addNewTask = async (e) => {
    e.preventDefault()
    if (formValue === "") {
      return "Name can't be empty"
    }
    const course = {
      title: formValue,
    };

    let config = {
      method: 'post',
      url: localStorage.getItem("api_path") + "course/add",
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
      data: course
    }
    const { data } = await axios.request(config).then(res => {
      if (res.status === 200) {
        settoastText("Task added")
        settoastVariant("success")
        setShowToast(true)
      } else {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
      }
      handleClose()
      refetch()
      setFormValue("")
      return res
    })
      .catch(err => {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
        console.error(err);
        return err
      })
    return data
  }
  //delete course
  const deleteTask = async (courseId) => {
    let config = {
      method: 'delete',
      url: localStorage.getItem("api_path") + "course/delete/" + courseId,
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
    }
    const { data } = await axios.request(config).then(res => {
      if (res.status === 200) {
        settoastText("Course deleted")
        settoastVariant("success")
        setShowToast(true)
      } else {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
      }
      handleClose()
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
    return data
  }

  //download course files
  const downloadCourse = async (courseId, courseTitle) => {
    let config = {
      url: localStorage.getItem("api_path") + "download/course/" + courseId + "/files",
      responseType: 'blob',
      method: 'GET',
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    await axios.request(config)
      .then(res => {
        if (res.status === 200) {
          const href = window.URL.createObjectURL(res.data);
          const anchorElement = document.createElement('a');
          anchorElement.href = href;
          anchorElement.download = courseTitle + ".zip";
          document.body.appendChild(anchorElement);
          anchorElement.click();
          document.body.removeChild(anchorElement);
          window.URL.revokeObjectURL(href);
        } else {
          settoastText("Something went wrong")
          settoastVariant("danger")
          setShowToast(true)
        }
        return res;
      })
      .catch(err => {
        console.error(err);
      })
  }

  if (isLoading) {
    return <div>Loading.. </div>

  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (
    <>
      <ToastContainer position='top-end'>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
          <Toast.Header>{toastText}</Toast.Header>
        </Toast>
      </ToastContainer>

      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Name the title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addNewTask}>
            <Form.Control
              onChange={(event) => setFormValue(event?.target.value)}
              value={formValue}
              type='text'
            />
            <Button variant="success" type="submit" >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>



      <div className="container" >
        <h5>List of all your courses</h5>
        <Button className="mt-1" variant="success" onClick={() => setModalShow(true)}>Add new</Button>

        <div className="row justify-content-md-center">
          {data?.map((course) => {
            return (

              <Card style={{ width: '40rem', margin: '5px' }}>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/teacher/course/${course.id}`} class="card-title" >
                      {course.title}
                    </Link>
                  </Card.Title>
                  <Button variant="danger" onClick={() => deleteTask(course.id)}> Delete</Button>
                  <Button onClick={() => downloadCourse(course.id, course.title)}> Get Course Files</Button>
                </Card.Body>
              </Card>

            )

          })}
        </div>

      </div>
    </>
  )
}