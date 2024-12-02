import { faEuroSign, faMoneyCheck } from '@fortawesome/pro-light-svg-icons';
import { Paper, Typography } from '@material-ui/core';
import  { CSSProperties, memo,  } from 'react';

import Klarna from '../../../../../assets/images/payment/Klarna_Logo_black.svg';
//import MC from '../../../../../assets/images/payment/Mastercard-logo.svg';
import PayPal from '../../../../../assets/images/payment/PayPal.svg';
import Paysafecard from '../../../../../assets/images/payment/Paysafecard_logo.svg';
//import Visa from '../../../../../assets/images/payment/Visa_2014_logo_detail.svg';
import Icon from '../../../../../components/Icon';
import { PaymentMethod, PaymentMethods } from '../../../../../services/MicroPayment/MicroPaymentService';
import Config from '../../../../../config';
import Stripe from '../../../../../assets/images/payment/stripe.svg';

export interface IPaymentCardProps {
    text: string;
    type: PaymentMethod;
    selected: boolean;
    handleSelectPaymentMethod(paymentMethod: PaymentMethod): void;
}

export const PaymentCard = memo((props: IPaymentCardProps) => {
    const { type, selected, handleSelectPaymentMethod } = props;
    // const [setHover] = useState<boolean>(false);

    const cardStyle: CSSProperties = {
        cursor: 'pointer',
        border: selected ? `2px solid ${Config.GLOBAL_PRIMARY_COLOR}` : '2px solid transparent',
        padding: '10px',
        margin: '10px',
        marginBottom: '20px'
    };

    const handleClick = () => {
        handleSelectPaymentMethod(type);
    };

    return (
        <Paper
            onClick={handleClick}
           
            //onMouseEnter={() => setHover(true)}
            //onMouseLeave={() => setHover(false)}
            style={cardStyle}
            square
            className="payment-card pointer"
        >
            <div>
                <div>
                    {type === PaymentMethods.CREDIT_CARD ? (
                        <div className="flex">
                            {/*<div className="flex column">
                                <div className="flex full-height align-self-center align-items-center">
                                    <div className="flex column">
                                        <img draggable={false} alt="visa" width={70} src={Visa} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex column">
                                <img draggable={false} alt="mastercard" width={70} src={MC} />
                            </div>*/}
                            <img alt="stripe" draggable={false} width={100} src={Stripe} />
                        </div>
                    ) : type === PaymentMethods.VORKASSE ? (
                        <div className="flex">
                            <div>
                                <Icon fontSize="large" icon={faMoneyCheck} />
                            </div>
                            <div>
                                <Icon fontSize="large" icon={faEuroSign} />
                            </div>
                            <div style={{ textAlign: 'left' }} className="flex column justify-content-center">
                                <Typography variant="caption">Vorkasse</Typography>
                                <Typography variant="caption">Überweisung</Typography>
                            </div>
                        </div>
                    ) : type === PaymentMethods.PAY_PAL ? (
                        <img alt="paypal" draggable={false} width={120} src={PayPal} />
                    ) : type === PaymentMethods.KLARNA ? (
                        <img alt="klarna" draggable={false} width={120} src={Klarna} />
                    ) : (
                        <img alt="paysafecard" draggable={false} width={120} src={Paysafecard} />
                    )}
                </div>
                {/* <Typography className="payment-card-text" style={{ textAlign: 'left', marginTop: 16 }}>
                    {text}
                </Typography> */}
            </div>
        </Paper>
    );
});

export default PaymentCard;