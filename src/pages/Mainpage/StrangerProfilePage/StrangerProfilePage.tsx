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
import { faCheckCircle, faLocationArrow, faUsers } from '@fortawesome/pro-light-svg-icons';
import { Circle, Close, Favorite, HeartBroken, MessageOutlined, PeopleAltRounded } from '@mui/icons-material';
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
import { icon } from '@fortawesome/fontawesome-svg-core';
import Config from 'config';
import MessageIcon from '../../../assets/images/icons/message.png'

export interface IStrangerProfilePageProps extends RouteComponentProps<{ id?: string }> {}
const isMobile = window.innerWidth <= 1000;

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    arrows: false, // Remove navigation arrows
    appendDots: (
        dots:
            | string
            | number
            | boolean
            | {}
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | React.ReactNodeArray
            | React.ReactPortal
            | null
            | undefined
    ) => (
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
                marginTop: isMobile ? '200px' : '0px',
            }}
        ></div>
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
    const isMobile = useMediaQuery('(max-width:430px)', { defaultMatches: true });

    const profileId = id;

    const handleClick = (index: number) => {
        setCurrentKey(index);
        setOpenDialog(true);
    };

    const history = useHistory();

    if (!token) {
        useEffect(() => {
            const handleGlobalClick = () => {
                history.push(REGISTER_USER, { from: location.pathname });
            };

            // Füge den globalen Event-Listener hinzu
            document.addEventListener('click', handleGlobalClick);

            // Entferne den Event-Listener beim Demontieren der Komponente
            return () => {
                document.removeEventListener('click', handleGlobalClick);
            };
        }, [history]);
    }

    const handleChatClick = () => {
        history.push(REGISTER_USER, { from: location.pathname });
    };

    useEffect(() => {
        if (user && profileId && token) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetchUser(user.Userid, profileId, token, user).then((strangerUser: any) => {
                setIsLoading(false);
                if (!isError(strangerUser)) {
                    setStrangerUser(strangerUser[0]);
                }
            });
        } else {
            fetchPublicUser(strangerId).then((ISPublicUser: any) => {
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
            fetchUser(user.Userid, profileId, token, user).then((strangerUser: any) => {
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

    const filteredPictures = Pictures;
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

            <Grid container spacing={token ? 0 : 4} sx={{ width: token ? '98%' : isDesktop ? '90%' : '100%' }}>
                <Grid item md={4}>
                    <Box
                        sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: 'lightGray',
                            height: isDesktop ? '100vh' : '60vh',
                            width: token && isDesktop ? '24vw' : isDesktop ? '100%' : '86vw',
                            borderRadius: isMobile ? 0 : '14px',
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
                                        overflow: 'hidden', // Prevent content from overflowing
                                    }}
                                >
                                    {/* Verschwommener Hintergrund */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `url(${generateValidUrl(image.Picture)})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'blur(20px)',
                                            zIndex: 1,
                                        }}
                                    />

                                    {/* Scharfes Bild im Vordergrund */}
                                    <img
                                        src={generateValidUrl(image.Picture)}
                                        alt={image.Picture}
                                        style={{
                                            position: 'relative',
                                            zIndex: 2,
                                            height: !isDesktop ? '100%' : '780px',
                                            width: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Slider>
                        {isMobile && (
                            <IconButton style={{ position: 'absolute', top: 10, left: 10, zIndex: 99999, backgroundColor: 'rgba(0,0,0,.4)' }}>
                                <Close sx={{ color: 'white' }} />
                            </IconButton>
                        )}
                    </Box>
                </Grid>
                <Grid item sm={12} md={8}>
                    <Box
                        sx={{
                            minHeight: '80vh',
                            borderRadius: '15px',
                            padding: isDesktop ? '40px' : '10px',
                            boxShadow: isMobile ? 0 : '0px 4px 10px rgba(0, 0, 0, 0.2)',
                            marginTop: isMobile ? '-20px' : '0px',
                            backgroundColor: 'white',
                            zIndex: 999999,
                            position: 'absolute',
                            width: isMobile ? '86vw' : '49vw',
                        }}
                    >
                        <Typography variant="overline" className="ellipsis" style={{ fontSize: '24px', textAlign: isMobile ? 'start' : 'center' }}>
                            <Typography style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                                {Username} {getAge(strangerUser?.Birthday ?? '')} &nbsp; {verified}
                                {isMobile ? null : (
                                    <>
                                        {strangerUser?.IsOnline || !token ? (
                                            <Circle sx={{ color: '#19cea4', fontSize: '.7em', marginLeft: 0.5 }} />
                                        ) : (
                                            <Circle sx={{ color: 'red', fontSize: '.7em', marginLeft: 0.5 }} />
                                        )}
                                    </>
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
                                <Typography style={{ fontSize: '16px' }}>Zitat</Typography>

                                <Box
                                    mt={1}
                                    mb={3}
                                    sx={{
                                        padding: isMobile ? 0 : '10px',
                                        borderRadius: '10px',
                                        boxShadow: isMobile ? 0 : '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    {isMobile ? <Typography>{strangerUser?.Starsign}</Typography> : null}
                                    {user || token ? (
                                        <Typography variant="overline" className="ellipsis">
                                            {isMobile ? null : (
                                                <>
                                                    <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {strangerCity}
                                                </>
                                            )}
                                        </Typography>
                                    ) : (
                                        <Typography variant="overline" className="ellipsis">
                                            <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} />{' '}
                                            <span style={{ filter: 'blur(6px)' }}>Registrier dich!</span>
                                        </Typography>
                                    )}
                                </Box>
                                <Typography style={{ fontSize: '18px' }}>Über mich</Typography>
                                <Box
                                    mt={2}
                                    sx={{
                                        padding: '10px',
                                        borderRadius: '10px',
                                        boxShadow: isMobile ? 0 : '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        minHeight: '215px',
                                    }}
                                >
                                    <Typography>{strangerUser?.UeberMich}</Typography>
                                </Box>
                            </Grid>

                            {isMobile && (
                                <Box sx={{ my: 4, p: 2 }}>
                                    <Typography style={{ fontSize: '18px' }}>Ich komme aus</Typography>
                                    <Typography>{strangerUser?.City}</Typography>
                                </Box>
                            )}

                            {/* Right Column */}
                            <Grid item xs={12} md={6}>
                                <Typography style={{ fontSize: isMobile ? ' 18px' : '16px' }}> {isMobile ? 'Fotos' : 'Steckbrief'}</Typography>
                                {isMobile ? (
                                    <>
                                        <div
                                            className="flex wrap image-gallery justify-content-start"
                                            style={{
                                                boxShadow: isMobile ? '0px' : '0px 17px 18px -14px rgba(0,0,0,0.5)',
                                                padding: '0 0 1em 0',
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
                                        <br />
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Box sx={{ mt: 1 }}>
                                                <Typography style={{ fontSize: '18px', padding: 1 }}>Beziehungsstatus</Typography>
                                                <Typography>Single</Typography>
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <Typography style={{ fontSize: '18px', padding: 1 }}>Figure</Typography>
                                                <Typography>Schlank</Typography>
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <Typography style={{ fontSize: '18px', padding: 1 }}>Augenfrabe</Typography>
                                                <Typography>Blau</Typography>
                                            </Box>
                                            <Box sx={{ mt: 1 }}>
                                                <Typography style={{ fontSize: '18px', padding: 1 }}>Haarfrabe</Typography>
                                                <Typography>Biond</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
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
                                )}
                            </Grid>
                        </Grid>

                        {isMobile && <Typography style={{ textAlign: 'center', padding: 3 }}>meldon</Typography>}

                        {isMobile ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',gap:'8px',my:6,backgroundImage:'linear-gradient(to bottom,white,lightGray,gray)',height:'100px' }}>
                                <IconButton sx={{p:2,backgroundColor:'white'}}>
                                    <Box
                                     component={'img'}
                                     src={MessageIcon}
                                     sx={{width:'30px',height:'30px'}}
                                    />
                                </IconButton>
                                <IconButton sx={{p:2.4,backgroundColor:'white'}}>
                                    <Favorite sx={{color:Config.GLOBAL_PRIMARY_COLOR}} />
                                </IconButton>
                                <IconButton sx={{p:2.4,backgroundColor:Config.GLOBAL_PRIMARY_COLOR}}>
                                    <PeopleAltRounded sx={{color:'white'}}/>
                                </IconButton>
                            </Box>
                        ) : (
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
                        )}

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
            <br></br>
            <div
                className="flex wrap image-gallery justify-content-start"
                style={{
                    boxShadow: '0px 17px 18px -14px rgba(0,0,0,0.5)',
                    padding: '0 0 1em 0',
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
                        ></article>

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
        </>
    );
});

export default StrangerProfilePage;

