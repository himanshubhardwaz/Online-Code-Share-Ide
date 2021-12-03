import { useState, useContext, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import JoinRoomModal from "./JoinRoomModal";
import { AppContext } from "../context/AppContext";
import WarningModal from './WarningModal';
import { FiMicOff, FiMic } from "react-icons/fi"
import { QuestionMarkCircleIcon, AcademicCapIcon } from "@heroicons/react/outline"
import Modal from "react-bootstrap/Modal"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"

const Header = ({ id, mic, isMuted, setIsMuted, isInterviewer }) => {
    const [showModal, setShowModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false)
    const [showQuestionModal, setShowQuestionModal] = useState(false)
    const [showMarkingModal, setShowMarkingModal] = useState(false)
    const [question, setQuestion] = useState("");
    const [addedQuestion, setAddedQuestion] = useState("")
    const { roomState: [roomId], socket } = useContext(AppContext);
    const [isNormalEditorScreen, setIsNormalEditorScreen] = useState(false);
    const location = useLocation();
    const { id: invitedEmail } = useParams();
    const [marks, setMarks] = useState({
        name: 'Himanshu Bhardwaz',
        role: 'frontend-intern',
        interviewee: 'himanshu76200@gmail.com',
        email: invitedEmail,
        result: '',
        score: '28',
        strengths: [],
        weaknesses: []
    })

    useEffect(() => {
        // console.log("pathname", location.pathname);
        if (location.pathname === "/editor") {
            setIsNormalEditorScreen(true)
        }
    }, [location])

    const handleClick = () => {
        setShowModal(true);
    }

    const handleExit = () => {
        setShowWarningModal(true)
    }

    const handleCloseQuestionModal = () => {
        setShowQuestionModal(false);
    }

    const handleCloseMarkingModal = () => {
        setShowMarkingModal(false);
    }

    const addQuestion = () => {
        socket.emit('add-question', { question }, roomId)
        setShowQuestionModal(false);
    }

    const handleSubmitMarks = async () => {
        console.log("marks >>>>>>> ", marks)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post("/interview", {
            name: marks.name,
            role: marks.role,
            interviewee: marks.interviewee,
            email: marks.email,
            result: marks.result,
            score: marks.score,
            strengths: marks.strengths,
            weaknesses: marks.weaknesses
        }, config);
        console.log(data);
    }

    useEffect(() => {
        if (!isInterviewer && !isNormalEditorScreen) {
            socket.on('add-question', ({ question: addedQuestion }) => {
                setAddedQuestion(addedQuestion)
            })
        }
    }, [isInterviewer, isNormalEditorScreen, socket])

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
                                        <AcademicCapIcon
                                            className="h-10 text-white hover:text-yellow-700 cursor-pointer"
                                            onClick={() => setShowMarkingModal(true)}
                                        />
                                    </div> : null
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
                                !isInterviewer && !isNormalEditorScreen ?
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
                        !isNormalEditorScreen && !isInterviewer ?
                            <>
                                {
                                    addedQuestion ? <>
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
                                        </Modal.Header>
                                }
                            </> : null
                    }
                </Modal >

                {
                    isInterviewer ?
                        <>
                            <Modal
                                show={showMarkingModal}
                                onHide={handleCloseMarkingModal}
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Mark Candidate on the basis of their performance
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <input
                                        className="w-full py-2 px-3" placeholder="Marks out of 30"
                                        value={marks.score}
                                        onChange={e => setMarks(prevMarks => ({ ...prevMarks, score: e.target.value }))}
                                    />
                                    <input
                                        className="mt-2 w-full py-2 px-3" placeholder="Strengths of candidate"
                                        onChange={e => setMarks(prevMarks => ({ ...prevMarks, strengths: [...(e.target.value).split(',')] }))}
                                        value={marks.strengths.toString()}
                                    />

                                    <input
                                        className="mt-2 w-full py-2 px-3" placeholder="Weakness of candidate"
                                        onChange={e => setMarks(prevMarks => ({ ...prevMarks, weaknesses: [...(e.target.value).split(',')] }))}
                                        value={marks.weaknesses.toString()}
                                    />

                                    <select className="mt-2 w-full py-2 px-3" value={marks.result} onChange={e => setMarks(prevMarks => ({ ...prevMarks, result: e.target.value }))}>
                                        <option value="">Choose whether the candidate is selected</option>
                                        <option value="selected">Select</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleSubmitMarks}>
                                        Submit Results
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </> : null
                }
            </>
        </>
    )
}

export default Header
