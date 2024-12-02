import { ThemeOptions } from '@material-ui/core/styles';
import { ReactChild, ReactChildren, useCallback, useMemo, useState } from 'react';

import { DarkTheme } from './DarkTheme';
import { DefaultTheme } from './DefaultTheme';
import { ThemeContext, ThemeType } from './ThemeContext';

export interface IThemeContextProviderProps {
    children: ReactChild | ReactChildren;
}

const lsKey = 'theme';

export function ThemeContextProvider(props: IThemeContextProviderProps) {
    const { children } = props;
    const [themeType, setThemeType] = useState<ThemeType>(getDefaultThemeType());
    const [themeOption, setThemeOptions] = useState<ThemeOptions>(themeType === 'light' ? DefaultTheme : DarkTheme);
    const handleSetThemeType = useCallback((type: ThemeType) => {
        setThemeType(type);
        setThemeOptions(type === 'light' ? DefaultTheme : DarkTheme);
        localStorage.setItem(lsKey, type);
    }, []);

    const val = useMemo(
        () => ({
            setTheme: handleSetThemeType,
            type: themeType,
            theme: themeOption,
        }),
        [handleSetThemeType, themeType, themeOption]
    );

    return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;

export const getDefaultThemeType = (): ThemeType => {
    const savedThemeType = localStorage.getItem(lsKey) as ThemeType;

    if (savedThemeType) {
        return savedThemeType;
    }

    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     return 'dark';
    // }

    return 'light';
};
