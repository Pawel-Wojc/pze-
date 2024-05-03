import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ListGroup } from 'react-bootstrap';
import AuthService from '../Services/AuthService';

export default function AllCourses(props) {

  var user = JSON.parse(sessionStorage.getItem('user'))
  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }

  const user1 = AuthService.getCurrentUser();
  console.log(user1)

  const [courses, setcourses] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/all/courses", config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    setcourses(data);

  }
  useEffect(() => { getData() }, [])


  return (<>

    {(user?.role == "student") ? <>
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
    </> : <>
    {
        (user?.role == "tutor") ? <>Redirect to teacher homepage </> :<>Redirect to admin homepage</>

    }
    </>}
  </>

  )

}
