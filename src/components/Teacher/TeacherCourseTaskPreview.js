import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';

export default function TeacherCourseTaskPreview ({task_id})  {

  
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "get/task/" + task_id,
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

  const { isLoading, isError, error, data } = useQuery('teacher_task'+task_id, getData, { refetchOnWindowFocus: false })

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }
  return (
    <div>
    Title {data.title} <br></br>
    Description {data.contents} <br></br>
    Date of end {data.date_of_end} <br></br>
    Date of start {data.date_of_start} <br></br>
    File Extensions {data.available_file_extensions} <br></br>
    </div>
  )
}
