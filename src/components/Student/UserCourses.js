import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';
import { CurrentUserContext } from './../Utils/CurrentUserContext';

export default function MyCourses(props) {

  const [showToast, setShowToast] = useState(false)
  const [toastText, settoastText] = useState("")
  const [toastVariant, settoastVariant] = useState("success")

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/user/courses").then(res => {
      return res;
    })
      .catch(err => {
        console.error(err);
      })
    return data
  }
  
  const { refetch, isLoading, isError, error, data } = useQuery('courses_list', getData, { refetchOnWindowFocus: false, })

  //leave course 
  const leaveCourse = async (course_id) => {
    await axios.delete(localStorage.getItem("api_path") + "course/remove/student/" + currentUser.id + "/from/course/" + course_id).then(res => {
      settoastText("Leaved")
      settoastVariant("success")
      setShowToast(true)
      refetch()
    })
      .catch(err => {
        console.log(err)
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
      })
  }
  if (isLoading) {
    return <div>Loading..</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }

  return (<>
    <ToastContainer position='top-end'>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
        <Toast.Header>{toastText}</Toast.Header>
      </Toast>
    </ToastContainer>
    <div class="row justify-content-md-center" style={{}}>
      <h5>Your courses</h5>
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
                <p>
                  {course.course_owners.length === 0 ? <></> : <>
                    <br></br>
                    <b>Teachers:</b> {course.course_owners.map((owner, i) => (
                      <h6>{owner.name} {owner.surname}  </h6>
                    ))}
                  </>}</p>
                <Button variant="warning" onClick={() => leaveCourse(course.id)}> Leave</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
