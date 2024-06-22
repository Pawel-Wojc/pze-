import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useQuery } from "react-query";
import axios from "axios";
import { Card, CardBody, CardFooter, CardText, CardTitle, } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Toast, ToastContainer } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CurrentUserContext } from './../Utils/CurrentUserContext';
import Loading from "../Utils/Loading";

export default function Task() {
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");


  const [filesToSend, setFilesToSend] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [filesCurrentView, setFilesCurrentView] = useState([]);

  let { task_id } = useParams();


  const [sendDisable, setsendDisable] = useState(true);

  const getData = async () => {
    let config = {
      method: "get",
      url: localStorage.getItem("api_path") + "get/task/" + task_id,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
    };
    const { data } = await axios
      .request(config)
      .then((res) => {
        console.log(res)
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
    return new Promise((resolve, reject) => {
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

      resolve()
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


  //deleting files from lists
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
  };

  const addFiles = (e) => {
    e.preventDefault();
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
      await deleteFiles()
    }
    if (filesToSend.length > 0) {
      await sendFiles()
    }
  }



  //checking file amount
  useEffect(() => {
    if (filesCurrentView.length > data?.max_total_files_amount) {
      setsendDisable(true);
    } else {
      setsendDisable(false);
    }
  }, [filesCurrentView])



  if (isLoading) {
    return <Loading></Loading>;
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

      <div class="row justify-content-md-center" style={styles.container}>
        <Card style={styles.card}>
          <CardBody>
            <CardTitle>{data.title}</CardTitle>

            <CardText>
              <p>{data.contents}</p>
              <span>
                Otwarte od <h5 style={{display: "inline"}}>{data.date_of_start}</h5>  do:  <h5 style={{display: "inline"}}>{data.date_of_end}</h5>
              </span>
            </CardText>
            <Form disabled={sendDisable}>
              <p>
                <Form.Control type="file" onChange={handleFileChange} onSubmit={addFiles} multiple />
              </p>
            </Form>
            <div style={styles.fileList.container}>
              <div style={styles.fileList.header}>
                <h5 style={{color: (filesCurrentView?.length > data?.max_total_files_amount) ? "red" : ""}}>
                  Files: {filesCurrentView?.length} of {data?.max_total_files_amount}
                </h5>

                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip id="button-tooltip-2">The name of your file will be used as a comment, there is no need to name it by your first name or the name of the task </Tooltip>}
                >
                  <Button variant="success" style={styles.infoButton}>?</Button>
                </OverlayTrigger>
              </div>
              
            
              {filesCurrentView?.map((file) => {
                return (
                  <li style={styles.fileList.item}>
                  <Button
                    variant="outline-dark"
                    onClick={() => deleteFile(file)}
                    style={styles.fileList.item.button}
                  >
                    X
                  </Button>
                    <span style={{ color: (file instanceof File) ? "green" : "black" }}>{file.name}</span>
                  </li>
                );
              })}
            </div>


              <Button
                disabled={sendDisable}
                variant="success"
                onClick={() => saveChanges()}
                style={styles.card.saveButton}
              >
                Save
              </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "5%"
  },

  card: {
    width: "40%",
    minHeight: "50vh",

    saveButton: {
      width: "15%",
      height: "10%",
    }
  },

  fileList: {
    container: {
      width: "100%",
      minHeight: "10vh",
      border: "1px solid grey",
      borderRadius: "5px",
      padding: "1%",
      marginBottom: "2%"
    },

    item: {
      width: "100%",
      marginLeft: "5%",
      marginTop: "1%",
      marginBottom: "1%",

      button: {
        marginRight: "1%",
        paddingTop: "1%",
        paddingBottom: "1%"
      }
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }
  }
}