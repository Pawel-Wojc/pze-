import React, { Component, onSubmit } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Input from './InputComponent'

export default function Login ()  {
    return (
      <div class="position-absolute top-50 start-50 translate-middle">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">           
            <Input
            label = "Email address"
            type ="email"
            id = "email"
            placeholder = "Enter email"
            />          
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
            label = "Password"
            type ="password"
            id = "password"
            placeholder = "Enter password"
            regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            /> 
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Login
          </Button>

        </Form>
        
      </div>
    )}
