import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { LabComponentsPropsList } from '@material-ui/lab/themeAugmentation';
import Config from '../config';

export type _internalThemeOptions = LabComponentsPropsList;

// REACT_APP_COLOR_PRIMARY_LIGHT='#ab5d9a'
// REACT_APP_COLOR_PRIMARY_MAIN='#3a6aff'
// REACT_APP_COLOR_PRIMARY_DARK='#4b0041'

export const DefaultTheme: ThemeOptions = {
    palette: {
        // type: 'dark',
        primary: {
            light: '#ab5d9a',
            main: Config.GLOBAL_PRIMARY_COLOR,
            dark: '#4b0041',
            contrastText: '#000',
        },
        secondary: {
            light: '#636a7d',
            main: '#73BCF8',
            dark: '#111929',
            contrastText: '#fff',
        },
        error: {
            main: '#ff1744',
        },
    },
    typography: {
        fontFamily: 'inherit',
        // fontSize: 16,
        htmlFontSize: 16,
        allVariants: {
            // color: '#656565',
            color: '#000000',
        },
        button: {
            textTransform: 'none',
        },
        body2: {
            fontWeight: 600,
            // fontSize: 28,
        },
        body1: {
            '@media (max-width: 400px)': {
                fontSize: '0.85rem',
            },
            fontWeight: 600,
        },
        overline: {
            fontSize: '1.1rem',
            textTransform: 'unset',
            lineHeight: 'normal',
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary',
        },
        MuiTextField: {
            variant: 'outlined',
            margin: 'dense',
        },
        MuiPaper: {
            square: true,
        },
        MuiDialog: {
            maxWidth: 'xs',
            fullWidth: true,
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                backgroundColor: '#edefff',
                color: '#000000',
            },
            notchedOutline: {
                border: 'unset',
            },
            inputMarginDense: {
                paddingTop: 13,
                paddingBottom: 13,
            },
        },
        MuiInputLabel: {
            outlined: {
                '&$shrink': {
                    transform: 'translate(4px, -16px) scale(0.9)',
                },
            },
        },

        MuiAutocomplete: {
            inputRoot: {
                '&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]': {
                    paddingTop: 8.5,
                    paddingBottom: 8.5,
                },
            },
            endAdornment: {
                display: 'none',
            },
            clearIndicator: {
                display: 'none',
            },
        },
        MuiFormLabel: {
            root: {
                '&$focused': {
                    color: 'unset',
                },
            },
        },
        MuiButton: {
            contained: {
                borderRadius: 10,
                paddingLeft: 64,
                paddingRight: 64,

                '@media (max-width: 600px)': {
                    paddingLeft: 24,
                    paddingRight: 24,
                    fontSize: '0.9rem !important',
                },
            },
            containedPrimary: {
                backgroundImage: `linear-gradient(90deg, ${Config.GLOBAL_PRIMARY_COLOR} 0%, #ab5d9a 100%)`,
                color: '#fff',
                fontSize: '1rem',

                '&$disabled': {
                    backgroundImage: 'none',
                },
            },
            containedSecondary: {
                fontSize: '1rem',
            },
            text: {
                padding: '4px 8px',
                borderRadius: 100,
            },
            // disabled: {
            //     backgroundImage: 'none',
            // },
        },
        MuiInputAdornment: {
            filled: {
                marginTop: 0,
            },
            root: {
                marginTop: 0,
            },
            positionStart: {
                marginTop: 0,
            },
            hiddenLabel: {
                marginTop: 0,
            },
        },
        MuiListItem: {
            root: {
                color: '#000000',
                '&$selected': {
                    color: Config.GLOBAL_PRIMARY_COLOR,
                    backgroundColor: Config.GLOBAL_PRIMARY_COLOR + '24',
                },
            },
        },
        MuiListItemText: {
            primary: {
                color: 'inherit',
                fontWeight: 900,
                fontSize: '1.3rem',
            },
        },
        MuiListItemIcon: {
            root: {
                minWidth: 32,
                color: 'inherit',
            },
        },

        MuiIconButton: {
            sizeSmall: {
                width: 28,
                height: 28,
                padding: 6,
            },
        },
        MuiTabs: {
            flexContainer: {
                justifyContent: 'center',
            },
        },
        MuiSlider: {
            root: {
                color: 'rgb(226, 226, 226)',
            },
            track: {
                color: Config.GLOBAL_PRIMARY_COLOR,
                height: 3,
            },
            rail: {
                height: 3,
            },

            thumb: {
                color: 'rgb(255,255,255)',
                border: '3px solid' + Config.GLOBAL_PRIMARY_COLOR,
                height: 20,
                width: 20,
                marginTop: -9,
            },
        },
        MuiMobileStepper: {
            root: {
                background: 'transparent',
            },
            dot: {
                backgroundColor: 'rgb(117, 117, 117)',
                height: 12,
                width: 12,
            },
            // dotActive: {
            //     backgroundColor: 'rgb(226, 226, 226)',
            // },
        },

        MuiTooltip: {
            tooltip: {
                fontSize: 14,
                backgroundColor: '#FFFFFF',
                color: 'rgb(117,117,117)',
                borderRadius: 0,
                padding: '8px 16px',
            },
            arrow: {
                '&::before': {
                    backgroundColor: '#FFFFFF',
                },
            },
        },

        MuiMenu: {
            paper: {
                borderRadius: 0,
            },
        },

        MuiMenuItem: {
            root: {
                // color: 'rgb(101,101,101)',
            },
        },
        MuiDialog: {
            paperWidthXs: {
                maxWidth: 480,
            },
        },
        MuiDialogTitle: {
            root: {
                padding: 24,
            },
        },
        MuiDialogActions: {
            root: {
                alignSelf: 'center',
            },
        },
        MuiChip: {
            root: {
                fontSize: '1rem',
                fontWeight: 400,
                width: 0,
                flex: '0 1 100%',
                minWidth: 90,
                maxWidth: 'fit-content',
            },
            label: {
                overflow: 'hidden',
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.08)',
                borderRadius: 15,
            },
        },
        MuiToggleButton: {
            root: {
                borderRadius: 4,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                borderWidth: 0,
                padding: '4px 16px',
                fontSize: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.09)',
                '&$selected': {
                    backgroundImage: `linear-gradient(90deg, ${Config.GLOBAL_PRIMARY_COLOR} 0%, #ab5d9a 100%)`,
                    color: `rgb(255, 255, 255)`,
                },
            },
        },
        MuiToggleButtonGroup: {
            groupedHorizontal: {
                '&:not(:first-child)': {
                    borderLeft: undefined,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                },
                '&:not(:last-child)': {
                    borderRight: undefined,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                },
            },
        },
        MuiTabList: {
            root: {
                flex: 1,
            },
        },
        MuiTab: {
            root: {
                minWidth: 'auto',

                '@media (min-width: 600px)': {
                    minWidth: 'auto',
                },
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: '1.25rem',
            },
            fontSizeSmall: {
                fontSize: '1rem',
            },
        },
    },
};
