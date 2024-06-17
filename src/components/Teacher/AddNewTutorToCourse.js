import { React, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

export default function AddNewTutorToCourse() {
  let { course_id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");
  const [formValue, setFormValue] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);

  const getTutorList = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
    };
    const { tutors } = await axios
      .get(localStorage.getItem("api_path") + "get/all/users", config)
      .then((res) => {
        return res.data.filter((teacher) => teacher.role === "tutor");
      })
      .catch((err) => {
        console.error(err);
      });
    return tutors;
  };
  const { refetch, isLoading, isError, error, tutors } = useQuery(
    "tutor_list",
    getTutorList,
    { cacheTime: 0, refetchOnWindowFocus: false }
  );

  const addNewTutor = async (e) => {
    e.preventDefault();
    const tutor = 0;
    let config = {
      method: "post",
      url: localStorage.getItem("api_path") + "add/task/to/course/" + course_id,
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt"),
      },
      data: tutor,
    };
    const { data } = await axios
      .request(config)
      .then((res) => {
        if (res.status === 200) {
          settoastText("Task added");
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
    return data;
  };



  //view
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Errror, {error.message}</div>;
  }

  return (
    <div>
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
          <Modal.Title>Select turor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
      </Modal>
      <Button variant="success" onClick={() => setModalShow(true)}>
        New tutor
      </Button>{" "}
    </div>
  );
}
