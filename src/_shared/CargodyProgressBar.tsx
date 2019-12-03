import React, { useState } from 'react';
import { makeStyles, LinearProgress } from '@material-ui/core';
import authService from '../services/authService';
import { useIonViewWillEnter } from '@ionic/react';

const useStyles = makeStyles(theme => ({
    placeHolderDiv: {
        height: 4,
    },
}));
const CargodyProgressBar: React.FC<{loading: boolean}> = (props) => {
    const classes = useStyles('root');

    return (
        <div>
            {props.loading ? <LinearProgress color="primary"/>:
                <div className={classes.placeHolderDiv}></div>}
        </div>
    );
};

export default CargodyProgressBar;
