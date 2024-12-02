import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React, { memo } from 'react';

export interface IUnsetFavoritDialogProps {
    open: boolean;
    name: string;
    handleClose(): void;
    handleUnset(): void;
}

export const UnsetFavoritDialog = memo((props: IUnsetFavoritDialogProps) => {
    const { open, name, handleClose, handleUnset } = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{name} als Favorit entfernen</DialogTitle>
            <DialogContent>
                <Typography>Bist du dir Sicher das du {name} aus deinen Favoriten entfernen möchtest?</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                    Abbrechen
                </Button>
                <Button variant="outlined" onClick={handleUnset}>
                    Favorit entfernen
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default UnsetFavoritDialog;
