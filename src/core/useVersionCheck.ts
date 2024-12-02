import { useEffect, useState } from 'react';

// type VersionCheckResult = [updateNeeded: boolean, storeURL: string];
type VersionCheckResult = [boolean, string];

export default function useVersionCheck(): VersionCheckResult {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updateNeeded, setUpdateNeeded] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [storeURL, setStoreURL] = useState('');

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        // VersionCheck.needUpdate({
        //     depth: 3,
        //     provider: Platform.OS === 'android' ? 'playStore' : 'appStore',
        // }).then((res) => {
        //     setUpdateNeeded(res.isNeeded);
        //     setStoreURL(res.storeUrl);
        // });
        // if (process.env.NODE_ENV !== 'production') {
        //     console.log('Lokale Version: ', await VersionCheck.getCurrentVersion());
        //     console.log('AppStore-Version: ', await VersionCheck.getLatestVersion());
        // }
    }, []);

    return [updateNeeded, storeURL];
}
