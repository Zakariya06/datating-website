import './CardActionButton.scss';

import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutlined, faSmileWink } from '@fortawesome/pro-light-svg-icons';
import { IconButton, Button, makeStyles } from '@material-ui/core';
import React from 'react';

import Icon from '../../../../components/Icon';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import { IResourceDictionary } from '../../../../services/i18n/models/IResourceDicitionary';
import { MessageOutlined } from '@mui/icons-material';
//import Config from '../../../../config';

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

export interface ICardActionButtonProps {
    variant?: 'icon' | 'fab';
    type: 'message' | 'wink' | 'like' | 'match' | any;
    outlined?: boolean;
    onClick?(): void;
}

export const CardActionButton = (props: ICardActionButtonProps) => {
    const { type, onClick, outlined, variant = 'icon' } = props;

    const translation = useTranslation();

    const icon = getIcon(type, outlined);

    const className = `card-action-button ${type}-button ${variant}`;
    const classes = useStyles();

    if (variant === 'fab') {
        return (
            <Button
                // style={{ border: type === 'message' ? '1px solid orange' : 'none' }}
                variant="contained"
                className={classes.button}
                startIcon={type === 'message' ? <MessageOutlined /> : icon}
                onClick={onClick}
                fullWidth
            >
                {getText(translation, type, outlined)}
            </Button>
        );
    }

    return (
        <IconButton className={className} onClick={onClick}>
            {icon}
        </IconButton>
    );
};

export default CardActionButton;

function getIcon(type: 'message' | 'wink' | 'like' | 'match', outlined: boolean | undefined): React.ReactNode {
    switch (type) {
        case 'message':
            return <Icon iconColor="#000" icon={faComment} />;
        case 'wink':
            return <Icon iconColor="#000" icon={faSmileWink} />;
        case 'like':
            return <Icon icon={outlined ? faHeartOutlined : faHeart} color="error" />;
        case 'match':
            return <Icon icon={outlined ? faHeartOutlined : faHeart} color="error" />;
        default:
            break;
    }
}

function getText(translation: IResourceDictionary, type: 'message' | 'wink' | 'like' | 'match', outlined?: boolean) {
    switch (type) {
        case 'message':
            return translation.MESSAGE;
        case 'wink':
            return translation.STRANGER_BLINK_SMALL;
        case 'like':
            return outlined ? translation.LIKE : translation.LIKED;
        case 'match':
            return translation.MATCHED;
        default:
            break;
    }
}

