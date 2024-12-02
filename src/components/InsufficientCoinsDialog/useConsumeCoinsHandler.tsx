import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { getBalance } from '../../models/user/IUser';
import { getUser } from '../../selectors/AuthenticationSelectors';
import { CoinConsumerContext } from './CoinConsumerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...params: any) => any;

export function useConsumeCoinsHandler(fn: AnyFunction, amount: number) {
    const { setModalOpen } = useContext(CoinConsumerContext);

    const user = useSelector(getUser);

    return user && getBalance(user) >= amount ? fn : setModalOpen;
}
