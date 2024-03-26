import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useRef, useState, useEffect} from "react";
import Input from './InputComponent'
import { Link } from 'react-router-dom';
const NAME_REGEX = /^[A-z]{2,10}$/;
const SURNAME_REGEX = /^[A-z]{2,10}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register () {

  const handleSumbit = async (e) => {
    console.log(e)

  }

    return (
      <div class="position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel>Name</FloatingLabel>
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Input
            label = "Surname"
            type ="text"
            id = "surname"
            placeholder = "Enter surname"
            regex="^[a-zA-z]+$.{3,10}"
            /> 
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Input
            label = "Email"
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
            regex="^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).{8,32}$"
            warning="Password must be 8-32 characters, with at least one uppercase letter and one special character."
            /> 
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
            label = "Confirm Password"
            type ="password"
            id = "passwordconfirm"
            placeholder = "Enter password"
            /> </Form.Group>
          
          <Button variant="primary" type="submit">
            Register
          </Button>

        </Form>
        <div>Already register? <Link to = "/login">Login</Link></div>
      </div>
    )}

