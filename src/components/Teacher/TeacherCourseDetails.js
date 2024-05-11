import { React, useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function TeacherCourseDetails() {
  let { course_id } = useParams();


  // getData for specific course
  const getData = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
    return data
  }
  const {refetch, isLoading, isError, error, data } = useQuery("teacher_course", getData, { cacheTime: 0, refetchOnWindowFocus: false })


  //addin new task
  const [formValue, setFormValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const addNewTask = async (e) => {
    e.preventDefault()
    if (formValue == "") {
      return "Name can't be empty"
    }
    const task = { 
      title: formValue, 
      available_file_extensions:'',
      contents:'',
      date_of_end:null,
      date_of_start: new Date(),
      max_total_files_volume:1,
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
      handleClose()
      refetch();

      return res
    })
      .catch(err => {
        console.error(err);
        return err
      })
    return data
  }


  //view
  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (
    <div className='container'>
      <h3>{data.title}</h3>
      <Button variant="success" onClick={() => setModalShow(true)}>Add new</Button> {' '}
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

      <div class="row justify-content-md-center">
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
                <Button variant="primary">Download</Button> {' '}
                <Button variant="danger">Delete</Button>
              </Card.Body>
            </Card>
          </>
        })}
      </div>
    </div>
  )

}
