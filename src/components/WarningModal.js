import React, { useContext } from 'react'
import { AppContext } from "../context/AppContext";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { useHistory } from 'react-router-dom';

const WarningModal = ({ show, handleClose }) => {
    const { roomState: [roomId, setRoomId], socket } = useContext(AppContext);
    const history = useHistory();

    const handleExit = () => {
        socket.emit("leave-room", roomId)
        setRoomId(null);
        handleClose();
        history.push("/editor")
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Exiting Room?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure, you want to leave the Room?</h4>
                    <h5>If you click yes the room will close automatically.</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Window
                    </Button>
                    <Button variant="danger" onClick={handleExit}>
                        Exit Room
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default WarningModal
