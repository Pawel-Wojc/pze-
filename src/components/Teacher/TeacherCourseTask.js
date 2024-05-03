import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

export default function TeacherCourseTask() {
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "course/get/course/details/" + 200,
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
      throw "error"
    return 
  }

  const { isLoading, isError, error, data } = useQuery('users', getData, { refetchOnWindowFocus: false })

  console.log(isError)


  return (
    <div>TeacherCourseTask</div>
  )
}
