import React, { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UploadFile from './UploadFile';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Task() {
  let config = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  let { task_id } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [sendDisable, setsendDisable] = useState(true);
  useEffect ()

  const getData = async () => {
    const { data } = await axios.get(localStorage.getItem("api_path") + "get/task/" + task_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
      })
    return data
  }

  const setButton= ()=>{
    //console.log("tutaj " + data)
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const startDate = new Date(data.date_of_start)
    const endDate = new Date(data.date_of_end)
    
    if(startDate<currentDate<endDate){
      setsendDisable(false)
      console.log(false)
    }else {
      setsendDisable(true)
      console.log(true)
    }
  }

  const { isSuccess, isLoading, isError, error, data } = useQuery('users', getData, {onCompleted:setButton, refetchOnWindowFocus:false})
  if (isLoading) {
    console.log("loading")
    return <div>Loading..</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }
  if (!isLoading){
    //console.log(data)
    console.log("finished loading")
  }
 

  return (
    <>
      <div class="row justify-content-md-center">
        <div class="card" style={{ width: '40rem', margin: '10px' }}>
          <div class="card-body">
            <h5 class="card-title">{data.title} 
            <Button disabled={sendDisable} variant="primary" onClick={() => setModalShow(true)}>
                  Send Files
            </Button>
            </h5>
            
            <div class="row">
              <div class="col">
                
                <h5 >{data.contents} </h5>
                <h6>Wymagane od: {data.date_of_start} do:  {data.date_of_end}<br></br> Jakie pliki ile </h6>

              </div>
              <div class="col">
                

                 <UploadFile
                  title= {data.title} 
                  extensions = {data.available_file_extensions}
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

