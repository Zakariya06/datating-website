import { faTimes } from '@fortawesome/pro-light-svg-icons';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserActionCreator from '../../../../actions/UserActionCreator';
import Icon from '../../../../components/Icon';
import { useImageUploader } from '../../../../core/useImageUploader';
import { getUser } from '../../../../selectors/AuthenticationSelectors';
import ResourceService from '../../../../services/i18n';
import useTranslation from '../../../../services/i18n/core/useTranslation';
import DropzoneComponent from '../../ProfilePage/components/DropzoneComponent';
import Config from 'config';

export interface ICompleteProfilePictureDialogProps {}

export const CompleteProfilePictureDialog = memo((props: ICompleteProfilePictureDialogProps) => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [open, setopen] = useState<boolean>(false);
    const hasProfilePicture = useMemo(() => (user?.Pictures || []).find((x) => x.ProfileImage), [user?.Pictures]);

    const {
        COMPLETE_PROFILE_IMAGE_TITLE,
        SELECT_NEW_PROFILE_IMAGE_TEXT,
        SELECT_NEW_PROFILE_IMAGE_TITLE,
        SELECT_NEW_PROFILE_IMAGE_BUTTON,
    } = useTranslation();

    useEffect(() => {
        setopen(!hasProfilePicture);
    }, [hasProfilePicture]);

    const imageUploadFinished = (base64: string) => {
        void (async () => {
            await dispatch(UserActionCreator.uploadPicture({ image: base64, isProfileImage: true }));
        })();
    };

    const { getImage, handleUpload, onDropFiles, resetFiles, hasFiles } = useImageUploader(imageUploadFinished);

    const handleClose = () => {
        resetFiles();
        setopen(false);
    };

    if (!user || !open) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <div className="flex justify-content-space-between">
                    <div style={{ fontSize: 38, fontWeight: 900 }}>
                        {COMPLETE_PROFILE_IMAGE_TITLE}
                    </div>
                    <div>
                        <IconButton onClick={handleClose}>
                            <Icon icon={faTimes} />
                        </IconButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="flex column">
                    <Typography variant="h6" style={{ marginBottom: 16 }}>
                        {ResourceService.replace(SELECT_NEW_PROFILE_IMAGE_TEXT, { name: user.Username })}
                    </Typography>

                    <div className="flex column" style={{ marginBottom: 60, alignItems: 'center' }}>
                        {hasFiles ? (
                            <div
                                style={{
                                    width: 150,
                                    height: 150,
                                    backgroundImage: 'url("' + getImage() + '")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',

                                    borderColor: Config.GLOBAL_PRIMARY_COLOR,
                                }}
                            />
                        ) : (
                            <DropzoneComponent onDropFiles={onDropFiles} style={{ width: 150, height: 150, borderColor: Config.GLOBAL_PRIMARY_COLOR, backgroundColor: 'transparent' }} hideText />
                        )}
                        <Typography color="primary">{SELECT_NEW_PROFILE_IMAGE_TITLE}</Typography>
                    </div>
                </div>
            </DialogContent>
            <DialogActions className="flex column">
                {hasFiles && (
                    <Button onClick={handleUpload} color="primary">
                        {SELECT_NEW_PROFILE_IMAGE_BUTTON}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
});

export default CompleteProfilePictureDialog;
