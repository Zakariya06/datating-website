import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotificationActionCreator from './actions/NotificationActionCreator';
import { getNotifications } from './selectors/NotificationSelectors';

let displayed: string[] = [];
const storeDisplayed = (id: string) => (displayed = [...displayed, id]);
const removeDisplayed = (id: string) => (displayed = [...displayed.filter((key) => id !== key)]);

const Notifier = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(getNotifications);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // useEffect(() => {
    //     displayed = notifications.map((x) => x.key);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // remove this snackbar from redux store
                    dispatch(NotificationActionCreator.removeSnackbar(String(myKey)));
                    removeDisplayed(String(myKey));
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null;
};

export default Notifier;
