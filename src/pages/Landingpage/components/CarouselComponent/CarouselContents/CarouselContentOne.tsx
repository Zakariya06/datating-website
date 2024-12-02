import { Typography } from '@material-ui/core';
import React from 'react';

import Phone from '../../../../../assets/images/landingpage/Main_Layers1.png';
import Button from '../../../../../components/Button';
import Config from '../../../../../config';

export const CarouselContentOne = (props: { onClick(): void }) => (
    <div style={{ display: 'flex', maxWidth: 1300 }}>
        <div className="flex column justify-content-center">
            <Typography className="spacing margin triple bottom" variant="h5" color="primary">
                Match-Game
            </Typography>
            <Typography variant="h1" style={{ fontFamily: 'Dancing Script' }}>
                Starte
            </Typography>
            <Typography className="spacing margin double bottom" variant="h4">
                die Reise deines Lebens.
            </Typography>
            <Typography variant="h6">Wir bei {Config.GLOBAL_SITE_NAME} haben es uns zur Aufgabe gemacht, neuen Schwung in dein Liebesleben zu bringen.</Typography>
            <div className="spacing margin top double">
                <Button color="secondary" onClick={props.onClick} children={'Registrieren'} />
            </div>
        </div>
        <div>
            <img alt="phone" width={400} src={Phone} />
        </div>
    </div>
);

export default CarouselContentOne;
