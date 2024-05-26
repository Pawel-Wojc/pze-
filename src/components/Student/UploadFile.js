import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState, useContext } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { CurrentUserContext } from './../Utils/CurrentUserContext';

export default function UploadFile(props) {

    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);

    const [fileList, setFileList] = useState(null);
    const [alertShow, setAlertShow] = useState(true);
    const [alertText, setAlertText] = useState("");

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };


    const handleUploadClick = async () => {
        if (!fileList) {
            setAlertShow(true);
            setAlertText("Select file first")
            return;
        } else {
            //console.log(fileList)
            files.forEach((file, i) => {
                //console.log(getExtension(file.name))
            });
            //check available extensions then proced to upload. available file extensions from api 

        }

        //  Create new FormData object and append files
        const data = new FormData();
        files.forEach((file, i) => {

            let filename = props.title + currentUser.name + currentUser.surname + file.name + "." + getExtension(file.name);
            data.append(`file`, file, filename);
        });

        let sendFilesConfig = {
            method: 'post',
            url: localStorage.getItem("api_path") + "save/file/to/task/" + props.id,
            maxBodyLength: Infinity,
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
            },
            data: data
        }
        console.log(files)
        await axios.request(sendFilesConfig)
            .then(

                res => {
                    console.log(res)
                }

            ).catch(
                err => {
                    console.log(err)
                }
            )



        // // 👇 Uploading the files using the fetch API to the server
        // fetch('tutaj link', {
        //     method: 'POST',
        //     body: data,
        // })
        //     .then((res) => res.json())
        //     .then((data) => console.log(data))
        //     .catch((err) => console.error(err));
    };
    const files = fileList ? [...fileList] : [];

    return (
        <>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chose file
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Select all the files you want to send</h5>
                    <p>
                        <Form.Control type="file" onChange={handleFileChange} multiple />
                    </p>
                    <ListGroup>
                        {files.map((file, i) => (
                            <ListGroup.Item key={i}>
                                {file.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Alert key="danger" show={alertShow}>
                        {alertText}
                    </Alert>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="success" onClick={handleUploadClick}>Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function getExtension(filename) {
    return filename.split('.').pop()
}