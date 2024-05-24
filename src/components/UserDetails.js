import React from 'react'

export default function Userdetails (props) {
    let user = props.user;
    return (
      <>
      Email: <br></br>
      {user.mail }<br></br>  
      </>
    )
}
