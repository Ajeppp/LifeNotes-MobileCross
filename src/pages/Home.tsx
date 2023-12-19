import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import './Home.css';
import { calendar, camera, home, logOut, paperPlane, send } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useContext, useEffect, useRef, useState } from 'react';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { base64FromPath } from '@ionic/react-hooks/filesystem';
import DatasContext from '../data/data-context';
import { useHistory } from 'react-router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import TabBar from './TabBar';
import { getAuth, signOut } from '@firebase/auth';


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


const Home: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string>();
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const notesCtx = useContext(DatasContext);
  const history = useHistory();

  const db = getFirestore();

  const date = new Date().toLocaleDateString('en-CA');

  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  const contentRef = useRef<HTMLIonTextareaElement>(null);

  const takePhotoHandle = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 80,
        width: 500
      });

      if (!photo || !photo.webPath) {
        return;
      }

      const photoName = uuidv4();

      setTakenPhoto({
        path: photoName,
        preview: photo.webPath
      });

      const storageRef = ref(storage, `images/${photoName}`);
      const blob = await fetch(photo.webPath).then(r => r.blob());
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setPhotoUrl(url);
    } catch (error) {
      console.log('error', error);
    }
  };

  const addNotesHandler = async () => {
    if (!contentRef.current?.value || !takenPhoto) {
      setToastMessage('Please enter a valid text and photo!');
      return;
    }

    const enteredText = contentRef.current?.value;
    if (!enteredText || enteredText.toString().trim().length === 0 || !takenPhoto) {
      return;
    }

    const fileName = new Date().getTime() + '.jpeg';
    const base64 = await base64FromPath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Data
    });
    notesCtx.addNote(fileName, base64, enteredText.toString(), date);
    history.length > 0 ? history.goBack() : history.replace("/home");
  }

  useEffect(() => {
    if (photoUrl) {
      addData(photoUrl);
      console.log('photoUrl: ', photoUrl);
    }
  }, [photoUrl]);

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        content: contentRef.current?.value,
        createdAt: date,
        base64Url: url
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    contentRef.current!.value = '';
    setTakenPhoto(undefined);
    history.push('/calendar');
  }

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <IonPage>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setToastMessage('')}
      />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon icon={logOut} slot="start" />
            </IonButton>
          </IonButtons>
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
      <TabBar />
    </IonPage>
  );
};

export default Home;
