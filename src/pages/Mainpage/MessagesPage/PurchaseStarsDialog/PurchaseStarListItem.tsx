import { Button, CircularProgress, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useConsumeCoinsHandler } from '../../../../components/InsufficientCoinsDialog/useConsumeCoinsHandler';
import ChatActionCreator from '../../../../services/Chat/actions/ChatActionCreator';
import ResourceService from '../../../../services/i18n';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IPurchaseStarListItemProps {
    option: { coins: number; stars: number; icon: JSX.Element };
    isSmallScreen: boolean;
    isLoading: boolean;
    setIsLoading(value: boolean): void;
    onClose(): void;
}

export function PurchaseStarListItem(props: IPurchaseStarListItemProps) {
    const { option, isSmallScreen, isLoading, setIsLoading, onClose } = props;
    const dispatch = useDispatch();
    const { FAVORITE_STARS_AMOUNT } = useTranslation();

    const handlePurchase = useCallback(async () => {
        setIsLoading(true);
        await dispatch(ChatActionCreator.buyFavoritePackage(option.stars));
        setIsLoading(false);
        dispatch(ChatActionCreator.getStarsAmount());
        onClose();
    }, [dispatch, onClose, option.stars, setIsLoading]);

    const handler = useConsumeCoinsHandler(handlePurchase, option.coins);

    return (
        <ListItem disableGutters>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText
                primaryTypographyProps={{ style: { fontSize: isSmallScreen ? '1rem' : '1.25rem' } }}
                style={{ paddingLeft: option.stars === 50 ? 14 : 24 }}
                primary={ResourceService.replace(FAVORITE_STARS_AMOUNT, { stars: option.stars.toString() })}
            />
            <ListItemSecondaryAction>
                <Button disabled={isLoading} onClick={(e) => handler()} style={{ borderRadius: 32 }} color="primary" variant="outlined">
                    {option.coins} Coins
                    {isLoading && <CircularProgress size="1.5rem" />}
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
