import { useEffect } from 'react';

import AdjustService from './AdjustService';

export function useAdjust() {
    useEffect(() => {
        // Adjust
        AdjustService.init();

        return () => {
            AdjustService.stop();
        };
    }, []);
}

export default useAdjust;
