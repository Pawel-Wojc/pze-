import React, { Component } from 'react'
import Pagination from 'react-bootstrap/Pagination';

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

export default function Courses () {
    return (
      <div>
        courses
        
        <Pagination>{items}</Pagination></div>
    )
}
