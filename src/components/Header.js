import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Userdetails from './UserDetails';
import {Link} from 'react-router-dom';
import AuthService from './Services/AuthService';

export default function Header(props) {
    var user = JSON.parse(sessionStorage.getItem('user'))
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOut = () => {
        AuthService.logout();
      };
      
    return (
        user?
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand >PZE++</Navbar.Brand>
                    <Nav variant="underline" className="me-auto">
                        {(user.role == "student") ? 
                        <>
                            <Nav.Link as = {Link} to="/courses">Courses</Nav.Link>
                            <Nav.Link as = {Link} to="/usercourses">My courses</Nav.Link>
                        </> : <></> }
                        {(user.role == "tutor") ? 
                        <>
                            <Nav.Link as = {Link} to="/teacher/courseslist">Courses</Nav.Link>
                        </> : <></> }
                        {(user.role == "admin") ? 
                        <>
                            <Nav.Link as = {Link} to="/teacher/courseslist">Courses</Nav.Link>
                        </> : <></> }
                        
                        <Button variant="primary" onClick={handleShow}>
                            {user.name +" " + user.surname}
                        </Button>
                        <Nav.Link as = {Link} to="/login" onClick={logOut} >Logout</Nav.Link>
                        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>{user.name +" " + user.surname}</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Userdetails user={user}></Userdetails>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar>
        </>:<></>
    );
}
