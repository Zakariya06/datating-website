import React, { memo, useCallback, useMemo, useState } from 'react';

import { CoinConsumerContext } from './CoinConsumerContext';
import InsufficientCoinsDialog from './InsufficientLikesDialog';

export interface ICoinConsumerContextProviderProps {}

export const CoinConsumerContextProvider = memo<ICoinConsumerContextProviderProps>((props) => {
    const { children } = props;
    const [isCoinModalOpen, setisCoinModalOpen] = useState<boolean>(false);

    const handleOpen = useCallback(() => setisCoinModalOpen(true), []);
    const handleClose = useCallback(() => setisCoinModalOpen(false), []);

    const value = useMemo(() => ({ setModalOpen: handleOpen }), [handleOpen]);

    return (
        <CoinConsumerContext.Provider value={value}>
            {children}
            {isCoinModalOpen && <InsufficientCoinsDialog open={isCoinModalOpen} onClose={handleClose} />}
        </CoinConsumerContext.Provider>
    );
});

export default CoinConsumerContextProvider;
