import { AppBar } from '@material-ui/core';
import { memo, useCallback, useState } from 'react';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IWelcomeBarProps {
    name: string | undefined;
    id: string | undefined;
}

export const WelcomeBar = memo((props: IWelcomeBarProps) => {
    const { name = 'User', id = '' } = props;
    const { HEADER_GREETER } = useTranslation();

    const [isHidden, setIsHidden] = useState<boolean>(isHiddenForUser(id));

    const handleClick = useCallback(() => {
        setIsHidden(true);
        setHiddenForUser(id);
    }, [id]);

    if (isHidden) {
        return null;
    }

    return (
        <AppBar
            id="welcome"
            className="flex row align-items-center justify-content-space-between full-width spacing double padding left right"
            color="primary"
            position="relative"
            elevation={0}
            component="div"
            style={{ minHeight: 0 }}
        >
            <div />
        </AppBar>
    );
});

const isHiddenForUser = (name?: string) => {
    if (!name) {
        return false;
    }

    return !!localStorage.getItem(`welcome-greeter-${name}`);
};

const setHiddenForUser = (name: string) => {
    localStorage.setItem(`welcome-greeter-${name}`, name);
};

export default WelcomeBar;
