import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { Typography } from '@material-ui/core';
import Icon from '../../../components/Icon';
import { memo, useEffect } from 'react';

export interface IPaymentSucceededProps {}

export const PaymentSucceeded = memo((props: IPaymentSucceededProps) => {
    useEffect(() => {
        window.open('', '_self');
        window.close();
    }, []);

    return (
        <div className="full-width flex align-items-center column spacing padding left right double triple padding top">
            <Icon iconColor="#2dad2d" icon={faCheckCircle} style={{ fontSize: 56 }} className="spacing padding bottom" />
            <Typography variant="h4" className="spacing padding bottom">
                Vielen Dank!
            </Typography>
            <Typography variant="body2" className="text-align-center spacing padding bottom double">
                Die Zahlung war erfolgreich. Du kannst dieses Fenster jetzt schließen.
            </Typography>
        </div>
    );
});

export default PaymentSucceeded;
