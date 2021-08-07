import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [roomId, setRoomId] = useState();
    return (
        <AppContext.Provider value={[roomId, setRoomId]}>
            {props.children}
        </AppContext.Provider>
    )
}