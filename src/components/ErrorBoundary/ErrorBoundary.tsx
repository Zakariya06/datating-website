import React, { ReactChild, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import AuthenticationActionCreator from '../../actions/AuthenticationActionCreator';
import { ReactChildren } from '../../models/core/ReactChildren';

export interface IErrorBoundaryProps {
    children?: ReactChild | ReactChildren;
    logout(): void;
}
export interface IErrorBoundaryState {
    didError: boolean;
}

export class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);

        this.state = {
            didError: false,
        };
    }

    public render() {
        const { children } = this.props;
        const { didError } = this.state;

        if (didError) {
            return null;
        }

        return children;
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        const { logout } = this.props;

        // clear localstorage
        localStorage.clear();

        // logout
        logout();
    }
}

const ErrorBoundaryContainer: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const logout = useCallback(() => dispatch(AuthenticationActionCreator.logout()), [dispatch]);
    return <ErrorBoundary logout={logout} {...props} />;
};

export default ErrorBoundaryContainer;
