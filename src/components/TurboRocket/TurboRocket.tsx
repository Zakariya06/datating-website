import { faRocketLaunch } from '@fortawesome/pro-solid-svg-icons';
import React, { useCallback, useState } from 'react';

import Icon from '../Icon';
import RoundButton from '../RoundButton';
import TurboRocketModal from './TurboRocketModal';

export interface ITurboRocketProps {}

export const TurboRocket = (props: ITurboRocketProps) => {
    const [isOpen, setisOpen] = useState<boolean>(false);

    const handleClose = useCallback(() => setisOpen(false), []);
    const handleOpen = useCallback(() => setisOpen(true), []);

    return (
        <>
            <RoundButton className="spacing triple margin right" onClick={handleOpen} dense icon={<Icon icon={faRocketLaunch} fontSize="small" />} />
            {isOpen && <TurboRocketModal open={isOpen} onClose={handleClose} />}
        </>
    );
};

export default TurboRocket;
