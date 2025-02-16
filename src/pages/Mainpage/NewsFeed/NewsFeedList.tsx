import React from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { FixedSizeList } from 'react-window';
import { Box } from '@mui/material';

import { IFeed } from '../../../models/news/IFeed';
import NotificationComponent from '../components/NotificationComponent';

export interface INewsFeedListProps {
    feed: IFeed[];
    handleFeedDismiss: (feed: IFeed) => void;
    handleFeedClick: (feed: IFeed) => Promise<void>;
}

export function NewsFeedList(props: INewsFeedListProps) {
    const { feed, handleFeedDismiss, handleFeedClick } = props;

    return (
        <AutoSizer>
            {({ width, height }) => (
                <FixedSizeList
                    width={width}
                    height={height}
                    itemSize={110} // Increased size for spacing
                    itemCount={feed.length}
                    itemData={[...feed].reverse()}
                >
                    {(p) => {
                        const item = p.data[p.index];
                        return (
                            <Box sx={{ paddingBottom: 1, paddingX: 1 }} style={p.style}>
                                <NotificationComponent key={String(item.PushId)} {...item} onDismiss={handleFeedDismiss} onClick={handleFeedClick} />
                            </Box>
                        );
                    }}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
}

export default NewsFeedList;

