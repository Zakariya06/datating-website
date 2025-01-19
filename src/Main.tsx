import { Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import history from './core/history';
import useLocationBlocker from './core/useLocationBlocker';
import { LoadingOverlay } from './LoadingOverlay';
import {
    AGB_PATH,
    DATA_PROTECTION_POLICY_PATH,
    FORGOT_PASSWORD_PATH,
    FORGOT_PASSWORD_PATHH,
    HOME_PATH,
    IMPRESSUM_PATH,
    LOGIN_PATH,
    MAIN_PATH,
    PAYMENT_SUCCEEDED_PATH,
    REGISTER_PATH,
    SUPPORT_PATH,
    PROFILE_PATH_ID,
    REGISTER_USER,
} from './models/Paths';
import { Landingpage } from './pages/Landingpage/Landingpage';
import SupportPage from './pages/Landingpage/SupportPage';
import { isAuthenticated } from './selectors/AuthenticationSelectors';

import { ActionCreator } from './models/state';
import formatRequestBody from './temp/formatRequestBody';
import Config from './config';
import FetchApi from './core/fetch/FetchApi';
import { HttpMethods } from './core/fetch/HttpMethod';
import generateValidUrl from './core/fetch/generateValidUrl';
import StrangerProfilePage from 'pages/Mainpage/StrangerProfilePage';
import RegisterModel from 'components/NewRegister/register';
import Register from 'components/NewRegister/register';

// import AgbPage from './pages/Landingpage/AgbPage';
// import DataProtectionPolicyPage from './pages/Landingpage/DataProtectionPolicyPage';
// import ImpressumPage from './pages/Landingpage/ImpressumPage';

const ImpressumPage = lazy(() => import(/* webpackChunkName: "ImpressumPage" */ './pages/Landingpage/ImpressumPage'));
const DataProtectionPolicyPage = lazy(
    () => import(/* webpackChunkName: "DataProtectionPolicyPage" */ './pages/Landingpage/DataProtectionPolicyPage')
);
const AgbPage = lazy(() => import(/* webpackChunkName: "AgbPage" */ './pages/Landingpage/AgbPage'));

const PaymentSucceeded = lazy(() => import(/* webpackChunkName: "PaymentSucceeded" */ './pages/Landingpage/PaymentSucceeded'));

const MainPage = lazy(() => import(/* webpackChunkName: "MainPage" */ './pages/Mainpage'));

export function Main() {
    const isLoggedIn = useSelector(isAuthenticated);
    const dispatch = useDispatch();

    useLocationBlocker();

    if (history.location.search && isLoggedIn) {
        const searchParams = new URLSearchParams(history.location.search);
        const redirect = searchParams.get('redirect');
        if (redirect) {
            history.replace(redirect);
        }
    }

    if (!isLoggedIn) {
        enum AuthenticationActions {
            LOGIN_USER = 'LOGIN_USER',
            LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
            LOGIN_USER_RESPONSE = 'LOGIN_USER_RESPONSE',
            LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
        }

        const href = generateValidUrl(Config.BASE_URL);

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('auth');

        if (token) {
            const asyncAction = ActionCreator.createAsyncAction(
                AuthenticationActions.LOGIN_USER,
                [AuthenticationActions.LOGIN_USER_REQUEST, AuthenticationActions.LOGIN_USER_RESPONSE, AuthenticationActions.LOGIN_USER_FAILURE],
                () => FetchApi.fetch(href, formatRequestBody(Config.LOGIN_USER_URL, undefined, { token: token }), HttpMethods.POST)
            );

            dispatch(asyncAction);
            history.replace(token);
        }
    }

    return (
        <Suspense fallback={<LoadingOverlay />}>
            <Switch>
                <Route key={IMPRESSUM_PATH} path={IMPRESSUM_PATH} component={ImpressumPage} exact />
                <Route key={AGB_PATH} path={AGB_PATH} component={AgbPage} exact />
                <Route key={DATA_PROTECTION_POLICY_PATH} path={DATA_PROTECTION_POLICY_PATH} component={DataProtectionPolicyPage} exact />
                <Route key={SUPPORT_PATH} path={SUPPORT_PATH} component={SupportPage} exact />
                <Route key={PAYMENT_SUCCEEDED_PATH} path={PAYMENT_SUCCEEDED_PATH} component={PaymentSucceeded} exact />
                {isLoggedIn ? (
                    // Falls eingeloggt, rendere die Hauptseite
                    <Route path={HOME_PATH} component={MainPage} />
                ) : (
                    <Switch>
                        {/* Landingpage-Routen */}
                        <Route
                            key="landingPage"
                            path={[MAIN_PATH, LOGIN_PATH, REGISTER_PATH, FORGOT_PASSWORD_PATH, FORGOT_PASSWORD_PATHH]}
                            component={Landingpage}
                            exact
                        />
                        {/* StrangerProfilePage */}
                        <Route
                            key="strangerProfilePage"
                            path={PROFILE_PATH_ID}
                            component={StrangerProfilePage}
                            exact
                        />
                        {/* Register */}
                        <Route
                            key="registerPage"
                            path={REGISTER_USER}
                            component={Register}
                            exact
                        />
                        {/* Fallback: Alle anderen nicht authentifizierten Routen leiten zu MAIN_PATH */}
                        <Redirect path="*" to={MAIN_PATH} />
                    </Switch>
                )}


                <Redirect path="*" to={isLoggedIn ? HOME_PATH : MAIN_PATH} />
            </Switch>
        </Suspense>
    );
}

export default Main;

