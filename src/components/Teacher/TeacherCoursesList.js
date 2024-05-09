import React from "react"
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function TeacherCoursesList() {


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

  const { isLoading, isError, error, data } = useQuery("teacher_courses_list", getData, { refetchOnWindowFocus: false })

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>

  }
  if (isError) {
    console.log("error")
    return <div>Errror, {error.message}</div>
  }
   
   

  return (
    <>
      <div class="row justify-content-md-center" style={{}}>
        <div>
          <Button variant="success"> Add new</Button>
        </div>
        
        

         {data?.map((course) => {

          return (
            <div class="card" style={{ width: '40rem', margin: '10px' }}>
              <div class="card-body">
                <Link to={`/teacher/course/${course.id}`} class="card-title" >
                  {course.title}

                </Link>
                <Button variant="danger"> Delete</Button>
                <Button> Get Course Files</Button>
                <div class="row">
                  <div class="col">
                  </div>
                  <div class="col">

                  </div>
                </div>

              </div>
            </div>

          )

        })} 
      </div>
    </>
  )
}