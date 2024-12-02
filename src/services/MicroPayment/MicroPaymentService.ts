import MD5 from 'crypto-js/md5';

import { Config } from './../../config/config';

export type PaymentMethod = 'creditcard' | 'directbanking' | 'prepayment' | 'paypal' | 'paysafecard';
export enum PaymentMethods {
    PAY_PAL = 'paypal',
    KLARNA = 'directbanking',
    CREDIT_CARD = 'creditcard',
    VORKASSE = 'prepayment',
    PAYSAFECARD = 'paysafecard',
}

export class MicroPaymentService {
    private static _projectID: string;
    private static _accessKey: string;
    // MICROPAYMENT_PROJECT_ID: '12s6-dkppe-c4bae406',
    // MICROPAYMENT_ACCESS_KEY: '2c1c80ca17d008a02e10e8b8361da2b5',

    public static init() {
        this._accessKey = Config.MICROPAYMENT_ACCESS_KEY;
        this._projectID = Config.MICROPAYMENT_PROJECT_ID;
    }

    public static getPaymentUrl(
        paymentType: PaymentMethod,
        title: string,
        amount: number,
        currency: string = 'EUR',
        userId: string,
        productId: string,
        email?: string
    ) {
        const { domain, method } = this._getPaymentDomainAndMethod(paymentType);
        const paymentUrl = new URL(`https://${domain}.micropayment.${Config.GLOBAL_MICROPAYMENT_TLD}/${method}/event/`);
        paymentUrl.searchParams.append('project', this._projectID);
        paymentUrl.searchParams.append('amount', this._formatAmount(amount));
        paymentUrl.searchParams.append('currency', currency);
        paymentUrl.searchParams.append('title', title);
        paymentUrl.searchParams.append('userid', userId);
        paymentUrl.searchParams.append('redirectUrl', productId);
        paymentUrl.searchParams.append('method', method);       

        // if (email) {
        //     if (paymentType === PaymentMethods.PAYSAFECARD) {
        //         paymentUrl.searchParams.append('mp_user_email', email);
        //     }

        //     paymentUrl.searchParams.append('email', email);
        // }

        if (paymentType === PaymentMethods.PAYSAFECARD) {
            paymentUrl.searchParams.append('mp_user_id', userId);
        }
        // paymentUrl.searchParams.append('paytext', 'Test');

        if (process.env.NODE_ENV === 'development') {
            paymentUrl.searchParams.append('testmode', '1');
        } else {
            paymentUrl.searchParams.append('testmode', '0');
        }

        return this._generateSeal(paymentUrl).href;
    }

    private static _formatAmount(amount: number) {
        return amount.toFixed(2).replace(',', '').replace('.', '');
    }

    private static _generateSeal(paymentUrl: URL) {
        paymentUrl.searchParams.append('seal', this._generateMD5(paymentUrl.href));

        return paymentUrl;
    }

    private static _generateMD5(paymentURL: string) {
        const matches = /^(http(?:s?):\/\/[^?]*?\?)?\?*(.*?)(?:&?seal=([^&]*)(&?.*)?)?$/.exec(paymentURL);
        if (!matches) {
            return '';
        }

        return MD5(decodeURIComponent(matches[2]) + this._accessKey).toString() + (matches[4] ?? '');
    }

    private static _getPaymentDomainAndMethod(paymentType: PaymentMethod) {
        switch (paymentType) {
            case PaymentMethods.CREDIT_CARD:
                return {
                    domain: 'creditcard',
                    method: 'creditcard',
                };
            case PaymentMethods.KLARNA:
                return {
                    domain: 'directbanking',
                    method: 'sofort',
                };
            case PaymentMethods.PAY_PAL:
                return {
                    domain: 'paypal',
                    method: 'paypal',
                };
            case PaymentMethods.VORKASSE:
                return {
                    domain: 'prepayment',
                    method: 'prepay',
                };
            case PaymentMethods.PAYSAFECARD:
                return {
                    domain: 'paysafecard',
                    method: 'paysafecard',
                };
            default:
                return {
                    domain: '',
                    method: '',
                };
        }
    }
}

export default MicroPaymentService;
