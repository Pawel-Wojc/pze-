import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Input from './InputComponent'
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "./Services/AuthService";

export default function Login(props) {
  const user_logged = props.user
  const navigate = useNavigate()

  const [user, setUser] = useState({
    mail: '',
    password: ''
  })
  
  const handleSumbit = (e) => {
    e.preventDefault();
    try {
      AuthService.login(user).then(
        () => {
          window.location.reload()
          navigate("/courses");
        },
        (error) => {
          console.log(error);
        },    
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={e => setUser({ ...user, mail: e.target.value })}
            label="Email address"
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={e => setUser({ ...user, password: e.target.value })}
            label="Password"
            type="password"
            placeholder="Enter password"
            regex="^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).{8,32}$"
            warning="Password must be 8-32 characters, with at least one uppercase letter and one special character."
          />
        </Form.Group>

        <Button variant="primary" type='Submit'>
          Login
        </Button>
      </Form>
      <div>Need an account? <Link to="/register">Register</Link></div>
    </div>
  )
}
