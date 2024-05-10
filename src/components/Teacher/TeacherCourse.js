import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
export default function TeacherCourse() {
  let { course_id } = useParams();
  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }


  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
    return data
  }

  const { isLoading, isError, error, data } = useQuery("teacher_course", getData, { cacheTime: 0, refetchOnWindowFocus: false })

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (
    <>
      <h1>{data.title}</h1>
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
                <Button variant="primary">Download</Button>
              </Card.Body>
            </Card>
          </>
        })}
      </div>
    </>
  )

}
