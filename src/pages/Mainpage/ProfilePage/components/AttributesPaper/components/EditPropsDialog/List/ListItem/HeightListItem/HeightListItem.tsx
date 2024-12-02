import { faRuler } from '@fortawesome/pro-light-svg-icons';
import { ListItem, ListItemIcon, ListItemText, Slider, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';

import Icon from '../../../../../../../../../../components/Icon';
import { formatHeight } from '../../../../../../../../../../models/user/IUser';

export interface IHeightListItemProps {
    text: string;
    value: number;
    onChange(value: number): void;
}

export const HeightListItem = (props: IHeightListItemProps) => {
    const { text, value, onChange } = props;

    const handleChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (event: any, newValue: number | number[]) => {
            onChange(newValue as number);
        },
        [onChange]
    );

    return (
        <ListItem>
            <ListItemIcon>
                <Icon iconColor="rgb(38, 198, 218)" icon={faRuler} />
            </ListItemIcon>

            <ListItemText primary={text} style={{ color: 'rgb(38, 198, 218)' }} />
            <div className="flex row no-grow align-items-center">
                <Typography variant="body2" className="spacing double padding left right" style={{ whiteSpace: 'nowrap' }}>
                    {formatHeight(value)}
                </Typography>
                <Slider style={{ minWidth: 150, marginRight: 16 }} min={100} step={1} max={230} value={value} onChange={handleChange} />
            </div>
        </ListItem>
    );
};

export default HeightListItem;
