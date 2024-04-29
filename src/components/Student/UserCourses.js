import React from 'react'
import { Link } from 'react-router-dom'
import Course from './UserCourse'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function MyCourses(props) {

  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  const [userCourses, setUserCourses] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/user/courses", config).then(res => {
      console.log(res.data)
      return res;
    })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
      setUserCourses(data);

  }
  useEffect(() => { getData() }, [])

  return (<>

    <div class="row justify-content-md-center" style={{}}>
      {userCourses.map(course => (
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            
            <Link to={`/usercourse/${course.id}`} class="card-title" >
            {course.title}
          </Link>
            <div class="row">
              <div class="col">
              </div>
              <div class="col">
                <p>Prowadzacy: {}</p>
              </div>
            </div>

          </div>
        </div>




      ))}
    </div>

  </>
  )
}
