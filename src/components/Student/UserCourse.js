import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
export default function Course() {
  let { course_id } = useParams();
 
  let config = {
    method:'get',
    url: localStorage.getItem("api_path") + "course/get/course/details/" + course_id,
    headers: {
 
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }

  const getData = async () => {
    const { data } = await axios.request(config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    return data
  }

  const { isLoading, isError, error, data } = useQuery('course'+course_id, getData, { refetchOnWindowFocus: false,  })


  

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    console.log("error")
    return <div>Errror, {error.message}</div>
  }
  console.log(data)
  
  return (<>
     <div class="row justify-content-md-center" style={{}}>
      <h5> {data.title}</h5>
      {data.tasks.map(task => (
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