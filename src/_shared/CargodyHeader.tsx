import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import authService from '../services/authService';
import { useIonViewWillEnter } from '@ionic/react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const CargodyHeader: React.FC = (props) => {
    const classes = useStyles('root');
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    // TODO: need to move get user function into auth service to get user data everywhere
    useIonViewWillEnter(() => {
        authService.getAccessTokenSubscription().subscribe((resultToken) => {
            setAuthenticated(true);
        }, (err) => {
        });
    });

    const onLogoutClicked = () => {
        authService.logout();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton}
                        color="inherit"
                        aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.children}
                    </Typography>
                    {authenticated
                        ? <Button color="inherit"
                            onClick={onLogoutClicked}>Logout</Button>
                        : null}

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default CargodyHeader;
