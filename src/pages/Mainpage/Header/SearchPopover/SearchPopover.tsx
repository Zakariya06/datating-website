import { Divider, Paper, Popover, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';

import SearchFilter from '../../Sidebar/SearchFilter';
import UserSearch from '../../Sidebar/UserSearch';

export interface ISearchPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    closePopper(): void;
}

const useStyles = makeStyles((theme) => ({
    popoverRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export const SearchPopover = memo((props: ISearchPopoverProps) => {
    const { open, anchorEl, closePopper } = props;
    const classes = useStyles();

    return (
        <Popover
            anchorReference="none"
            classes={{
                root: classes.popoverRoot,
            }}        
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            open={open}
            onClose={closePopper}
            anchorEl={anchorEl}
        >
            <Paper style={{ padding: 24 }}>
                <UserSearch />
                <Divider />
                <SearchFilter />
                {/* <ChangeLocation /> */}
            </Paper>
        </Popover>
    );
});

export default SearchPopover;

