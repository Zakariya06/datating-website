import './UserCardGrid.scss';

import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

import useUserAndToken from '../../core/useUserAndToken';
import { IStrangerUserPreview } from '../../models/user/IStrangerUser/IStrangerUserPreview';
import { isUserNew } from '../../models/user/IUser';
import ProfileCardComponent from '../../pages/Mainpage/components/ProfileCardComponent';
import useTranslation from '../../services/i18n/core/useTranslation';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import EmptyState from '../EmptyState/EmptyState';
import { useRouteMatch } from 'react-router-dom';
import { EXPLORER_PATH } from 'models/Paths';
import img from '../../assets/images/emptyStates/Notifications_Monochromatic.svg';
import { Box } from 'lucide-react';
import ProfileCardComponent_Grid from 'pages/Mainpage/components/ProfileCardComponent/ProfileCardComponent_Grid';

export interface IUserCardGridProps {
    viewType: 'like' | 'explorer' | 'visitor';
    isLoading?: boolean;
    items: IStrangerUserPreview[];
    pageSize?: number;
    onScrolledToBottom?(): void;
}

export const UserCardGrid = memo((props: IUserCardGridProps) => {
    const { isLoading, items, viewType, pageSize = 18, onScrolledToBottom } = props;
    const { user, token } = useUserAndToken();
    const [displayedUsersCount, setdisplayedUsersCount] = useState<number>(pageSize);
    const { NO_EVENTS } = useTranslation();
    const isExplorerPage = useRouteMatch(EXPLORER_PATH);

    const currentItemsCount = useRef(items.length);

    useEffect(() => {
        currentItemsCount.current = items.length;
    }, [items]);

    useLayoutEffect(() => {
        let currentDisplayedUsersCount = pageSize;
        let timer: number | undefined = undefined;

        const handleScroll = (e: Event) => {
            if (timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(() => {
                // alert(`should load ${window.innerHeight} ${window.innerHeight + window.scrollY} ${document.body.offsetHeight}`);

                if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    currentDisplayedUsersCount = Math.min(currentDisplayedUsersCount + pageSize, currentItemsCount.current);
                    //setdisplayedUsersCount(currentDisplayedUsersCount); #zeigt alle an
                    setdisplayedUsersCount(100);

                    if (currentDisplayedUsersCount >= currentItemsCount.current) {
                        onScrolledToBottom && onScrolledToBottom();
                    }
                    const elements = document.querySelectorAll('.user-card-grid-item');
                    if (elements) {
                        const textArr = [''];

                        elements.forEach(function (d, i) {
                            if (textArr.indexOf(d.id) > -1) {
                                d.remove();
                                // alert('silindi' + d.id);
                            } else {
                                textArr.push(d.id);
                            }
                        });
                    }
                }
            }, 300);
        };

        window.addEventListener('touchmove', handleScroll);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (items.length === 0 && !isLoading) {
        return <EmptyState image={img} title={NO_EVENTS} imageStyles={{ maxWidth: '100%' }} titleStyle={{ fontWeight: 300, fontSize: '1.1rem' }} />;
    }

    if ((isLoading && items.length === 0) || !user || !token) {
        return (
            <div className="flex column centered">
                <ActivityIndicator />
            </div>
        );
    }

    return (
        <section
            className=" "
            style={{
                padding: viewType === 'visitor' ? '0 .7em ' : '',
                height: viewType === 'visitor' ? 700 : '',
                overflowY: 'scroll',
            }}
        >
            {isExplorerPage ? (
                <div className='user-card-grid-root'>
                    {items.slice(0, displayedUsersCount).map((item) => (
                        <ProfileCardComponent
                            key={item.Profilid}
                            newTag={isUserNew(item)}
                            type={viewType}
                            strangerUser={item}
                            user={user}
                            token={token}
                            className="user-card-grid-item"
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {items.slice(0, displayedUsersCount).map((item) => (
                        <ProfileCardComponent_Grid
                            key={item.Profilid}
                            newTag={isUserNew(item)}
                            type={viewType}
                            strangerUser={item}
                            user={user}
                            token={token}
                            className="user-card-grid-item"
                        />
                    ))}
                </div>
            )}

        </section>
    );
});

export default UserCardGrid;

