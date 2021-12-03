import { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import JoinRoomModal from "./JoinRoomModal";
import { AppContext } from "../context/AppContext";
import WarningModal from './WarningModal';
import { FiMicOff, FiMic } from "react-icons/fi"
import { QuestionMarkCircleIcon } from "@heroicons/react/outline"
import Modal from "react-bootstrap/Modal"

const Header = ({ id, mic, isMuted, setIsMuted, isInterviewer }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false)
    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [question, setQuestion] = useState("");
    const [addedQuestion, setAddedQuestion] = useState("")
    const { roomState: [roomId], socket } = useContext(AppContext);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleExit = () => {
        setShowWarningModal(true)
    }

    const handleCloseQuestionModal = () => {
        setShowQuestionModal(false);
    }

    const addQuestion = () => {
        socket.emit('add-question', { question }, roomId)
        setShowQuestionModal(false);
    }

    useEffect(() => {
        if (!isInterviewer) {
            socket.on('add-question', ({ question: addedQuestion }) => {
                setAddedQuestion(addedQuestion)
            })
        }
    }, [isInterviewer, socket])

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
                            {
                                isInterviewer ?
                                    <div className="flex items-center justify-center ml-8">
                                        <QuestionMarkCircleIcon
                                            className="h-10 text-white hover:text-yellow-700 cursor-pointer"
                                            onClick={() => setShowQuestionModal(true)}
                                        />
                                    </div> : null
                            }
                            {
                                !isInterviewer ?
                                    <div className="flex items-center justify-center ml-8">
                                        <QuestionMarkCircleIcon
                                            className="h-10 text-white hover:text-yellow-700 cursor-pointer"
                                            onClick={() => setShowQuestionModal(true)}
                                        />
                                    </div> : null
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
            <>
                <Modal show={showQuestionModal} onHide={handleCloseQuestionModal}>
                    {isInterviewer ?
                        <>
                            <Modal.Header>
                                <Modal.Title>Enter Question for the candidate</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <textarea
                                    className="form-textarea w-full"
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseQuestionModal}>
                                    Close Window
                                </Button>
                                <Button variant="danger" onClick={addQuestion}>
                                    Add Question
                                </Button>
                            </Modal.Footer>
                        </> :
                        <>
                            {addedQuestion ? <>
                                <Modal.Header>
                                    <Modal.Title>Please solve the question below</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className="text-lg">{addedQuestion}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseQuestionModal}>
                                        Close Window
                                    </Button>
                                </Modal.Footer>
                            </> :
                                <Modal.Header>
                                    <Modal.Title>No Question added yet</Modal.Title>
                                </Modal.Header>}
                        </>
                    }

                </Modal>
            </>
        </>
    )
}

export default Header
