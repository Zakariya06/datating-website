import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import image from '../../assets/images/coins/skipped-coin-80.svg';
import Config from '../../config';
import CookieStorageAPI from '../../core/storage/CookieStorageAPI';
import useUserAndToken from '../../core/useUserAndToken';
import { isError } from '../../models/core/error/IError';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import IconModal from '../IconModal';

export interface IDailyLoginDialogProps {}

export const DailyLoginDialog = memo((props: IDailyLoginDialogProps) => {
    const { user, token } = useUserAndToken();
    const [openDailyLoginDialog, setOpenDailyLoginDialog] = useState<boolean>(false);
    const { DAILY_LOGIN_DIALOG_TITLE, DAILY_LOGIN_DIALOG_TEXT, ALERT_SESSION_EXPIRED_TEXT, ALERT_SESSION_EXPIRED_TITLE } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.Userid) {
            const isOpen = isModalOpen(user?.Userid);

            if (isOpen) {
                void (async () => {
                    if (user && token) {
                        const res = await (await DirectInteractionActionCreator.getDailyCoins(token, user)).json();

                        if (!isError(res)) {
                            setOpenDailyLoginDialog(true);
                        } else if (res.Note && res.Note === 'Error User not exist') {
                            dispatch(
                                NotificationActionCreator.enqueueSnackbar({
                                    key: String(new Date().getTime() + Math.random()),
                                    message: ALERT_SESSION_EXPIRED_TITLE + ' ' + ALERT_SESSION_EXPIRED_TEXT,
                                    options: { variant: 'error' },
                                })
                            );
                            dispatch(AuthenticationActionCreator.logout());
                        }
                    }
                })();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.Userid]);

    const handleClose = useCallback(() => {
        setOpenDailyLoginDialog(false);

        if (user?.Userid) {
            const expireDate = new Date();
            expireDate.setHours(23);
            expireDate.setMinutes(59);
            expireDate.setSeconds(59);
            CookieStorageAPI.setItem(user?.Userid, new Date().toISOString(), { expires: expireDate });
        }
    }, [user?.Userid]);

    return (
        <IconModal
            title={DAILY_LOGIN_DIALOG_TITLE}
            text={ResourceService.replace(DAILY_LOGIN_DIALOG_TEXT, { coins: Config.FREE_DAILY_COINS_AMOUNT.toString() })}
            icon={image}
            open={openDailyLoginDialog}
            onClose={handleClose}
        />
    );
});

export default DailyLoginDialog;

function isModalOpen(userId?: string) {
    if (!userId) {
        return false;
    }

    return !Boolean(CookieStorageAPI.getItem(userId));
}
