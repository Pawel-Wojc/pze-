import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
export default function TeacherCourse() {
  let { course_id } = useParams();
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "course/get/course/details/" + course_id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  const user = localStorage.getItem("user")

  const getData = async () => {
    const { data } = await axios.request(config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
        return err
      })
    //checking course belong to user
    // data.course_owners.map(owner => {
    //   if (owner.id == user.id) {
    //     console.log(owner.id)
    //   }
    // })
    //let adam = data.course_owners.find(user.id)
   // console.log("adam" + adam)
    return data

  }
  const { isLoading, isError, error, data } = useQuery('users', getData, { refetchOnWindowFocus: false })

  if (isLoading) {
    return (<>Loading..</>)
  }

  if (data) {
    console.log(data)
  }
  if (isError) {
    return (<>Error</>)
  }
  return (
    <>
      {data.tasks.map(task => (
        <>{task.title}</>
      ))}

    </>
  )
}
