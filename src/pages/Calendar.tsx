import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from "@ionic/react"
import { calendar, camera, home } from "ionicons/icons";


// Import style css
import './Calendar.css';
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import DatasContext from "../data/data-context";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getDocs, getFirestore, onSnapshot } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyABgQw6IggVJbEZP4elv685Xm8JjS5fQ-o",
    authDomain: "life-notes-uas.firebaseapp.com",
    projectId: "life-notes-uas",
    storageBucket: "life-notes-uas.appspot.com",
    messagingSenderId: "398144432472",
    appId: "1:398144432472:web:4545c63e79ab36e96f5d2d",
    measurementId: "G-1CHSYWBDBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

type Note = {
    id: string;
    content: string;
    base64Url: string;
    createdAt: string;
}


const Calendar: React.FC = () => {
    const today = new Date().toLocaleDateString('en-CA');

    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [notes, setNotes] = useState<Note[]>([]);
    const db = getFirestore();
    const [dbUpdated, setDbUpdated] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'notes'), () => {
            setDbUpdated(prevState => !prevState);
        });

        return () => unsubscribe();
    }, [db]);

    useEffect(() => {
        const fetchNotes = async () => {
            const notesCollection = collection(db, 'notes');
            const notesSnapshot = await getDocs(notesCollection);
            const notesData: Note[] = [];
            notesSnapshot.forEach((noteDoc) => {
                const noteData = noteDoc.data();
                notesData.push({
                    id: noteDoc.id,
                    content: noteData.content,
                    base64Url: noteData.base64Url,
                    createdAt: noteData.createdAt
                });
            });
            setNotes(notesData.filter((note) => note.createdAt === selectedDate));
        }
        fetchNotes();
    }, [dbUpdated, selectedDate]);

    return (
        <IonTabs>
            <IonRouterOutlet id='main'>
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Life Notes</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol id="calenderSection">
                                    <IonDatetime presentation="date" onIonChange={e => {
                                        if (typeof e.detail.value === 'string') {
                                            setSelectedDate(new Date(e.detail.value).toLocaleDateString('en-CA'));
                                        } else {
                                            setSelectedDate('');
                                        }
                                    }} />
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    {notes.length === 0 && (
                                        <IonCard>
                                            <IonCardContent>
                                                <IonCardTitle>
                                                    No Notes Found
                                                </IonCardTitle>
                                            </IonCardContent>
                                        </IonCard>
                                    )}
                                    {notes.map((note) => (
                                        <IonCard id="notesToday">
                                            <IonCardHeader>
                                                <IonCardSubtitle>{note.createdAt}</IonCardSubtitle>
                                            </IonCardHeader>
                                            <img src={note.base64Url} alt="image" />
                                            <IonCardContent>
                                                {note.content}
                                            </IonCardContent>
                                        </IonCard>
                                    ))}
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
                <IonTabButton tab="posting" href="/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab='calendar' href='/calendar'>
                    <IonIcon icon={calendar} />
                    <IonLabel>Calendar</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default Calendar;