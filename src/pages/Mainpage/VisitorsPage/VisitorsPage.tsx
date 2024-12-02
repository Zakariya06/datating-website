import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import LikesActionCreator from '../../../actions/LikesActionCreator';
import UserCardGrid from '../../../components/UserCardGrid';
import { IState } from '../../../models/state';
import { getToken, getUser } from '../../../selectors/AuthenticationSelectors';
import { getVisitors } from '../../../selectors/LikesSelectors';


interface IFeed {
  
}
export interface IVisitorsPageProps {
    feed?: IFeed[];
}

export const VisitorsPage: React.FC<IVisitorsPageProps> = ({ feed }) => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState<boolean>(true);
    const { visitors, user, token } = useSelector(
        (state: IState) => ({
            visitors: getVisitors(state),
            user: getUser(state),
            token: getToken(state),
        }),
        shallowEqual
    );

    useEffect(() => {
        void (async () => {
            setisLoading(true);
            await dispatch(LikesActionCreator.fetchVisitors());
            setisLoading(false);
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user || !token) {
        return null;
    }

    return (
        <section className="flex profileVis"    style={{
            padding:visitors ? '0 .7em ' :'',
            height:visitors ? 700:'',
            position:'relative'
        }}>
            <UserCardGrid isLoading={isLoading} items={visitors._embedded.items} viewType="visitor" />
        </section>
    );
};

export default VisitorsPage;