import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Userdetails from './UserDetails';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from './Utils/CurrentUserContext';

export default function Header(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    const logOut = () => {
        setCurrentUser(null)
        sessionStorage.removeItem("user_jwt");
    };
    return (
        currentUser ?
            <>
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand >PZE++</Navbar.Brand>
                        <Nav variant="underline" className="me-auto">
                            {(currentUser.role === "student") ?
                                <>
                                    <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                                    <Nav.Link as={Link} to="/usercourses">My courses</Nav.Link>
                                </> : <></>}

                            {(currentUser.role === "tutor") ?
                                <>
                                    <Nav.Link as={Link} to="/teacher/courseslist">Courses</Nav.Link>
                                </> : <></>}

                            {(currentUser.role === "admin") ?
                                <>
                                    
                                </> : <></>}

                            <Button variant="primary" onClick={handleShow}>
                                {currentUser.name + " " + currentUser.surname}
                            </Button>
                            <Nav.Link as={Link} to="/login" onClick={logOut} >Logout</Nav.Link>
                            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>{currentUser.name + " " + currentUser.surname}</Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Userdetails user={currentUser}></Userdetails>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Nav>
                    </Container>
                </Navbar>
            </> : <></>
    );
}
