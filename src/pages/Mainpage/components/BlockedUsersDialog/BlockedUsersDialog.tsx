import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Dialog, DialogContent, DialogTitle, IconButton, List, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LikesActionCreator from '../../../../actions/LikesActionCreator';
import Icon from '../../../../components/Icon';
import { getBlockedUsers } from '../../../../selectors/LikesSelectors';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import BlockedUser from './components/BlockedUser';

export interface IBlockedUsersDialogProps {
    open: boolean;
    handleClose(): void;
}

export const BlockedUsersDialog = memo((props: IBlockedUsersDialogProps) => {
    const { open, handleClose } = props;
    const { BLOCKED_USERS_TITLE, BLOCKED_USERS_EMPTY } = useTranslation();
    const isSmallScreen = useMediaQuery('(max-width:500px)', { defaultMatches: true });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LikesActionCreator.fetchBlockedUsers());
    }, [dispatch]);

    const blockedUsers = useSelector(getBlockedUsers);
    const height = isSmallScreen ? '75vh' : 500;

    return (
        <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
            <IconButton style={{ position: 'absolute', top: 12, right: 12 }} size="small" onClick={handleClose}>
                <Icon icon={faTimes} fontSize="small" />
            </IconButton>
            <DialogTitle>{BLOCKED_USERS_TITLE}</DialogTitle>
            <DialogContent>
                <div className="flex column" style={{ maxHeight: height, minHeight: height, overflowX: 'scroll' }}>
                    {blockedUsers.total > 0 ? (
                        <List disablePadding>
                            {blockedUsers._embedded.items.map((user) => (
                                <BlockedUser
                                    birthday={user.Birthday}
                                    profileId={user.Profilid}
                                    userName={user.Username}
                                    profilePicture={user.Image}
                                />
                            ))}
                        </List>
                    ) : (
                        <Typography color="primary" className="text-align-center" variant="h6">
                            {BLOCKED_USERS_EMPTY}
                        </Typography>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
});

export default BlockedUsersDialog;
