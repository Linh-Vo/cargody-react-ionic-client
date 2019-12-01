import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useState } from 'react';
import authService from '../services/authService';
import userDataService from './userDataService';
import { User } from '../_models/userModel';
import Button from '@material-ui/core/Button';

const Home: React.FC = () => {
  const [token, setToken] = useState('token');
  const [error, setErrorToken] = useState('errorToken');
  const [currentUser, setCurrentUser] = useState<User>({});
  useIonViewDidEnter(() => {
    console.log('Home ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('Home ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      setToken(resultToken);
      userDataService.getUserInfo()
        .then((userDataResult) => {
          setCurrentUser(userDataResult.data);
        })
        .catch(err => {
          console.log(err);
        });
    }, (err) => {
      setErrorToken(err);
    });
  });

  useIonViewWillLeave(() => {
    console.log('Home ionViewWillLeave event fired');
  });

  const onLogOutClicked = () => {
    authService.logout();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          User name is {currentUser.UserName}
          <br></br>
          Token is {token}
          <br></br>
          Error is {error}
        </p>
        <Button variant="contained" color="primary" onClick={onLogOutClicked}>Logout</Button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
