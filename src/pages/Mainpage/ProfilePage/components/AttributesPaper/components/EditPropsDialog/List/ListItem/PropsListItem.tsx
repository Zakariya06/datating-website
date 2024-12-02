import { IconDefinition, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { Button, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React, { memo, useCallback, useState } from 'react';

import Icon from '../../../../../../../../../components/Icon';
import ListItemMenu from './ListItemMenu';

export interface IPropsListItemProps {
    icon: IconDefinition;
    text: string;
    color: string;
    value: number | undefined;
    menuItems: Array<[string, string]>;
    onChange(value: number): void;
}

export const PropsListItem = memo((props: IPropsListItemProps) => {
    const { icon, text, menuItems, color, value = 0, onChange } = props;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [selectedItemKey, selectedItemValue = ''] = menuItems.find(([key]) => Number(key) === value) || menuItems[0] || [0, ''];

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
    const handleClose = useCallback(() => setAnchorEl(null), []);

    const handleValueChange = useCallback(
        (item: number) => {
            onChange(item);
            handleClose();
        },
        [onChange, handleClose]
    );

    return (
        <ListItem>
            <ListItemIcon>
                <Icon iconColor={color} icon={icon} />
            </ListItemIcon>
            <ListItemText primary={text} style={{ color: color }} />
            <ListItemSecondaryAction>
                <Button
                    color="default"
                    style={{ textTransform: 'none' }}
                    endIcon={<Icon icon={faChevronRight} />}
                    onClick={handleClick}
                    variant="text"
                >
                    {selectedItemValue}
                </Button>
            </ListItemSecondaryAction>
            <ListItemMenu
                menuItems={menuItems}
                anchorEl={anchorEl}
                onValueChange={handleValueChange}
                onClose={handleClose}
                selectedKey={selectedItemKey}
            />
        </ListItem>
    );
});

export default PropsListItem;
