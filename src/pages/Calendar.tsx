import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { camera } from "ionicons/icons";


// Import style css
import './Calendar.css';
import { useContext } from "react";
import DatasContext from "../data/data-context";


const Calendar: React.FC = () => {
    const notesCtx = useContext(DatasContext);
    const notes = notesCtx.notes;
    return (
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
                            <IonDatetime presentation="date"></IonDatetime>
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
    )
}

export default Calendar;