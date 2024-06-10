import React, { useEffect, useState, useContext } from "react";
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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CurrentUserContext } from './../Utils/CurrentUserContext';

export default function Task() {
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

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

  const [sendDisable, setsendDisable] = useState(true);

  const getData = async () => {
    const { data } = await axios
      .request(config)
      .then((res) => {
        setFilesInDatabase(res.data.files);
        setFilesCurrentView(res.data.files);
        return res;
      })
      .catch((err) => { console.log(err) });
    return data;
  };

  const { refetch, isLoading, isError, error, data } = useQuery("task" + task_id, getData, { refetchOnWindowFocus: false });

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

  //FILES
  //delte files axios request
  const deleteFiles = () => {
    filesToDelete.forEach((file) => {
      let config = {
        method: "delete",
        url: localStorage.getItem("api_path") + "delete/file/" + file.id,
        maxBodyLength: Infinity,
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
        },
      }
      axios
        .request(config).then((res) => {
          if (res.status === 200) {
            settoastText("Changes saved successfully")
            settoastVariant("success")
            setShowToast(true)
            setFilesToDelete([])
            refetch()
          } else {
            settoastText("Something went wrong")
            settoastVariant("danger")
            setShowToast(true)
          }

        }).catch((err) => {
          settoastText("Something went wrong")
          settoastVariant("danger")
          setShowToast(true)
          console.log(err)
        })
    })

  }

  //send files axios request
  const sendFiles = async () => {
    let fileToSendFormData = new FormData();
    filesToSend.forEach((file, i) => {
      let filename = data.title + currentUser.name + currentUser.surname + file.name;
      fileToSendFormData.append(`file`, file, filename);
    });


    let config = {
      method: "post",
      url: localStorage.getItem("api_path") + "save/file/to/task/" + data?.id,
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
      data: fileToSendFormData,
    }
    await axios
      .request(config).then((res) => {
        if (res.status === 200) {
          settoastText("Changes saved successfully")
          settoastVariant("success")
          setShowToast(true)
          setFilesToSend([])
          refetch()
        } else {
          settoastText("Something went wrong")
          settoastVariant("danger")
          setShowToast(true)
        }

      }).catch((err) => {
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)
        console.log(err)
      })
  }


  //deleting files
  const deleteFile = async (file) => {
    setFilesCurrentView( //deleting file from current list of files
      filesCurrentView.filter((currentFile) => currentFile !== file)
    )

    //checking we are deleting files that are not currently send, or we are deleteing a file which is send
    if (filesToSend?.includes(file)) {
      setFilesToSend(filesToSend?.filter((currentFile) => currentFile !== file));
    } else {
      setFilesToDelete([...filesToDelete, file]);
    }


    // //checking we are deleting files that are not currently send, or we are deleteing a file which is in database
    // filesToSend?.map((currentFile) => {
    //   if (currentFile === file) {
    //     setFilesToSend(filesToSend?.filter((currentFile) => currentFile !== file)); //delete file from files to send

    //   }

    // })
    // setFilesToDelete([...filesToDelete, file]); //add file to list to delete

  };
  const addFiles = (e) => {
    // setFilesCurrentView([...filesCurrentView, file]);
    e.preventDefault();
    console.log(e)
    //setFilesToSend([...filesToSend, file]);
  }

  //adding files

  const handleFileChange = async (e) => {
    setFilesToSend(Array.from(e.target.files));
    setFilesCurrentView([...filesCurrentView, ...Array.from(e.target.files)]);
  };

  const saveChanges = async () => {
    if (filesToSend.length === 0 && filesToDelete.length === 0) {
      setShowToast(true)
      settoastVariant("warning")
      settoastText("No changes, nothing to save")
    }
    if (filesToDelete.length > 0) {
      deleteFiles()
    }
    if (filesToSend.length > 0) {
      sendFiles()
    }
  }
  //const [fileList, setFileList] = useState(null);
  const files = filesToSend ? [...filesToSend] : [];

  //checking file amount
  useEffect(() => {
    if (filesCurrentView.length > data?.max_total_files_amount) {
      setsendDisable(true);
    } else {
      setsendDisable(false);
    }
  }, [filesCurrentView])



  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>;
  }
  if (isError) {
    return <div>Errror, {error.message}</div>;
  }

  return (
    <>

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
                <span style={{ color: (filesCurrentView?.length > data?.max_total_files_amount) ? "red" : "" }}>
                  Files: {filesCurrentView?.length} of {data?.max_total_files_amount}{" "}
                </span>
              </div>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip-2">The name of your file will be used as a comment, there is no need to call it by your first name or the name of the task </Tooltip>}
              >
                <Button variant="success">?</Button>
              </OverlayTrigger>
            </CardTitle>
            <CardText>
              {filesCurrentView?.map((file) => {
                return (
                  <li>
                    <span style={{ color: (file instanceof File) ? "green" : "black" }}>{file.name}</span>
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
                onClick={() => saveChanges()}
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


function getExtension(filename) {
  return filename.split('.').pop()
}
