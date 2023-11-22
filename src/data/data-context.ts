import React from "react";

export interface notes {
    id: string;
    createdAt: Date;
    content: string;
    imagePath: string;
    base64Url: string;
}

interface DatasContext {
    notes: notes[];
    addNote: (path: string, base64Url: string, content: string, createdAt: Date) => void;
    deleteNote: (id: string) => void;
}

const DatasContext = React.createContext<DatasContext>({
    notes: [],
    addNote: () => {},
    deleteNote: () => {},
});

export default DatasContext;