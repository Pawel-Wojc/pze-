import React, { useEffect, useState } from 'react'
import axios from "axios"
import {  ListGroup } from 'react-bootstrap';

export default function Courses(props) {

  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }

  const [courses, setcourses] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/all/courses", config)
    .then(res => {
      console.log(res.data)
      return res;
    })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    setcourses(data);

  }
  useEffect(() => { getData() }, [])


  //const courses = response ? [...response] : [];



  return (

    <div class=" row justify-content-md-center ">

      <div class="col-xxl-5 col-xl-6 col-md-7 col-sm-8 col-11">
        <ListGroup>
          {courses.map((course, i) => (
            <ListGroup.Item key={i}>
              {course.title}
              <button type="button" class="btn btn-success align-content-end">Join</button>
            </ListGroup.Item>
          ))}
        </ListGroup>

      </div>
    </div>
  )

}
