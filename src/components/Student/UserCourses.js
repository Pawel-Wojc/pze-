import React from 'react'
import { Link } from 'react-router-dom'
import Course from '../Courses/UserCourse'

export default function MyCourses(props) {

  const coursesList = [
    { id: "1", title: "Zebrać raporty", owner: "Nauczyciel Jakis" },
    { id: "2", title: "Planowanie eventu", },
    { id: "3", title: "Aktualizacja oprogramowania" },
    { id: "4", title: "Szkolenie BHP" },
    { id: "5", title: "Audyt wewnętrzny" },
    { id: "6", title: "Rewizja kontraktu" }

  ]


  return (<>

    <div class="row justify-content-md-center" style={{}}>
      {coursesList.map(coursesList => (
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            
            <Link to="/course" class="card-title" state={{ from: "mycourses", course_id:coursesList.id, course_title:coursesList.title }}>
            {coursesList.title}
          </Link>
            <div class="row">
              <div class="col">
              </div>
              <div class="col">
                <p>Prowadzacy: {coursesList.owner}</p>
              </div>
            </div>

          </div>
        </div>




      ))}
    </div>

  </>
  )
}
