import { faLock } from '@fortawesome/pro-light-svg-icons';
import React, { memo } from 'react';

import Icon from '../../../../components/Icon';
import SquarePicture from '../../../../components/SquarePicture';

export interface IStrangerPictureComponentProps {
    strangerPicture: string;
    coins: number | undefined;
    index: number;
    onClick(key: number): void;
}

export const StrangerPictureComponent = memo((props: IStrangerPictureComponentProps) => {
    const { coins = 0, strangerPicture, onClick, index } = props;

    return (
        <SquarePicture onClick={onClick} index={index} src={strangerPicture}>
            {coins > 0 && (
                <div className="flex column centered full-height">
                    <Icon fontSize="large" style={{ fontSize: 56 }} icon={faLock} iconColor="rgb(255,255,255)" />
                </div>
            )}
        </SquarePicture>
    );
});

export default StrangerPictureComponent;
