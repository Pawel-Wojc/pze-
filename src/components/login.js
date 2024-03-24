import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default class login extends Component {
  render() {
    return (
      <div class="position-absolute top-50 start-50 translate-middle">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel>Email address</FloatingLabel>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <FloatingLabel>Password</FloatingLabel>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
      </div>
    )
  }
}
