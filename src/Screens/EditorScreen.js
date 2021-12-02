import React, { useState, useEffect, useContext } from 'react'
import Editor from "../components/Editor"
import Header from "../components/Header"
import { AppContext } from '../context/AppContext';
import { useParams } from "react-router-dom"
import axios from "axios"

const EditorScreen = () => {
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [javascript, setJavascript] = useState("")
    const [srcDoc, setSrcDoc] = useState("")
    const [sessionId, setSessionId] = useState("");
    const { roomState: [roomId, setRoomId] } = useContext(AppContext);
    const { socket } = useContext(AppContext);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const { data } = await axios.get(`/project/himanshu76200@gmail.com/${id}`)
                console.log(data)
                setHtml(data?.html)
                setCss(data?.css)
                setJavascript(data?.javascript)
            }
            fetchData();
        }
    }, [id])

    useEffect(() => {
        socket.on('connect', () => {
            const id = socket.id;
            setSessionId(id);
        })
        socket.on('updateCode', ({ launguage, value }) => {
            switch (launguage) {
                case 'xml':
                    setHtml(value);
                    break;
                case 'css':
                    setCss(value);
                    break;
                case 'javascript':
                    setJavascript(value);
                    break;
                default:
                    return
            }
        })
        socket.on('user-left', () => {
            socket.emit("leave-room", roomId)
            setRoomId(null);
        })
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `);
        }, 250)
        // console.log(srcDoc)
        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [html, css, javascript])

    const saveCode = async () => {
        const { data, error } = await axios.put(`/project`, { email: 'himanshu76200@gmail.com', html, css, javascript, title: id })
        console.log(data)
        console.log(error)
    }


    return (
        <>
            <Header id={sessionId} />
            <div className="app">
                <div className="pane top-pane">
                    <Editor
                        socket={socket}
                        launguage="xml"
                        label="HTML"
                        value={html}
                        onChange={setHtml}
                    />
                    <Editor
                        socket={socket}
                        launguage="css"
                        label="CSS"
                        value={css}
                        onChange={setCss}
                    />
                    <Editor
                        socket={socket}
                        launguage="javascript"
                        label="JS"
                        value={javascript}
                        onChange={setJavascript}
                    />
                </div>
                <div className="bottom-pane">
                    <iframe
                        srcDoc={srcDoc}
                        title="output"
                        sandbox="allow-scripts"
                        frameBorder="0"
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>
            </div>
            <button
                onClick={saveCode}
                className="fixed bottom-6 right-6 bg-green-300 rounded-full px-3 py-2"
            >
                Save Work
            </button>
        </>
    )
}

export default EditorScreen
