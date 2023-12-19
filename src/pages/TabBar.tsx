// TabBar.tsx
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, calendar } from 'ionicons/icons';

const TabBar: React.FC = () => (
    <IonTabBar slot='bottom'>
        <IonTabButton tab="posting" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab='calendar' href='/calendar'>
            <IonIcon icon={calendar} />
            <IonLabel>Calendar</IonLabel>
        </IonTabButton>
    </IonTabBar>
);

export default TabBar;