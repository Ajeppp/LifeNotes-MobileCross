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
                    <IonTitle>Calendar</IonTitle>
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
                                    <IonImg id="imageCard" src="https://cdn.discordapp.com/attachments/951687755161800764/1126891866336538624/Seo_In_Ah.jpg?ex=654e46d5&is=653bd1d5&hm=20442e1d7e7dd662f9e4c3e9a17105ee1fa3e04201cb68abfc867af6086f4d55&" />
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