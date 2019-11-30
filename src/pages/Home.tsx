import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useState } from 'react';
import authService from '../services/authService';
import userDataService from './userDataService';
import { User } from '../_models/userModel';

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
    console.log('Home ionViewWillEnter event fired', authService.getAccessTokenSubscription().getValue());
  });

  useIonViewWillLeave(() => {
    console.log('Home ionViewWillLeave event fired');
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
          <br></br>
          User name is {currentUser.UserName}
          <br></br>
          Token is {token}
          <br></br>
          Error is {error}
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
