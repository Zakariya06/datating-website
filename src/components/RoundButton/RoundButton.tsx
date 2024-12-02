import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

export interface IRoundButtonProps {
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    dense?: boolean;
    onClick?(): void;
}

const useStyles = makeStyles({
    root: {
        borderRadius: 100,
        padding: 12,
        width: 44,
        height: 44,
        minWidth: 'auto',
    },

    containedSizeSmall: {
        width: 36,
        height: 36,
        padding: 8,
    },
    label: {
        width: 20,
    },
});

export const RoundButton = (props: IRoundButtonProps) => {
    const { icon, onClick, className, style, dense, children } = props;
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="primary"
            classes={classes}
            onClick={onClick}
            className={className}
            style={style}
            size={dense ? 'small' : undefined}
        >
            {icon || children}
        </Button>
    );
};

export default RoundButton;
