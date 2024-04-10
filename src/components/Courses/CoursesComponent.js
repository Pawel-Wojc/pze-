import React, { useRef, useEffect} from 'react'
import Pagination from 'react-bootstrap/Pagination';
import { Link, useNavigate } from 'react-router-dom';

// let active = 2;
// let items = [];
// for (let number = 1; number <= 5; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>
//       {number}
//     </Pagination.Item>,
//   );
// }


export default function Courses (props) {
  const navigate = useNavigate()
  let user = props.user
    
  useEffect(() => {
  },[]);

  return (
    <div>
        courses
  <Pagination>{1}</Pagination></div>
  )
   
}
