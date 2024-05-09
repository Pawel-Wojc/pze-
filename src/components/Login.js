import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import AuthService from "./Services/AuthService";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Login(props) {
  const user_logged = props.user
  const navigate = useNavigate()
  let auth = sessionStorage.getItem("user_jwt")
  const [user, setUser] = useState({
    mail: '',
    password: ''
  })

  const validationSchema = Yup.object().shape({
    mail: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Invalid password'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  function onSubmit(data) {
    AuthService.login(data).then(
      () => {
      },
      (error) => {
        console.log(error);
      },
    );

  }

  return (
    !auth ? <>
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
        {console.log("jest zalogowany")}
        <Navigate to="/" ></Navigate>
      </>

  )
}
