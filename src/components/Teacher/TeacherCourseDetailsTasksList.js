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
import Loading from '../Utils/Loading';


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
    return <Loading></Loading>
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
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addNewTask}>
            <Form.Control
              onChange={(event) => setFormValue(event?.target.value)}
              value={formValue}
              type='text'
              placeholder='Task name...'
              style={styles.modal.form}
            />
            <Button variant="success" type="submit" >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className='container' style={styles.container}>
        <div style={styles.headerContainer}>
          <h3>Tasks</h3>
          <Button variant="success" onClick={() => setModalShow(true)} style={styles.headerContainer.button}>New task</Button>
        </div>

        <div className="row justify-content-md-center">
          {(!data.tasks || data.tasks.length ===0 )?<>There are no tasks here yet</>:<></>}
          {data?.tasks.map((task) => {
            return <>
              <Card style={styles.card}>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/teacher/course/tasks/${task.id}`} class="card-title">
                      {task.title}
                    </Link>
                  </Card.Title>
                  <div style={styles.card.buttonPair}>
                    <Button variant="primary" onClick={() => downloadTask(task.id, task.title)} style={styles.card.buttonPair.button}>Download</Button>
                    <Button variant="danger" onClick={() => deleteTask(task.id)} style={styles.card.buttonPair.button}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </>
          })}
        </div>
      </div>
    </>
  )
}

const styles = {
  container: {
    padding: "1%",
    width: "80%",
    height: "100%"
  },

  modal: {
    form: {
      marginBottom: "2%"
    }
  },

  headerContainer: {
    width: "100%",
    paddingLeft: "10%",
    paddingRight: "10%",
    display: "flex",
    justifyContent: "space-between",

    button: {
      width: "20%",
    }
  },

  card: { 
    width: "80%", 
    padding: 0,
    margin: "1%", 

    buttonPair: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "end",

      button: {
        marginLeft: "1%"
      }
    }
  }
}
