import { AppBar, Button,Link, Toolbar, useMediaQuery, useScrollTrigger } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { Route, match, useHistory, useRouteMatch } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import SkippedLogo from '../../../assets/images/logos/logo-with-writing-white.svg';
import SkippedLogoAlt from '../../../assets/images/logos/logo-with-writing.svg';
import SkippedLogoOnly from '../../../assets/images/logos/logoonly.svg';
import { FORGOT_PASSWORD_PATH, HOME_PATH, LOGIN_PATH, MAIN_PATH, REGISTER_PATH,STRANGER_PROFILE_PATH } from '../../../models/Paths';
import ThemeContext from '../../../theme/ThemeContext';



export interface IAppbarComponentProps {}

interface IAppbarProps {
    children: React.ReactElement;
}

export const AppbarComponent = React.memo((props: IAppbarComponentProps) => {
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const isLandingPage = useRouteMatch({ path: MAIN_PATH, exact: true });

    const { type } = useContext(ThemeContext);
    const [path, setPath] = useState(isLandingPage ? SkippedLogo : type === 'dark' ? SkippedLogo : SkippedLogoAlt);
    const isSmallScreen = useMediaQuery('(max-width:450px)', { defaultMatches: true });
    const isMobile = useMediaQuery('(max-width:600px)', { defaultMatches: true });
    const history = useHistory();
    return (
        <ChangeOnScroll isLandingPage={isLandingPage} setPath={setPath}>
            <AppBar position="fixed" color="transparent">
                <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <div
                        className={isDesktop ? 'container' : ''}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: isDesktop ? '' : '0px 24px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}
                        >
                            <Link href={HOME_PATH} className={'logo-container'}>
                                {isSmallScreen ? (
                                    <img src={SkippedLogoOnly} className="verpaar-logo" alt="verpaar-logo" />
                                ) : (
                                    <img className="verpaar-logo-text" alt="verpaar-logo" src={path} />
                                )}
                            </Link>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignSelf: 'center',
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}
                        >
                            {/*<Route
                                path={[MAIN_PATH, LOGIN_PATH, REGISTER_PATH, FORGOT_PASSWORD_PATH,STRANGER_PROFILE_PATH]}
                                exact
                                component={() => (
                                    <Button
                                        onClick={() => {
                                            history.push(LOGIN_PATH);
                                        }}
                                        color="secondary"
                                        size={isDesktop ? 'large' : 'small'}
                                        style={
                                            isMobile
                                                ? { paddingLeft: 24, paddingRight: 24, paddingBottom: 4, paddingTop: 4, fontSize: 16 }
                                                : { paddingLeft: 50, paddingRight: 50 }
                                        }
                                    >
                                        Anmelden
                                    </Button>
                                )}
                            />*/}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </ChangeOnScroll>
    );
});

function ChangeOnScroll(props: IAppbarProps & { isLandingPage: match<{}> | null; setPath(value: string): void }) {
    const { children, setPath, isLandingPage } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    useEffect(() => {
        if (isLandingPage) setPath(trigger ? SkippedLogoAlt : SkippedLogo);
    }, [isLandingPage, setPath, trigger]);

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        color: trigger ? 'default' : 'transparent',
        style: {
            // background: trigger ? 'rgb(255,255,255)' : 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
            // backgroundColor: !trigger ? undefined : 'transparent',
            transition: trigger ? '0.5s ease-in' : '0.5s ease-out',

            // backgroundColor: trigger ? '#f5f5f5a0' : undefined,
            // backdropFilter: trigger ? 'blur(5px)' : undefined,
        },
    });
}

export default AppbarComponent;