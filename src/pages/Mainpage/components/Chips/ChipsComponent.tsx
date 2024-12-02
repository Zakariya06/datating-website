import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Chip, Paper } from '@material-ui/core';
import React, { memo } from 'react';

import Icon from '../../../../components/Icon';

export interface IChipsComponentProps {
    label: string;
    color: string;
    backgroundColor: string;
    icon: IconDefinition;
    variant?: 'outlined' | 'default';
    //deletable?:boolean;
    onClick?(): void;
    //onDelete?():void;
}

export const ChipsComponent = memo((props: IChipsComponentProps) => {
    const {
        label,
        variant = 'default',
        icon,
        // clickable = false,
        color,
        //backgroundColor,
        onClick,
    } = props;

    return (
        <Paper style={{
            margin:'.5em 0'
        }}>
            <Chip
            label={label}
            variant={variant}
            clickable={Boolean(onClick)}
            onClick={onClick}
            icon={<Icon iconColor={color}  icon={icon}  />}
            style={{
                padding: 8,
                margin: 4,
                color: color,
                backgroundColor: 'transparent',
                borderRadius: 12,
                width:'100%'
            }}
        />  
        </Paper>
    );
});

export default ChipsComponent;
