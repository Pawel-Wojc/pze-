import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import UploadFile from './UploadFile';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, CardBody, CardTitle } from 'react-bootstrap';

export default function Task() {
  let { task_id } = useParams();
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "get/task/" + task_id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }


  const [modalShow, setModalShow] = useState(false);
  const [sendDisable, setsendDisable] = useState(true);

  const getData = async () => {
    const { data } = await axios.request(config)
      .then(res => {
        return res;
      })
      .catch(err => {
      })
    return data
  }


  const { isLoading, isError, error, data } = useQuery('task' + task_id, getData, { refetchOnWindowFocus: false })

  useEffect(() => {
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
    return <div>Errror, {error.message}</div>
  }

  return (
    <>
      <div class="row justify-content-md-center">
        <Card style={{ width: '40rem', margin: '10px' }}>
          <CardBody>
            <CardTitle>{data.title}
              <Button disabled={sendDisable} variant="primary" onClick={() => setModalShow(true)}>
                Send Files
              </Button>
            </CardTitle>
            <div class="row">
              <div class="col">
                <h5 >{data.contents} </h5>
                <h6>Wymagane od: {data.date_of_start} do:  {data.date_of_end}<br></br> Jakie pliki ile </h6>
              </div>
              <div class="col">


                <UploadFile
                  id={data.id}
                  title={data.title}
                  extensions={data.available_file_extensions}
                  show={modalShow}
                  onHide={() => setModalShow(false)}

                />

              </div>

            </div>
          </CardBody>

        </Card>
        {data.files?.map((file) => {
          return (<h5>{file.name}</h5>)
        })}
      </div>

    </>
  )
}

