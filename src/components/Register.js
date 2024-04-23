import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './Services/AuthService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Register() {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required') 
      .matches(/^[A-Za-z ]{3,}$/, 'Please enter valid name'),
    surname: Yup.string()
      .required('Surname is required')
      .matches(/^[A-Za-z ]{3,}$/, 'Please enter valid surname'),
    mail: Yup.string()
      .required('Email is required')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')

  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [showAllert, setShowAllert] = useState(false);

  const navigate = useNavigate()
  function onSubmit (data) {
    delete data.confirmPassword
    
    console.log(data)
    try {
      AuthService.register(register).then(
        () => {
          //window.location.reload()
          navigate("/login")
        },
        (error) => {
          console.log(error);
          setShowAllert(true);
        },
      );
    }catch (err) {
        console.log(err)
        setShowAllert(true);
      }
  }



  return (
    <>
      <div class="position-absolute top-50 start-50 translate-middle">
        <Alert show={showAllert} variant="danger">
          <Alert.Heading>Register</Alert.Heading>
          <p>
            Somethink went wrong
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShowAllert(false)} variant="outline-success">
              Close me
            </Button>
          </div>
        </Alert>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control
              {...register('name')}
              label="Name"
              placeholder="Enter name"
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="surname">
            <Form.Control
              {...register('surname')}
              label="Surname"
              placeholder="Enter surname"
              type="text"
              name="surname"
              className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.surname?.message}</div>
          </Form.Group>

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

          <Form.Group className="mb-3" controlId="confirmpassowrd">
            <Form.Control
              {...register('confirmPassword')}
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          <Button variant="secondary" type="button" onClick={() => reset()}>
            Reset
          </Button>
          
        </Form>
        <div>Already register? <Link to="/login">Login</Link></div>
      </div>
    </>
  )
}

