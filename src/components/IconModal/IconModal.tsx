import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, IconButton, Typography } from '@material-ui/core';
import React from 'react';

import Icon from '../Icon/Icon';
import { useHistory } from 'react-router-dom';
import { LOGIN_PATH } from 'models/Paths';
import { Box } from '@mui/material';

interface IIconModalProps extends DialogProps {
    open: boolean;
    icon: string;
    title?: string;
    text?: string;
    imageComponent?: React.ReactNode;
    button?: {
        title: string;
        disabled?: boolean;
        onClick(): void;
    };
    onClose(): void;
}

export const IconModal = (props: IIconModalProps) => {
    const { open, onClose, title, text, icon, button, imageComponent, children } = props;
    const history = useHistory();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{ style: { overflow: 'initial' }, className: 'spacing double padding all text-align-center' }}
            maxWidth="xs"
            fullWidth
        >
            <IconButton style={{ position: 'absolute', top: 12, right: 12 }} size="small" onClick={onClose}>
                <Icon icon={faTimes} fontSize="small" />
            </IconButton>

            {title && (
                <DialogTitle disableTypography>
                    <Typography variant="h6" style={{
                        margin:'1em 0 0 0'
                    }}>{title}</Typography>
                </DialogTitle>
            )}
            <DialogContent>
                {text && <DialogContentText>{text}</DialogContentText>}
                {children}
            </DialogContent>
            <Box sx={{ position: 'absolute', top: '-20%', left: '50%', right: '50%', transform: 'translateX(-50% -50%)' }}>
                {imageComponent ? imageComponent : <img width={100} height={100} src={icon} alt="icon-modal" />}
            </Box>

            {/*<DialogActions onClick={() => history.push(LOGIN_PATH)}>*/}
                {button && (
                    <Button fullWidth={false} onClick={button.onClick} disabled={button.disabled}>
                        {button.title}
                    </Button>
                )}
            {/*</DialogActions>*/}
        </Dialog>
    );
};
export default IconModal;

