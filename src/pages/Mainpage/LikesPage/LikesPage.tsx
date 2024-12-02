import React, { useEffect, useState } from 'react';
import { batch, shallowEqual, useDispatch, useSelector } from 'react-redux';

import LikesActionCreator from '../../../actions/LikesActionCreator';
import MatchAvatars from '../../../components/MatchAvatars';
import UserCardGrid from '../../../components/UserCardGrid';
import { IState } from '../../../models/state';
import { getLikes, getMatches } from '../../../selectors/LikesSelectors';

interface IFeed {}
export interface ILikesPageProps {
    feed: IFeed[];
}

export const LikesPage: React.FC<ILikesPageProps> = ({ feed }) => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState<boolean>(true);
    const { likes, matches } = useSelector((state: IState) => ({ likes: getLikes(state), matches: getMatches(state) }), shallowEqual);

    useEffect(() => {
        batch(() => {
            void (async () => {
                setisLoading(true);
                dispatch(LikesActionCreator.fetchMatches());
                await dispatch(LikesActionCreator.fetchLikes());
                setisLoading(false);
            })();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="flex column profileSec">
            {/*<MatchAvatars matches={matches} />*/}
            <UserCardGrid isLoading={isLoading} items={likes._embedded.items} viewType="like" />
        </section>
    );
};

export default LikesPage;
