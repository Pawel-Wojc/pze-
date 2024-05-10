import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function TeacherCourseTaskUsers({task_id}) {

  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "niemategoendpointa" + task_id,
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
    console.log(data)
    return data

  }

  const { isLoading, isError, error, data } = useQuery('teacher_task_users' + task_id, getData, { refetchOnWindowFocus: false })

  return (
    <div>Nie wiadomo czy bedzie</div>
  )
}

