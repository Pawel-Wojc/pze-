import React, {useState}from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Input from './InputComponent'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login ()  {
  const [user, setUser] = useState ({
    email:'',
    password:''   
  })
  const navigate = useNavigate()
  const handleSumbit = (e) => {
    e.preventDefault();
    axios.post('https://localhost:7281/GetJwt', user)
    .then(res => {
      if(res.request.status == 200) {
        console.log(res)
        navigate('/')
      }else {
        alert ("Error")
        console.log(res)
      }
    })
    .then(err => console.log(err));
  }


    return (
      <div class="position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={handleSumbit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">           
            <Input
            onChange={e=> setUser({...user, email:e.target.value})}
            label = "Email address"
            type ="email"
            id = "email"
            placeholder = "Enter email"
            />          
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
             onChange={e=> setUser({...user, password:e.target.value})}
            label = "Password"
            type ="password"
            id = "password"
            placeholder = "Enter password"
            regex="^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).{8,32}$"
            warning="Password must be 8-32 characters, with at least one uppercase letter and one special character."
            /> 
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div>Need an account? <Link to = "/register">Register</Link></div>
      </div>
    )}
