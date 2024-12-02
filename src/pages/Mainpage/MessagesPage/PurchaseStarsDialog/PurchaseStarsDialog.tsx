import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { faStars } from '@fortawesome/pro-solid-svg-icons';
import { Dialog, DialogContent, DialogTitle, IconButton, List, SvgIcon, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo, useState } from 'react';

import Icon from '../../../../components/Icon';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import { PurchaseStarListItem } from './PurchaseStarListItem';

export interface IPurchasStarsDialogProps {
    open: boolean;
    stars: number;
    onClose(): void;
}

const options = [
    {
        coins: 25,
        stars: 25,
        icon: <Icon iconColor="#fdd932" fontSize="large" icon={faStar} style={{ fontSize: 26 }} />,
    },
    {
        coins: 35,
        stars: 50,
        icon: (
            <>
                <Icon iconColor="#fdd932" fontSize="large" icon={faStar} style={{ fontSize: 26 }} />
                <Icon iconColor="#fdd932" fontSize="small" icon={faStar} style={{ fontSize: 16 }} />
            </>
        ),
    },
    {
        coins: 50,
        stars: 100,
        icon: <Icon iconColor="#fdd932" fontSize="large" icon={faStars} style={{ fontSize: 26 }} />,
    },
];

export const PurchaseStarsDialog = memo((props: IPurchasStarsDialogProps) => {
    const { open, stars, onClose } = props;
    const { FAVORITE_MODAL_TITLE, FAVORITE_STARS } = useTranslation();

    const isSmallScreen = useMediaQuery('(max-width:370px)', { defaultMatches: true });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            <Dialog fullScreen={isSmallScreen} PaperProps={{ style: { padding: 0 } }} open={open} onClose={onClose}>
                <DialogTitle>
                    <div className="flex align-items-center justify-content-space-between">
                        <Typography style={{ textAlign: 'left' }} variant="h6">
                            {FAVORITE_MODAL_TITLE}
                        </Typography>
                        <IconButton onClick={onClose}>
                            <SvgIcon>
                                <Icon icon={faTimes} />
                            </SvgIcon>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <List>
                        {options.map((option) => (
                            <PurchaseStarListItem
                                key={String(option.coins)}
                                option={option}
                                isSmallScreen={isSmallScreen}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                onClose={onClose}
                            />
                        ))}
                    </List>
                </DialogContent>
                <div className="flex justify-content-space-between align-items-center full-width sternenkonto padding">
                    <Typography variant="h6" color="inherit">
                        {FAVORITE_STARS}
                    </Typography>

                    <div className="flex no-grow align-items-center">
                        <Typography color="inherit">{stars}</Typography>
                        <Icon iconColor="#fdd932" icon={faStar} className="spacing margin left" />
                    </div>
                </div>
            </Dialog>
        </>
    );
});

export default PurchaseStarsDialog;
