import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Card} from 'react-bootstrap';
import Loading from '../Utils/Loading';

export default function TeacherCourseTaskPreview({ task_id }) {


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
    return data
  }

  const { isLoading, isError, error, data } = useQuery('teacher_task' + task_id, getData, { refetchOnWindowFocus: false })

  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }
  return (
    <div className='container'>
      <Card>
        <Card.Body>

          <Card.Subtitle className="mb-2 text-muted">Title</Card.Subtitle>
          <Card.Text>
            {data.title}
          </Card.Text>

          <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
          <Card.Text>
            {data.contents}
          </Card.Text>

          <Card.Subtitle className="mb-2 text-muted">Start date - end date</Card.Subtitle>
          <Card.Text>
            {data.date_of_start} - {data.date_of_end} 
          </Card.Text>

          <Card.Subtitle className="mb-2 text-muted">Available file extensions</Card.Subtitle>
          <Card.Text>
            {((data.available_file_extensions === "")
              ||(data.available_file_extensions==null)? <>All extensions</> : <>{data.available_file_extensions}</>)}
          </Card.Text>

        </Card.Body>
      </Card>

    </div>
  )
}