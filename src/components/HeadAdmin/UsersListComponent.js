import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useQuery } from 'react-query';
import axios from "axios";
import { Toast, ToastContainer } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Users = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastText, settoastText] = useState("");
    const [toastVariant, settoastVariant] = useState("success");
    const [filteredUsers, setFilteredUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])

    const getData = async () => {
        let config = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            }
        }
        const { data } = await axios.get(localStorage.getItem("api_path") + "get/all/users", config)
            .then(res => {
                setAllUsers(res.data);
                if (filteredUsers.length == 0) {
                    setFilteredUsers(res.data)
                }

                return res;

            })
            .catch(err => {
                console.error(err);
            })
        return data
    }
    const { refetch, isLoading, isError, error, data } = useQuery("admin_users", getData, { refetchOnWindowFocus: false })

    const blockUser = async (userMail) => {

        let config = {
            url: localStorage.getItem("api_path") + "block/user",
            method: 'POST',
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'text/plain',
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            },
            data: userMail
        }
        await axios.request(config)
            .then(res => {
                if (res.status === 200) {
                    settoastText("User blocked succesfully")
                    settoastVariant("success")
                    setShowToast(true)
                    refetch()
                } else {
                    settoastText("Something went wrong")
                    settoastVariant("danger")
                    setShowToast(true)
                }
                return res;
            })
            .catch(err => {
                settoastText("Something went wrong")
                settoastVariant("danger")
                setShowToast(true)
                console.error(err);
            })
    }

    const unblockUser = async (userMail) => {
        let config = {
            url: localStorage.getItem("api_path") + "unblock/user",
            method: 'POST',
            data: userMail,
            headers: {
                'Content-Type': 'text/plain',
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            }
        }
        await axios.request(config)
            .then(res => {
                if (res.status === 200) {
                    settoastText("User unblocked succesfully")
                    settoastVariant("success")
                    setShowToast(true)
                    refetch()

                } else {
                    settoastText("Something went wrong")
                    settoastVariant("danger")
                    setShowToast(true)
                }
                return res;
            })
            .catch(err => {
                settoastText("Something went wrong")
                settoastVariant("danger")
                setShowToast(true)
                console.error(err);
            })
    }
    const deleteUser = async (userId) => {
        let config = {
            url: localStorage.getItem("api_path") + "delete/user/" + userId,
            method: 'DELETE',
            headers: {
                'Content-Type': 'text/plain',
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            }
        }
        await axios.request(config)
            .then(res => {
                if (res.status === 200) {
                    settoastText("User deleted succesfully")
                    settoastVariant("success")
                    setShowToast(true)
                    refetch()
                } else {
                    settoastText("Something went wrong")
                    settoastVariant("danger")
                    setShowToast(true)
                }
                console.log(res)
                return res;
            })
            .catch(err => {
                settoastText("Something went wrong")
                settoastVariant("danger")
                setShowToast(true)
                console.error(err);
            })
    }

    //searching inputs

    const [formName, setFormName] = useState("");
    const [formSurname, setFormSurname] = useState("");
    const [formRole, setFormRole] = useState("");

    useEffect(() => {
        const filteredItems = allUsers?.filter(user =>
            user.name.toLowerCase().includes(formName.toLowerCase()) &&
            user.surname.toLowerCase().includes(formSurname.toLowerCase()) &&
            user.role.toLowerCase().includes(formRole.toLowerCase())
        );
        setFilteredUsers(filteredItems);
    }, [formName, formSurname, formRole, data])

    if (isLoading) {
        return <div>Loading..</div>
    }
    if (isError) {
        return <div>Errror, {error.message}</div>
    }
    return (
        <div>
            <ToastContainer position='top-end'>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
                    <Toast.Header>{toastText}</Toast.Header>
                </Toast>
            </ToastContainer>
            <h2>Users list</h2>

            <FloatingLabel controlId="name" label="Name" className="mb-3">
                <Form.Control
                    name="name"
                    onChange={(event) => setFormName(event?.target.value)}
                    value={formName}
                    type='text'
                />
            </FloatingLabel>
            <FloatingLabel controlId="surname" label="Surname" className="mb-3">
                <Form.Control
                    name="surname"
                    onChange={(event) => setFormSurname(event?.target.value)}
                    value={formSurname}
                    type='text'
                />
            </FloatingLabel>
            <FloatingLabel controlId="roleselect" label="Select role">
                <Form.Select aria-label=""
                    onChange={(event) => setFormRole(event?.target.value)}
                >
                    <option value="" >Any</option>
                    <option value="student">Student</option>
                    <option value="tutor">Teacher</option>
                    <option value="admin">Admin</option>
                </Form.Select>
            </FloatingLabel>

            <ListGroup>
                {filteredUsers.map((user) => {
                    return <>
                        <ListGroup.Item>Name:  {user.name} Surname: {user.surname} Email: {user.mail}
                            {user.isAccountBlocked ?
                                <Button variant="success" onClick={() => unblockUser(user.mail)}> Unblock</Button>
                                : <Button variant="warning" onClick={() => blockUser(user.mail)}> Block</Button>}{' '}
                            <Button variant="danger" onClick={() => deleteUser(user.id)} > Delete</Button>
                        </ListGroup.Item>
                    </>
                })}
            </ListGroup>
        </div>
    )
}

export default Users