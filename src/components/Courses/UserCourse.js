import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
export default function Course() {
  const location = useLocation()
  const { from, course_id , course_title} = location.state
  const tasks = [
    { id: "1", title: "Zadanie Zebrać raporty", contents: "Tutaj jakis opisik zadania", date_of_start: "2024-01-13", date_of_end: "2025-01-14", state: 0 },
    { id: "2", title: "Zadanie Planowanie eventu", contents: "Tutaj jakis opisik zadania" },
    { id: "3", title: "Zadanie Aktualizacja oprogramowania", contents: "Tutaj jakis opisik zadania" },
    { id: "4", title: "Zadanie Szkolenie BHP", contents: "Tutaj jakis opisik zadania" },
    { id: "5", title: "Zadanie Audyt wewnętrzny", contents: "Tutaj jakis opisik zadania" },
    { id: "6", title: "Zadanie Rewizja kontraktu", contents: "Tutaj jakis opisik zadania" },
    { id: "7", title: "Zadanie Przygotować raport finansowy", contents: "Raport ma zawierać analizę wyników finansowych firmy za ostatni kwartał.", date_of_start: "2024-05-01", date_of_end: "2024-05-10", state: 0 },
    { id: "8", title: "Zadanie Zorganizować szkolenie z obsługi nowego oprogramowania", contents: "Szkolenie ma na celu zapoznanie pracowników z nowym oprogramowaniem oraz jego funkcjonalnościami.", date_of_start: "2024-06-15", date_of_end: "2024-06-17", state: 1 },
    { id: "9", title: "Zadanie Przeprowadzić badanie satysfakcji klientów", contents: "Badanie ma na celu zrozumienie potrzeb i oczekiwań klientów oraz ocenę jakości świadczonych usług.", date_of_start: "2024-07-10", date_of_end: "2024-07-20", state: 0 },
    { id: "10", title: "Zadanie Aktualizacja systemu CRM", contents: "Planowana jest aktualizacja systemu CRM w celu ulepszenia zarządzania relacjami z klientami i poprawy efektywności działania firmy.", date_of_start: "2024-08-05", date_of_end: "2024-08-12", state: 0 },
    { id: "11", title: "Zadanie Przygotować ofertę handlową dla nowego klienta", contents: "Oferta ma zawierać propozycje produktów i usług dostosowanych do potrzeb potencjalnego klienta oraz atrakcyjne warunki współpracy.", date_of_start: "2024-09-01", date_of_end: "2024-09-05", state: 1 }
  ]


  return (<>

    <div class="row justify-content-md-center" style={{}}>
      <h5> {course_title}</h5>
      {tasks.map(task => (
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            {console.log(task)}
            <Link to="/task" class="card-title" state={{ from: "course", course_id: course_id, task_id:task.id  }}>
              {task.title}
            </Link>
            <div class="row">
              <div class="col">
              <p>Available: {task.date_of_start}-{task.date_of_end}</p>
              </div>
              <div class="col">
                <p>Status: {task.state ? "Done":"To do"}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}