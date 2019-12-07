import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import React, { useState } from 'react';
import authService from '../services/authService';
import userDataService from './userDataService';
import { User } from '../_models/userModel';
import CargodyHeader from '../_shared/CargodyHeader';
import CargodyProgressBar from '../_shared/CargodyProgressBar';

const Home: React.FC = () => {
  const [token, setToken] = useState('token');
  const [error, setErrorToken] = useState('errorToken');
  const [currentUser, setCurrentUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(false);
  useIonViewDidEnter(() => {
    console.log('Home ionViewDidEnter event fired');
  });

  useIonViewDidLeave(() => {
    console.log('Home ionViewDidLeave event fired');
  });

  useIonViewWillEnter(() => {
    setLoading(true);
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      setToken(resultToken);
      userDataService.getUserInfo()
        .then((userDataResult) => {
          setCurrentUser(userDataResult.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }, (err) => {
      setErrorToken(err);
    });
  });

  useIonViewWillLeave(() => {
  });

  return (
    <IonPage>
      <CargodyProgressBar loading={loading}/>
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
