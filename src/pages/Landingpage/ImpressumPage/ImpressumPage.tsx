import { Paper, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import { AppbarComponent } from '../components/AppbarComponent';
import Footer from '../components/Footer';
import Impressum from '../../../assets/images/Impressum.png';
import Config from '../../../config';

export interface IImpressumPageProps {}

export const ImpressumPage = memo((props: IImpressumPageProps) => {
    return (
        <>
            <AppbarComponent />
            <Paper
                style={{ paddingTop: 100, paddingBottom: 100, wordBreak: 'break-all' }}
                className="flex column align-items-center justify-content-center"
                elevation={0}
            >
                <div className="wrapper">
                    <Typography style={{ marginBottom: 32 }} variant="h5">
                        Impressum
                    </Typography>

                    <img src={Impressum} />
                    {/*<Typography component="address" style={{ fontStyle: 'unset' }}>
                        WeCare Solutions Sh.p.k. <br />
                        RR Ahmetajve <br />
                        51000 Decan <br />
                        Kosova
                        <br />
                    </Typography>
                    <Typography component="address" style={{ fontStyle: 'unset' }}>
                        <br />
                        Sitz: Decan (Kosova)
                    </Typography>*/}
                    <Typography style={{ marginBottom: 32, marginTop: 48 }} variant="h5">
                        Geschäftsführer
                    </Typography>
                    <Typography>
                    {Config.GLOBAL_IMPRESSUM_NAME} <br />
                        Steuernummer: {Config.GLOBAL_IMPRESSUM_STEUERNR} <br />
                        Kontaktanfragen: info@{Config.GLOBAL_SITE_DOMAIN} <br />
                        Bist du ein Nutzer und hast Probleme oder Fragen zur Benutzung von {Config.GLOBAL_SITE_NAME}? Dann kontaktiere uns unter info@{Config.GLOBAL_SITE_DOMAIN}
                    </Typography>
                    <Typography style={{ marginBottom: 32, marginTop: 48 }} variant="h5">
                        Streitbelegung
                    </Typography>
                    <Typography>
                        Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung (OS-Plattform) bereit. Diese ist hier zu finden:
                        'www.ec.europa.eu/consumers/odr. {Config.GLOBAL_SITE_NAME} ist zur Teilnahme an einem Streitbeilegungsverfahren vor einer
                        Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
                    </Typography>
                </div>
            </Paper>
            <Footer />
        </>
    );
});

export default ImpressumPage;
