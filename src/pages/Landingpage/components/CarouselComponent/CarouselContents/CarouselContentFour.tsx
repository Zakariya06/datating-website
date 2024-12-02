import { Typography } from '@material-ui/core';
import React from 'react';

import Phone from '../../../../../assets/images/landingpage/Main_Layers3.png';
import Button from '../../../../../components/Button';

export const CarouselContentFour = (props: { onClick(): void }) => (
    <div style={{ display: 'flex', maxWidth: 1300 }}>
        <div className="flex column justify-content-center">
            <Typography className="spacing margin triple bottom" variant="h5" color="primary">
                Chats
            </Typography>
            <Typography variant="h1" style={{ fontFamily: 'Dancing Script' }}>
                Chatte
            </Typography>
            <Typography className="spacing margin double bottom" variant="h4">
                mit wem du willst.
            </Typography>
            <Typography variant="h6">
                Die erste Nachricht zählt! Eine einzelne Nachricht deine Chance, das Eis zu brechen und auch ohne Match ins Gespräch zu kommen.
            </Typography>
            <div className="spacing margin top double">
                <Button color="secondary" onClick={props.onClick} children={'Registrieren'} />
            </div>
        </div>
        <div>
            <img alt="phone" width={400} src={Phone} />
        </div>
    </div>
);

export default CarouselContentFour;
