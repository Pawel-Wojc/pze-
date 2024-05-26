import { React, useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, Navigate } from 'react-router-dom';
import AuthService from "./Services/AuthService";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CurrentUserContext } from './Utils/CurrentUserContext.js';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { Toast, ToastContainer } from 'react-bootstrap';

export default function Login() {

  const validationSchema = Yup.object().shape({
    mail: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Invalid password'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [showToast, setShowToast] = useState(false);
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  function onSubmit(data) {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: localStorage.getItem("api_path") + 'login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    };

    axios.request(config).then(
      (res) => {
        if (res.request.status === 200) {
          sessionStorage.setItem("user_jwt", res.data)
          axios.defaults.headers.common['Authorization'] = "Bearer " + sessionStorage.getItem("user_jwt");
          getCurrentUser()
        }
      }, (err) => {
        if (err.response.status == 403) {
          setShowToast(true)
        }

      }
    )

    

    function getCurrentUser() {
      const userToken = sessionStorage.getItem("user_jwt")
      const userId = jwtDecode(userToken).id;
      let config = {
        method: 'get',
        url: localStorage.getItem("api_path") + 'get/user/' + userId,
        headers: {
          Authorization: "Bearer " + userToken
        }
      }

      axios.request(config).then(
        (res) => {
          setCurrentUser(res.data)
          return res
        }, (error) => {
          return error
        }
      )
    }
  }

  return (
    !currentUser ? <>
      <ToastContainer position='top-end'>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg='danger' autohide>
          <Toast.Header>Invalid email or password</Toast.Header>
        </Toast>
      </ToastContainer>
      <div className="position-absolute top-50 start-50 translate-middle">

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              {...register('mail')}
              label="Email"
              placeholder="Enter email"
              type="text"
              name="mail"
              className={`form-control ${errors.mail ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.mail?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              {...register('password')}
              label="Password"
              placeholder="Enter password"
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </Form.Group>
          <Button variant="primary" type='Submit'>
            Login
          </Button>
        </Form>
        <div>Need an account? <Link to="/register">Register</Link></div>
      </div>
    </> :
      <>
        {currentUser ? <><Navigate to="/" ></Navigate></> : <></>}


      </>

  )
}
