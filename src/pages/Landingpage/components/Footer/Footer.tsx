import { Divider, Link, Paper, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';

import SkippedLogo from '../../../../assets/images/logos/logo-with-writing.svg';
import { AGB_PATH, DATA_PROTECTION_POLICY_PATH, IMPRESSUM_PATH, MAIN_PATH, SUPPORT_PATH } from '../../../../models/Paths';
import Config from '../../../../config';

export interface IFooterProps {}

export const Footer = memo((props: IFooterProps) => {
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    // const isSmallScreen = useMediaQuery('(max-width:410px)', { defaultMatches: true });
    const isLandingPage = useRouteMatch({ path: MAIN_PATH, exact: true });

    return (
        <Paper
            elevation={0}
            square
            className="flex column footer align-items-center"
            style={
                !isDesktop
                    ? { paddingLeft: 0, paddingRight: 0, backgroundColor: isLandingPage ? 'rgb(216, 216, 216)' : '' }
                    : { backgroundColor: isLandingPage ? 'rgb(216, 216, 216)' : '' }
            }
        >
            <div className="wrapper flex row justify-content-space-between">
                <div className="footer-logos flex column no-grow">
                    <div style={isDesktop ? {} : { width: 180, margin: '0 auto', height: 'auto' }}>
                        <img
                            draggable={false}
                            className="spacing padding all"
                            style={{ width: 180, height: 'auto' }}
                            alt="verpaar-logo"
                            src={SkippedLogo}
                        />
                    </div>
                    {/* <div style={isDesktop ? {} : { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
                    {/* <div
                        className={
                            !isDesktop && !isSmallScreen
                                ? 'flex full-width justify-content-center align-items-center'
                                : isSmallScreen
                                ? 'flex column justify-content-space-between align-items-center'
                                : ''
                        }
                    >
                        <Link rel="noopener" target="_blank" href="https://play.google.com/store/apps/details?id=com.appmeeted">
                            <img draggable={false} className="spacing padding all" width={180} alt="app-store-logo" src={AppStore} />
                        </Link>
                    </div> */}
                </div>

                <div className="flex row" style={{ justifyContent: 'flex-end' }}>
                    {/* <div className="footer-section">
                        <Typography style={{ fontWeight: 600, marginBottom: 16 }}>Unternehmen</Typography>
                        <Typography>
                            <Link color="inherit" href="mailto:info@meet18.de">
                                Geschäftsanfragen
                            </Link>
                        </Typography>
                        <Typography>
                            <Link color="inherit" href="mailto:werbung@meet18.de">
                                Werben mit VERPAAR
                            </Link>
                        </Typography>
                    </div> */}
                    <div className="footer-section">
                        <Typography style={{ fontWeight: 600, marginBottom: 16 }}>Kontakt</Typography>
                        <Typography>
                            <Link color="inherit" href={SUPPORT_PATH}>
                                Kontakt & Support
                            </Link>
                        </Typography>

                        <Typography>
                            <Link href={IMPRESSUM_PATH} color="inherit">
                                Impressum
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href={DATA_PROTECTION_POLICY_PATH} color="inherit">
                                Datenschutz
                            </Link>
                        </Typography>
                        <Typography>
                            <Link href={AGB_PATH} color="inherit">
                                AGB
                            </Link>
                        </Typography>
                    </div>
                    {/* <div className="footer-section">
                        <Typography style={{ fontWeight: 600, marginBottom: 16 }}>Singles in deiner Stadt</Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Berlin
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Hamburg
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Frankfurt
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in München
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Köln
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Stuttgart
                            </Link>
                        </Typography>
                        <Typography>
                            <Link rel="noopener" target="_blank" color="inherit" href="https://meet18.de">
                                Singles in Dresden
                            </Link>
                        </Typography>
                    </div> */}
                </div>
            </div>
            <div className="full-width wrapper">
                <Divider style={{ color: 'rgb(151, 151, 151)', marginTop: 16, marginBottom: 8 }} variant="fullWidth" />

                <Typography style={{ textAlign: isDesktop ? 'right' : 'center' }}>
                    ©  {Config.GLOBAL_SITE_NAME} 2022. Alle Rechte vorbehalten.
                </Typography>
            </div>
        </Paper>
    );
});

export default Footer;
