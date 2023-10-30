import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react"
import { camera } from "ionicons/icons";


// Import style css
import './Calendar.css';


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
                            <IonCard id="notesToday">
                                <IonCardHeader>
                                    <IonCardSubtitle>30 October 2023</IonCardSubtitle>
                                </IonCardHeader>
                                <IonImg id="imageCard" src="https://cdn.discordapp.com/attachments/951687755161800764/1126891866336538624/Seo_In_Ah.jpg?ex=654e46d5&is=653bd1d5&hm=20442e1d7e7dd662f9e4c3e9a17105ee1fa3e04201cb68abfc867af6086f4d55&" />
                                <IonCardContent>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius convallis nulla in volutpat. Nullam sollicitudin vitae est non tristique. Phasellus suscipit mollis nisl, eget pulvinar ante blandit
                                    sed. Quisque ut venenatis turpis. Ut ligula lorem, suscipit vel ultrices at, vehicula vel mauris. Phasellus laoreet, nulla eu pellentesque laoreet, neque augue viverra lorem, tincidunt pretium lectus risus eu sapien.
                                    Morbi rutrum viverra ipsum, sit amet lobortis elit fermentum vitae. Quisque pellentesque ultrices augue et posuere. Pellentesque scelerisque dolor turpis, non sollicitudin orci lacinia sit amet. Aliquam diam purus,
                                    accumsan vitae iaculis sit amet, pharetra a tellus. Nunc placerat arcu sed porta vulputate. Fusce auctor turpis neque, varius aliquet augue vulputate in. Quisque rhoncus sapien magna, vitae finibus augue egestas quis.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Calendar;