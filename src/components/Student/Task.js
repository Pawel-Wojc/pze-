import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import UploadFile from './UploadFile';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function Task() {
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "get/task/",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  let { task_id } = useParams();

  const [modalShow, setModalShow] = useState(false);
  const [sendDisable, setsendDisable] = useState(true);


  const getData = async () => {
    const { data } = await axios.request( task_id, config)
      .then(res => {
        return res;
      })
      .catch(err => {
        // console.error(err);
      })
    return data
  }





  const { isLoading, isError, error, data } = useQuery('users', getData, { refetchOnWindowFocus: false })


  useEffect(() => {

    const date = new Date();
    //const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const currentDate = new Date();
    const startDate = new Date(data?.date_of_start)
    const endDate = new Date(data?.date_of_end)
    if (currentDate >= startDate && currentDate <= endDate) {
      setsendDisable(false)
    } else {
      setsendDisable(true)
    }
  }, [data])





  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    console.log("error")
    return <div>Errror, {error.message}</div>
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
                  title={data.title}
                  extensions={data.available_file_extensions}
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

