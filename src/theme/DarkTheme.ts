import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import { DefaultTheme } from './DefaultTheme';
import Config from '../config';

export const DarkTheme: ThemeOptions = {
    ...DefaultTheme,
    palette: {
        ...DefaultTheme.palette,
        type: 'dark',
        background: {
           default: '#121212'
        }
    },
    typography: {
        ...DefaultTheme.typography,
        allVariants: {
            color: '#fff',
        },
    },
    overrides: {
        ...DefaultTheme.overrides,
        MuiButton: {
            ...(DefaultTheme.overrides ?? {}).MuiButton,

            contained: {
                ...((DefaultTheme.overrides ?? {}).MuiButton ?? {}).contained,
                color: '#fff',
            },
        },
        MuiListItem: {
            root: {
                color: '#fff',
                '&$selected': {
                    color: Config.GLOBAL_PRIMARY_COLOR,
                    backgroundColor: 'rgba(66, 165, 245, 0.16)',
                },
            },
        },

        MuiSlider: {
            ...(DefaultTheme.overrides ?? {}).MuiSlider,
            thumb: {
                ...(DefaultTheme.overrides ?? {}).MuiSlider?.thumb,
                color: '#424242',
            },
        },

        MuiOutlinedInput: {
            ...(DefaultTheme.overrides ?? {}).MuiOutlinedInput,
            root: {
                backgroundColor: '#edefff50',
                color: '#ffffffd4',
            },
        },

        MuiPaper: {
            ...(DefaultTheme.overrides ?? {}).MuiPaper,
            root: {
                backgroundColor: '#2A2A2A',
            },
        },        
    },
};
