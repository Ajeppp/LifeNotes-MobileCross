import { IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"



const Calendar: React.FC = () => {
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
                        <IonCol>
                            <IonDatetime presentation="date"></IonDatetime>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonLabel>Pokémon Yellow</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Mega Man X</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>The Legend of Zelda</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Pac-Man</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>Super Mario World</IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Calendar;