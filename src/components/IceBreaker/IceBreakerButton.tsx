import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import IMG from '../../assets/images/modals/ice-rescue.svg';
import { IStrangerUser } from '../../models/user/IStrangerUser/IStrangerUser';
import useTranslation from '../../services/i18n/core/useTranslation';
import IceBreakerModal from './IceBreakerModal';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../models/user/IUser';
import { REGISTER_USER } from 'models/Paths';


const useStyles = makeStyles(() => ({
    button: {
        background: 'linear-gradient(to bottom right, #FF748F, #FFC793)',
        border: 0,
        borderRadius: 12,
        color: '#000000',
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: '-apple-system,system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 2.5,
        outline: 'transparent',
        padding: '0 1rem',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'box-shadow .2s ease-in-out',
        userSelect: 'none',
        '-webkit-user-select': 'none',
        touchAction: 'manipulation',
        whiteSpace: 'nowrap',
        '&:not([disabled]):focus': {
            boxShadow: '0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5)',
        },
        '&:not([disabled]):hover': {
            boxShadow: '0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5)',
        },
    },
}));

export interface IIceBreakerButtonProps {
    strangerUser: IStrangerUser | any;
    user? : IUser | any;
    token?: string | any;
}

export const IceBreakerButton = (props: IIceBreakerButtonProps) => {
    const { strangerUser, user, token } = props;
    const [isOpen, setisOpen] = useState<boolean>(false);
    const { STRANGER_ICEBREAKER_BUTTON } = useTranslation();
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
            <Button
                color="default"
                className={classes.button}
                startIcon={<img src={IMG} alt="eisbrecher" width={24} height={24} />}
                onClick={() => {
                    if(!user && !token){
                        history.push(REGISTER_USER, { from: location.pathname });
                        return;
                    }
                setisOpen(true);}}
                fullWidth
            >
                {STRANGER_ICEBREAKER_BUTTON}
            </Button>
            {isOpen && (
                <IceBreakerModal
                    open={isOpen}
                    strangerUser={strangerUser}
                    onClose={() => setisOpen(false)}
                    Username={strangerUser.Username}
                    Profilid={strangerUser.Profilid}
                />
            )}
        </>
    );
};

export default IceBreakerButton;
