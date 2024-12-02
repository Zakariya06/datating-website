import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import DirectInteractionActionCreator from '../../../actions/DirectInteractionActionCreator';
import img from '../../../assets/images/emptyStates/sad_face.svg';
import EmptyState from '../../../components/EmptyState/EmptyState';
import UserCardGrid from '../../../components/UserCardGrid';
import useUserAndToken from '../../../core/useUserAndToken';
import LoadingOverlay from '../../../LoadingOverlay';
import { isError } from '../../../models/core/error/IError';
import { IStrangerUserPreview } from '../../../models/user/IStrangerUser/IStrangerUserPreview';
import ResourceService from '../../../services/i18n';
import useTranslation from '../../../services/i18n/core/useTranslation';

export interface ISearchUserPageProps extends RouteComponentProps<{ id?: string }> {}

export const SearchUserPage = (props: ISearchUserPageProps) => {
    const { match } = props;
    const { user, token } = useUserAndToken();
    const [isLoading, setisLoading] = useState<boolean>(true);
    const [users, setusers] = useState<IStrangerUserPreview[]>([]);
    const { USER_SEARCH_TITLE, USER_SEARCH_EMPTY_STATE } = useTranslation();

    const id = match.params.id;

    useEffect(() => {
        if (token && user && id) {
            void (async () => {
                setisLoading(true);
                const res = await (await DirectInteractionActionCreator.searchUsers(token, user, id)).json();
                setisLoading(false);

                if (!isError(res)) {
                    setusers(res);
                } else {
                    setusers([]);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="flex column">
            <Typography variant="overline" className="spacing double margin bottom text-align-center">
                {USER_SEARCH_TITLE}
            </Typography>
            {isLoading && <LoadingOverlay />}
            {users.length > 0 ? (
                <UserCardGrid viewType="explorer" isLoading={false} items={users} />
            ) : (
                !isLoading && <EmptyState image={img} description={ResourceService.replace(USER_SEARCH_EMPTY_STATE, { name: id ?? '' })} />
            )}
        </div>
    );
};

export default SearchUserPage;

