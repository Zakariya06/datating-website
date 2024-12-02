import { Typography } from '@material-ui/core';
import React from 'react';

import { useConsumeCoinsHandler } from '../../../../components/InsufficientCoinsDialog/useConsumeCoinsHandler';
import Config from '../../../../config';
import { IBerndPresent } from '../../../../temp/models/IBerndPresent';

export interface IGiftShopItemProps extends IBerndPresent {
    onSendGift(present: IBerndPresent): void;
}

export const GiftShopItem = (props: IGiftShopItemProps) => {
    const { Picture, Coins, onSendGift } = props;

    const handleSendGift = () => onSendGift(props);

    const handler = useConsumeCoinsHandler(handleSendGift, Coins);

    return (
        <div className="chat-gift-item">
            <div className="flex column align-items-center spacing margin all pointer" onClick={handler}>
                <img alt="chat-gift" src={Config.BASE_URL_GIFT_IMAGE + Picture} height={54} width={54} />
                <Typography variant="body2" className="chat-gift-item-price">
                    {Coins} Coins
                </Typography>
            </div>
        </div>
    );
};

export default GiftShopItem;
