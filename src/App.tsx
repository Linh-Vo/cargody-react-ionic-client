import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, withIonLifeCycle, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave, IonTabBar, IonTabButton, IonIcon, IonLabel, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
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
import authService from './services/authService';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { purple, green } from '@material-ui/core/colors';
import Details from './pages/Details';
import Tab2 from './pages/Tab2';
import UserAccount from './pages/UserAccount';
import { flash, apps, send, person, home } from 'ionicons/icons';

const App: React.FC = () => {
  // => Start auth flow here
  authService.tryLogin();
  useIonViewDidEnter(() => {
    console.log('ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    console.log('ionViewWillEnter event fired');
  });

  useIonViewWillLeave(() => {
    console.log('ionViewWillLeave event fired');
  });
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/tab2" component={Tab2} exact={true} />
              <Route path="/tab2/details" component={Details} />
              <Route path="/account" component={UserAccount} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon icon={apps} />
                <IonLabel>Tab Two</IonLabel>
              </IonTabButton>
              <IonTabButton tab="account" href="/account">
                <IonIcon icon={person} />
                <IonLabel>Account</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
      {/* <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/tab2" component={Tab2} exact={true} />
            <Route path="/tab2/details" component={Details} />
            <Route path="/tab3" component={UserAccountPage} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonReactRouter>

      </IonApp> */}
    </ThemeProvider>
  )
};

export default App;
