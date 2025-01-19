import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { MESSAGES_PATH, REGISTER_USER } from '../../models/Paths';
import { IStrangerUser } from '../../models/user/IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from '../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser } from '../../models/user/IUser';
import CardActionButton from '../../pages/Mainpage/components/CardActionButton';
import ChatActionCreator from '../../services/Chat/actions/ChatActionCreator';

export interface IMessageButtonProps {
    profilId: string;
    username: string;
    strangerUser?: IStrangerUser | IStrangerUserPreview;
    token?: string;
    user?: IUser;
    variant?: 'icon' | 'fab';
}

export const MessageButton = (props: IMessageButtonProps) => {
    const { profilId, username, strangerUser, variant, user, token } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const handleMessagePress = useCallback(async () => {
        if(!user && !token){
            history.push(REGISTER_USER, { from: location.pathname });
            return;
        }
        await dispatch(ChatActionCreator.createDialog(username, strangerUser));
        // const { uuid } = action.payload.result;
        const uuid = profilId;
        // navigation.navigate(MainNavigationPages.CHAT, { uuid: uuid });

        history.push(MESSAGES_PATH.replace(':id?', uuid));
    }, [dispatch, history, profilId, strangerUser, username]);

    return <CardActionButton type="message" onClick={handleMessagePress} variant={variant} />;
};

export default MessageButton;
