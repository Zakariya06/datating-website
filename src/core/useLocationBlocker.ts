import { Location } from 'history';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export function useLocationBlocker() {
    const history = useHistory();
    useEffect(
        () => {
            history.block((location, action) => {
                const res = Boolean(action !== 'PUSH' || getLocationId(location) !== getLocationId(history.location));

                if (res === false) {
                    return false;
                }
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
}

export default useLocationBlocker;

function getLocationId({ pathname, search, hash }: Location<unknown>) {
    return pathname + (search ? '?' + search : '') + (hash ? '#' + hash : '');
}
