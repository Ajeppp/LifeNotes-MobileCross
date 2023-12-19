import { IonSpinner, IonContent, IonPage } from '@ionic/react';

const LoadingPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <IonSpinner name="crescent" />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default LoadingPage;