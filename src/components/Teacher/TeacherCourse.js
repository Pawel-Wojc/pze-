import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
export default function TeacherCourse() {
  let { course_id } = useParams();
  let config = {
   headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  const user = localStorage.getItem("user")
  
  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id,config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
    return data
  }

  const {status, isLoading, isError, error, data } = useQuery( "teacher_course",getData, {cacheTime:0,refetchOnWindowFocus:false} )

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    console.log("error")
    return <div>Errror, {error.message}</div>
  }
  
    return (
      <>
      <h1>{data.title}</h1>
        
        {data?.tasks.map((task)=>{
        return <>{task.title}</>
        })}
      
      
      </>
    )

}
