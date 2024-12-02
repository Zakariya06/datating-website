import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DirectInteractionActionCreator from '../../../../../actions/DirectInteractionActionCreator';
import UserActionCreator from '../../../../../actions/UserActionCreator';
import CameraImage from '../../../../../assets/images/modals/camera.svg';
import IconModal from '../../../../../components/IconModal';
import { useConsumeCoinsHandler } from '../../../../../components/InsufficientCoinsDialog/useConsumeCoinsHandler';
import { IError, isError } from '../../../../../models/core/error/IError';
import { IImage } from '../../../../../models/core/image/IImage';
import { IStrangerUser } from '../../../../../models/user/IStrangerUser/IStrangerUser';
import { IUser, getBalance } from '../../../../../models/user/IUser';
import ResourceService from '../../../../../services/i18n';
import useTranslation from '../../../../../services/i18n/core/useTranslation';

export interface IPurchaseCoinImageDialogProps {
    token?: string;
    user?: IUser;
    image: IImage;
    strangerUser: IStrangerUser;

    open: boolean;
    onPurchaseFinished(): void;
    onClose(): void;
}

export const PurchaseCoinImageDialog = memo((props: IPurchaseCoinImageDialogProps) => {
    const { open, onClose, image, user, token, strangerUser, onPurchaseFinished } = props;
    const { Profilid, Username } = strangerUser;
    const dispatch = useDispatch();
    const { UNLOCK_IMAGE_TITLE, UNLOCK_IMAGE_TEXT, UNLOCK_IMAGE_BUTTON } = useTranslation();

    const handlePurchaseImagePress = useCallback(async () => {
        const cost = image.Coins;
        const imageId = image.Picture;
        if (token && cost && user && getBalance(user) >= cost) {
            onClose();

            const response: IError | IStrangerUser = await (
                await DirectInteractionActionCreator.purchaseCoinImage(Profilid, imageId, token, user)
            ).json();

            if (!isError(response) && response[0].Pictures) {
                onPurchaseFinished();
                await dispatch(UserActionCreator.refreshUser());
                // response
                // setStrangerUser(response);
                //Logger.warn('settings imgs', response[0].Pictures);
                // const filteredImgs = response[0].Pictures?.filter((x: IImage) => !x.ProfileImage);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                // setStrangerUser({ Pictures: response[0].Pictures } as any);
            }
        } else {
            // when the user has no coins and cant buy the picture
            // setPurchaseModalOpen(false);
            // setInsufficientCoinsModalOpen(true);
            onClose();
        }
    }, [onClose, image.Coins, image.Picture, onPurchaseFinished, Profilid, token, user, dispatch]);

    const handler = useConsumeCoinsHandler(handlePurchaseImagePress, image.Coins || 0);

    return (
        <IconModal
            open={open}
            onClose={onClose}
            icon={CameraImage}
            title={UNLOCK_IMAGE_TITLE}
            text={ResourceService.replace(UNLOCK_IMAGE_TEXT, { name: Username })}
            button={{
                title: ResourceService.replace(UNLOCK_IMAGE_BUTTON, { coins: (image.Coins || 0).toString() }),
                onClick: handler,
            }}
        />
    );
});

export default PurchaseCoinImageDialog;
