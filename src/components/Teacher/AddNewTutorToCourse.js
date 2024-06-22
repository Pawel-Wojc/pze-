import { React, useEffect, useState, useRef, useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { CurrentUserContext } from './../Utils/CurrentUserContext';
import Loading from "../Utils/Loading";

export default function AddNewTutorToCourse() {
  let { course_id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");
  const [formValue, setFormValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [tutorToAddId, setTutorToAddId] = useState(null);
  const handleClose = () => setModalShow(false);

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const getTutorList = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
    };
    const { data } = await axios
      .get(localStorage.getItem("api_path") + "get/all/users", config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    return data.filter((teacher) => teacher.role === "tutor" && teacher.id !== currentUser.id);
  };
  const { refetch, isLoading, isError, error, data } = useQuery(
    "tutor_list",
    getTutorList,
    { cacheTime: 0, refetchOnWindowFocus: false }
  );

  const addNewTutor = async () => {
    console.dir(tutorToAddId)
    if (tutorToAddId === null) {
      setModalShow(false)
      return
    }
    let tutorObject = data.filter((tutor) => tutor.id == tutorToAddId)[0];


    let config = {
      method: "post",
      url: localStorage.getItem("api_path") + "course/" + course_id + "/add/tutor",
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
      data: tutorObject,
    };
    const { data2 } = await axios
      .request(config)
      .then((res) => {
        if (res.status === 200) {
          settoastText("Tutor added");
          settoastVariant("success");
          setShowToast(true);
        } else {
          settoastText("Something went wrong");
          settoastVariant("danger");
          setShowToast(true);
        }
        handleClose();
        refetch();
        setFormValue("");
        return res;
      })
      .catch((err) => {
        settoastText("Something went wrong");
        settoastVariant("danger");
        setShowToast(true);
        console.error(err);
        return err;
      });
    return data2;
  };



  //view
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <div>Errror, {error.message}</div>;
  }


  return (
    <div style={styles.container}>
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
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select size="lg" onChange={(e) => setTutorToAddId(e.target.value)}>
            <option value={null}>Select teacher</option>
            {data?.map(tutor => (
              <option key={tutor.id} value={tutor.id}>{tutor.name} {tutor.surname}</option>
            ))}
          </Form.Select>
          <Button variant="success" onClick={addNewTutor}>Add</Button>

        </Modal.Body>
      </Modal>
      <Button variant="success" onClick={() => setModalShow(true)} style={styles.button}>
        New tutor
      </Button>
    </div>
  );
}

const styles = {
  container: {
    height: "100%",
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: "100%"
  }

}
