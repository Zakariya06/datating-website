import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { faMinusCircle } from '@fortawesome/pro-regular-svg-icons';
import { ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../Icon';

export interface IProfilePictureMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    closeMenu(): void;
    //handleDelete(): void;
    //handleRemoveAsProfilePicture(): void;
}

export const ProfilePictureMenu = memo((props: IProfilePictureMenuProps) => {
    const { open, anchorEl, closeMenu } = props;

    return (
        <Menu
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ style: { width: 250 } }}
            open={open}
            anchorEl={anchorEl}
            onClose={closeMenu}
        >
            <MenuItem style={{ color: '#ff9900' }} onClick={closeMenu}>
                <ListItemIcon>
                    <Icon iconColor="#ff9900" icon={faMinusCircle} />
                </ListItemIcon>
                als Profilbild entfernen
            </MenuItem>
            <MenuItem onClick={closeMenu} style={{ color: 'rgb(255, 23, 68)' }}>
                <ListItemIcon>
                    <Icon iconColor="rgb(255, 23, 68)" icon={faTrashAlt} />
                </ListItemIcon>
                Bild löschen
            </MenuItem>
        </Menu>
    );
});

export default ProfilePictureMenu;
