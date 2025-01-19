import '../ProfilePage/ProfilePage.scss';

import { Container, Typography, useMediaQuery } from '@material-ui/core';
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
import MessageButton from 'components/MessageButton';
import { faCheckCircle, faLocationArrow } from '@fortawesome/pro-light-svg-icons';
import { Circle, HeartBroken } from '@mui/icons-material';
import Slider from 'react-slick';
import { Box, Button, Grid, IconButton } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AttributeChips from '../ProfilePage/components/AttributesPaper/AttributeChips';
import generateValidUrl from 'core/fetch/generateValidUrl';
import LikeButton from 'components/LikeButton';
import IceBreakerButton from 'components/IceBreaker/IceBreakerButton';
import ChatInput from '../MessagesPage/ChatInput';
import { REGISTER_USER } from 'models/Paths';
import { useHistory } from 'react-router-dom';


export interface IStrangerProfilePageProps extends RouteComponentProps<{ id?: string }> {}

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: false, // Remove navigation arrows
    appendDots: (dots: string | number | boolean | {} | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNodeArray | React.ReactPortal | null | undefined) => (
        <div
          style={{
            borderRadius: '10px',
            padding: '10px',
            position: 'absolute', // Positioniert die Dots absolut
            bottom: window.matchMedia('(min-width: 1000px)').matches ? '15%' : '50%', // Einzeilige Bedingung
            left: '50%',
            transform: 'translateX(-50%)', // Zentriert die Dots horizontal
            zIndex: 1,
            width: '100%', // Erlaubt den Dots, die gesamte Breite des Sliders zu nutzen
          }}
        >
          <ul
            style={{
              margin: '0px',
              padding: '0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {dots} {/* Hier werden die Punkte gerendert */}
          </ul>
        </div>
      ),
      customPaging: (i: number) => (
        <div
          style={{
            width: '20px',
            height: '20px',
            border: '1px solid white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            margin: '0 5px',
            backgroundColor: 'rgb(255 255 255 / 67%)',
          }}
        >
        </div>
      ),
};
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

    const history = useHistory();

    const handleChatClick = () => {
        history.push(REGISTER_USER, { from: location.pathname });
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

    //CookieStorageAPI.setItem('strangerClick', 'ABC', { expires: addMinutes(new Date(), 5) });

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

    {
        /*if (!user || !token) {
        return null;
    }*/
    }

    const { Username, Pictures = [], Verified } = strangerUser ?? {};

    const filteredPictures = Pictures.filter((x) => !x.ProfileImage);
    console.log('filteredPictures', filteredPictures);
    const verified = Verified === 1 ? <Icon icon={faCheckCircle} style={{ color: '#42A5F5' }} /> : '';

    let strangerCity: string;

    if (strangerUser?.City == null) {
        strangerCity = user?.City || '';
    } else {
        strangerCity = strangerUser?.City;
    }

    return (
        <>
            {!user && !profileId && !token && <PublicAppbarComponent />}

            <Grid container spacing={token ? 0 : 4} sx={{ width: token ? '98%' : isDesktop ? '90%' : '100%', margin: '0 auto' }}>
                <Grid item md={4}>
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: 'gray',
                            borderRadius: '15px',
                            height: isDesktop ? '82vh' : '50vh', // Full height of the slider
                            width: token && isDesktop ? '16vw' : isDesktop ? '100%' : '85vw',
                            marginTop: '15px'
                        }}
                    >
                        <Slider {...settings}>
                            {filteredPictures.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '100%', // Set height of the slider
                                        display: 'flex', // Ensure the image centers vertically
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src={generateValidUrl(image.Picture)}
                                        alt={image.Picture}
                                        style={{
                                            height: '780px',
                                            width: '100%', // Maintain aspect ratio
                                            objectFit: 'cover', // Ensure the image fills the container without distortion
                                        }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                    </Box>
                </Grid>
                <Grid item sm={12} md={8} mt={isDesktop ? 2 : 0}>
                    <Box
                        sx={{
                            minHeight: '80vh',
                            borderRadius: '15px',
                            padding: isDesktop ? '40px' : '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Adds a soft shadow
                            marginTop: !isDesktop ? '20px' : '0px',
                        }}
                    >
                        <Typography variant="overline" className="ellipsis" style={{ fontSize: '24px', textAlign: 'center' }}>
                            <Typography style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                                {Username} {getAge(strangerUser?.Birthday ?? '')} &nbsp; {verified}
                                {strangerUser?.IsOnline ? (
                                    <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                ) : (
                                    <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                                )}
                            </Typography>
                        </Typography>
                        {/* <Grid container item spacing={2} mt={3} mb={2}>
                            <Grid item sm={12} md={6}>
                                <Typography>Wohnort</Typography>
                                <Box mt={1} mb={2} sx={{ padding: '10px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                                    {user || token ? (
                                        <Typography variant="overline" className="ellipsis">
                                            <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {strangerCity}
                                        </Typography>
                                    ) : (
                                        <Typography variant="overline" className="ellipsis">
                                            <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} />{' '}
                                            <span style={{ filter: 'blur(6px)' }}>Registrier dich!</span>
                                        </Typography>
                                    )}
                                </Box>
                                <Typography>Über mich</Typography>
                                <Box
                                    mt={2}
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        minHeight: '215px',
                                    }}
                                >
                                    <Typography> {strangerUser?.UeberMich}</Typography>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Typography>Steckbrief</Typography>
                                <Box mt={1} mb={2} sx={{ padding: '10px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
                                    <AttributeChips
                                        Gender={strangerUser ? strangerUser?.Gender : 2}
                                        Bodyjewelry={strangerUser ? strangerUser?.Bodyjewelry : 1}
                                        Eyes={strangerUser ? strangerUser?.Eyes : 3}
                                        Hair={strangerUser ? strangerUser?.Hair : 2}
                                        Living={strangerUser ? strangerUser?.Living : 1}
                                        Relationship={strangerUser ? strangerUser?.Relationship : 1}
                                        Size={strangerUser ? strangerUser?.Size : 179}
                                        Smoker={strangerUser ? strangerUser?.Smoker : 2}
                                        Starsign={strangerUser ? strangerUser?.Starsign : 1}
                                    />
                                </Box>
                            </Grid>
                        </Grid> */}
                        <Grid container spacing={2} mt={3} mb={2}>
                            {/* Left Column */}
                            <Grid item xs={12} md={6}>
                                <Typography>Wohnort</Typography>
                                <Box
                                    mt={1}
                                    mb={2}
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    {user || token ? (
                                        <Typography variant="overline" className="ellipsis">
                                            <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {strangerCity}
                                        </Typography>
                                    ) : (
                                        <Typography variant="overline" className="ellipsis">
                                            <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} />{' '}
                                            <span style={{ filter: 'blur(6px)' }}>Registrier dich!</span>
                                        </Typography>
                                    )}
                                </Box>
                                <Typography>Über mich</Typography>
                                <Box
                                    mt={2}
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        minHeight: '215px',
                                    }}
                                >
                                    <Typography>{strangerUser?.UeberMich}</Typography>
                                </Box>
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={12} md={6}>
                                <Typography>Steckbrief</Typography>
                                <Box
                                    mt={1}
                                    mb={2}
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    <AttributeChips
                                        Gender={strangerUser?.Gender || 2}
                                        Bodyjewelry={strangerUser?.Bodyjewelry || 1}
                                        Eyes={strangerUser?.Eyes || 3}
                                        Hair={strangerUser?.Hair || 2}
                                        Living={strangerUser?.Living || 1}
                                        Relationship={strangerUser?.Relationship || 1}
                                        Size={strangerUser?.Size || 179}
                                        Smoker={strangerUser?.Smoker || 2}
                                        Starsign={strangerUser?.Starsign || 1}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '90%',
                                gap: '10px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                                <LikeButton
                                    profilId={strangerUser ? strangerUser?.Profilid : ''}
                                    //@ts-ignore
                                    strangerUser={strangerUser ? strangerUser : ''}
                                    token={token}
                                    user={user}
                                    variant="fab"
                                    isLiked={strangerUser ? strangerUser?.IsLiked : false}
                                />
                            </div>
                            <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                                {/* <ZwinkerButton
                                    //@ts-ignore
                                    profilId={strangerUser?.Profilid}
                                    //@ts-ignore
                                    username={strangerUser?.Username}
                                    token={token}
                                    user={user}
                                    variant="fab"
                                /> */}
                                <MessageButton
                                    strangerUser={strangerUser}
                                    profilId={strangerUser?.Profilid ?? ''}
                                    username={Username ?? ''}
                                    token={token}
                                    user={user}
                                    variant="fab"
                                />
                            </div>

                            {strangerUser && !strangerUser.AllreadyChattet && (
                                <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                                    <IceBreakerButton token={token} user={user} strangerUser={strangerUser} />
                                </div>
                            )}
                        </div>
                        <br></br>
                        {
                            !user || !token ? (
                                <div className="flex column align-content-center spacing padding top bottom" onClick={handleChatClick}>
                                <ChatInput
                                    dialogId={strangerUser?.Profilid ?? ''}
                                    user={user}
                                    partnerId={strangerUser?.Profilid ?? ''}
                                    onSend={handleChatClick}
                                    userName={Username ?? ''}
                                />
                                </div>
                            ) : null // Falls `user` und `token` vorhanden sind, wird hier nichts angezeigt.
                        }
                    </Box>
                </Grid>
            </Grid>
        </>
    );
});

export default StrangerProfilePage;

