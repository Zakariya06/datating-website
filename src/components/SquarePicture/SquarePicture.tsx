import './SquarePicture.scss';

import { Paper, useMediaQuery } from '@material-ui/core';
// import React, { CSSProperties } from 'react';

import generateValidUrl from '../../core/fetch/generateValidUrl';
import Image from '../ProgressiveImage';

export interface ISquarePictureProps {
    src: string;
    index: number;
    children?: React.ReactChild | React.ReactNode | React.ReactChildren[];
    className?: string;
    style?: React.CSSProperties;
    onClick(index: number): void;
}

export const SquarePicture = (props: ISquarePictureProps) => {
    const { src, onClick, index, children, style } = props;

    const handleClickDiv = (e: React.MouseEvent) => onClick(index);
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const isTablet = useMediaQuery('(min-width:768px)', { defaultMatches: true });
    const isMobile = useMediaQuery('(max-width:430px)', { defaultMatches: true });

    // const paperStyle: CSSProperties = {
    //     minWidth: isDesktop ? '100px' : '40vw',
    //     minHeight: isDesktop ? 225 : '40vh',
    //     // backgroundImage: 'url("' + generateValidUrl(src) + '")',
    // };

    return (
        <Paper className="square-picture spacing margin all" onClick={handleClickDiv} style={{
            width:isDesktop ? '125px' : isTablet ? '150px' : isMobile ? '90px' : '100%',
            height: isMobile ? '100px':'130px'
        }} square={false} elevation={3}>
            <Image src={generateValidUrl(src)} backgroundSize="cover" style={{
                width:'100%'
            }} >
                {children}
            </Image>
        </Paper>
    );
};

export default SquarePicture;
