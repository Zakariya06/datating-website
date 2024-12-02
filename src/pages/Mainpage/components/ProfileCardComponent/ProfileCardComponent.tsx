import './ProfileCardComponent.scss';

import { faEye, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LikesActionCreator from '../../../../actions/LikesActionCreator';
import Icon from '../../../../components/Icon';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import Config from '../../../../config';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import formatRelativeTimeToNow from '../../../../core/formatRelativeTimeToNow';
import { MESSAGES_PATH, SHOP_PATH, STRANGER_PROFILE_PATH } from '../../../../models/Paths';
import { IStrangerUserPreview } from '../../../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser, getAge, getBalance, getProfileImage } from '../../../../models/user/IUser';
import ChatActionCreator from '../../../../services/Chat/actions/ChatActionCreator';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import NewTag from './NewTag';
import { ProfileCardActions } from './ProfileCardActions';
import { faLocation } from '@fortawesome/pro-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/pro-light-svg-icons';
import { Circle } from '@mui/icons-material';

export interface IProfileCardComponentProps {
    type: 'explorer' | 'like' | 'visitor';
    strangerUser: IStrangerUserPreview;
    newTag?: boolean;
    user: IUser;
    token: string;
    className?: string;
}

export const ProfileCardComponent = memo((props: IProfileCardComponentProps) => {
    const { type, strangerUser, newTag = false, user, token, className = '' } = props;
    const [openUnlockProfile, setOpenUnlockProfile] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { DISCOVER, LOCATION_FROM } = useTranslation();
    const { Unlocked = true, Profilid, Username, Birthday, City, ProfilPicture, Picture, Verified, IsOnline } = strangerUser;

    const handleProfileClick = useCallback(() => {
        if (Unlocked) {
            history.push(STRANGER_PROFILE_PATH.replace(':id?', Profilid), { profileId: Profilid });
        } else {
            setOpenUnlockProfile(true);
        }
    }, [Profilid, Unlocked, history]);

    const handleUnlockProfile = async () => {
        const cost = Config.UNLOCK_USER_AMOUNT;
        const imageId = Profilid ?? '';
        if (user && getBalance(user) >= cost) {
            await dispatch(LikesActionCreator.unlockUser(type === 'like' ? 1 : 2, imageId, cost));
            setOpenUnlockProfile(false);
        } else {
            setOpenUnlockProfile(false);
        }
    };

    const handleShopClick = () => {
        history.push(SHOP_PATH);
    };

    const handleMessagePress = useCallback(async () => {
        await dispatch(ChatActionCreator.createDialog(Username, strangerUser));
        // const { uuid } = action.payload.result;
        const uuid = Profilid;
        // navigation.navigate(MainNavigationPages.CHAT, { uuid: uuid });

        history.push(MESSAGES_PATH.replace(':id?', uuid));
    }, [dispatch, Username, strangerUser, Profilid, history]);
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const cardimageheight = isDesktop ? '300px' : '40vh';

    // const cardwidth = isDesktop ? '200px' : '40vw';

    const icon =
        type === 'like' ? (
            <Icon iconColor={'rgb(255, 23, 68)'} icon={faHeart} fontSize="small" className="spacing margin right" />
        ) : (
            <Icon iconColor={Config.GLOBAL_PRIMARY_COLOR} icon={faEye} fontSize="small" className="spacing margin right" />
        );
    // style={{ maxWidth: cardwidth }}

    const verified = Verified === 1 ? <Icon icon={faCheckCircle} style={{ color: '#42A5F5' }} /> : '';

    return (
        <Paper
            style={{
                backgroundImage: `url(${generateValidUrl(getProfileImage(strangerUser))})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                marginBottom: '10px',
                padding: type === 'like' ? '.5em 0' : '',
            }}
            id={`item-${Username}`}
            className={` no-grow pointer ${className} spacing padding bottom`}
        >
            <div onClick={handleProfileClick}>
                {newTag && <NewTag />}
                {type !== 'like' && (
                    <ProgressiveImage style={{ height: cardimageheight }} src={generateValidUrl(getProfileImage(strangerUser))}>
                        {!Unlocked && (
                            <div className="flex column centered full-height" onClick={() => setOpenUnlockProfile(true)}>
                                <Typography color="textPrimary" style={{ color: '#fff', fontWeight: 700 }}>
                                    {DISCOVER}
                                </Typography>
                            </div>
                        )}
                    </ProgressiveImage>
                )}

                <div className={`flex ${type === 'explorer' ? 'column' : 'row'} align-items-center`}>
                    <div className="flex column spacing padding all full-width">
                        <div className={Unlocked ? '' : 'blur'} style={{ fontSize: type==='like'? 10 : 16, fontWeight: 600 }}>
                            <Typography
                                color={!Unlocked ? 'inherit' : undefined}
                                style={{ color: '#fff', fontWeight:type==='like'? 600: 900 }}
                                className="ellipsis"
                                variant="overline"
                            >
                                {Username} {verified}                                 
                                {IsOnline ? (
                                    <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                ) : (
                                    <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                                )}
                            </Typography>
                        </div>
                        

                        {type === 'explorer' ? (
                            <Typography style={{ color: '#fff', fontWeight: 300 }} className="ellipsis">
                                <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {City}
                                <br></br>
                                <b style={{ fontSize: '1.5rem', float: 'right', fontWeight: 900 }}>{getAge(Birthday)}</b>
                            </Typography>
                        ) : (
                            <Typography className="flex no-grow align-items-center">
                                {icon} {strangerUser.Date && formatRelativeTimeToNow(strangerUser.Date)}
                            </Typography>
                        )}
                      
                    </div>
                    {type === 'like' && (
                            <div onClick={() => setOpenUnlockProfile(true)}>
                                <Typography color="textPrimary" style={{ color: '#fff', fontWeight: 500 }}>
                                    {Unlocked ? null : DISCOVER}
                                </Typography>
                            </div>
                    )}
                 {
                        <div className="flex no-grow spacing margin right left" onClick={(e) => e.stopPropagation()}>
                        <ProfileCardActions
                            type={type}
                            handleMessagePress={handleMessagePress}
                            strangerUser={strangerUser}
                            token={token}
                            user={user}
                            Unlocked={Unlocked}
                            ProfilPicture={ProfilPicture}
                            Picture={Picture}
                            handleShopClick={handleShopClick}
                            handleUnlockProfile={handleUnlockProfile}
                            openUnlockProfile={openUnlockProfile}
                            setOpenUnlockProfile={setOpenUnlockProfile}
                        />
                    </div>
                 }
                </div>
            </div>
        </Paper>
    );
});

export default ProfileCardComponent;
