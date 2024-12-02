import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';

import ConfirmEmailModal from '../../../components/ConfirmEmailModal';
import { getUser } from '../../../selectors/AuthenticationSelectors';
import useTranslation from '../../../services/i18n/core/useTranslation';
import UploadProfilePictureDialog from '../ProfilePage/components/UploadProfilePictureDialog';
import { NewsFeedUserStatItem } from './NewsFeedUserStatItem';

export const NewsFeedUserStats = memo(() => {
    const user = useSelector(getUser);
    const [openUploadProfilePicture, setOpenUploadProfilePicture] = useState<boolean>(false);
    const [openConfirmEmailDialog, setOpenConfirmEmailDialog] = useState<boolean>(false);
    const { NEWSFEED_PROFILE_PICUTRE, NEWSFEED_EMAIL_VERIFICATION, NEWSFEED_VERIFY, NEWSFEED_VERIFIED } = useTranslation();

    const hasProfileImage = Boolean(user?.Pictures?.find((x) => x.ProfileImage));

    return (
        <div style={{ marginTop: 16 }} className="flex no-grow">
            <div className="flex column">
                {hasProfileImage && Boolean(user?.Verifiy) ? (
                    <Typography className="spacing margin double bottom text-align-center" variant="overline">
                        {NEWSFEED_VERIFIED}
                    </Typography>
                 ) : (
                    <Typography className="spacing margin double bottom text-align-center" variant="overline">
                        {NEWSFEED_VERIFY}
                    </Typography>                    
                )}

                <NewsFeedUserStatItem
                    text={NEWSFEED_PROFILE_PICUTRE}
                    value={hasProfileImage}
                    button
                    onClick={() => setOpenUploadProfilePicture(true)}
                />
                <NewsFeedUserStatItem
                    text={NEWSFEED_EMAIL_VERIFICATION}
                    value={Boolean(user?.Verifiy)}
                    button
                    onClick={() => setOpenConfirmEmailDialog(true)}
                />


                <UploadProfilePictureDialog open={openUploadProfilePicture} onClose={() => setOpenUploadProfilePicture(false)} />
                <ConfirmEmailModal
                    isOpen={openConfirmEmailDialog}
                    onClose={() => setOpenConfirmEmailDialog(false)}
                />
            </div>
        </div>
    );
});

export default NewsFeedUserStats;
