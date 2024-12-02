import { faTrashAlt } from '@fortawesome/pro-light-svg-icons';
import { faUserCircle } from '@fortawesome/pro-regular-svg-icons';
import { ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../../../../../components/Icon';
import useTranslation from '../../../../../../services/i18n/core/useTranslation';

export interface IImageOptionsMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    closeMenu(): void;
    handleDeleteImage(): void;
    handleUpdateProfilePicture(): void;
}

export const ImageOptionsMenu = memo((props: IImageOptionsMenuProps) => {
    const { open, closeMenu, anchorEl, handleDeleteImage, handleUpdateProfilePicture } = props;

    const { OWN_PROFILE_IMAGES_PROFILE_PICTURE, OWN_PROFILE_IMAGES_DELETE } = useTranslation();

    const handleDelete = () => {
        handleDeleteImage();
        closeMenu();
    };

    const handleUpdate = () => {
        handleUpdateProfilePicture();
        closeMenu();
    };

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
            <MenuItem onClick={handleUpdate}>
                <ListItemIcon>
                    <Icon icon={faUserCircle} />
                </ListItemIcon>
                {OWN_PROFILE_IMAGES_PROFILE_PICTURE}
            </MenuItem>
            <MenuItem onClick={handleDelete} style={{ color: 'rgb(255, 23, 68)' }}>
                <ListItemIcon>
                    <Icon iconColor="rgb(255, 23, 68)" icon={faTrashAlt} />
                </ListItemIcon>
                {OWN_PROFILE_IMAGES_DELETE}
            </MenuItem>
        </Menu>
    );
});

export default ImageOptionsMenu;
