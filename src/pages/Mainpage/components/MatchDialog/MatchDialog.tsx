import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Icon from '../../../../components/Icon';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import { MESSAGES_PATH } from '../../../../models/Paths';
import { IStrangerUser } from '../../../../models/user/IStrangerUser/IStrangerUser';
import { IStrangerUserPreview } from '../../../../models/user/IStrangerUser/IStrangerUserPreview';
import { IUser, getProfileImage } from '../../../../models/user/IUser';
import ChatInput from '../../MessagesPage/ChatInput';

export interface IMatchDialogProps {
    strangerUser: IStrangerUserPreview | IStrangerUser;
    user?: IUser;

    open: boolean;
    onClose(): void;
}

export const MatchDialog = (props: IMatchDialogProps) => {
    const { strangerUser, user, open, onClose } = props;
    const history = useHistory();
    const userImg = user ? getProfileImage(user) : undefined;
    const strangerUserImg = getProfileImage(strangerUser);

    const handleSend = () => {
        history.push(MESSAGES_PATH.replace(':id?', strangerUser.Profilid));
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ style: { textAlign: 'center' }, className: 'spacing triple padding all' }}>
            <div className="flex column">
                <div className="flex">
                    <Typography
                        color="inherit"
                        style={{ fontSize: 72, fontWeight: 600, color: '#000000' }}
                        className="flex column align-self-center dancing-script"
                    >
                        Match!
                    </Typography>
                    <div style={{ position: 'absolute', right: 16, top: 16 }}>
                        <IconButton onClick={onClose}>
                            <Icon icon={faTimes} />
                        </IconButton>
                    </div>
                </div>

                <div className="flex" style={{ position: 'relative', justifyContent: 'center', margin: 32, alignItems: 'center' }}>
                    <div
                        style={{
                            backgroundImage: `url(${generateValidUrl(userImg)})`,

                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: 140,
                            height: 200,
                            borderRadius: 10,
                            transform: `scale(0.9) rotate(-10deg) translateX(10px)`,
                            backfaceVisibility: 'hidden',
                        }}
                    />

                    <div
                        style={{
                            borderRadius: 100,
                            backgroundColor: '#fff',
                            height: 32,
                            minWidth: 32,
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            position: 'absolute',
                            justifySelf: 'center',
                            zIndex: 999,
                            marginTop: -85,
                        }}
                    >
                        <Icon icon={faHeart} color="error" fontSize="small" />
                    </div>

                    <div
                        style={{
                            backgroundImage: `url(${generateValidUrl(strangerUserImg)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: 140,
                            height: 200,
                            borderRadius: 10,
                            transform: `scale(1) rotate(10deg) translateX(-10px)`,
                            backfaceVisibility: 'hidden',
                        }}
                    />
                </div>

                <div className="flex column align-content-center spacing padding top bottom">
                    <ChatInput
                        dialogId={strangerUser.Profilid}
                        user={user}
                        partnerId={strangerUser.Profilid}
                        onSend={handleSend}
                        userName={strangerUser.Username}
                        canSendIcebreaker={!strangerUser['AllreadyChattet']}
                    />
                </div>
            </div>
        </Dialog>
    );
};

export default MatchDialog;