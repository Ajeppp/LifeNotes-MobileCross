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
import { useContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import LoadingPage from './pages/LoadingPage';

setupIonicReact();

const App: React.FC = () => {
  const notesCtx = useContext(DatasContext)
  const { initContext } = notesCtx;
  useEffect(() => {
    initContext();
  }, [initContext]);

  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push('/home');
      } else {
        if (history.location.pathname !== '/register' && history.location.pathname !== '/login') {
          history.push('/login');
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [history]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <IonApp>
      <IonRouterOutlet id='main'>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/home" component={Home} />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
    </IonApp>
  )
};

export default App;
