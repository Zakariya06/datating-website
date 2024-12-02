import { Menu, MenuItem } from '@material-ui/core';
import React, { memo } from 'react';

export interface IListItemMenuProps {
    menuItems: Array<[string, string]>;
    anchorEl: HTMLElement | null;
    selectedKey?: string;
    onValueChange(item: number): void;
    onClose(): void;
}

export const ListItemMenu = memo((props: IListItemMenuProps) => {
    const { menuItems, anchorEl, selectedKey, onValueChange, onClose } = props;

    return (
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} variant="selectedMenu">
            {menuItems.map(([key, value]) => (
                <MenuItem key={key} onClick={() => onValueChange(Number(key))} selected={Boolean(key === selectedKey)}>
                    {value}
                </MenuItem>
            ))}
        </Menu>
    );
});

export default ListItemMenu;
