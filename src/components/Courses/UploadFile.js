import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';


export default function UploadFile(props) {

    const [fileList, setFileList] = useState(null);
    const [alertShow, setAlertShow] = useState(true);
    const [alertText, setAlertText] = useState("");

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };

    
    const handleUploadClick = () => {
        if (!fileList) {
            setAlertShow(true);
            setAlertText("Select file first")
            return;
        } else {
            console.log(fileList)
            files.forEach((file, i) => {
                console.log(getExtension(file.name))
            });
            //check available extensions then proced to upload. available file extensions from api 
            return;
        }

        // 👇 Create new FormData object and append files
        const data = new FormData();
        files.forEach((file, i) => {
            data.append(`file-${i}`, file, file.name);
        });

        // 👇 Uploading the files using the fetch API to the server
        fetch('tutaj link', {
            method: 'POST',
            body: data,
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
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
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
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