import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { createContext } from 'react';

export type ThemeType = 'light' | 'dark';
export interface IThemeContext {
    theme: ThemeOptions;
    type: ThemeType;
    setTheme(type: ThemeType): void;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: {},
    setTheme: () => null,
    type: 'light',
});

export default ThemeContext;
