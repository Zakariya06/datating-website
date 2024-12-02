import './ShopPage.scss';

import { faArrowRight } from '@fortawesome/pro-light-svg-icons';
import { Button, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import ShopActionCreator from '../../../actions/ShopActionCreator';
import Coin1600 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin200 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin600 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin85 from '../../../assets/images/coins/new-lovecoin.svg';
import Coin950 from '../../../assets/images/coins/new-lovecoin.svg';
import Config from '../../../config';
import { IProduct } from '../../../models/product/IProduct';
import { IState } from '../../../models/state';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import { getProducts } from '../../../selectors/ShopSelectors';
import ResourceService from '../../../services/i18n';
import useTranslation from '../../../services/i18n/core/useTranslation';
import MicroPaymentService, { PaymentMethod, PaymentMethods } from '../../../services/MicroPayment/MicroPaymentService';
import PayPalService from '../../../services/PayPal/PayPalService';
import CoinCard from './components/CoinCard';

import FetchApi from '../../../core/fetch/FetchApi';
import { HttpMethods } from '../../../core/fetch/HttpMethod';
import formatRequestBody from '../../../temp/formatRequestBody';
import generateValidUrl from '../../../core/fetch/generateValidUrl';
import useHistoryPush from '../../../core/useHistoryPush';
import { PROFILE_PATH } from '../../../models/Paths';
import { Box } from '@mui/material';
import AppShopPage from './AppShopPage';
import BonusCodeDialog from '../components/BonusCodeDialog';

export interface IShopPageProps {}

MicroPaymentService.init();
PayPalService.init();

export const ShopPage = memo((props: IShopPageProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethods.PAY_PAL);
    const { products, user } = useSelector((state: IState) => ({ products: getProducts(state), user: getUser(state) }), shallowEqual);
    const { BUY } = useTranslation();
    const filteredProducts = useMemo(
        () =>
            products._embedded.items.filter((x) =>
                selectedPayment === PaymentMethods.PAYSAFECARD ? x.market !== 'Standard' : x.market === 'Standard'
            ),
        [selectedPayment, products]
    );

    const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
        filteredProducts.length >= 3 ? filteredProducts[2] : filteredProducts[0]
    );


    const [paypalVisible, setPayPalVisible] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openBonusCodeDialog, setOpenBonusCodeDialog] = useState<boolean>(false);

    const dispatch = useDispatch();

    const { SETTINGS_BONUS_CODE_TEXT } = useTranslation();

    useEffect(() => {
        dispatch(ShopActionCreator.fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        if (!filteredProducts.find((x) => x.id === selectedProduct?.id)) {
            setSelectedProduct(filteredProducts.length >= 3 ? filteredProducts[2] : filteredProducts[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPayment, filteredProducts]);

    const redirectToProfile = useHistoryPush(PROFILE_PATH);

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

    if (!user) {
        return null;
    }

    return (
        <>
        <section className="shop flex column align-">
            <div
                className="flex column "
                style={{
                    padding: '0 .3em',
                }}
            >
                <Paper className="full-width" square>
                    <List>
                        <ListItem button onClick={() => setOpenBonusCodeDialog(true)}>
                            <ListItemText primaryTypographyProps={{ style: { fontWeight: 700, textAlign: 'center' } }} primary={SETTINGS_BONUS_CODE_TEXT} />
                        </ListItem>
                    </List>
                </Paper>

                <article className="flex column no-grow spacing double margin top">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }} className={'meet-me-right'}>
                            <Typography
                                component="span"
                                style={{
                                    margin: '0px',
                                    fontSize: '1.1rem',
                                    textTransform: 'unset',
                                    lineHeight: 'normal',
                                    fontWeight: '600',
                                    fontFamily: 'Arial, sans-serif',
                                }}
                            >
                                STARTE JETZT DURCH.
                            </Typography>
                            <Typography
                                className="meet-hdd"
                                variant="h4"
                                style={{
                                    fontSize: '2rem',
                                    lineHeight: '1',
                                    fontWeight: '900',
                                    letterSpacing: '-3px',
                                    fontFamily: '"Arial", sans-serif',
                                    margin: '2rem 0',
                                }}
                            >
                                Gehe den nächsten Schritt mit unseren {Config.GLOBAL_SITE_COINS}-Paketen
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{
                                    lineHeight: '1.8',
                                    fontSize: '1.2rem',
                                    fontWeight: 'normal',
                                    fontFamily: '"Arial", sans-serif',
                                }}
                            >
                                Entdecke mit unseren {Config.GLOBAL_SITE_COINS}-Paketen eine neue Dimension deiner Online-Dating-Erfahrung. Schlage die Brücke zu
                                aufregenden Möglichkeiten jenseits traditioneller Abonnementmodelle und erlebe vollkommene Flexibilität und Kontrolle.
                                <br></br>
                                <br></br>✅ <b>Kein Abo</b>: Keine langfristigen Verpflichtungen oder wiederkehrenden Zahlungen erforderlich.<br></br>
                                ✅ <b>Sofortige Gutschrift</b>: Deine bestellten {Config.GLOBAL_SITE_COINS} stehen dir sofort zur Verfügung, ohne Wartezeiten.<br></br>✅{' '}
                                <b>Volle Kontrolle</b>: Du behältst die Kontrolle über deine Ausgaben und es gibt keine versteckten Kosten.<br></br>✅{' '}
                                <b>Mehr Möglichkeiten</b>: Entdecke zusätzliche Funktionen für erweiterte Nutzungsmöglichkeiten und ein verbessertes
                                Online-Erlebnis.<br></br>
                            </Typography>
                        </Grid>

                        <Grid item sm={12} md={10} lg={6} style={{ marginTop: 20 }} className={'meet-me-right'}>
                            <Box>
                                {filteredProducts.map((product, index) => (
                                    <CoinCard
                                        key={product.id}
                                        {...product}
                                        image={getImageForAmount(product.coins)}
                                        {...getTag(index)}
                                        title={product.name}
                                        selected={selectedProduct?.id === product.id}
                                        onClick={()=> { setSelectedProduct(product), handleOpen() }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </article>
            </div>

            <div className="flex no-grow justify-content-end  padding top">
                {/* {selectedProduct && (selectedPayment !== PaymentMethods.PAY_PAL || !Config.GLOBAL_INTERN_PAYPAL) && ( */}
                    {/*<Button
                        disabled={!selectedPayment || !selectedProduct}
                        endIcon={<Icon icon={faArrowRight} />}
                        component={Link}
                        target="_blank"
                        onClick={handleOpen}
                        // href={MicroPaymentService.getPaymentUrl(
                        //     selectedPayment,
                        //     selectedProduct?.name ?? '',
                        //     selectedProduct?.amount ?? 0,
                        //     'EUR',
                        //     user.Userid,
                        //     selectedProduct?.uuid
                        //     // TODO: Email
                        // ).replace(
                        //     'https://creditcard.micropayment.ch/creditcard/event/',
                        //     'https://admin.' + Config.GLOBAL_SITE_DOMAIN + '/create-checkout-session.php'
                        // )}
                    >
                        {BUY}
                            </Button>*/}
                
                {open && (
                    <AppShopPage
                        selectedProduct={selectedProduct}
                        selectedPayment={selectedPayment}
                        image={getImageForAmount(selectedProduct ? selectedProduct?.coins : 0)}
                        open={open}
                        onClose={handleClose}
                        user={user}
                        Buy={BUY}
                        paypalVisible={paypalVisible}
                        handleResult={handleResult}
                    />
                )}
                {/* {Config.GLOBAL_INTERN_PAYPAL && paypalVisible && selectedPayment === PaymentMethods.PAY_PAL && (
                    <div className="">
                        <PayPalButton
                            amount={selectedProduct?.amount ?? 0}
                            currency={'EUR'}
                            shippingPreference="NO_SHIPPING"
                            onSuccess={handleResult}
                            options={{
                                clientId: Config.PAYPAL_TOKEN,
                                debug: false,
                                disableFunding: 'credit,card,bancontact',
                                currency: 'EUR',
                            }}
                            style={{
                                shape: 'pill',
                                color: 'black',
                                label: 'paypal',
                            }}
                        />
                    </div>
                )} */}
            </div>
        </section>
        <BonusCodeDialog open={openBonusCodeDialog} onClose={() => setOpenBonusCodeDialog(false)} />
        </>
    );
});

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

function getTag(index: number) {
    switch (index) {
        case 2:
            return {
                tag: ResourceService.getCurrentResources().SHOP_POPULAR,
                //tagColor: 'rgb(255, 23, 68)',
                tagColor: 'linear-gradient(90deg, ' + Config.GLOBAL_PRIMARY_COLOR + ' 0%, #ab5d9a 100%)',
            };
        case 4:
            return {
                tag: ResourceService.getCurrentResources().SHOP_RECOMMENDED,
                tagColor: 'linear-gradient(90deg, ' + Config.GLOBAL_PRIMARY_COLOR + ' 0%, #ab5d9a 100%)',
            };
    }
}

export default ShopPage;

