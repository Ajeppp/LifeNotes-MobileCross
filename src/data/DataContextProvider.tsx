import React, { useCallback, useEffect, useState } from "react";
import DatasContext, { notes } from "./data-context";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage"


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

    useEffect(() => {
        const storableNotes = notes.map(note => {
            return {
                id: note.id,
                content: note.content,
                imagePath: note.imagePath,
                createdAt: note.createdAt
            }
        });
        Storage.set({ key: 'notes', value: JSON.stringify(storableNotes) });
    }, [notes]);

    const initContent = useCallback(async () => {
        const notesData = await Storage.get({ key: 'notes' });
        const storedNotes = notesData.value ? JSON.parse(notesData.value) : [];
        const loadedNotes: notes[] = [];
        for (const storedNote of storedNotes) {
            const file = await Filesystem.readFile({
                path: storedNote.imagePath,
                directory: Directory.Data
            })
            loadedNotes.push({
                id: storedNote.id,
                content: storedNote.content,
                createdAt: storedNote.createdAt,
                imagePath: storedNote.imagePath,
                base64Url: 'data:image/jpeg;base64,' + file.data
            });
        }
        setNotes(loadedNotes);
    }, [])

    return (
        <DatasContext.Provider value={{
            notes: notes,
            addNote: addNote,
            deleteNote: deleteNote,
            initContext: initContent
        }}>
            {props.children}
        </DatasContext.Provider>
    )
}

export default DatasContextProvider;