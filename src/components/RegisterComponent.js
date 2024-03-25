import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useRef, useState, useEffect} from "react";
import Input from './InputComponent'
const NAME_REGEX = /^[A-z]{2,10}$/;
const SURNAME_REGEX = /^[A-z]{2,10}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register () {

    return (
      <div class="position-absolute top-50 start-50 translate-middle">
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel>Name</FloatingLabel>
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Input
            label = "Surname"
            type ="text"
            id = "surname"
            placeholder = "Enter surname"
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
            /> 
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
            label = "Confirm Password"
            type ="password"
            id = "password"
            placeholder = "Enter password"
            /> </Form.Group>
          
          <Button variant="primary" type="submit">
            Register
          </Button>

        </Form>
        <div>Already register? Login</div>
      </div>
    )}

