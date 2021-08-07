import React, { useContext, useState } from 'react'
import Modal from "react-bootstrap/Modal"
import { Button, Form } from "react-bootstrap"
import { AppContext } from "../context/AppContext"

const JoinRoomModal = (props) => {
    const [roomId, setRoomId] = useContext(AppContext)
    const [id, setId] = useState("");

    const handleChange = (e) => {
        setId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setRoomId(id)
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter Room Id provided by the collaborator/ Interviewer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Room Id</Form.Label>
                            <Form.Control type="text" placeholder="Room Id" onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={props.onHide}>
                            Enter Room
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default JoinRoomModal;
