import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

// importing style 
import './Login.css';

import { loginUser } from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Login: React.FC = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [loginClicked, setLoginClicked] = useState(false);

    // make the email and password input using useRef not useState
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user && loginClicked) {
                try {
                    const res = await loginUser(emailRef.current?.value?.toString() || '', passwordRef.current?.value?.toString() || '');
                    if (!res) {
                        setToastMessage('Error logging in with your credentials');
                    } else {
                        setToastMessage('Welcome to Life Notes!');
                    }
                    passwordRef.current!.value = '';
                    emailRef.current!.value = '';
                } catch (error) {
                    setToastMessage((error as Error).message);
                }
                setLoginClicked(false); // Reset loginClicked after attempting to log in
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [loginClicked]);

    const login = () => {
        setLoginClicked(true);
    };

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
                                ref={emailRef}
                                label="Email"
                                labelPlacement="floating"
                                placeholder="Email"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                ref={passwordRef}
                                label="Password"
                                type="password"
                                labelPlacement="floating"
                                placeholder="Password"></IonInput>
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