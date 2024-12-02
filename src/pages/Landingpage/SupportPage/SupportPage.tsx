import { Link, Paper, Typography } from '@material-ui/core';
import React, { memo } from 'react';

import { AppbarComponent } from '../components/AppbarComponent';
import Footer from '../components/Footer';
import Config from '../../../config';

export interface ISupportPageProps {}

export const SupportPage = memo((props: ISupportPageProps) => {
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
                        Hast du Probleme bei der Benutzung mit {Config.GLOBAL_SITE_NAME}?
                    </Typography>
                    <br />
                    <Typography>Hier wollen wir dir deine Möglichkeiten zeigen, dich mit uns in Kontakt zu setzen.</Typography>

                    <Typography style={{ marginBottom: 32, marginTop: 48 }} variant="h5">
                        Die App funktioniert auf meinem Gerät nicht richtig
                    </Typography>
                    <Typography>
                        Technischer Support
                        <br /> E-Mail: <Link href={`mailto:info@${Config.GLOBAL_SITE_DOMAIN}`}>info@{Config.GLOBAL_SITE_DOMAIN}</Link>
                    </Typography>
                    <Typography style={{ marginBottom: 32, marginTop: 48 }} variant="h5">
                        Ich habe Probleme mit einer getätigten Zahlung
                    </Typography>
                    <Typography>
                        Payment Support
                        <br /> E-Mail: <Link href={`mailto:info@${Config.GLOBAL_SITE_DOMAIN}`}>info@{Config.GLOBAL_SITE_DOMAIN}</Link>
                    </Typography>
                    <Typography style={{ marginBottom: 32, marginTop: 48 }} variant="h5">
                        Ich habe Anregungen und Ideen, die die App besser machen
                    </Typography>
                    <Typography>
                        Technischer Support
                        <br /> E-Mail: <Link href={`mailto:info@${Config.GLOBAL_SITE_DOMAIN}`}>info@{Config.GLOBAL_SITE_DOMAIN}</Link>
                    </Typography>
                </div>
            </Paper>
            <Footer />
        </>
    );
});

export default SupportPage;
