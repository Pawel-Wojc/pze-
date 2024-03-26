import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Userdetails from './UserDetailsComponent';
import {Link} from 'react-router-dom';

export default function Header() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand >PZE++</Navbar.Brand>
                    <Nav variant="underline" className="me-auto">
                        <Nav.Link as = {Link} to="/courses">Courses</Nav.Link>
                        <Nav.Link as = {Link} to="/mycourses">My courses</Nav.Link>
                        <Button variant="primary" onClick={handleShow}>
                            Jan Kowalski
                        </Button>
                        <Nav.Link as = {Link} to="/mycourses">Logout</Nav.Link>
                        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Jan Kowalski</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Userdetails></Userdetails>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
