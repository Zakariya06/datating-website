import { Typography } from '@material-ui/core';
import React from 'react';

import Phone from '../../../../../assets/images/landingpage/Main_Layers2.png';
import Button from '../../../../../components/Button';

export const CarouselContentThree = (props: { onClick(): void }) => (
    <div style={{ display: 'flex', maxWidth: 1300 }}>
        <div className="flex column justify-content-center">
            <Typography className="spacing margin triple bottom" variant="h5" color="primary">
                Likes
            </Typography>
            <Typography variant="h1" style={{ fontFamily: 'Dancing Script' }}>
                Finde
            </Typography>
            <Typography className="spacing margin double bottom" variant="h4">
                heraus wem du gefällst.
            </Typography>
            <Typography variant="h6">Ob es passt, weißt du immer erst, wenn du dich darauf einlässt und es ausprobierst.</Typography>
            <div className="spacing margin top double">
                <Button color="secondary" onClick={props.onClick} children={'Registrieren'} />
            </div>
        </div>
        <div>
            <img alt="phone" width={400} src={Phone} />
        </div>
    </div>
);

export default CarouselContentThree;
