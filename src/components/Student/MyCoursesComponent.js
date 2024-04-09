import React, { Component, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function MyCourses (props) {
  //const navigate = useNavigate()
  const isMounted = useRef(false)
  const navigate = useNavigate()
    let user = props.user
    if (!isMounted.current){
      if (!user){
        navigate("/login")
      }
    }


    useEffect(() => {
      
      isMounted.current = true
    });


    // if (user){
    //   return (
    //     <div>mycourses</div>
    //   )
    // }
    // return (<>
    // {navigate("/login")}
    // </>)

    return (<>
       Mycoursess
      </>)

}
