import React from 'react'
import axios from "axios"
import { ListGroup } from 'react-bootstrap';
import { useQuery } from 'react-query';


export default function AllCourses(props) {

  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }



  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/all/courses", config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    return data;
  }

  const { isLoading, isError, error, data } = useQuery('all_courses', getData, { refetchOnWindowFocus: false, })
  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }



  return (<>
    <div class=" row justify-content-md-center ">
      <div class="col-xxl-5 col-xl-6 col-md-7 col-sm-8 col-11">
        <ListGroup>
          {data.map((course, i) => (
            <ListGroup.Item key={i}>
              {course.title}
              <button type="button" class="btn btn-success align-content-end">Join</button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  </>
  )

}
