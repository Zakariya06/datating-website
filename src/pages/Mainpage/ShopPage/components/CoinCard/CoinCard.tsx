import { Paper, Typography } from '@material-ui/core';
import  { CSSProperties, memo } from 'react';

import { IProduct } from '../../../../../models/product/IProduct';
import Config from '../../../../../config';
import { Box } from '@mui/material';

export interface ICoinCardProps extends IProduct {
    image: string;
    tag?: string;
    title?: string;
    tagColor?: string;
    selected: boolean;
    onClick(product: IProduct): void;
}

export const CoinCard = memo((props: ICoinCardProps) => {
    const {
        coins: coinAmount,
        image,
        amount: price,
        title,
        // tagColor = 'linear-gradient(90deg,' + Config.GLOBAL_PRIMARY_COLOR + ' 0%,#ab5d9a 100%)',
        selected,
        onClick,
    } = props;

    const handleClick = () => onClick(props);
    const divStyle: CSSProperties = {
        border: selected ? `2px solid ${Config.GLOBAL_PRIMARY_COLOR}` : '2px solid transparent',
        borderRadius: '60px'
    };

    return (
        <Paper
            square
            className="coin-card spacing margin all pointer"
            onClick={handleClick}
            //onMouseEnter={() => setHover(true)}
            //onMouseLeave={() => setHover(false)}
            style={{
                borderRadius: '60px',
            }}
        >
            <Box style={divStyle} sx={{
                display: 'flex',
                alignItems: 'center',
                p:2
            }} className="coin-card-content-root ">
                <div className="coin-card-content-coins flex wrap align-items-center">
                    <img draggable={false} alt="coin" src={image} height={30} className="coin-card-content-img spacing " />
                    <Box sx={{
                        pl:{md:2}
                    }}>
                        <div>{title}</div>
                        <Typography  className="coin-card-content-coins-title">
                            {Config.GLOBAL_SITE_COINS} {coinAmount}
                        </Typography>
                    </Box>
                    {/* <Typography></Typography> */}
                    {/* {Number(promoAmount) > 0 ? <Typography style={{ color: '#42a5f5' }}> +{promoAmount} zusätzliche Coins</Typography> : ''} */}
                </div>

                <Typography style={{fontWeight: 'bold'}}  className="coin-card-content-price">{price}€</Typography>
            </Box>
        </Paper>
    );
});


export default CoinCard;
