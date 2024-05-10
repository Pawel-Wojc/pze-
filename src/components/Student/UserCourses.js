import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios'

export default function MyCourses(props) {

  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }


  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/user/courses", config).then(res => {
      return res;
    })
      .catch(err => {
        console.error(err);
      })
    return data

  }

  const { isLoading, isError, error, data } = useQuery('courses_list', getData, { refetchOnWindowFocus: false, })
  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }





  return (<>

    <div class="row justify-content-md-center" style={{}}>
      {data.map(course => (
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            <Link to={`/usercourse/${course.id}`} class="card-title" >
              {course.title}
            </Link>
            <div class="row">
              <div class="col">
              </div>
              <div class="col">
                <p>Prowadzacy: { }</p>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  </>
  )
}
