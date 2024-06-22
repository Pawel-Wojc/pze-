import React from 'react'
import Loading from '../Utils/Loading';
import { Link, useParams } from 'react-router-dom'

import axios from 'axios';
import { useQuery } from 'react-query';
export default function Course() {
  let { course_id } = useParams();

  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "course/get/course/and/tasks/" + course_id,
    headers: {

      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }

  const getData = async () => {

    const { data } = await axios.request(config)
      .then(res => {
        console.log(res)
        return res;

      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    return data
  }

  const { isLoading, isError, error, data } = useQuery('course' + course_id, getData, { refetchOnWindowFocus: false, })




  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }


  return (<>
    <div style={styles.container}>
      <div style={styles.headerContainer}>
       <h2 style={styles.title}>{data.title}</h2>
      </div>

      <div style={styles.body}>
        {data?.tasks.map(task => (
          <div style={styles.card}>
            <Link to={`/usertask/${task.id}`} class="card-title" state={{ from: "course", course_id: course_id, task_id: task.id }}>
              <h4 style={{marginBottom: "2%"}}>{task.title}</h4>
            </Link>
            <div style={styles.card.body}>
              <p>
                <span>Open: </span>
                <h5 style={{display: "inline"}}>{task.date_of_start}</h5>
                <span>  to  </span>
                <h5 style={{display: "inline"}}>{task.date_of_end}</h5>
              </p>
              <p>
                <span>Status: </span>
                {task.files.length > 0 ?
                  <h5 style={{color: "green", display: "inline"}}>Done</h5>
                  :
                  <h5 style={{color: "orange", display: "inline"}}>To do</h5>
                }
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  </>
  )
}

const styles = {
  container: {
    margin: "auto",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  headerContainer: {
    width: "100%",
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%"
  },
  
  body: {
    width: "50%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  card: {
    width: "80%",
    margin: "1%" ,
    border: "1px solid black",
    padding: "1%",
    borderRadius: "5px",

    body: {
      width: "100%"
    }
  }
}