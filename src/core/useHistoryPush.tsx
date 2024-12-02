import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export function useHistoryPush(path: string) {
    const history = useHistory();

    const handler = useCallback(() => {
        if (history.location.pathname !== path) {
            history.push(path);
        }
    }, [history, path]);

    return handler;
}

export default useHistoryPush;
