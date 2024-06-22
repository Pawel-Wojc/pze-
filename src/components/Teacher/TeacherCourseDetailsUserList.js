import { React } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

export default function TeacherCourseDetailsUserList() {
    let { course_id } = useParams();
    const getCourseDetails = async () => {
        let config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            }
        }
        const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/course/details/" + course_id, config)
            .then(res => {
                console.log(res)
                return res

            })
            .catch(err => {
                console.error(err)
            })
        return data
    }
    const { refetch, isLoading, isError, error, data } = useQuery("teacher_course_users", getCourseDetails, { cacheTime: 0, refetchOnWindowFocus: false })

    return (

        <div  style={styles.container}>
            <div className='row justify-content-md-center' >
            {data?.users.map(user => (
                <Accordion style={styles.accordion}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{user.name} {user.surname}</Accordion.Header>
                        <Accordion.Body>
                            {user.tasks.map(task => (
                                <>{console.log(task)}
                                    <div className='row'>
                                    {console.log(task.userFiles.length)}
                                        <div className='col' >{task.title}</div>
                                        <div className='col' >Files: {task.userFiles.length}</div>
                                    </div>
                                </>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            )
            )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: "1%",
        width: "80%",
        height: "100%"
      },
    accordion: {
        width:"80%"
    }
}
