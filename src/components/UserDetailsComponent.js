import React, { Component } from 'react'

export default function Userdetails (props) {
    let user = props.user;
    return (
      <>
      Email: <br></br>
      {user.Email} <br></br>  
      </>
    )
}
