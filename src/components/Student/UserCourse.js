import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Course() {
  let { course_id } = useParams();
  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }

  const [courseDetails, setCourseDetails] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    setCourseDetails(data);
    setTasks(data.tasks)

  }

  useEffect(() => { getData() }, [])

  return (<>

    <div class="row justify-content-md-center" style={{}}>
      <h5> {courseDetails.title}</h5>
      {tasks.map(task => (
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            <Link to={`/usertask/${task.id}`} class="card-title" state={{ from: "course", course_id: course_id, task_id: task.id }}>
              {task.title}
            </Link>
            <div class="row">
              <div class="col">
                <p>Available: {task.date_of_start}-{task.date_of_end}</p>
              </div>
              <div class="col">
                <p>Status: {task.state ? "Done" : "To do"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}