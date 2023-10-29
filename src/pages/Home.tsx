import { IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Life Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol id="sectionTitle">
              <IonText>Have you track your life today?</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol id="inputField">
              <IonTextarea
                id='inputText'
                autoGrow={true}
                label="How was your day?"
                labelPlacement="floating"
                placeholder="Write something..."
                counter={true}
                maxlength={1000}
                counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
              ></IonTextarea>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
