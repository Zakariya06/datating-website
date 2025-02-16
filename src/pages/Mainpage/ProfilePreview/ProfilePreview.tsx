import { Badge, useMediaQuery } from '@mui/material';
// import ProgressiveImage from 'components/ProgressiveImage';
import Config from 'config/config';
import generateValidUrl from 'core/fetch/generateValidUrl';
import useHistoryPush from 'core/useHistoryPush';
import { PROFILE_PATH, SHOP_PATH } from 'models/Paths';
import { getAge, getBalance, getProfileImage } from 'models/user/IUser';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserAndToken } from 'selectors/AuthenticationSelectors';
import CoinIcon from '../../../assets/images/coins/skipped-coin-80.svg';
import TurboRocket from 'components/TurboRocket';
import useTranslation from 'services/i18n/core/useTranslation';
import { Link } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import ThemeContext from 'theme/ThemeContext';
import LogoOnly from '../../../assets/images/logos/logoonly.svg';
import SkippedLogoAlt from '../../../assets/images/logos/logo-with-writing-white.svg';
import SkippedLogo from '../../../assets/images/logos/logo-with-writing.svg';
import { Global } from '@emotion/react';
import Icon from 'components/Icon';
import { faCog, faLocationArrow } from '@fortawesome/pro-light-svg-icons';
import NewsFeedUserStatItem from '../NewsFeed/NewsFeedUserStatItem';
import PremiumDialog from '../components/PremiumDialog';
import { PaymentMethod, PaymentMethods } from 'services/MicroPayment/MicroPaymentService';
import AppShopPage from '../ShopPage/AppShopPage';
import Coin1600 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin200 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin600 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin85 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin950 from '../../../assets/images/coins/new-lovecoin.svg';
import FetchApi from 'core/fetch/FetchApi';
import formatRequestBody from 'temp/formatRequestBody';
import { HttpMethods } from 'core/fetch/HttpMethod';
import ConfirmEmailModal from 'components/ConfirmEmailModal';
import UploadVerifyPictureDialog from '../ProfilePage/components/UploadVerifyPictureDialog';

