import { addDays } from 'date-fns';

import CookieStorageAPI from './../../core/storage/CookieStorageAPI';
import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';

const lskey = 'ip';

export class IPService {
    private static _currentIP: string;

    public static async initialize() {
        await this.getcurrentIP();
    }

    public static async getcurrentIP() {
        if (!this._currentIP) {
            const value = CookieStorageAPI.getItem(lskey);

            if (!value) {
                this.currentIP = await DirectInteractionActionCreator.getClientIp();
            } else {
                this.currentIP = value;
            }
        }

        return this._currentIP;
    }

    public static get currentIP() {
        return this._currentIP ?? '23.32.161.205'; // Dont' ask. it's the ip of www.cia.gov;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static set currentIP(value: string) {
        this._currentIP = value;
        const expireDate = addDays(new Date(), 1);
        CookieStorageAPI.setItem(lskey, value, { expires: expireDate });
    }
}

export default IPService;
