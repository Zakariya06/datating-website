import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import React, { memo } from 'react';

import IceBreakerButton from '../../../../components/IceBreaker/IceBreakerButton';
import LikeButton from '../../../../components/LikeButton';
import MessageButton from '../../../../components/MessageButton';
import ZwinkerButton from '../../../../components/ZwinkerButton';
import { IStrangerUser } from '../../../../models/user/IStrangerUser/IStrangerUser';
import { IUser, getAge } from '../../../../models/user/IUser';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import AttributeChips from '../../ProfilePage/components/AttributesPaper/AttributeChips';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import Icon from 'components/Icon';

export interface IStrangerAttributesPaperProps {
    strangerUser: IStrangerUser;
    user?: IUser;
    token?: string;
}

export const StrangerAttributesPaper = memo((props: IStrangerAttributesPaperProps) => {
    const { strangerUser, user, token } = props;
    const isDesktop = useMediaQuery('(min-width:900px)', { defaultMatches: true });
    const { LOCATION_FROM } = useTranslation();
    const margin = isDesktop ? 16 : 0;

    const { Gender, Bodyjewelry, Eyes, Hair, Living, Relationship, Size, Smoker, Starsign } = strangerUser;
    const { Profilid, Username, Birthday, City = '', IsLiked, AllreadyChattet } = strangerUser;

    return (
        <Paper
            style={{ height: '100%', marginLeft: margin, backgroundColor: 'transparent', boxShadow: 'none' }}
            square
            className="flex column spacing double padding all"
        >
            <div className="flex column">
                <Typography variant="overline" className="ellipsis">
                    {Username}, {getAge(Birthday)}
                </Typography>
                <Typography variant="body1" className="ellipsis">
                    {LOCATION_FROM} {City}
                </Typography>
            </div>

            <AttributeChips
                Gender={Gender}
                Bodyjewelry={Bodyjewelry}
                Eyes={Eyes}
                Hair={Hair}
                Living={Living}
                Relationship={Relationship}
                Size={Size}
                Smoker={Smoker}
                Starsign={Starsign}
            />

            <div className="flex column" />
            {Profilid !== 'support' && (
                <div className="flex wrap align-items-center justify-content-space-around">
                    <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                        <LikeButton profilId={Profilid} strangerUser={strangerUser} token={token} user={user} variant="fab" isLiked={IsLiked} />
                    </div>

                    {token && (
                        <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                            <ZwinkerButton profilId={Profilid} username={Username} token={token} user={user} variant="fab" />
                        </div>
                    )}

                    {!AllreadyChattet && (
                        <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                            <IceBreakerButton token={token} user={user} strangerUser={strangerUser} />
                        </div>
                    )}

                    <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                        <MessageButton strangerUser={strangerUser} profilId={Profilid} username={Username} token={token} user={user} variant="fab" />
                    </div>

                    {/* <div className="flex wrap align-items-center justify-content-space-around">
                    <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                        <LikeButton profilId={Profilid} strangerUser={strangerUser} token={token} user={user} variant="fab" isLiked={IsLiked} />
                    </div>
                    <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                        <ZwinkerButton profilId={Profilid} username={Username} token={token} user={user} variant="fab" />
                    </div>

                    {!AllreadyChattet && (
                        <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                            <IceBreakerButton strangerUser={strangerUser} />
                        </div>
                    )}

                    <div style={{ flex: '1 1 50%', maxWidth: 160 }} className="spacing margin top">
                        <MessageButton strangerUser={strangerUser} profilId={Profilid} username={Username} token={token} user={user} variant="fab" />
                    </div> */}
                </div>
            )}
        </Paper>
    );
});

export default StrangerAttributesPaper;

