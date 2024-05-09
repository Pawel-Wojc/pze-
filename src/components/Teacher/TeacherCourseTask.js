import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';

export default function TeacherCourseTask() {
  let { course_id } = useParams();
  let config = {
    method: 'get',
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
        console.error(err);
        return err
      })
      
    return data
  }

  const { isLoading, isError, error, data } = useQuery('users', getData, { refetchOnWindowFocus: false })

  console.log(isError)


  return (
    <div>TeacherCourseTask</div>
  )
}
