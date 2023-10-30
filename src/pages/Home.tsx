import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { camera, paperPlane, send } from 'ionicons/icons';

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
          <IonRow>
            <IonCol id='photoSection'>
              <IonCard>
                <IonCardContent>No photo selected</IonCardContent>
                <IonButton fill='clear'>
                  <IonIcon icon={camera} slot="start" />
                  Take Photo
                </IonButton>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol id='postingBtn'>
              <IonButton>
                <IonIcon icon={paperPlane} slot="start" />
                Posting
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
