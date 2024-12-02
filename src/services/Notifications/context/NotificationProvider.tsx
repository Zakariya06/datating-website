import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimes } from '@fortawesome/pro-light-svg-icons';
import { SnackbarOrigin, makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import Icon from '../../../components/Icon';
import Notifier from '../Notifier';

export interface INotificationProviderProps {
    children?: React.ReactNode;
}

const snackBarOrigin: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'right',
};

const iconVariant = {
    success: <Icon icon={faCheckCircle} className="spacing margin right" />,
    error: <Icon icon={faTimes} className="spacing margin right" />,
    warning: <Icon icon={faExclamationTriangle} className="spacing margin right" />,
    info: <Icon icon={faInfoCircle} className="spacing margin right" />,
    default: <Icon icon={faHeart} className="spacing margin right" color="error" />,
};

const useStyles = makeStyles(() => ({
    anchorOriginTopRight: {
        top: 48,
    },
}));

export const NotificationProvider = (props: INotificationProviderProps) => {
    const { children } = props;
    const classes = useStyles();
    return (
        <SnackbarProvider anchorOrigin={snackBarOrigin} iconVariant={iconVariant} maxSnack={4} autoHideDuration={3000} classes={classes}>
            <Notifier />
            {children}
        </SnackbarProvider>
    );
};

export default NotificationProvider;
