import React, { useState } from "react";
import DatasContext, { notes } from "./data-context";


interface DataContextProps {
    children: React.ReactNode
}

const DatasContextProvider: React.FC<DataContextProps> = props => {

    const [notes, setNotes] = useState<notes[]>([]);

    const addNote = (path: string, base64Url: string, content: string, createdAt: string) => {
        const newNote: notes = {
            id: Math.random().toString(),
            content,
            createdAt,
            imagePath: path,
            base64Url: base64Url
        }
        setNotes(curNotes => {
            return [...curNotes, newNote]
        });
    };

    const deleteNote = (id: string) => {
        setNotes(curNotes => {
            return curNotes.filter(note => note.id !== id)
        })
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