import React from 'react';
import { Card, CardContent, Avatar, Typography, Box, Button, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import DirectInteractionActionCreator from 'actions/DirectInteractionActionCreator';
import useUserAndToken from 'core/useUserAndToken';
import TurboRocketModal from 'components/TurboRocket/TurboRocketModal';

// Styled components
const StatsBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(4),
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const TimerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const PremiumBox = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(158.58deg, #e3b23c0a 18.6%, ${Config.GLOBAL_PRIMARY_COLOR}66 92.64%)`,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 20,
    fontFamily: 'Nunito, -apple-system, BlinkMacSystemFont, sans-serif !important',
}));
const timeBoxStyle = {
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
};
const ProfilePreview = (props: any) => {
    // const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState<boolean>(false);
    const user = useSelector(getUser);
    // const isMobile = useMediaQuery('(max-width:1000px)', { defaultMatches: true });
    const profileImage = user ? getProfileImage(user) : undefined;
    // const handleProfileImageClick = () => setIsProfileImageDialogOpen(true);
    const profileImg = profileImage ? generateValidUrl(profileImage) : Config.FALLBACK_IMAGE;
    const handleCoinClick = useHistoryPush(SHOP_PATH);
    const { Username, Birthday, City, Email } = user ?? {};
    const { NEWSFEED_EMAIL_VERIFICATION, SETTINGS_SHOP_TITLE, BUY, NEWSFEED_VERIFY } = useTranslation();
    const { type } = useContext(ThemeContext);
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    const [openConfirmEmailDialog, setOpenConfirmEmailDialog] = useState<boolean>(false);
    const [openPremiumDialog, setOpenPremiumDialog] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<any>();
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethods.PAY_PAL);
    const [openUploadVerifyPicture, setOpenUploadVerifyPicture] = useState<boolean>(false);
    const [openTurboRocketDialog, setOpenTurboRocketDialog] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paypalVisible, setPayPalVisible] = useState(true);
    const redirectToProfile = useHistoryPush(PROFILE_PATH);
    const [counter, setCounter] = useState<any>();

    const [hours, setHours] = useState<any>();
    const [minutes, setMinutes] = useState<any>();
    const [seconds, setSeconds] = useState<any>();
    const [timeLeft, setTimeLeft] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (counter && counter[0]?.End) {
            const calculateTimeLeft = () => {
                const endDateTime = new Date(counter[0].End);
                const now = new Date();
                const difference = endDateTime.getTime() - now.getTime();

                if (difference > 0) {
                    // Calculate days first
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    // Add the days to hours calculation
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeLeft({
                        hours,
                        minutes,
                        seconds,
                    });
                } else {
                    // Timer has expired
                    setTimeLeft({
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    });
                }
            };

            // Calculate initial time
            calculateTimeLeft();

            // Update every second
            const timer = setInterval(calculateTimeLeft, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(timer);
        }
    }, [counter]);

    const TimerDisplay = () => (
        <TimerBox>
            <Box sx={timeBoxStyle}>
                <Typography variant="h5">{String(timeLeft.hours).padStart(2, '0')}</Typography>
                <Typography variant="caption">Stunden</Typography>
            </Box>
            <Typography variant="h5">:</Typography>
            <Box sx={timeBoxStyle}>
                <Typography variant="h5">{String(timeLeft.minutes).padStart(2, '0')}</Typography>
                <Typography variant="caption">Minuten</Typography>
            </Box>
            <Typography variant="h5">:</Typography>
            <Box sx={timeBoxStyle}>
                <Typography variant="h5">{String(timeLeft.seconds).padStart(2, '0')}</Typography>
                <Typography variant="caption">Sekunden</Typography>
            </Box>
        </TimerBox>
    );

    const { token } = useUserAndToken();
    useEffect(() => {
        if (user && token) {
            void (async () => {
                const res = await (await DirectInteractionActionCreator.getDeal(token, user)).json();

                setCounter(res);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getImageForAmount(coins: number) {
        if (coins <= 85) {
            return '../' + Coin85;
        } else if (coins <= 200) {
            return '../' + Coin200;
        } else if (coins <= 600) {
            return '../' + Coin600;
        } else if (coins <= 1000) {
            return '../' + Coin950;
        } else {
            return '../' + Coin1600;
        }
    }

    const handleResult = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (details: any, data: any) => {
            //await dispatch(WalletActionCreator.purchaseProduct(props, data.orderID));

            if (Config.GLOBAL_INTERN_PAYPAL) {
                const href = generateValidUrl('paypal_payment');

                const dataArray = [
                    {
                        userid: user?.Userid,
                        storeid: selectedProduct?.uuid,
                        amount: selectedProduct?.amount,
                        transid: details.id,
                        status: details.status,
                    },
                ];

                FetchApi.fetch(href, formatRequestBody('paypal_payment', undefined, { data: dataArray }), HttpMethods.POST);

                //Logger.log('details:', details);
                //Logger.log('data:', await data);

                redirectToProfile();
            }

            //await dispatch(ShopActionCreator.paypalPurchase({productId: data.orderID}))
        },
        [selectedProduct?.amount]
    );
    const handleSelection = (product: any) => {
        setSelectedProduct(product);
        handleOpen();
        setOpenPremiumDialog(false);
    };

    return (
        <div>
            {/* <Box
                bgcolor={type === 'light' ? 'white' : 'rgb(42, 42, 42)'}
                height={{ xs: 'none' }}
                width={'270px'}
                position={'relative'}
                borderRadius={'20px'}
                p={2}
            >
                heello
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pb: 2,
                    }}
                >
                    <Box
                        sx={{
                            mx: 'auto',
                        }}
                    >
                        <img
                            draggable={false}
                            src={!isDesktop ? LogoOnly : type === 'dark' ? SkippedLogoAlt : SkippedLogo}
                            alt="verpaar-logo"
                            style={{ height: 38, userSelect: 'none' }}
                        />
                    </Box>
                </Box>
                <Avatar
                    sx={{
                        width: '150px',
                        height: '150px',
                        mt: 'auto',
                        display: 'block',
                        margin: 'auto',
                    }}
                    src={user ? generateValidUrl(getProfileImage(user) ?? '') : undefined}
                    component={Link}
                    to={PROFILE_PATH}
                    alt="avater"
                />
                <Typography textAlign={'center'} fontSize={'2em'} mt={2}>
                    {Username}, {Birthday && getAge(Birthday)}
                </Typography>
                <Typography textAlign={'center'}>
                    <Icon style={{ fontSize: '0.9rem' }} icon={faLocationArrow} /> {City}
                </Typography>
                {user?.Premium && (
                    <Typography
                        style={{ backgroundColor: `${Config.GLOBAL_PRIMARY_COLOR}80`, borderRadius: 20, fontWeight: 700 }}
                        textAlign={'center'}
                    >
                        Premium
                    </Typography>
                )}
                <Typography
                    sx={{
                        textAlign: 'center',
                        color: 'orange',
                        mt: 2,
                    }}
                >
                    {Email}
                </Typography>
                <NewsFeedUserStatItem
                    text={NEWSFEED_EMAIL_VERIFICATION}
                    value={Boolean(user?.Verifiy)}
                    button
                    onClick={() => setOpenConfirmEmailDialog(true)}
                />
                {Boolean(user?.Verifiy) && (
                    <NewsFeedUserStatItem
                        text={NEWSFEED_VERIFY}
                        value={Boolean(user?.Verified)}
                        button
                        onClick={() => setOpenUploadVerifyPicture(true)}
                    />
                )}
                <Box
                    sx={{
                        display: 'flex',
                        textAlign: 'center',
                        m: 'auto',
                        justifyContent: 'center',
                        mt: 5,
                        mb: 2,
                    }}
                >
                    <TurboRocket />
                    <Link to={PROFILE_PATH} color="inherit">
                        <div style={{ paddingRight: 20, cursor: 'pointer' }}>
                            <Icon style={{ alignSelf: 'center', height: 40, width: 'auto', color: '#000000' }} icon={faCog} />
                        </div>
                    </Link>
                </Box>
            </Box> */}
            {/* <Box
                bgcolor={type === 'light' ? 'white' : 'rgb(42, 42, 42)'}
                height={{ xs: 'none' }}
                width={'270px'}
                position={'relative'}
                borderRadius={'20px'}
                p={2}
                mt={2}
            >
                <Typography textAlign={'center'} fontSize={'1.5em'} mt={2}>
                    <b style={{ color: Config.GLOBAL_PRIMARY_COLOR }}>{user ? getBalance(user) : 0}</b> {Config.GLOBAL_SITE_COINS}
                </Typography>

                <Button
                    component={Link}
                    to={SHOP_PATH}
                    onClick={handleCoinClick}
                    style={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 }}
                    fullWidth
                >
                    {SETTINGS_SHOP_TITLE}
                </Button>
                <Button onClick={() => setOpenPremiumDialog(true)} style={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 }} fullWidth>
                    Premium
                </Button>
            </Box> */}
            <Card sx={{ maxWidth: 400, margin: 'auto', backgroundColor: type === 'light' ? 'white' : 'rgb(42, 42, 42)' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                    {/* Profile Header */}
                    <Avatar sx={{ width: 80, height: 80, bgcolor: 'grey.200', mb: 2 }} component={Link} to={PROFILE_PATH}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.400' }} />
                    </Avatar>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Typography variant="h5" component="h2">
                                {Username}, {Birthday && getAge(Birthday)}
                            </Typography>
                            {user?.Verified == 1 && (
                                <VerifiedIcon style={{ color: Config.GLOBAL_PRIMARY_COLOR }} />
                            )}

                        </Box>
                        <Typography color={type === 'light' ? 'text.secondary' : 'white'}>Stuttgart (Baden-Württemberg), Deutschland</Typography>
                    </Box>
                    <NewsFeedUserStatItem
                        text={NEWSFEED_EMAIL_VERIFICATION}
                        value={Number(user?.Verifiy)}
                        button
                        onClick={() => setOpenConfirmEmailDialog(true)}
                    />
                    <br></br>
                    <NewsFeedUserStatItem
                        text={NEWSFEED_VERIFY}
                        value={Number(user?.Verified)}
                        button
                        onClick={() => setOpenUploadVerifyPicture(true)}
                    />
                    {/* Stats */}
                    <StatsBox>
                        <Link to={SHOP_PATH} style={{ textDecoration: 'none' }}>
                            <Box sx={timeBoxStyle}>
                                <Typography variant="h6">💰</Typography>
                            </Box>
                        </Link>
                        <Box onClick={() => setOpenTurboRocketDialog(true)} sx={timeBoxStyle}>
                            <Typography variant="h6">🚀</Typography>
                        </Box>
                        <Box onClick={() => setOpenPremiumDialog(true)} sx={timeBoxStyle}>
                            <Typography variant="h6">👑</Typography>
                        </Box>
                    </StatsBox>

                    {/* Timer */}
                    {counter && counter[0]?.Enabled === 1 && (
                        <>
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 1,
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold'
                                }}
                                >
                                Bester {Config.GLOBAL_SITE_NAME} Deal! 🎉
                                </Typography>
                                <TimerDisplay />
                            </Box>
                            <PremiumBox>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: '900' }} color={type === 'light' ? 'black' : 'text.secondary'}>
                                    Spare 33% auf volle 3 Monate
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: Config.GLOBAL_PRIMARY_COLOR }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Genieße alle Premium-Vorteile"
                                            sx={{ color: type === 'light' ? 'black' : 'text.secondary' }}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: Config.GLOBAL_PRIMARY_COLOR }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Likes ohne Limit" sx={{ color: type === 'light' ? 'black' : 'text.secondary' }} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: Config.GLOBAL_PRIMARY_COLOR }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Unbegrenzt Profile aufdecken"
                                            sx={{ color: type === 'light' ? 'black' : 'text.secondary' }}
                                        />
                                    </ListItem>
                                </List>
                                <Box sx={{ mt: 2 }}>
                                    <Typography sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>59,97 € / mon.</Typography>
                                    <Typography variant="h6" color={Config.GLOBAL_PRIMARY_COLOR} sx={{ fontWeight: 'bold' }}>
                                        39,99 € / mon.
                                    </Typography>
                                </Box>
                            </PremiumBox>

                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setOpenPremiumDialog(true)}
                                sx={{
                                    bgcolor: 'warning.main',
                                    '&:hover': {
                                        bgcolor: 'warning.dark',
                                    },
                                }}
                            >
                                Weiter - 39,99 € gesamt!
                            </Button>
                    </>
                )}
                </CardContent>
            </Card>
            <UploadVerifyPictureDialog open={openUploadVerifyPicture} onClose={() => setOpenUploadVerifyPicture(false)} />
            <ConfirmEmailModal isOpen={openConfirmEmailDialog} onClose={() => setOpenConfirmEmailDialog(false)} />
            <TurboRocketModal open={openTurboRocketDialog} onClose={() => setOpenTurboRocketDialog(false)} />
            <PremiumDialog
                open={openPremiumDialog}
                handleClose={() => setOpenPremiumDialog(false)}
                setSelectedProduct={(product: any) => {
                    handleSelection(product);
                }}
            />
            {open && selectedProduct && (
                <AppShopPage
                    selectedProduct={selectedProduct}
                    //@ts-ignore
                    selectedPayment={selectedPayment ? selectedPayment.Amount : 0}
                    image={getImageForAmount(selectedProduct ? selectedProduct?.Coins : 0)}
                    open={open}
                    onClose={handleClose}
                    user={user}
                    Buy={BUY}
                    paypalVisible={paypalVisible}
                    handleResult={handleResult}
                />
            )}
        </div>
    );
};

export default ProfilePreview;
