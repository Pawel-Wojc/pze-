import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import UploadFile from './UploadFile';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'react-bootstrap';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function Task() {
  const [showToast, setShowToast] = useState(false)
  const [toastText, settoastText] = useState("")
  const [toastVariant, settoastVariant] = useState("success")

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

  //deleting files
  const deleteFile = async (fileId) => {
    const config = {
      method: 'delete',
      url: localStorage.getItem("api_path") + "delete/file/" + fileId,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    await axios.request(config)
      .then(res => {
        if (res.status === 200) {
          setModalShow(false)
        }
      })
      .catch(err => {
        console.error(err);
      })
  }


  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
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
      <UploadFile
        id={data.id}
        title={data.title}
        extensions={data.available_file_extensions}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div class="row justify-content-md-center">
        <Card style={{ width: '40rem', margin: '10px' }}>
          <CardBody>
            <CardTitle>
              {data.title}
            </CardTitle>
            <CardText>{data.contents}</CardText>
            <CardFooter>Wymagane od: {data.date_of_start} do:  {data.date_of_end}</CardFooter>
          </CardBody>
        </Card>
        <Card style={{ width: '40rem', margin: '10px' }}>
          <CardBody>
            <CardTitle>
              <Button disabled={sendDisable} variant="primary" onClick={() => setModalShow(true)}>
                Add file
              </Button>
              <div>Send: {data.files.length} of {data.max_total_files_amount} </div>
            </CardTitle>
            <CardText>
              {data.files?.map((file) => {
                return (<li>{file.name}
                  <Button variant="outline-dark" onClick={() => deleteFile(file.id)}>
                    X
                  </Button>

                </li>)
              })}
            </CardText>
            <CardFooter>
              <Button disabled={sendDisable} variant="success" onClick={() => setModalShow(true)}>
                Save
              </Button>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

