import { useMemo } from 'react';

import UUid from './UUid';

export const getUniqueId = () => {
    // TODO: get uuid from Localstoage!
    return UUid.generate();
};

export function useUniqueId() {
    const deviceId = useMemo(getUniqueId, []);
    return deviceId;
}

export default useUniqueId;
