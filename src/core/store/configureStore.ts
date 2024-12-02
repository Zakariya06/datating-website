// import AsyncStorage from '@react-native-community/async-storage';

import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { AuthenticationAction, AuthenticationActions } from '../../actions/AuthenticationActionCreator';
import AppMiddlewares from '../../middlewares/AppMiddlewares';
import { IState } from '../../models/state/IState';
import AppReducers from '../../reducers/AppReducers';

// create the persist config
const persistConfig = {
    key: 'app-verpaar-store',
    storage: storage,
    blacklist: ['nearby', 'notifications'],
};

function configureStore() {
    // apply the given app middlewares
    const appliedMiddlewares = applyMiddleware(...AppMiddlewares);

    // combine the given app reducers
    const combinedReducer = combineReducers<IState>(AppReducers);

    // create a top level root reducer, to clear up state on certain actions
    const rootReducer = (state: IState, action: AnyAction | AuthenticationAction) => {
        let newState: IState | undefined = state;
        // clear the whole state on logout
        if (action.type === AuthenticationActions.LOGOUT) {
            newState = undefined;
        }

        return combinedReducer(newState, action);
    };

    // expose redux devtools
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const composeEnhancers = process.env.NODE_ENV !== 'production' ? (global as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

    // create the store
    const store = createStore(persistReducer(persistConfig, rootReducer), composeEnhancers(appliedMiddlewares));

    // create the store persistore object
    const persistor = persistStore(store);

    return { store, persistor };
}

export default configureStore;
