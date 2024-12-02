import { Typography } from '@material-ui/core';
import React from 'react';

import Phone from '../../../../../assets/images/landingpage/Main_Layers55.png';
import Button from '../../../../../components/Button';

export const CarouselContentTwo = (props: { onClick(): void }) => (
    <div style={{ display: 'flex', maxWidth: 1300 }}>
        <div className="flex column justify-content-center">
            <Typography className="spacing margin triple bottom" variant="h5" color="primary">
                Profilseite
            </Typography>
            <Typography variant="h1" style={{ fontFamily: 'Dancing Script' }}>
                Finde
            </Typography>
            <Typography className="spacing margin double bottom" variant="h4">
                interessante Kontakte in deiner Nähe
            </Typography>
            <Typography variant="h6">Du weißt nie, wem du begegnest und wie diese Begegnung dich verändert.</Typography>
            <div className="spacing margin top double">
                <Button color="secondary" onClick={props.onClick} children={'Registrieren'} />
            </div>
        </div>
        <div>
            <img alt="phone" width={400} src={Phone} />
        </div>
    </div>
);

export default CarouselContentTwo;
