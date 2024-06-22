import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useQuery } from 'react-query';
import axios from "axios";
import { Toast, ToastContainer } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Loading from '../Utils/Loading';

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
            user.role.includes(formRole)
        );
        setFilteredUsers(filteredItems);
    }, [formName, formSurname, formRole, data])

    //role change
    const changeUserRole = async (userNewRole, userID, userMail) => {
        let config = {
            url: localStorage.getItem("api_path") + "grant/" + userNewRole + "/role",
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
                    settoastText("User role changed succesfully")
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

    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        return <div>Errror, {error.message}</div>
    }
    return (
        <div className="container" style={styles.container}>
            <ToastContainer position='top-end'>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg={toastVariant} autohide>
                    <Toast.Header>{toastText}</Toast.Header>
                </Toast>
            </ToastContainer>

            <h2>Users list</h2>

            <div className="row" style={styles.labelHeader}>
                <div className="col-sm">
                    <FloatingLabel controlId="name" label="Name" className="mb-3">
                        <Form.Control
                            name="name"
                            onChange={(event) => setFormName(event?.target.value)}
                            value={formName}
                            type='text'
                        />
                    </FloatingLabel>
                </div>
                <div className="col-sm">
                    <FloatingLabel controlId="surname" label="Surname" className="mb-3">
                        <Form.Control
                            name="surname"
                            onChange={(event) => setFormSurname(event?.target.value)}
                            value={formSurname}
                            type='text'
                        />
                    </FloatingLabel>
                </div>
                <div className="col-sm">
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
                </div>
            </div>

            <div className="row">
                <div className="col-sm"> <h4>Name</h4></div>
                <div className="col-sm"> <h4>Surname</h4></div>
                <div className="col-sm"> <h4>Email</h4></div>
                <div className="col-sm"> <h4>Role</h4></div>
                <div className="col-sm"> </div>
            </div>
            
                {filteredUsers.map((user) => {
                    var domyslas = user.role
                    return <div className="row border-success" style={styles.entityRow} >
                        
                        <div className="col-sm"> {user.name}</div>
                        <div className="col-sm"> {user.surname}</div>
                        <div className="col-sm"> {user.mail} </div>
                        <div className="col-sm">
                            <Form.Select
                                id={user.role}
                                value={user.role}
                                onChange={(event) => changeUserRole(event?.target.value, user.id, user.mail)}
                            >
                                <option value="admin">Admin</option>
                                <option value="tutor">Teacher</option>
                                <option value="student">Student</option>
                            </Form.Select>
                        </div>

                        <div className="col-sm" style={styles.entityRow.buttonPair}>
                            {user.isAccountBlocked ?
                                <Button variant="success" onClick={() => unblockUser(user.mail)} style={styles.entityRow.buttonPair.button}> Unblock</Button>
                                : <Button variant="warning" onClick={() => blockUser(user.mail)} style={styles.entityRow.buttonPair.button}> Block</Button>}{' '}
                            <Button variant="danger" onClick={() => deleteUser(user.id)} style={styles.entityRow.buttonPair.button}> Delete</Button>

                        </div>




                    </div>

                })}
            



        </div>
    )
}

const styles = {
    container: {
        marginTop: "1%"
    },

    labelHeader: {
        padding: 0
    },

    entityRow: {
        width: "100%",
        marginBottom: "0.5%", 
        alignItems: "center",
        padding: "0.5%",

        buttonPair: {
            width: "100%",
            display: "flex",
            justifyContent: "space-around",

            button: {
                flex: 1,
                marginRight: "1%",
                marginLeft: "1%"
            }
        }
    },

    
}

export default Users