import { faExclamationCircle, faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../../../components/Icon';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IChatOptionsMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onDeleteClick(): void;
    onBlockClick(): void;
    onClose(): void;
}

export const ChatOptionsMenu = memo((props: IChatOptionsMenuProps) => {
    const { open, anchorEl, onDeleteClick, onClose, onBlockClick } = props;
    const { STRANGER_BLOCK, ALERT_DELETE_CHAT_TITLE } = useTranslation();

    return (
        // <ClickAwayListener onClickAway={closeMenu}>
        <Menu
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ style: { width: 260 } }}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
        >
            <MenuItem style={{ color: '#FF8000' }} onClick={onBlockClick}>
                <ListItemIcon>
                    <Icon iconColor="#FF8000" icon={faExclamationCircle} />
                </ListItemIcon>
                {STRANGER_BLOCK}
            </MenuItem>
            <MenuItem onClick={onDeleteClick} style={{ color: 'rgb(255, 23, 68)' }}>
                <ListItemIcon>
                    <Icon iconColor="rgb(255, 23, 68)" icon={faTrashAlt} />
                </ListItemIcon>
                {ALERT_DELETE_CHAT_TITLE}
            </MenuItem>
        </Menu>
        // </ClickAwayListener>
    );
});

export default ChatOptionsMenu;
