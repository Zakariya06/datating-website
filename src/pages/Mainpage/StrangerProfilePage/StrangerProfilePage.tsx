import '../ProfilePage/ProfilePage.scss';

import { Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ActivityIndicator from '../../../components/ActivityIndicator/ActivityIndicator';
import Icon from '../../../components/Icon';
import useUserAndToken from '../../../core/useUserAndToken';
import { isError } from '../../../models/core/error/IError';
import { fetchUser } from '../../../models/user/fetchUser';
import { fetchPublicUser } from 'models/user/fetchPublicUser';
import { IStrangerUser } from '../../../models/user/IStrangerUser/IStrangerUser';
import ResourceService from '../../../services/i18n';
import useTranslation from '../../../services/i18n/core/useTranslation';
import StrangerImageGallery from '../components/StrangerImageGallery';
import StrangerAttributesPaper from './PublicStrangerAttributesPaper';
import StrangerPictureComponent from './StrangerPictureComponent';
// import StrangerProfileCard from './StrangerProfileCard';
import addMinutes from 'date-fns/addMinutes';
import CookieStorageAPI from '../../../core/storage/CookieStorageAPI';
import { useParams } from 'react-router-dom';
import PublicAppbarComponent from 'pages/Landingpage/components/PublicAppbarComponent';
import { getAge } from 'models/user/IUser';
import { Box } from '@mui/material';
import MessageButton from 'components/MessageButton';
import { faCheckCircle, faLocationArrow } from '@fortawesome/pro-light-svg-icons';
import { Circle } from '@mui/icons-material';

export interface IStrangerProfilePageProps extends RouteComponentProps<{ id?: string }> {}

export const StrangerProfilePage = memo((props: IStrangerProfilePageProps) => {
    const { id } = props.match.params;
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [strangerUser, setStrangerUser] = useState<IStrangerUser | undefined>(undefined);
    const [currentKey, setCurrentKey] = useState<number>(0);
    const { user, token } = useUserAndToken();
    const { strangerId } = useParams<{ strangerId: string }>();
    const { STRANGER_ABOUT, LOCATION_FROM } = useTranslation();

    const isDesktop = useMediaQuery('(min-width:1000px)', { defaultMatches: true });

    const profileId = id;

    const handleClick = (index: number) => {
        setCurrentKey(index);
        setOpenDialog(true);
    };

    useEffect(() => {
        if (user && profileId && token) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchUser(user.Userid, profileId, token, user).then((strangerUser) => {
                setIsLoading(false);
                if (!isError(strangerUser)) {
                    setStrangerUser(strangerUser[0]);
                }
            });
        } else {
            fetchPublicUser(strangerId).then((ISPublicUser) => {
                setIsLoading(false);
                if (!isError(ISPublicUser)) {
                    setStrangerUser(ISPublicUser[0]);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [strangerId]);

    CookieStorageAPI.setItem('strangerClick', 'ABC', { expires: addMinutes(new Date(), 5) });

    const handleRefreshUser = useCallback(() => {
        if (user && profileId && token) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchUser(user.Userid, profileId, token, user).then((strangerUser) => {
                setIsLoading(false);
                if (!isError(strangerUser)) {
                    setStrangerUser(strangerUser[0]);
                }
            });
        }
    }, [profileId, token, user]);

    {/*if (!user || !token) {
        return null;
    }*/}

    const { Username, Pictures = [], Verified } = strangerUser ?? {};

    const filteredPictures = Pictures.filter((x) => !x.ProfileImage);

    const verified =
    Verified === 1 ? (
        <Icon icon={faCheckCircle} style={{color: '#42A5F5'}} />
    ) : (
        ''
    );

    let strangerCity: string;

    if(strangerUser?.City == null) {
        strangerCity = user?.City || "";
    } else {
        strangerCity = strangerUser?.City;   
    }


    return (
        <>
            {!user && !profileId && !token && <PublicAppbarComponent />}

            <section className=" full-width container">
                <Box display={{ md: 'flex', sm: 'flex' }} justifyContent={'space-between'} pb={2}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant="overline" className="ellipsis">
                            <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{Username}</span>,{' '}
                            {getAge(strangerUser?.Birthday ?? '')} &nbsp; {verified}
                            {strangerUser?.IsOnline ? (
                                    <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                ) : (
                                    <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                            )}
                        </Typography>
                        {(user || token) ? (
                            <Typography variant="overline" className="ellipsis">
                                <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {strangerCity}
                            </Typography>
                        ) : null}
                        <hr></hr>
                        {strangerUser?.UeberMich}
                    </Box>
                    <Box width={'120px'} mt={{ md: 0, sm: 0, xs: 2 }}>
                        <MessageButton
                            strangerUser={strangerUser}
                            profilId={strangerUser?.Profilid ?? ''}
                            username={Username ?? ''}
                            token={token}
                            user={user}
                            variant="fab"
                        />
                    </Box>
                </Box>
                <Box></Box>
                {/*<article className="full-width">
                    <div style={{ marginTop: 20, marginBottom: 16, display: 'flex' }} >
                        <Typography variant="overline">{ResourceService.replace(STRANGER_ABOUT, { name: Username ?? '' })}</Typography>
                    </div>
                </article>*/}

                <div
                    className="flex wrap image-gallery justify-content-start"
                    style={{
                        boxShadow: '0px 17px 18px -14px rgba(0,0,0,0.5)',
                        padding:'0 0 1em 0'
                    }}
                >
                    {filteredPictures.map((picture, index) => (
                        <StrangerPictureComponent
                            key={picture.Picture}
                            coins={picture.Coins}
                            onClick={(index: number) => handleClick(index)}
                            strangerPicture={picture.Picture}
                            index={index}
                        />
                    ))}
                </div>
                <div style={isDesktop ? { marginLeft: 24, marginRight: 24 } : {}} className="flex column">
                    {!isLoading && strangerUser ? (
                        <>
                            <article
                                style={{
                                    boxShadow: '0px 17px 18px -14px rgba(0,0,0,0.5)',
                                }}
                            >
                                <div>
                                    {/* <StrangerProfileCard strangerUser={strangerUser} user={user} token={token} /> */}
                                    <StrangerAttributesPaper strangerUser={strangerUser} user={user} token={token} />
                                </div>
                            </article>

                            <StrangerImageGallery
                                currentKey={currentKey}
                                pictures={filteredPictures}
                                open={openDialog}
                                onClose={() => setOpenDialog(false)}
                                strangerUser={strangerUser}
                                user={user}
                                token={token}
                                onPurchaseFinished={handleRefreshUser}
                            />
                        </>
                    ) : (
                        <div className="flex column centered">
                            <ActivityIndicator />
                        </div>
                    )}
                </div>
            </section>
        </>
    );
});

export default StrangerProfilePage;

