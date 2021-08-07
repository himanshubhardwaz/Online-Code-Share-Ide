import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal"
import { Button, Form } from "react-bootstrap"

const JoinRoomModal = (props) => {
    const [joinId, setJoinId] = useState('')

    const handleChange = (e) => {
        setJoinId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("join id >>>>> ", joinId)
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default JoinRoomModal;
