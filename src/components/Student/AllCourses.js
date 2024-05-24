import React from 'react'
import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { ListGroup } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Toast, ToastContainer } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { CurrentUserContext } from './../Utils/CurrentUserContext';

export default function AllCourses() {

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const [showToast, setShowToast] = useState(false);
  const [toastText, settoastText] = useState("");
  const [toastVariant, settoastVariant] = useState("success");
  const [filteredItems, setFilteredItems] = useState([])
  const [allItems, setAllItems] = useState([])



  const getData = async () => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/all/courses", config)
      .then(res => {
        setAllItems(res.data)
        if (filteredItems.length == 0) {
          setFilteredItems(res.data)
        }
        return res;

      })
      .catch(err => {
        // Handle errors
        console.error(err);
      })
    return data;
  }
  //joing to course
  const joinToCourse = async (courseID) => {
    
    let config = {
      url: localStorage.getItem("api_path") + "curse/" + courseID + "/add/student",
      method: 'POST',
      data: currentUser,
      headers: {
        'Content-Type': 'text/plain',
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    console.log(currentUser)
    await axios.request(config)
      .then(res => {
        if (res.status === 200) {
          settoastText("Joined")
          settoastVariant("success")
          setShowToast(true)
        } else {
          console.log(res)
          settoastText("Something went wrong")
          settoastVariant("danger")
          setShowToast(true)
        }
        return res;

      })
      .catch(err => {
        console.log(err)
        settoastText("Something went wrong")
        settoastVariant("danger")
        setShowToast(true)

      })




  }

  //searching
  const [formSearch, setFormSearch] = useState("");
  useEffect(() => {
    const newItemsList = allItems?.filter(course =>
      course.title.toLowerCase().includes(formSearch.toLowerCase())
    );
    setFilteredItems(newItemsList);
  }, [formSearch])


  const { isLoading, isError, error, data } = useQuery('all_courses', getData, { refetchOnWindowFocus: false, })
  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }



  return (
    <><ToastContainer position='top-end'>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
        <Toast.Header>{toastText}</Toast.Header>
      </Toast>
    </ToastContainer>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className="col-sm">
            <FloatingLabel controlId="name" label="Search" className="mb-3">
              <Form.Control
                name="name"
                onChange={(event) => setFormSearch(event?.target.value)}
                value={formSearch}
                type='text'
              />
            </FloatingLabel>
          </div>
          <h4>After updating the backend, check whether it is working at all or not????</h4>
          <h5>List of all available courses</h5>
          <ListGroup>
            {filteredItems.map((course, i) => (
              <ListGroup.Item key={i} className=''>
                {course.title}
                <button type="button" class="btn btn-success " onClick={() => joinToCourse(course.id)}>Join</button>
              </ListGroup.Item>
            ))}
          </ListGroup>


        </div>
      </div>
    </>
  )

}
