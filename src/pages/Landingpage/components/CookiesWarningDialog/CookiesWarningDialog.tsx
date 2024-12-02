import './CookieDisclaimer.scss';

import { Button, Link } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import React, { memo, useState } from 'react';

import { useLocalstorage } from '../../../../core/useLocalstorage';
import { DATA_PROTECTION_POLICY_PATH } from '../../../../models/Paths';

export interface ICookiesWarningDialogProps {}

export const CookiesWarningDialog = memo((props: ICookiesWarningDialogProps) => {
    const { value, setValue } = useLocalstorage('disclaimer');

    const [openCookiesWarning, setOpenCookiesWarning] = useState<boolean>(!(value ? Boolean(value) : false));

    const handleCookieDisclaimerDismiss = () => {
        setOpenCookiesWarning(false);
        setValue(String(false));
    };

    return (
        <Snackbar
            ContentProps={{ 'aria-describedby': 'cookie-disclaimer-message' }}
            classes={{ root: 'cookie-disclaimer', anchorOriginBottomRight: 'cookie-disclaimer-anchor' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            open={openCookiesWarning}
            message={
                <span id="cookie-disclaimer-message">
                    Diese Internetseite verwendet Cookies, Google Analytics und den Facebook-Pixel für die Analyse und Statistik. Cookies helfen uns,
                    die Benutzerfreundlichkeit unserer Webseite zu verbessern. Durch die weitere Nutzung der Webseite stimmen Sie der Verwendung zu.
                    Weitere Informationen hierzu finden Sie in unserer <Link href={DATA_PROTECTION_POLICY_PATH}>Datenschutzerklärung</Link>.
                </span>
            }
            action={
                <Button variant="outlined" color="primary" onClick={handleCookieDisclaimerDismiss}>
                    Ich habe verstanden
                </Button>
            }
        />
    );
});

export default CookiesWarningDialog;
