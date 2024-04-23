import React from 'react'
import { redirect, useLocation } from 'react-router-dom'
export default function Task() {
    const location = useLocation()
    const { from, course_id, task_id } = location.state
    
    
    


  return (
    <>
    <div class="row justify-content-md-center" style={{}}>

        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
          <h5 class="card-title">Zadanie {task_id}</h5>
            <div class="row">
              <div class="col">

              </div>
              <div class="col">
                
              </div>
            </div>
          </div>
        </div>
      
    </div>
    </>
  )
}

