import './Landingpage.scss';
import playStore from 'assets/images/landingpage/google-play-badge.svg';
import appleStore from 'assets/images/landingpage/app_store_badge.svg';
import topMockupImg from 'assets/images/landingpage/top_mockup.png';
import centerImg from 'assets/images/landingpage/center_image.png';
import centerImg2 from 'assets/images/landingpage/center_image.jpg';
import bottomMockupImg from 'assets/images/landingpage/bottom_mockup.png';
import logoWithWriting from 'assets/images/logos/logo-with-writing-white.svg';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { deDE } from '@material-ui/core/locale';
//import React, { useState } from 'react';
import React from 'react';
import { Link, Route } from 'react-router-dom';
import { LOGIN_PATH, REGISTER_PATH } from '../../models/Paths';
//import FBLoginButton from 'services/Facebook/FBLoginButton';
//import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import { DefaultTheme } from '../../theme/DefaultTheme';
import AppbarComponent from './components/AppbarComponent';
import SignInComponent from 'components/SignInComponent';
//import useLoginHandler from '../../services/Facebook/useLoginHandler';
//import ActivityIndicator from 'components/ActivityIndicator';
import CookiesWarningDialog from './components/CookiesWarningDialog';
import RegisterComponent from 'components/RegisterComponent';
import { RegisterationStepper } from 'components/RegisterationStepper/RegisterationStepper';
import { Box } from '@mui/material';
import Config from 'config';

export interface ILandingpageProps {}

