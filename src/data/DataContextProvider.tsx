import React, { useState } from "react";
import DatasContext, { notes } from "./data-context";


interface DataContextProps {
    children: React.ReactNode
}

const DatasContextProvider: React.FC<DataContextProps> = props => {

    const [notes, setNotes] = useState<notes[]>([]);

    const addNote = (note: notes) => {

    }

    const deleteNote = (id: string) => {

    }

    return (
        <DatasContext.Provider value={{
            notes: notes,
            addNote: addNote,
            deleteNote: deleteNote
        }}>
            {props.children}
        </DatasContext.Provider>
    )
}

export default DatasContextProvider;