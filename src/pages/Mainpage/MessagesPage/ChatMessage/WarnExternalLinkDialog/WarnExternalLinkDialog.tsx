import { faExclamationTriangle } from '@fortawesome/pro-regular-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../../../../components/Icon';

export interface IWarnExternalLinkDialogProps {
    open: boolean;
    link: string | null;
    onClose(): void;
}

export const WarnExternalLinkDialog = memo((props: IWarnExternalLinkDialogProps) => {
    const { open, onClose, link } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Achtung! Du bist dabei einen externen Link zu öffnen!</DialogTitle>
            <DialogContent>
                <Typography>
                    Du versuchst einen Link zu öffnen der aus einer externen Quelle stammt. Bist du dir sicher das du diesen öffnen möchtest (Dieser
                    könnte auf bösartige Seiten verweisen)?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button color="default" variant="outlined" onClick={onClose}>
                    Abbrechen
                </Button>
                <Button
                    color="default"
                    startIcon={<Icon iconColor="inherit" icon={faExclamationTriangle} />}
                    variant="outlined"
                    onClick={onClose}
                    target="_blank"
                    style={{ color: '#FE0000' }}
                    rel="noopener"
                    href={link !== null ? link : ''}
                >
                    Öffne den Link
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default WarnExternalLinkDialog;
