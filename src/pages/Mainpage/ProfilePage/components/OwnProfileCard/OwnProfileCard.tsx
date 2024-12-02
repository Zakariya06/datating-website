import { Card, CardActions, Link, useMediaQuery } from '@material-ui/core';
import React, { memo, useState } from 'react';

import ProfileImageDialog from '../../../../../components/ProfileImageDialog/ProfileImageDialog';
import ProgressiveImage from '../../../../../components/ProgressiveImage';
import Config from '../../../../../config';
import generateValidUrl from '../../../../../core/fetch/generateValidUrl';
import { IUser, getProfileImage } from '../../../../../models/user/IUser';
import useTranslation from '../../../../../services/i18n/core/useTranslation';

export interface IOwnProfileCardProps {
    user: IUser;
    onClick(): void;
}

export const OwnProfileCard = memo((props: IOwnProfileCardProps) => {
    const { user, onClick } = props;
    const [isProfileImageDialogOpen, setIsProfileImageDialogOpen] = useState<boolean>(false);
    const { OWN_PROFILE_CHANGE_PROFILE_PICTURE } = useTranslation();

    const isMobile = useMediaQuery('(max-width:1000px)', { defaultMatches: true });

    const profileImage = getProfileImage(user);
    const handleProfileImageClick = () => setIsProfileImageDialogOpen(true);

    const img = profileImage ? generateValidUrl(profileImage) : Config.FALLBACK_IMAGE;

    return (
        <>
            <Card style={{ minWidth: 280 }} square className="flex column">
                <ProgressiveImage
                    style={{ height: isMobile ? '50vh' : '100%', backgroundSize: 'contain' }}
                    src={img}
                    onClick={handleProfileImageClick}
                />

                <CardActions style={{ justifyContent: 'center' }}>
                    <Link onClick={onClick}>{OWN_PROFILE_CHANGE_PROFILE_PICTURE}</Link>
                </CardActions>
            </Card>
            {isProfileImageDialogOpen && (
                <ProfileImageDialog
                    ownProfile
                    open={isProfileImageDialogOpen}
                    onClose={() => setIsProfileImageDialogOpen(false)}
                    image={profileImage}
                />
            )}
        </>
    );
});

export default OwnProfileCard;
