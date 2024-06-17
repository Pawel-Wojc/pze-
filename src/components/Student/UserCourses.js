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

  return (
    <>
    <ToastContainer position='top-end'>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
        <Toast.Header>{toastText}</Toast.Header>
      </Toast>
    </ToastContainer>
    <div className="container">
    <h2 style={styles.title}>Your courses</h2>

      <div class="row justify-content-md-center" style={styles.container}>
        {data.map(course => (
          <div class="card" style={styles.card}>

              <Link to={`/usercourse/${course.id}`} class="card-title" style={{width: "100%"}}>
                <h3 style={styles.card.title} >{course.title}</h3>
              </Link>

              <div style={styles.card.bottomRow}>
                <div style={styles.card.bottomRow.teachers}>
                  {course.course_owners.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <b>Teachers:</b>{' '}
                      {course.course_owners.slice(0, 2).map((owner, i) => (
                        <span key={i}>
                          {owner.name} {owner.surname}
                          {i < course.course_owners.length - 1 && i < 1 && ', '}
                        </span>
                      ))}
                      {course.course_owners.length > 2 && '...'}
                    </>
                  )}
                </div>

                <Button
                  style={styles.card.bottomRow.button}
                  variant="warning"
                  onClick={() => leaveCourse(course.id)}
                >
                  Leave
                </Button>

              </div>

            </div>
        ))}
      </div>
    </div>
  </>
  )
}

const styles = {
  title: {
    marginLeft: "10%",
    marginTop: "2%"
  },

  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "40%",
    height: "12rem",
    margin: "1%",
    padding: 0,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",

    title: {
      margin: 0,
      padding: "2%"
    },

    bottomRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding: "2%",

      teachers: {
        flex: 1,
        justifyContent: "left"
      },

      button: {
        justifyContent: "right",
      }
    }
  }

 
};