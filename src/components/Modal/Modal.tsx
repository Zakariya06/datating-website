import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { memo } from 'react';

import { ReactChildren } from '../../models/core/ReactChildren';
import Icon from '../Icon';

export interface IModalProps {
    title?: string;
    open: boolean;
    children?: ReactChildren;
    contentClassname?: string;
    actions?: ReactChildren;
    actionsClassName?: string;
    titleClassName?: string;
    onClose(): void;
}

export const Modal = memo((props: IModalProps) => {
    const { title, open, onClose, children, actions, actionsClassName, titleClassName, contentClassname } = props;

    const isDesktop = useMediaQuery('(min-width:500px)', { defaultMatches: true });
    return (
        <Dialog fullScreen={!isDesktop} onClose={onClose} open={open} scroll='body'>
            <DialogTitle className="flex row justify-content-space-between" disableTypography>
                <Typography variant="h6" className={titleClassName}>
                    {title}
                </Typography>

                <IconButton onClick={onClose} size="small">
                    <Icon icon={faTimes} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={contentClassname}>{children}</DialogContent>
            {actions && <DialogActions className={actionsClassName}>{actions}</DialogActions>}
        </Dialog>
    );
});

export default Modal;
