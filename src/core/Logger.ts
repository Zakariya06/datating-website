export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static log(message?: any, ...params: any[]) {
        if (process.env.NODE_ENV !== 'production') {
            if (params) {
                // eslint-disable-next-line no-console
                console.log(message, ...params);
            } else {
                // eslint-disable-next-line no-console
                console.log(message);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static warn(message?: any, ...params: any[]) {
        if (process.env.NODE_ENV !== 'production') {
            if (params) {
                // eslint-disable-next-line no-console
                console.warn(message, ...params);
            } else {
                // eslint-disable-next-line no-console
                console.warn(message);
            }
        }
    }
}

export default Logger;
