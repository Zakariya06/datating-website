import { Config } from './../../config/config';

export class PayPalService {
    private static _isInitialized: boolean = false;

    public static init() {
        if (this._isInitialized) {
            return;
        }

        // inject the facebook script tag
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute(
            'src',
            `https://www.paypal.com/sdk/js?client-id=${Config.PAYPAL_TOKEN}&disable-funding=credit,card,bancontact,sepa,sofort,giropay&currency=EUR`
        );

        document.body.appendChild(scriptTag);
        this._isInitialized = true;
    }
}

export default PayPalService;
