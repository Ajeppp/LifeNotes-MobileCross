import React from "react";

export interface notes {
    id: string;
    createdAt: string;
    content: string;
    imagePath: string;
    base64Url: string;
}

interface DatasContext {
    notes: notes[];
    addNote: (path: string, base64Url: string, content: string, createdAt: string) => void;
    deleteNote: (id: string) => void;
    initContext: () => void;
}

const DatasContext = React.createContext<DatasContext>({
    notes: [],
    addNote: () => {},
    deleteNote: () => {},
    initContext: () => {}
});

export default DatasContext;