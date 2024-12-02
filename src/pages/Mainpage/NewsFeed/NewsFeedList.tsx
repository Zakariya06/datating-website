import React from 'react';
import { AutoSizer } from 'react-virtualized/dist/es/AutoSizer';
import { FixedSizeList } from 'react-window';

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
                <FixedSizeList width={width} height={height} itemSize={98} itemCount={feed.length} itemData={[...feed].reverse()}>
                    {(p) => {
                        const item = p.data[p.index];
                        return (
                            <NotificationComponent
                                key={String(item.PushId)}
                                {...item}
                                style={p.style}
                                onDismiss={handleFeedDismiss}
                                onClick={handleFeedClick}
                            />
                        );
                    }}
                </FixedSizeList>
            )}
        </AutoSizer>
    );
}

export default NewsFeedList;
