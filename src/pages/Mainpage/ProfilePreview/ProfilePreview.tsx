import { Avatar, Badge, Box, Typography, useMediaQuery } from '@mui/material';
// import ProgressiveImage from 'components/ProgressiveImage';
import Config from 'config/config';
import generateValidUrl from 'core/fetch/generateValidUrl';
import useHistoryPush from 'core/useHistoryPush';
import { PROFILE_PATH, SHOP_PATH } from 'models/Paths';
import { getAge, getBalance, getProfileImage } from 'models/user/IUser';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from 'selectors/AuthenticationSelectors';
import CoinIcon from '../../../assets/images/coins/skipped-coin-80.svg';
import TurboRocket from 'components/TurboRocket';
import useTranslation from 'services/i18n/core/useTranslation';
import { Link } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import ThemeContext from 'theme/ThemeContext';
import LogoOnly from '../../../assets/images/logos/logoonly.svg';
import SkippedLogoAlt from '../../../assets/images/logos/logo-with-writing-white.svg';
import SkippedLogo from '../../../assets/images/logos/logo-with-writing.svg';
import { Button } from '@material-ui/core';
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

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paypalVisible, setPayPalVisible] = useState(true);
    const redirectToProfile = useHistoryPush(PROFILE_PATH);

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
            <Box
                bgcolor={type === 'light' ? 'white' : 'rgb(42, 42, 42)'}
                height={{ xs: 'none' }}
                width={'270px'}
                position={'relative'}
                borderRadius={'20px'}
                p={2}
            >
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
                {Boolean(user?.Verifiy) &&
                    <NewsFeedUserStatItem
                        text={NEWSFEED_VERIFY}
                        value={Boolean(user?.Verified)}
                        button
                        onClick={() => setOpenUploadVerifyPicture(true)}
                    />
                }          
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
            </Box>
            <Box
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
            </Box>
            <UploadVerifyPictureDialog open={openUploadVerifyPicture} onClose={() => setOpenUploadVerifyPicture(false)} />
            <ConfirmEmailModal isOpen={openConfirmEmailDialog} onClose={() => setOpenConfirmEmailDialog(false)} />
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

