import { Paper, useMediaQuery } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react';

import DirectInteractionActionCreator from '../../../../actions/DirectInteractionActionCreator';
import ProfileImageDialog from '../../../../components/ProfileImageDialog/ProfileImageDialog';
import ProgressiveImage from '../../../../components/ProgressiveImage';
import generateValidUrl from '../../../../core/fetch/generateValidUrl';
import { IStrangerUser } from '../../../../models/user/IStrangerUser/IStrangerUser';
import { IUser, getProfileImage } from '../../../../models/user/IUser';

export interface IStrangerProfileCardProps {
    strangerUser: IStrangerUser;
    user?: IUser;
    token?: string;
}

export const StrangerProfileCard = memo((props: IStrangerProfileCardProps) => {
    const { strangerUser, user, token } = props;
    const { Profilid } = strangerUser;

    const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState<boolean>(false);
    const profileImage = getProfileImage(strangerUser);

    const handleProfileImageClick = () => setIsProfileImageDialogOpen(true);

    useEffect(() => {
        void DirectInteractionActionCreator.triggerVisitUser(Profilid, token, user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Profilid]);

    const isMobile = useMediaQuery('(max-width:1000px)', { defaultMatches: true });

    return (
        <>
            <Paper style={{ minWidth: 250, backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '100%' }}>
                <ProgressiveImage
                    style={{ height: isMobile ? '50vh' : '100%', backgroundSize: 'cover' }}
                    src={generateValidUrl(profileImage)}
                    onClick={handleProfileImageClick}
                />
            </Paper>
            {isProfileImageDialogOpen && (
                <ProfileImageDialog open={isProfileImageDialogOpen} onClose={() => setIsProfileImageDialogOpen(false)} image={profileImage} />
            )}
        </>
    );
});

export default StrangerProfileCard;
