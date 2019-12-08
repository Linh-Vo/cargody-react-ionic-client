import React, { useState } from 'react';
import { IonHeader, IonPage, IonContent, useIonViewWillEnter, IonToast, IonInput, IonIcon, IonAvatar } from '@ionic/react';
import { User } from '../_models/userModel';
import authService from '../services/authService';
import userDataService from './userDataService';
import { TextField, Container, Button, CircularProgress, LinearProgress, Divider } from '@material-ui/core';
import './page.css';
import { save, undo } from 'ionicons/icons';
import CargodyHeader from '../_shared/CargodyHeader';
import CargodyProgressBar from '../_shared/CargodyProgressBar';

const UserAccount: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(new User());
  const [editCurrentUserModel, setEditCurrentUserModel] = useState<User>(new User());
  const [errorToast, setShowErrorToast] = useState({
    show: false,
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  useIonViewWillEnter(() => {
    authService.getAccessTokenSubscription().subscribe((resultToken) => {
      setLoading(true);
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
        })
        .finally(() => {
          setLoading(false);
        });
    }, (err) => {
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

  const onPhoneNumberChange = (event) => {
    setEditCurrentUserModel({
      ...editCurrentUserModel,
      PhoneNumber: event.target.value
    });
  }

  const anyEditableFieldChanged = () => {
    return editCurrentUserModel.Email !== currentUser.Email
      || editCurrentUserModel.FirstName !== currentUser.FirstName
      || editCurrentUserModel.LastName !== currentUser.LastName
      || editCurrentUserModel.PhoneNumber !== currentUser.PhoneNumber;
  }

  const onResetButtonClicked = () => {
    setEditCurrentUserModel({ ...currentUser });
  }

  const onSaveButtonClicked = () => {
    setLoading(true);
    userDataService.updateUserInfo(editCurrentUserModel)
      .then((updatedUser) => {
        setCurrentUser(updatedUser.data);
        setEditCurrentUserModel({ ...updatedUser.data });
      })
      .catch((error) => {
        setShowErrorToast({
          show: true,
          message: error
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <IonPage>
      <CargodyProgressBar loading={loading}/>
      <IonHeader>
        <CargodyHeader>
          User Account
        </CargodyHeader>
      </IonHeader>
      <IonContent>
        <Container maxWidth="sm">
          <form className="form__content" noValidate autoComplete="off">
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Email address"
                disabled
                variant="outlined"
                value={editCurrentUserModel.Email || ''}
                onChange={onEmailChange} />
            </div>
            <div className="form__text-field-container">
              <TextField className="form__text-field" label="Phone number"
                variant="outlined"
                value={editCurrentUserModel.PhoneNumber || ''}
                onChange={onPhoneNumberChange} />
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
            {anyEditableFieldChanged() === false
              ? ""
              : (<div className="form__actions-container">
                <div className="form__action-item">
                  <Button color="secondary"
                    variant="text"
                    onClick={onResetButtonClicked}
                    startIcon={<IonIcon icon={undo}/>}>
                    Reset
                </Button>
                </div>
                <div className="form__action-item">
                  <Button color="primary"
                    className="form__action-item"
                    variant="contained"
                    onClick={onSaveButtonClicked}
                    startIcon={<IonIcon icon={save}/>}>
                    Save
                </Button>
                </div>
              </div>)
            }

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
