import React from 'react'
import Header from "./Header"
import { PencilAltIcon, FolderAddIcon } from "@heroicons/react/solid"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import axios from "axios"
import Form from "react-bootstrap/Form"

const ProjectCard = ({ header, body, footer }) => {
    return (
        <div className="px-2 py-2 rounded-2xl bg-gray-100 shadow-lg">
            <div className="w-full grid grid-cols-1 justify-items-end">
                {header}
            </div>
            <p className="my-2 text-center text-2xl text-gray-500 font-semibold">{body}</p>
            <p className="my-2 text-center text-gray-400 text-base">{footer}</p>
        </div>
    )
}

function VerticallyCenteredModal(props) {
    const handleChange = (event) => {
        props.setTitle(event.target.value);
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Enter project title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title: </Form.Label>
                            <Form.Control type="text" onChange={handleChange} value={props.title} placeholder="Title Input" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.onSubmit()}>Add Project</Button>
            </Modal.Footer>
        </Modal>
    );
}


const ProjectScreen = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = React.useState()
    const [invalidateData, setInvalidateData] = React.useState(true);
    const [title, setTitle] = React.useState("");

    const fetchData = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data, error } = await axios.get(`/projects/himanshu76200@gmail.com`, config);
        setData(data);
        console.log(data, error, "Data error");
    }

    React.useEffect(() => {
        if (invalidateData) {
            fetchData();
            setInvalidateData(false)
        }
    }, [invalidateData])

    const handleAddProject = async () => {
        console.log("added")
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/project`, { email: 'himanshu76200@gmail.com', title: title }, config);
        if (data) {
            setInvalidateData(true);
        }
        setModalShow(false);
    }

    return (
        <>
            <Header />
            <div className="mx-8 my-8 grid grid-cols-4 gap-12">
                <div
                    onClick={() => setModalShow(true)}
                    className="px-2 py-2 rounded-2xl bg-gray-100 shadow-lg flex flex-col items-center justify-center cursor-pointer h-32"
                >
                    <FolderAddIcon className="h-8 text-gray-500 hover:text-blue-300" />
                    <p className="text-base mt-2 text-center text-gray-500">Add Project</p>
                </div>
                {
                    data?.map(singleData => (
                        <ProjectCard
                            header={<PencilAltIcon className="h-6 text-gray-500 hover:text-blue-300" />}
                            body={singleData.title}
                            footer={singleData.createdAt}
                        />
                    ))
                }

            </div>
            <VerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSubmit={() => handleAddProject()}
                title={title}
                setTitle={setTitle}
            />
        </>
    )
}

export default ProjectScreen
