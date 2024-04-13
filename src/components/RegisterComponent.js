import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Input from './InputComponent'
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from './Services/AuthService';
const NAME_REGEX = /^[A-z]{2,10}$/;
const SURNAME_REGEX = /^[A-z]{2,10}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    surname: '',
    mail: '',
    password: '',
  })
  const [showAllert, setShowAllert] = useState(false);


  const handleSumbit = (e) => {
    e.preventDefault();
    console.log(user)
    try {
      AuthService.register(user).then(
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
        <Form onSubmit={handleSumbit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={e => setUser({ ...user, name: e.target.value })}
              label="Name"
              type="text"
              id="name"
              placeholder="Enter name"
              //regex="^[a-zA-z]+$.{3,10}"
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={e => setUser({ ...user, surname: e.target.value })}
              label="Surname"
              type="text"
              id="surname"
              placeholder="Enter surname"
              //regex="^[a-zA-z]+$.{3,10}"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={e => setUser({ ...user, mail: e.target.value })}
              label="Email"
              type="email"
              id="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">

            <Form.Control
              onChange={e => setUser({ ...user, password: e.target.value })}
              label="Password"
              type="password"
              id="password"
              placeholder="Enter password"
              //regex="^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).{8,32}$"
              warning="Password must be 8-32 characters, with at least one uppercase letter and one special character."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              label="Confirm Password"
              type="password"
              id="passwordconfirm"
              placeholder="Enter password"
            /> </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

        </Form>
        <div>Already register? <Link to="/login">Login</Link></div>
      </div>
    </>
  )
}

