import { faLock } from '@fortawesome/pro-light-svg-icons';
import { Tooltip, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../../../../components/Icon';
import SquarePicture from '../../../../../components/SquarePicture';

export interface IPictureComponentProps {
    image: string;
    index: number;
    coins?: number;
    onClick(index: number): void;
}

export const PictureComponent = memo((props: IPictureComponentProps) => {
    const { image, coins = 0, index, onClick } = props;

    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });

    return (
        <SquarePicture
            onClick={onClick}
            index={index}
            src={image}
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}
        >
            {coins > 0 && (
                <>
                    <Tooltip title={`${coins} Coins`} arrow>
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                position: 'absolute',
                                width: 24,
                                height: 24,
                                top: 4,
                                right: 4,
                            }}
                        >
                            <Icon icon={faLock} iconColor="rgb(7, 5, 5)" style={{ fontSize: 12 }} />
                        </div>
                    </Tooltip>
                    {!isDesktop && <Typography variant="caption">{coins} C</Typography>}
                </>
            )}
        </SquarePicture>
    );
});

export default PictureComponent;
