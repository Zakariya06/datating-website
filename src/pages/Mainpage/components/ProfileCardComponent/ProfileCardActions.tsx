import React from 'react';

import LikeButton from '../../../../components/LikeButton';
import UnlockProfileDialog from '../../../../components/UnlockProfileDialog';
import ZwinkerButton from '../../../../components/ZwinkerButton';
import Config from '../../../../config';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import { IStrangerUserPreview } from '../../../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser, getBalance } from '../../../../models/user/IUser';
import CardActionButton from '../CardActionButton';

export interface IProfileCardActionsProps {
    type: string;
    strangerUser: IStrangerUserPreview;
    token: string;
    user: IUser;
    Unlocked: boolean;
    openUnlockProfile: boolean;
    ProfilPicture: string | undefined;
    Picture: string;
    handleMessagePress: () => Promise<void>;
    handleShopClick: () => void;
    handleUnlockProfile: () => Promise<void>;
    setOpenUnlockProfile(value: boolean): void;
}

export function ProfileCardActions(props: IProfileCardActionsProps) {
    const {
        type,
        handleMessagePress,
        strangerUser,
        token,
        user,
        Unlocked,
        ProfilPicture,
        Picture,
        handleShopClick,
        handleUnlockProfile,
        openUnlockProfile,
        setOpenUnlockProfile,
    } = props;
    return (
        <>
            <div className="flex justify-content-center align-items-end">
                {type === 'explorer' ? (
                    <div className="spacing margin bottom">
                        <CardActionButton type="message" onClick={handleMessagePress} />
                        <ZwinkerButton profilId={strangerUser.Profilid} username={strangerUser.Username} token={token} user={user} />
                        <LikeButton
                            profilId={strangerUser.Profilid}
                            strangerUser={strangerUser}
                            token={token}
                            user={user}
                            isLiked={strangerUser.IsLiked}
                        />
                    </div>
                ) : type === 'like' ? (
                    Unlocked && (
                        <LikeButton
                            profilId={strangerUser.Profilid}
                            strangerUser={strangerUser}
                            token={token}
                            user={user}
                            isLiked={strangerUser.IsLiked}
                        />
                    )
                ) : (
                    Unlocked && <CardActionButton type="message" onClick={handleMessagePress} />
                )}
            </div>

            {!Unlocked && openUnlockProfile && (
                <UnlockProfileDialog
                    strangerUser={strangerUser}
                    image={generateValidUrl(ProfilPicture || Picture)}
                    insufficientCoins={getBalance(user) < Config.UNLOCK_USER_AMOUNT}
                    price={Config.UNLOCK_USER_AMOUNT}
                    onLoadCoins={handleShopClick}
                    onUnlockPress={handleUnlockProfile}
                    open={openUnlockProfile}
                    onClose={() => setOpenUnlockProfile(false)}
                />
            )}
        </>
    );
}

