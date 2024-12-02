import { Button, Dialog } from '@material-ui/core';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import MicroPaymentService, { PaymentMethod, PaymentMethods } from 'services/MicroPayment/MicroPaymentService';
import Stripe from '../../../assets/images/payment/stripe.svg';
import Klarna from '../../../assets/images/payment/Klarna_Logo_black.svg';
import PayPal from '../../../assets/images/payment/PayPal.svg';
import Paysafecard from '../../../assets/images/payment/Paysafecard_logo.svg';
import Icon from 'components/Icon';
import { faArrowRight, faMoneyCheck } from '@fortawesome/pro-light-svg-icons';
import Config from 'config/config';
import { PayPalButton } from 'react-paypal-button-v2';
import { PaymentCard } from './components/PaymentCard/PaymentCard';
import useTranslation from '../../../services/i18n/core/useTranslation';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

export interface IAppShopPageProps {}

export const AppShopPage = (props: any) => {
    const { selectedProduct, image, onClose, open, user, Buy, handleResult } = props || {};
    const { SHOP_PAYPAL_TEXT, SHOP_CREDIT_CARD_TEXT, SHOP_KLARNA_TEXT, SHOP_VORKASSE_TEXT, SHOP_PAYSAFECARD_TEXT, BUY } = useTranslation();
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethods.PAY_PAL);

    const [paypalVisible, setPayPalVisible] = useState(false);
    const [klarnaVisible, setKlarnaVisible] = useState(false);
    const [creditVisible, setCreditVisible] = useState(false);
    const [vorkasseVisible, setVorkasseVisible] = useState(false);
    const [pscVisible, setPSCVisible] = useState(false);

    console.log('selectedProduct ===>', selectedProduct);

    const checkPaymentmethodStatus = async () => {
        try {
            const response = await fetch(
                Config.ADMIN_URL + '?mode=getZahlungsmethoden&site=' + Config.GLOBAL_SITE_DOMAIN + '&apikey=' + Config.ADMIN_APIKEY
            );
            const data = await response.json();

            for (const item of data) {
                if (item[1] == 1) {
                    switch (item[0]) {
                        case 'PayPal':
                            setPayPalVisible(true);
                            break;
                        case 'Klarna':
                            setKlarnaVisible(true);
                            break;
                        case 'CreditCard':
                            setCreditVisible(true);
                            break;
                        case 'Vorkasse':
                            setVorkasseVisible(true);
                            break;
                        case 'PaySafeCard':
                            setPSCVisible(true);
                            break;
                    }
                }
            }
        } catch (error) {}
    };

    checkPaymentmethodStatus();

    return (
        <Dialog open={open} onClose={onClose}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        p: 2,
                    }}
                    onClick={onClose}
                >
                    <Close color="error" />
                </IconButton>
                <Typography fontSize={'1.3em'} fontWeight={'bold'} p={1}>
                    {BUY}
                </Typography>
                <Box
                    sx={{
                        p: '2em',
                        border: '1px solid gray',
                        borderRadius: '8px',
                        px: '4em',
                    }}
                >
                    <Typography color={'black'} fontSize={{ md: '1.2em' }} fontWeight={'bold'}>
                        {selectedProduct?.Name || selectedProduct?.name}
                        {/* {Config.GLOBAL_SITE_COINS} */}
                    </Typography>
                    <img src={image} height={50} style={{ margin: '20px' }} className="coin-card-content-img spacing " alt="coins" />
                    <Typography color={'black'} fontSize={{ md: '1.2em' }} fontWeight={'bold'}>
                        {selectedProduct?.Amount || selectedProduct?.amount}€
                    </Typography>
                </Box>
                <br></br>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                    }}
                >
                    {paypalVisible && (
                        <PaymentCard
                            type={PaymentMethods.PAY_PAL}
                            text={SHOP_PAYPAL_TEXT}
                            selected={selectedPayment === PaymentMethods.PAY_PAL}
                            handleSelectPaymentMethod={setSelectedPayment}
                        />
                    )}
                    {klarnaVisible && (
                        <PaymentCard
                            type={PaymentMethods.KLARNA}
                            text={SHOP_KLARNA_TEXT}
                            selected={selectedPayment === PaymentMethods.KLARNA}
                            handleSelectPaymentMethod={setSelectedPayment}
                        />
                    )}
                    {creditVisible && (
                        <PaymentCard
                            type={PaymentMethods.CREDIT_CARD}
                            text={SHOP_CREDIT_CARD_TEXT}
                            selected={selectedPayment === PaymentMethods.CREDIT_CARD}
                            handleSelectPaymentMethod={setSelectedPayment}
                        />
                    )}
                    {vorkasseVisible && (
                        <PaymentCard
                            type={PaymentMethods.VORKASSE}
                            text={SHOP_VORKASSE_TEXT}
                            selected={selectedPayment === PaymentMethods.VORKASSE}
                            handleSelectPaymentMethod={setSelectedPayment}
                        />
                    )}
                    {pscVisible && (
                        <PaymentCard
                            type={PaymentMethods.PAYSAFECARD}
                            text={SHOP_PAYSAFECARD_TEXT}
                            selected={selectedPayment === PaymentMethods.PAYSAFECARD}
                            handleSelectPaymentMethod={setSelectedPayment}
                        />
                    )}
                </Box>

                {selectedProduct /*&& (selectedPayment !== PaymentMethods.PAY_PAL || !Config.GLOBAL_INTERN_PAYPAL)*/ && (
                    <Button
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                        }}
                        endIcon={<Icon icon={faArrowRight} />}
                        component={Link}
                        target="_blank"
                        href={MicroPaymentService.getPaymentUrl(
                            selectedPayment,
                            (selectedProduct?.Name ?? selectedProduct?.name) ?? 0,
                            (selectedProduct?.Amount ?? selectedProduct?.amount) ?? 0,
                            'EUR',
                            user?.Userid,
                            (selectedProduct?.uuid ?? selectedProduct?.StoreId)
                            // TODO: Email
                        )
                            .replace(
                                'https://creditcard.micropayment.' + Config.GLOBAL_MICROPAYMENT_TLD + '/creditcard/event/',
                                'https://admin.' + Config.GLOBAL_SITE_DOMAIN + '/create-checkout-session.php'
                            )
                            .replace(
                                'https://paypal.micropayment.' + Config.GLOBAL_MICROPAYMENT_TLD + '/paypal/event/',
                                'https://admin.' + Config.GLOBAL_SITE_DOMAIN + '/create-paypal-checkout-session.php'
                            )}
                    >
                        {Buy}
                    </Button>
                )}

                {/*Config.GLOBAL_INTERN_PAYPAL && paypalVisible && selectedPayment === PaymentMethods.PAY_PAL && (
                    <div className="ppBtn">
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
                )*/}
            </Box>
        </Dialog>
    );
};

export default AppShopPage;

