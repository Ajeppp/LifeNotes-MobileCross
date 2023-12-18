import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";

// importing style 
import './Login.css';

import { loginUser } from "./firebaseConfig";


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

    async function login() {
        try {
            const res = await loginUser(email, password);
            if (!res) {
                setToastMessage('Error logging in with your credentials');
            } else {
                setToastMessage('Welcome to Life Notes!');
            }
        } catch (error) {
            setToastMessage((error as Error).message);
        }
    }

    return (
        <IonPage>
            <IonToast isOpen={!!toastMessage} message={toastMessage} duration={2000} onDidDismiss={() => setToastMessage('')} />
            <IonGrid id="Container">
                <IonRow>
                    <IonCol id="titleContainer">
                        <IonText id="loginTitle">Sign In</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol id="input">
                        <IonItem>
                            <IonInput
                                label="Email"
                                labelPlacement="floating"
                                placeholder="Email"
                                onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Password"
                                type="password"
                                labelPlacement="floating"
                                placeholder="Password"
                                onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonText>Don't have an account? <a href="/register">Sign Up</a> </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton id="loginBtn" color="success" onClick={login}>Sign In</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
};

export default Login;