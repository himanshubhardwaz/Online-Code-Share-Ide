import React, { useState, createContext } from 'react';
import io from "socket.io-client";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [roomId, setRoomId] = useState(null);
    const socket = io.connect("http://localhost:8000");
    return (
        <AppContext.Provider value={{ roomState: [roomId, setRoomId], socket: socket }}>
            {props.children}
        </AppContext.Provider>
    )
}