import React, { useState, useEffect, useContext } from 'react'
import Editor from "../components/Editor"
import Header from "../components/Header"
import { AppContext } from '../context/AppContext';
import { useParams, useLocation } from "react-router-dom"
import useMicrophone from "../hooks/useMicrophone";

const InterviewRoom = () => {
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [javascript, setJavascript] = useState("")
    const [srcDoc, setSrcDoc] = useState("")
    const [sessionId, setSessionId] = useState("");
    const { id } = useParams();
    const { roomState: [roomId, setRoomId] } = useContext(AppContext);
    const { socket } = useContext(AppContext);
    const [isMuted, setIsMuted] = useState(true);
    const location = useLocation();
    const isInterviewer = location.state?.isInterviewer;

    console.log("is Interviewer", isInterviewer)

    const { allowPermission, havePermission, revokePermission } = useMicrophone();

    useEffect(() => {
        if (isMuted) {
            if (havePermission) {
                revokePermission();
            }
        } else {
            if (!havePermission) {
                allowPermission();
            }
        }
    }, [isMuted])

    useEffect(() => {
        if (id) {
            socket.emit("join-room", id);
            setRoomId(id)
        }
    }, [id, setRoomId, socket])

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


    return (
        <>
            <Header mic={roomId ? true : false} isMuted={isMuted} setIsMuted={setIsMuted} />
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
        </>
    )
}

export default InterviewRoom
