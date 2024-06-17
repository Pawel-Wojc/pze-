import { React, useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Toast, ToastContainer } from 'react-bootstrap';


export default function TeacherCourseDetailsTasksList() {
  let { course_id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");

  // getData for specific course
  const getCourseTasksList = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/and/tasks/" + course_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
    return data
  }
  const { refetch, isLoading, isError, error, data } = useQuery("teacher_course", getCourseTasksList, { cacheTime: 0, refetchOnWindowFocus: false })


  //addin new task
  const [formValue, setFormValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const addNewTask = async (e) => {
    e.preventDefault()
    if (formValue === "") {
      return "Name can't be empty"
    }
    const task = {
      title: formValue,
      available_file_extensions: '',
      contents: '',
      date_of_end: null,
      date_of_start: new Date(),
      max_total_files_amount: 1,
    };

    let config = {
      method: 'post',
      url: localStorage.getItem("api_path") + "add/task/to/course/" + course_id,
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
      data: task
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

  //deleting task
  const deleteTask = async (taskId) => {
    let config = {
      method: 'delete',
      url: localStorage.getItem("api_path") + "delete/task/" + taskId,
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
    }
    const { data } = await axios.request(config).then(res => {
      if (res.status === 200) {
        settoastText("Task deleted")
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

  //download task files
  const downloadTask = async (taskId, taskTitle) => {
    let config = {
      url: localStorage.getItem("api_path") + "download/task/" + taskId + "/files",
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
          anchorElement.download = taskTitle + ".zip";
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

  //view
  if (isLoading) {
    return <div>Loading...</div>
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

      <div className='container'>



        <Button variant="success" onClick={() => setModalShow(true)}>New task</Button> {' '}

        <div className="row justify-content-md-center">
          {(!data.tasks || data.tasks.length ===0 )?<>There are no tasks here yet</>:<></>}
          {data?.tasks.map((task) => {
            return <>
              <Card style={{ width: '40rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/teacher/course/tasks/${task.id}`} class="card-title">
                      {task.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                  </Card.Text>
                  <Button variant="primary" onClick={() => downloadTask(task.id, task.title)} >Download</Button> {' '}
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </>
          })}
        </div>
      </div>
    </>
  )

}
