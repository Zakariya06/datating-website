import './ProfileCardComponent.scss';

import { faEye, faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Paper, styled, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useContext, useState } from 'react';
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
import ThemeContext from 'theme/ThemeContext';

export interface IProfileCardComponentProps {
    type: 'explorer' | 'like' | 'visitor';
    strangerUser: IStrangerUserPreview;
    newTag?: boolean;
    user: IUser;
    token: string;
    className?: string;
}

// Add these styled components at the top of your file
const StyledPaper = styled(Paper)({
    maxWidth: '100%',
    margin: 'auto',
    borderRadius: 16,
    border: '1px solid #E8C285',
    background: 'white',
    boxShadow: 'none',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.02)',
    },
});

const ImageContainer = styled('div')({
    position: 'relative',
    width: '100%',
    height: 280,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden', // Add this to contain the zoomed image
});

const ContentContainer = styled('div')({
    padding: '16px',
    background: 'white',
});

const ActionButton = styled('div')({
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '2px solid #E8C285',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#E8C285',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(232, 194, 133, 0.1)',
    },
});

const NewChip = styled('div')({
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#E8C285',
    color: 'white',
    padding: '4px 8px',
    borderRadius: 12,
    fontSize: '0.75rem',
    fontWeight: 'bold',
});

const ImageWrapper = styled('div')({
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.1)',
    },
});

export const ProfileCardComponent = memo((props: IProfileCardComponentProps) => {
    const { type, strangerUser, newTag = false, user, token, className = '' } = props;
    const [openUnlockProfile, setOpenUnlockProfile] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { DISCOVER, LOCATION_FROM } = useTranslation();
    const { Unlocked = true, Profilid, Username, Birthday, City, ProfilPicture, Picture, Verified, IsOnline } = strangerUser;
    const { type: theme } = useContext(ThemeContext);
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
        <StyledPaper id={`item-${Username}`} className={className} onClick={handleProfileClick}>
            <ImageContainer>
                <ImageWrapper
                    style={{
                        backgroundImage: `url(${generateValidUrl(getProfileImage(strangerUser))})`,
                    }}
                >
                    {newTag && <NewChip>NEU</NewChip>}
                    {!Unlocked && (
                        <div className="flex column centered full-height">
                            <Typography color="textPrimary" style={{ color: '#fff', fontWeight: 700 }}>
                                {DISCOVER}
                            </Typography>
                        </div>
                    )}
                </ImageWrapper>
            </ImageContainer>

            <ContentContainer>
                <div className={`flex column ${Unlocked ? '' : 'blur'}`}>
                    <Typography
                        variant="h6"
                        style={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            marginBottom: 4,
                            color: '#2c2c2c',
                        }}
                    >
                        {Username} {verified}
                        {IsOnline && <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />}
                    </Typography>

                    <Typography
                        variant="body2"
                        style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontSize: '0.875rem',
                            textTransform: 'uppercase',
                            marginBottom: 16,
                        }}
                    >
                        {City}
                    </Typography>
                </div>

                <div className="flex justify-center gap-3 mt-2">
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
            </ContentContainer>
        </StyledPaper>
    );
});

export default ProfileCardComponent;

