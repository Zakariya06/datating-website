import { createContext } from 'react';

export interface ICoinConsumerContext {
    setModalOpen(): void;
}

export const CoinConsumerContext = createContext<ICoinConsumerContext>({ setModalOpen: () => null });
