import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DirectInteractionActionCreator from '../../actions/DirectInteractionActionCreator';
import UserActionCreator from '../../actions/UserActionCreator';
import image from '../../assets/images/modals/turborocket.svg';
import Config from '../../config';
import useUserAndToken from '../../core/useUserAndToken';
import ResourceService from '../../services/i18n';
import useTranslation from '../../services/i18n/core/useTranslation';
import { IBerndTurborocketAlreadyRunning, IBerndTurborocketSuccess } from '../../temp/models/IBerndTurborocket';
import IconModal from '../IconModal';
import { useConsumeCoinsHandler } from '../InsufficientCoinsDialog/useConsumeCoinsHandler';
import TurboRocketActive from './TurboRocketActive';
import TurboRocketNotActive from './TurboRocketNotActive';

export interface ITurboRocketModalProps {
    open: boolean;
    onClose(): void;
}

export const TurboRocketModal = (props: ITurboRocketModalProps) => {
    const { open, onClose } = props;
    const [endDate, setEndDate] = useState<Date | undefined>();
    const { user, token } = useUserAndToken();
    const dispatch = useDispatch();
    const { TURBOROCKET_STARTNOW } = useTranslation();

    useEffect(() => {
        if (user && token) {
            void (async () => {
                const response = await (await DirectInteractionActionCreator.getTurboRakete(token, user)).json();

                if (response[0].Note === 'Error Nothing found') {
                } else {
                    setEndDate(new Date(response[0].End));
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetTurborocket = async () => {
        if (token && user) {
            const response: IBerndTurborocketSuccess | IBerndTurborocketAlreadyRunning = await (
                await DirectInteractionActionCreator.triggerTurboRakete(token, user)
            ).json();

            if (response[0].End) {
                setEndDate(new Date(response[0].End));
            }

            dispatch(UserActionCreator.refreshUser());

            // if (response[0].Note === 'Error allready running') {
            // }
        }
    };

    const handler = useConsumeCoinsHandler(handleSetTurborocket, Config.TURBO_ROCKET_AMOUNT);

    return (
        <IconModal
            open={open}
            onClose={onClose}
            button={
                !endDate
                    ? {
                          title: ResourceService.replace(TURBOROCKET_STARTNOW, { amount: Config.TURBO_ROCKET_AMOUNT.toString() }),
                          onClick: handler,
                      }
                    : undefined
            }
            icon={image}
            title=""
            text=""
        >
            {endDate ? <TurboRocketActive endDate={endDate} /> : <TurboRocketNotActive />}
        </IconModal>
    );
};

export default TurboRocketModal;
