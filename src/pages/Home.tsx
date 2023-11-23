import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { camera, paperPlane, send } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import DatasContext from '../data/data-context';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const notesCtx = useContext(DatasContext);
  const history = useHistory();

  const today = new Date();

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string;
    preview: string;
  }>();

  const contentRef = useRef<HTMLIonTextareaElement>(null);

  const takePhotoHandle = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500
    });
    console.log(photo.path)

    if (!photo || !photo.path || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath
    });
  };

  const addNotesHandler = async () => {
    console.log('addNotesHandler');
    const enteredText = contentRef.current?.value;
    if (!enteredText || enteredText.toString().trim().length === 0 || !takenPhoto) {
      return;
    }
    console.log(enteredText.toString());
    const fileName = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data
    });
    notesCtx.addNote(fileName, base64, enteredText.toString(), today.toISOString());
    history.length > 0 ? history.goBack() : history.replace('/calender');
  }

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
                ref={contentRef}
              ></IonTextarea>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol id='photoSection'>
              <IonCard id='photoCard'>
                {!takenPhoto && <IonCardContent>No photo selected</IonCardContent>}
                {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
                <IonButton fill='clear' onClick={takePhotoHandle}>
                  <IonIcon icon={camera} slot="start" />
                  Take Photo
                </IonButton>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol id='postingBtn'>
              <IonButton onClick={addNotesHandler}>
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
