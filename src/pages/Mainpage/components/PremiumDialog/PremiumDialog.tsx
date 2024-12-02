import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LikesActionCreator from '../../../../actions/LikesActionCreator';
import Icon from '../../../../components/Icon';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import { getUser } from 'selectors/AuthenticationSelectors';
import ResourceService from 'services/i18n';
import ChatActionCreator from 'services/Chat/actions/ChatActionCreator';
import { IState } from 'models/state';
import { getPremiumProducts } from 'selectors/ShopSelectors';
import ShopActionCreator from 'actions/ShopActionCreator';

export interface IBlockedUsersDialogProps {
    open: boolean;
    handleClose(): void;
    setSelectedProduct?: (product: any) => void;
}

export const PremiumDialog = memo((props: IBlockedUsersDialogProps) => {
    const { open, handleClose, setSelectedProduct } = props;
    const { PREMIUM_TITLE, PREMIUM_POINT1, PREMIUM_POINT2, PREMIUM_POINT3, PREMIUM_POINT4, PREMIUM_POINT5, PREMIUM_BUY, PREMIUM_SUBTITLE } =
        useTranslation();
    const isSmallScreen = useMediaQuery('(max-width:500px)', { defaultMatches: true });
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const { Premium } = user ?? {};
    const { premiumProducts } = useSelector((state: any) => ({ premiumProducts: getPremiumProducts(state) }));

    const filteredAndSorted = premiumProducts
        .filter((product) => product.Store === 'Premium') // Filter where store is 'Premium'
        .sort((a, b) => a.Amount - b.Amount);

    const handleBuyPremium = async (month: number) => {
        await dispatch(ChatActionCreator.buyPremium(month));
        handleClose();
    };

    const calculateRemainingDays = (date?: string): number => {
        if (!date) {
            return NaN;
        }

        const today: number = new Date().getTime();
        const targetDate: number = new Date(date).getTime();
        const timeDifference: number = targetDate - today;
        const daysDifference: number = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return daysDifference;
    };

    useEffect(() => {
        dispatch(ShopActionCreator.fetchPremiumProduct());
    }, [dispatch]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={isSmallScreen}
            PaperProps={{
                style: {
                    maxWidth: '800px',
                },
            }}
        >
            <IconButton style={{ position: 'absolute', top: 12, right: 12 }} size="small" onClick={handleClose}>
                <Icon icon={faTimes} fontSize="small" />
            </IconButton>
            <DialogTitle
                style={{
                    paddingBottom: '5px',
                    textAlign: 'center',
                }}
            >
                💎 {PREMIUM_TITLE} 💎<br></br>
                <small>{PREMIUM_SUBTITLE}</small>
            </DialogTitle>
            <DialogContent>
                {Premium && (
                    <Typography style={{ textAlign: 'center' }} variant="body1">
                        📅{' '}
                        {ResourceService.replace(ResourceService.getCurrentResources().CHAT_EXPIRE, {
                            days: calculateRemainingDays(Premium).toString(),
                        })}
                    </Typography>
                )}
                <br></br>
                <Box className="flex column" marginLeft={4} mt={1}>
                    <Box display={'flex'} flexDirection={'row'}>
                        ✅
                        <Typography variant="body1" style={{ marginLeft: '10px' }}>
                            {PREMIUM_POINT1}
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}>
                        ✅
                        <Typography variant="body1" style={{ marginLeft: '10px' }}>
                            {' '}
                            {PREMIUM_POINT2}
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}>
                        ✅
                        <Typography variant="body1" style={{ marginLeft: '10px' }}>
                            {PREMIUM_POINT3}
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}>
                        ✅
                        <Typography variant="body1" style={{ marginLeft: '10px' }}>
                            {PREMIUM_POINT4}
                        </Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'row'}>
                        ✅
                        <Typography variant="body1" style={{ marginLeft: '10px' }}>
                            {PREMIUM_POINT5}
                        </Typography>
                    </Box>
                </Box>
                {!Premium && (
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} mt={2} mb={1}>
                        {filteredAndSorted.map((product) => (
                            <Button
                                key={product.PaketId}
                                size="small"
                                style={{ width: '32%' }}
                                onClick={() => {
                                    //@ts-ignore
                                    setSelectedProduct(product);
                                    //handleBuyPremium(product.PaketId);
                                }}
                            >
                                {`${product.Name} - ${product.Amount}€`}
                            </Button>
                        ))}
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
});

export default PremiumDialog;