export const Landingpage = React.memo((props: ILandingpageProps) => {
    //const [isLoading, setLoading] = useState<boolean>(false);
    // const history = useHistory();

    const svgStyle = {
        width: '100%',
        height: '200px',
        marginTop: '-100px',
        fill: 'rgb(255, 255, 255)',
    };

    const svgContainer = {
        width: '70px',
        height: '70px',
        //border: '1px solid white',
        //borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    //const handleFBLogin = useLoginHandler();
    // const handleOpenRegister = () => {
    //     history.push(REGISTER_PATH);
    // };

    return (
        <ThemeProvider theme={createMuiTheme(DefaultTheme, deDE)}>
            <div style={{ background: 'white', color: 'white', overflowX: 'hidden', overflowY: 'hidden' }}>
                {/* container-one */}
                <AppbarComponent />
                <div
                    className="hero-main"
                    style={{
                        // background: 'linear-gradient(to left, #FF8B50, #b73309)',
                        minHeight: '70vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        position:'relative'
                    }}
                >
                    <Box
                        width={200}
                        height={250}
                        sx={{
                            background: `linear-gradient(to left, ${Config.GLOBAL_PRIMARY_COLOR}, #b73309)`,
                            position:'absolute',
                            left:-100,
                            top:50,
                            borderTopRightRadius:'190px',
                            borderBottomRightRadius:'130px',
                            opacity:.7
                        }}
                    ></Box>
                    <Grid className="hero-section" container style={{ maxWidth: '1150px', display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={12} sm={12} md={6} lg={6} className={'hero-left'}>
                            <div className="hero-left1">
                                <Typography
                                    variant="h4"
                                    color="inherit"
                                    className="hero-heading"
                                    style={{
                                        fontSize: '2.125rem',
                                        marginBottom: '.5rem',
                                        textAlign: 'start',
                                        lineHeight: '1.2',
                                        fontWeight: '900',
                                        letterSpacing: '-1px',
                                        // fontFamily: '"Arial", sans-serif',
                                        color: 'black',
                                    }}
                                >
                                    Knüpfe Kontakte, ganz egal, wo du dich befindest!
                                </Typography>
                                <Typography variant="body2" style={{ textAlign: 'center', color: 'black', margin: '.5rem 0' }}>
                                    Registriere dich jetzt kostenlos und lerne neue Leute kennen.
                                </Typography>

                                <RegisterationStepper />

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        marginTop: '20px',
                                        flexWrap: 'wrap',
                                        width: '100%',
                                    }}
                                >
                                </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} style={{ zIndex: 1 }} className="hero-left">
                            {/* <div style={{width: '100%', textAlign: 'center', padding: '20px'  }}> */}
                            <Box mt={{ md: '13em', sm: '2em', xs: '1em' }}>
                                <img src={topMockupImg} alt="hero" style={{ width: '100%', aspectRatio: '.85/1', objectFit: 'contain' }} />
                                {Config.GLOBAL_SITE_DOMAIN === "voluu.de" && (
                                    <a target="_blank" href="https://apps.apple.com/de/app/voluu/id6478861475" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={appleStore} alt="applestore" style={{ height: 50 }} />
                                    </a>
                                )}
                            </Box>{' '}
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        style={{ padding: '0 5rem', display: 'flex', flexDirection: 'column' }}
                        className={'meet-me-right'}
                    >
                        <Typography
                            className="meet-hdd"
                            variant="h4"
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '900',
                                letterSpacing: '-3px',
                                fontFamily: '"Arial", sans-serif',
                                color: Config.GLOBAL_PRIMARY_COLOR,
                                margin: '2rem 0',
                            }}
                        >
                            Deine Reise zu Liebe und Verbindung!{' '}
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                lineHeight: '1.8',
                                fontSize: '1.2rem',
                                color: 'rgba(0, 0, 0, 0.5)',
                                fontWeight: 'normal',
                                fontFamily: '"Arial", sans-serif',
                            }}
                        >
                            Sicher und Vertrauenswürdig: Bei {Config.GLOBAL_SITE_NAME} legen wir höchsten Wert auf deine Sicherheit und Privatsphäre. Du kannst dich
                            darauf verlassen, dass deine persönlichen Informationen geschützt sind, während du dich auf die Suche nach Liebe begibst.
                            <br />
                            Spaß und Einfachheit: Das Kennenlernen sollte Spaß machen. Unsere benutzerfreundliche App macht es dir leicht, neue
                            Menschen kennenzulernen, Nachrichten auszutauschen und vielleicht sogar das perfekte Date zu planen.
                            <br />
                            Deine Reise beginnt hier: Melde dich noch heute bei {Config.GLOBAL_SITE_NAME} an und starte deine Reise zu bedeutsamen Verbindungen. Die Liebe
                            kann überall sein, und wir sind hier, um sie dir näherzubringen.
                        </Typography>
                    </Grid>

                    <Grid item sm={12} md={10} lg={5} style={{ display: 'flex', justifyContent: 'flex-end' }} className={'meet-me-right'}>
                        <img
                            src={centerImg2}
                            className="meet-me"
                            style={{
                                marginTop: '32px',
                            }}
                        />
                    </Grid>
                </Grid>


                <Grid container spacing={2} style={{ marginTop: 100 }}>
                    <Grid item sm={12} md={10} lg={5} style={{ display: 'flex', justifyContent: 'center' }} className={'meet-me-right'}>
                        <img
                            src={centerImg}
                            className="meet-me"
                            style={{
                                marginTop: '32px',
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        style={{ padding: '0 5rem', display: 'flex', flexDirection: 'column', textAlign: 'end' }}
                        className={'meet-me-right'}
                    >
                        <Typography
                            className="meet-hdd"
                            variant="h4"
                            style={{
                                fontSize: '3rem',
                                lineHeight: '1',
                                fontWeight: '900',
                                letterSpacing: '-3px',
                                fontFamily: '"Arial", sans-serif',
                                color: Config.GLOBAL_PRIMARY_COLOR,
                                margin: '2rem 0',
                            }}
                        >
                            Matchgame{' '}
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{
                                lineHeight: '1.8',
                                fontSize: '1.2rem',
                                color: 'rgba(0, 0, 0, 0.5)',
                                fontWeight: 'normal',
                                fontFamily: '"Arial", sans-serif',
                            }}
                        >
                            Bist du bereit für aufregende Begegnungen, tiefgehende Verbindungen und vielleicht sogar die Liebe deines Lebens? 
                            {Config.GLOBAL_SITE_NAME} ist deine Tür zu einer Welt voller Möglichkeiten.
                            <br />
                            Finde Deinen Match: Unsere intelligente Matching-Technologie bringt Menschen mit ähnlichen Interessen, Werten und
                            Lebenszielen zusammen. Lass uns dir dabei helfen, jemanden zu finden, der wirklich zu dir passt.
                        </Typography>
                    </Grid>
                </Grid>                

                <div style={{ marginTop: '5rem' }}>
                    <div
                        style={{
                            background: `linear-gradient(148deg, ${Config.GLOBAL_PRIMARY_COLOR},#cb4570 45%,#d8584a 97%)`,
                            color: 'white',
                            paddingBottom: '100px',
                        }}
                    >
                        <Grid container style={{ padding: '30px' }}>
                            <Grid
                                className={'glanceimg'}
                                sm={12}
                                md={12}
                                lg={4}
                                style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                            >
                                <img
                                    src={bottomMockupImg}
                                    alt="other"
                                    style={{
                                        width: '100%',
                                        aspectRatio: '1 / 1',
                                        objectFit: 'contain',
                                        zIndex: 1,
                                    }}
                                />
                            </Grid>
                            <Grid item sm={1}></Grid>
                            <Grid item md={8} lg={6} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ width: '80%', paddingTop: '50px' }}>
                                    <Typography
                                        className="meet-hdd"
                                        variant="h4"
                                        style={{
                                            margin: '0px',
                                            fontFamily: 'Arial, sans-serif',
                                            fontSize: '2.125rem',
                                            lineHeight: '1.235',
                                            fontWeight: '900',
                                            color: 'rgb(255, 255, 255)',
                                            textTransform: 'uppercase',
                                            marginBottom: '0',
                                            marginTop: 0,
                                        }}
                                    >
                                        Lass uns dein perfektes Date bzw. deine neue Liebe finden❣️
                                    </Typography>
                                </div>
                                {Config.GLOBAL_SITE_DOMAIN === "voluu.de" && (
                                    <a target="_blank" href="https://apps.apple.com/de/app/voluu/id6478861475">
                                        <img src={appleStore} alt="applestore" style={{ height: 50, margin: '1rem 0' }} />
                                    </a>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </div>

                <Grid
                    container
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '1.5rem 0 8rem 0',
                    }}
                >
                    <Grid item sm={12} className={'links'} style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem' }}>
                        <Link to="/support" className={'link'} color="inherit">
                            {' '}
                            Kontakt
                        </Link>
                        <Link to="/impressum" className={'link'}>
                            Impressum
                        </Link>
                        <Link to="/datenschutz" className={'link'}>
                            Datenschutz
                        </Link>
                        <Link to="/agb" className={'link'}>
                            AGB
                        </Link>
                    </Grid>
                </Grid>

                <CookiesWarningDialog />
            </div>
        </ThemeProvider>
    );
});

