import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { add, calendar, home } from 'ionicons/icons';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Calendar from './pages/Calendar';
import DatasContext from './data/data-context';
import DatasContextProvider from './data/DataContextProvider';
import { useContext, useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const notesCtx = useContext(DatasContext)
  const { initContext } = notesCtx;
  useEffect(() => {
    initContext();
  }, [initContext]);

  return (
    <IonApp>
      <IonReactRouter>
        {/* <DatasContextProvider> */}
        <IonTabs>
          <IonRouterOutlet id='main'>
            <Route exact path="/home" component={Home} />
            <Route exact path="/calendar" component={Calendar} />
            <Redirect exact from="/" to="/calendar" />
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={add} />
              <IonLabel>Add Note</IonLabel>
            </IonTabButton>
            <IonTabButton tab='calendar' href='/calendar'>
              <IonIcon icon={calendar} />
              <IonLabel>Calendar</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
        {/* </DatasContextProvider> */}
      </IonReactRouter>
    </IonApp >
  )
};

export default App;
