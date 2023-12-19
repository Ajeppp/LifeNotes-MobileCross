import { IonButton, IonCol, IonGrid, IonInput, IonPage, IonRow, IonText, IonToast } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";

// importing style 
import './Register.css';

import { registerUser } from "./firebaseConfig";


const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    //Email validation state
    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();

    //Email validation function
    const validateEmail = (email: string) => {
        return email.match(
            /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        );
    };

    const validate = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        setIsValid(undefined);
        if (value === '') return;
        validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };

    const markTouched = () => {
        setIsTouched(true);
    }

    //Password validation state
    const [isTouchedPass, setIsTouchedPass] = useState(false);
    const [isValidPass, setIsValidPass] = useState<boolean>();

    //Password validation function
    const validatePassword = (password: string) => {
        return password.match(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/);
    };

    const validatePass = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        setIsValidPass(undefined);
        if (value === '') return;
        validatePassword(value) !== null ? setIsValidPass(true) : setIsValidPass(false);
    };

    const markTouchedPass = () => {
        setIsTouchedPass(true);
    }

    //confirm password validation state
    const [isTouchedConfirm, setIsTouchedConfirm] = useState(false);
    const [isValidConfirm, setIsValidConfirm] = useState<boolean>();

    const validateConfirm = (confirmPass: string) => {
        return confirmPass.match(password);
    };

    const validateCon = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        setIsValidConfirm(undefined);
        if (value === '') return;
        validateConfirm(value) !== null ? setIsValidConfirm(true) : setIsValidConfirm(false);
    };

    const markTouchedConfirm = () => {
        setIsTouchedConfirm(true);
    }

    const history = useHistory();

    async function register() {
        if (email.trim() === '' || password.trim() === '') {
            setToastMessage('Email and password are required')
            return
        }
        if (!isValidConfirm) {
            setToastMessage('Passwords do not match')
            return
        }
        const res = await registerUser(email, password)
        if (res) {
            setToastMessage('You have registered successfully!')
        } else {
            setToastMessage('Error registering your account')
        }
    }

    return (
        <IonPage>
            <IonToast isOpen={!!toastMessage} message={toastMessage} duration={2000} onDidDismiss={() => setToastMessage('')} />
            <IonGrid id="Container">
                <IonRow>
                    <IonCol id="titleContainer">
                        <IonText id="regisTitle">Sign Up</IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol id="input">
                        <IonInput id="emailInput"
                            className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                            type="email"
                            label="Email"
                            labelPlacement="floating"
                            placeholder="Email"
                            errorText="Invalid email"
                            onIonInput={(event) => validate(event)}
                            onIonBlur={() => markTouched()}
                            onIonChange={(e: any) => setEmail(e.target.value)}></IonInput>
                        <IonInput
                            className={`${isValidPass && 'ion-valid'} ${isValidPass === false && 'ion-invalid'} ${isTouchedPass && 'ion-touched'}`}
                            label="Password"
                            type="password"
                            labelPlacement="floating"
                            placeholder="Password"
                            errorText="Password must contain at least 6 characters and 1 number"
                            onIonInput={(event) => validatePass(event)}
                            onIonBlur={() => markTouchedPass()}
                            onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>
                        <IonInput
                            className={`${isValidConfirm && 'ion-valid'} ${isValidConfirm === false && 'ion-invalid'} ${isTouchedConfirm && 'ion-touched'}`}
                            label=" Confirm Password"
                            type="password"
                            labelPlacement="floating"
                            placeholder="Confirm Password"
                            errorText="Password does not match"
                            onIonInput={(event) => validateCon(event)}
                            onIonBlur={() => markTouchedConfirm()}
                            onIonChange={(e: any) => setConfirmPass(e.target.value)}></IonInput>


                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonText>Already have an account? <a href="/login">Sign In</a> </IonText>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton id="loginBtn" color="success" onClick={register}>Sign Up</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage >
    );
};

export default Register;