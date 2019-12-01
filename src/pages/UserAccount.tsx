import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent, useIonViewWillEnter, IonToast, IonInput } from '@ionic/react';
import { User } from '../_models/userModel';
import authService from '../services/authService';
import userDataService from './userDataService';
import { TextField, Container } from '@material-ui/core';
import './page.css';

const UserAccount: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(new User());
  const [editCurrentUserModel, setEditCurrentUserModel] = useState<User>(new User());
  const [errorToast, setShowErrorToast] = useState({
    show: false,
    message: ''
  });
  useIonViewWillEnter(() => {
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      userDataService.getUserInfo()
        .then((userDataResult) => {
          setCurrentUser(userDataResult.data);
          setEditCurrentUserModel(userDataResult.data);
        })
        .catch(err => {
          setShowErrorToast({
            show: true,
            message: JSON.stringify(err)
          });
        });
    }, (err) => {

      // setErrorToken(err);
    });
  });
  const showErrorToastFunction = (isShow: boolean) => {
    if (isShow) {
      return;
    }
    setShowErrorToast({
      show: false,
      message: ''
    });
  };
  const onEmailChange = (e) => {
    setEditCurrentUserModel({
      ...editCurrentUserModel,
      Email: e.target.value
    });
  }

  const onFirstNameChange = (event) => {
    setEditCurrentUserModel({
      ...editCurrentUserModel,
      FirstName: event.target.value
    });
  }

  const onLastNameChange = (event) => {
    setEditCurrentUserModel({
      ...editCurrentUserModel,
      LastName: event.target.value
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container maxWidth="sm">
          {editCurrentUserModel.Email}
          {editCurrentUserModel.FirstName}
          {editCurrentUserModel.LastName}
          <form className="form__content" noValidate autoComplete="off">
            <div className="form__text-field-container">

              <TextField className="form__text-field" label="Email address"
                variant="outlined"
                value={editCurrentUserModel.Email || ''}
                onChange={onEmailChange} />
            </div>
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="First name"
                variant="outlined"
                value={editCurrentUserModel.FirstName || ''}
                onChange={onFirstNameChange} />
            </div>
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Last name"
                variant="outlined"
                value={editCurrentUserModel.LastName || ''}
                onChange={onLastNameChange} />
            </div>
          </form>
        </Container>
        <IonToast
          isOpen={errorToast.show}
          onDidDismiss={() => showErrorToastFunction(false)}
          message={errorToast.message}
          duration={200}
        />
      </IonContent>
    </IonPage>
  );
};

export default UserAccount;
