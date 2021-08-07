import React, { useState, useEffect, useContext } from 'react'
import Editor from "./components/Editor"
import Header from "./components/Header"
import io from "socket.io-client";
import { AppContext } from './context/AppContext';

const socket = io.connect("http://localhost:5000");

function App() {
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [javascript, setJavascript] = useState('')
  const [srcDoc, setSrcDoc] = useState('')
  const [sessionId, setSessionId] = useState('');
  const [roomId, setRoomId] = useContext(AppContext);

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
    console.log(srcDoc)
    return () => clearTimeout(timeout)
  }, [html, css, javascript])

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
    </>
  );
}

export default App;
