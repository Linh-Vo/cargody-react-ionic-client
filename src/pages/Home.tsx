import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useState } from 'react';
import authService from '../services/authService';
import userDataService from './userDataService';
import { User } from '../_models/userModel';
import CargodyHeader from '../_shared/CargodyHeader';

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

  return (
    <IonPage>
      <IonHeader>
        <CargodyHeader>
          Home
        </CargodyHeader>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>
          User name is {currentUser.UserName}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
