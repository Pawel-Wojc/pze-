import React, { useState } from 'react'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UploadFile from './UploadFile';
export default function Task() {


  let { task_id } = useParams();

  const [modalShow, setModalShow] = useState(false);


  return (
    <>
      <div class="row justify-content-md-center" style={{}}>

        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            <h5 class="card-title">Tytuł zadanioa Zadanie {task_id}</h5>


            <div class="row">
              <div class="col">
                <h6 >Tutaj bedzie opis zadania </h6>
                <h9>Wymagania : data od data do <br></br> Jakie pliki ile </h9>

              </div>
              <div class="col">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Send Files
                </Button>

                <UploadFile
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

