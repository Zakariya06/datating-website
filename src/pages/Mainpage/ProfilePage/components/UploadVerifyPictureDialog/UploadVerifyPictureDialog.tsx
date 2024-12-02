import { Button } from '@material-ui/core';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import UserActionCreator from '../../../../../actions/UserActionCreator';
import Modal from '../../../../../components/Modal';
import { useImageUploader } from '../../../../../core/useImageUploader';
import useTranslation from '../../../../../services/i18n/core/useTranslation';
import DropzoneComponent from '../DropzoneComponent';
import Geste from '../../../../../assets/images/verifizierung_geste.png';

export interface IUploadProfilePictureDialogProps {
    open: boolean;
    onClose(): void;
}

export const UploadProfilePictureDialog = memo((props: IUploadProfilePictureDialogProps) => {
    const { open, onClose } = props;
    const dispatch = useDispatch();
    const { OWN_PROFILE_UPLOAD_PHOTO, OWN_VERIFY_UPLOAD_IMAGE_TITLE, OWN_VERIFY_UPLOAD_IMAGE_DESC } = useTranslation();

    const imageUploadFinished = (base64: string) => {
        void (async () => {
            onClose();
            await dispatch(UserActionCreator.uploadPicture({ image: base64, isVerifyImage: true }));
        })();
    };

    const { getImage, handleUpload, onDropFiles, resetFiles, hasFiles } = useImageUploader(imageUploadFinished);

    const handleClose = () => {
        resetFiles();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title={OWN_VERIFY_UPLOAD_IMAGE_TITLE}
            actionsClassName="flex column"
            actions={
                <>
                    {hasFiles && (
                        <Button onClick={handleUpload} color="primary" className="spacing double margin bottom">
                            {OWN_PROFILE_UPLOAD_PHOTO}
                        </Button>
                    )}
                </>
            }
        >
            {OWN_VERIFY_UPLOAD_IMAGE_DESC}<br></br><br></br>
            <div className="flex row spacing triple margin bottom align-items-center">
                <div
                    style={{
                        width: 280,
                        height: 280,
                        backgroundImage: 'url("' + Geste + '")',
                        backgroundSize: 'cover',
                    }}
                />
                {hasFiles ? (
                    <div
                        style={{
                            width: 280,
                            height: 280,
                            backgroundImage: 'url("' + getImage() + '")',
                            backgroundSize: 'cover',
                        }}
                    />
                ) : (
                    <DropzoneComponent onDropFiles={onDropFiles} />
                )}                
            </div>
        </Modal>
    );
});

export default UploadProfilePictureDialog;
