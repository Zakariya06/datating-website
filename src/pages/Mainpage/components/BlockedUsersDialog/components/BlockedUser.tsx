import { Avatar, Button, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import LikesActionCreator from '../../../../../actions/LikesActionCreator';
import generateValidUrl from '../../../../../core/fetch/generateValidUrl';
import { getAge } from '../../../../../models/user/IUser';
import useTranslation from '../../../../../services/i18n/core/useTranslation';

export interface IBlockedUserProps {
    userName: string;
    profilePicture: string | undefined;
    profileId: string;
    birthday: string;
}

export const BlockedUser = memo((props: IBlockedUserProps) => {
    const { userName, profileId, profilePicture, birthday } = props;
    const dispatch = useDispatch();

    const { BLOCKED_USERS_UNBLOCK_ITEM_TEXT } = useTranslation();

    const age = getAge(birthday).toString();

    const handleUnblockUser = async () => {
        await dispatch(LikesActionCreator.unblockUser(profileId));
        dispatch(LikesActionCreator.fetchBlockedUsers());
    };
    return (
        <ListItem disableGutters>
            <ListItemAvatar>
                <Avatar style={{ height: 60, width: 60, marginRight: 8 }} src={generateValidUrl(profilePicture)} />
            </ListItemAvatar>
            <ListItemText primaryTypographyProps={{ style: { fontWeight: 700 } }} primary={userName + ', ' + age} />
            <ListItemSecondaryAction>
                <Button style={{ textDecoration: 'underline' }} onClick={handleUnblockUser} variant="text">
                    {BLOCKED_USERS_UNBLOCK_ITEM_TEXT}
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
});

export default BlockedUser;
