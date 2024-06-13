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
    const { data } = await axios.get(localStorage.getItem("api_path") + "course/get/all/courses")
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

  //get user courses 
  const getUserCourses = () => {
    return new Promise((resolve, reject) => {
      axios.get(localStorage.getItem("api_path") + "course/get/user/courses")
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  };


  //joing to course     TODO: check if user is already in course
  const joinToCourse = async (courseID) => {
    const userCourses = await getUserCourses();
    const userCoursesIds = userCourses.map(course => course.id);
    let config = {
      url: localStorage.getItem("api_path") + "course/" + courseID + "/add/student",
      method: 'POST',
      data: JSON.stringify(currentUser),
      headers: {
        'Content-Type': 'application/json',
      }
    }


    if (userCoursesIds.includes(courseID)) {
      settoastText("Already in course")
      settoastVariant("warning")
      setShowToast(true)
      return
    }


    await axios.request(config)
      .then(res => {
        if (res.status === 200) {
          settoastText("Joined")
          settoastVariant("success")
          setShowToast(true)
        } else {
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
      course.title.toLowerCase().includes(formSearch.toLowerCase()) ||
      course.course_owners.some(owner => (owner.name.toLowerCase() + owner.surname.toLowerCase()).includes(formSearch.toLowerCase().replace(/\s+/g, '')) ||
        owner.surname.toLowerCase().includes(formSearch.toLowerCase().replace(/\s+/g, '')))
    );
    setFilteredItems(newItemsList);
  }, [formSearch])


  const { isLoading, isError, error, data } = useQuery('all_courses', getData, { refetchOnWindowFocus: false, })
  if (isLoading) {
    return <div>Loading... </div>
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
          <h5>List of all available courses</h5>
          <ListGroup>
            {filteredItems.map((course, i) => (
              <ListGroup.Item key={i} className=''>
                <div className='container'>
                  <div className='row'>
                    <div className='col'>
                      {course.title}
                      {course.course_owners.length === 0 ? <></> : <>
                        <br></br>
                        <b>Teachers:</b> {course.course_owners.map((owner, i) => (
                          <>{owner.name} {owner.surname} </>
                        ))}
                      </>}
                    </div>
                    <div className='col d-flex justify-content-end'>
                      <button type="button" class="btn btn-success " onClick={() => joinToCourse(course.id)}>Join</button>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </>
  )
}
