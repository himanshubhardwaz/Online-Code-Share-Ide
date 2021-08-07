import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import JoinRoomModal from "./JoinRoomModal";

const Header = ({ id }) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
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
                                <h5>{`Your Session Id is : ${id}`}</h5>
                            </Navbar.Text>
                            <Button variant="outline-primary"
                                onClick={handleClick}
                                style={{ marginLeft: '10px' }}
                            >
                                Join Room
                            </Button>
                        </Nav>
                    </Container>
                </Navbar>
            </header>
            <JoinRoomModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
        </>
    )
}

export default Header
