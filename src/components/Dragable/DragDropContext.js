import React from 'react';

export const DragDropContext = React.createContext();

const DragDropContextProvider = ({
    children,
    onDragStart,
    onDragEnd
}) => {

    return (
        <DragDropContext.Provider value={{
            onDragStart,
            onDragEnd
        }}>
            {children}
        </DragDropContext.Provider>
    )
};

export default DragDropContextProvider;