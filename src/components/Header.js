import React, { useState, useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import JoinRoomModal from "./JoinRoomModal";
import { AppContext } from "../context/AppContext";
import WarningModal from './WarningModal';
import { FiMicOff, FiMic } from "react-icons/fi"

const Header = ({ id, mic, isMuted, setIsMuted }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false)
    const { roomState: [roomId] } = useContext(AppContext);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleExit = () => {
        setShowWarningModal(true)
    }

    return (
        <>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container className="navbar-brand-container">
                        <Navbar.Brand href="">
                            <div className="brand-container">
                                <img className="logo" src="coding.png" alt="" />
                                <h3>Code Online</h3>
                            </div>
                        </Navbar.Brand>
                        <Nav>
                            <Navbar.Text>
                                {id ? <h5>{`Your Session Id is : ${id}`}</h5> : null}
                            </Navbar.Text>
                            {
                                roomId ?
                                    <Button variant="outline-danger"
                                        onClick={handleExit}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Exit Room
                                    </Button>
                                    :
                                    <Button variant="outline-primary"
                                        onClick={handleClick}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Join Room
                                    </Button>
                            }
                            {mic ? <>
                                {
                                    isMuted ?
                                        <FiMicOff
                                            size="42"
                                            className="ml-8 rounded-full bg-red-500 text-white p-2.5 cursor-pointer"
                                            onClick={() => setIsMuted(false)}
                                        /> :
                                        <FiMic
                                            size="42"
                                            className="ml-8 rounded-full bg-blue-500 text-white p-2.5  cursor-pointer"
                                            onClick={() => setIsMuted(true)}
                                        />
                                }
                            </> : null}
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <JoinRoomModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
            <WarningModal
                show={showWarningModal}
                handleClose={() => setShowWarningModal(false)}
            />
        </>
    )
}

export default Header
