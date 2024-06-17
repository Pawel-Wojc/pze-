import { React } from 'react'
import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';


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

        <div>
             {data?.users.map(user =>(
                <>{user.name}  {user.surname}</>
            )


            )} 



        </div>
    )
}