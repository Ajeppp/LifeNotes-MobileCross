import React from "react";

export interface notes {
    id: string;
    createdAt: Date;
    content: string;
    photo: string;
}


interface DatasContext {
    notes: notes[];
    addNote: (note: notes) => void;
    deleteNote: (id: string) => void;
}

const DatasContext = React.createContext<DatasContext>({
    notes: [],
    addNote: () => {},
    deleteNote: () => {},
});

export default DatasContext;