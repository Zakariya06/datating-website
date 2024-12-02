// import DateFnsUtils from '@date-io/date-fns';

import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { deDE, enUS } from '@material-ui/core/locale';
import { addDays } from 'date-fns';
import React, { useContext, useEffect, useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import history from './core/history';
import CookieStorageAPI from './core/storage/CookieStorageAPI';
import configureStore from './core/store/configureStore';
import LoadingOverlay from './LoadingOverlay';
import Main from './Main';
import useAdjust from './services/Adjust/useAdjust';
import ResourceContext from './services/i18n/context/ResourceContext';
import ResourceContextProvider from './services/i18n/context/ResourceContextProvider';
import { Languages } from './services/i18n/models/ILanguageDictionary';
import IPService from './services/IPService';
import NotificationProvider from './services/Notifications/context/NotificationProvider';
import ThemeContext from './theme/ThemeContext';
import ThemeContextProvider from './theme/ThemeContextProvider';

//import MuiPickersUtilsProvider from '@material-ui/pickers/MuiPickersUtilsProvider';
// import deLocale from 'date-fns/locale/de';

const { store, persistor } = configureStore();

const initLocation = window.location.href;

function App() {
    const { theme } = useContext(ThemeContext);
    const { currentLanguage } = useContext(ResourceContext);
    const muiTheme = useMemo(() => createMuiTheme(theme, currentLanguage === Languages.DE ? deDE : enUS), [theme, currentLanguage]);

    useAdjust();

    useEffect(() => {
        void IPService.initialize();
        const url = new URL(initLocation);
        if (url.searchParams.has('pid')) {
            CookieStorageAPI.setItem('pid', url.searchParams.get('pid') ?? '', { expires: addDays(new Date(), 7) });
        }
    }, []);
    /*
    useLayoutEffect(() => {
        void (async () => {
            for (let i = 50; i < 30; i++) {
                await FetchApi.fetch(Config.BASE_URL, {
                    was: 'set_payment',
                    // userid: 'Yannick_UKV67WAByhOxHLcSjq_l3nXvIJhw07l0cQD_qc5',
                    userid: 'SaschK1DZGY_ijYlR-fNW1lG_Lt74cY42IjbgEggC8fg',
                    paketid: '082968a385344f4bafa1972b6819f07b',
                    transid: UUid.generate(),
                    transcode: UUid.generate(),
                    transresult: 'LG',
                    datum: new Date().toISOString(),
                    amount: '14.99',
                });
            }
        })();
    }, []);
*/
    return (
        <ThemeProvider theme={muiTheme}>
            <CssBaseline />

            <NotificationProvider>
                <ErrorBoundary>
                    <Main />
                </ErrorBoundary>
            </NotificationProvider>
        </ThemeProvider>
    );
}

const AppWrapper = () => {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
                <Router history={history}>
                    <ThemeContextProvider>
                        <ResourceContextProvider>
                            <App />
                        </ResourceContextProvider>
                    </ThemeContextProvider>
                </Router>
            </PersistGate>
        </ReduxProvider>
    );
};

export default AppWrapper;
