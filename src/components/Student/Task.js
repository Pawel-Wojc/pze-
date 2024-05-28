import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import UploadFile from "./UploadFile";
import { useQuery } from "react-query";
import axios from "axios";
import { Card, CardBody, CardFooter, CardText, CardTitle, } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

export default function Task() {
  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");

  const [filesInDatabase, setFilesInDatabase] = useState([]);
  const [filesToSend, setFilesToSend] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [filesCurrentView, setFilesCurrentView] = useState([]);

  let { task_id } = useParams();
  let config = {
    method: "get",
    url: localStorage.getItem("api_path") + "get/task/" + task_id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
    },
  };

  const [modalShow, setModalShow] = useState(false);
  const [sendDisable, setsendDisable] = useState(true);

  const getData = async () => {
    const { data } = await axios
      .request(config)
      .then((res) => {
        setFilesInDatabase(res.data.files);
        setFilesCurrentView(res.data.files);
        return res;
      })
      .catch((err) => { });
    return data;
  };

  const { isLoading, isError, error, data } = useQuery("task" + task_id, getData, { refetchOnWindowFocus: false });

  //checking the date is available to send
  useEffect(() => {
    const currentDate = new Date();
    const startDate = new Date(data?.date_of_start);
    const endDate = new Date(data?.date_of_end);
    if (currentDate >= startDate && currentDate <= endDate) {
      setsendDisable(false);
    } else {
      setsendDisable(true);
    }
  }, [data]);

  //deleting files
  const deleteFile = async (file) => {
    setFilesCurrentView(
      filesCurrentView.filter((currentFile) => currentFile !== file)
    )
    setFilesToDelete([...filesToDelete, file]);
    console.log(filesToDelete)
  };
  const addFiles = (e) => {
    // setFilesCurrentView([...filesCurrentView, file]);
    e.preventDefault();
    console.log(e)
    //setFilesToSend([...filesToSend, file]);
  }

  //adding files

  const handleFileChange = async (e) => {

    setFilesToSend(e.target.files);
    setFilesCurrentView([...filesCurrentView, ...Array.from(e.target.files)]);
    console.log(filesCurrentView)
  };

  const saveChanges = async () => {
    filesCurrentView.map((file) => {
      if (file.File){ //how to check the file is the File type or not ???
        console.log(file)
      }
    })
  console.log(filesCurrentView)
  }
  //const [fileList, setFileList] = useState(null);
  const files = filesToSend ? [...filesToSend] : [];

  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>;
  }
  if (isError) {
    return <div>Errror, {error.message}</div>;
  }

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chose file
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h5>Select all the files you want to send</h5>
            <p>
              <Form.Control type="file" onChange={handleFileChange} onSubmit={addFiles} multiple />
            </p>
            <Button variant="success" type="submit" >
              Add
            </Button>
          </Form>
          <ListGroup>
            {files.map((file, i) => (
              <ListGroup.Item key={i}>{file.name}</ListGroup.Item>
            ))}
          </ListGroup>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          bg={toastVariant}
          autohide
        >
          <Toast.Header>{toastText}</Toast.Header>
        </Toast>
      </ToastContainer>

      <div class="row justify-content-md-center">
        <Card style={{ width: "40rem", margin: "10px" }}>
          <CardBody>
            <CardTitle>{data.title}</CardTitle>
            <CardText>{data.contents}</CardText>
            <CardFooter>
              Wymagane od: {data.date_of_start} do: {data.date_of_end}
            </CardFooter>
          </CardBody>
        </Card>
        <Card style={{ width: "40rem", margin: "10px" }}>
          <CardBody>
            <CardTitle>
              Add File
              <Form disabled={sendDisable}>
                <p>
                  <Form.Control type="file" onChange={handleFileChange} onSubmit={addFiles} multiple />
                </p>
              </Form>

              <div>
                Files: {data.files.length} of {data.max_total_files_amount}{" "}
              </div>
            </CardTitle>
            <CardText>
              {filesCurrentView?.map((file) => {
                return (
                  <li>
                    {file.name}
                    <Button
                      variant="outline-dark"
                      onClick={() => deleteFile(file)}
                    >
                      X
                    </Button>
                  </li>
                );
              })}
            </CardText>
            <CardFooter>
              <Button
                disabled={sendDisable}
                variant="success"
                onClick={()=>saveChanges()}
              >
                Save
              </Button>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
