import { Button, FormControlLabel, Radio, RadioGroup, Slider } from '@material-ui/core';
import React, { ChangeEvent, memo, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import UserActionCreator from '../../../../../actions/UserActionCreator';
import Modal from '../../../../../components/Modal';
import ImFileReader from '../../../../../core/ImFileReader';
import ResourceService from '../../../../../services/i18n';
import useTranslation from '../../../../../services/i18n/core/useTranslation';
import DropzoneComponent from '../DropzoneComponent';

export interface IUploadPictureDialogProps {
    open: boolean;
    onClose(): void;
}

export const UploadPictureDialog = memo((props: IUploadPictureDialogProps) => {
    const { open, onClose } = props;
    const [files, setFiles] = useState<File[]>();
    const [imageType, setImageType] = useState<string>('public');
    const [cost, setCost] = useState<number>(0);
    const {
        OWN_PROFILE_UPLOAD_IMAGE_TITLE,
        OWN_PROFILE_UPLOAD_PHOTO,
        OWN_PROFILE_NORMAL_IMAGE,
        OWN_PROFILE_PRIVATE_IMAGE_COINS,
        OWN_PROFILE_PRIVATE_IMAGE,
    } = useTranslation();

    const dispatch = useDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImageType(event.target.value);
    };

    const onDropFiles = (acceptedFiles: File[]) => {
        files ? setFiles(files?.concat(acceptedFiles)) : setFiles(acceptedFiles);
    };

    const handleClose = () => {
        setFiles(undefined);
        onClose();
    };

    const img = useMemo(() => (files && files.length > 0 ? URL.createObjectURL(files[0]) : ''), [files]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSliderChange = (event: any, newValue: number) => {
        setCost(newValue);
    };

    const handleUpload = () => {
        if (files && files?.length === 1) {
            new ImFileReader(files[0]).readSingleFile((base64: string) => {
                void (async () => {
                    if (imageType === 'public') {
                        await dispatch(UserActionCreator.uploadPicture({ image: base64, isProfileImage: false }));
                    } else if (imageType === 'private') {
                        await dispatch(UserActionCreator.uploadCoinImage({ image: base64, isCoinImage: true, cost: cost }));
                    }

                    handleClose();
                })();
            });
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            title={OWN_PROFILE_UPLOAD_IMAGE_TITLE}
            actionsClassName="flex column spacing double margin top bottom"
            actions={
                <>
                    {files && files.length > 0 && (
                        <Button onClick={handleUpload} className="spacing double margin bottom">
                            {OWN_PROFILE_UPLOAD_PHOTO}
                        </Button>
                    )}
                </>
            }
        >
            <div className="flex column" style={{ alignItems: 'center' }}>
                {files && files.length > 0 ? (
                    <>
                        <div
                            style={{
                                width: 280,
                                height: 280,

                                backgroundImage: 'url("' + img + '")',
                                backgroundSize: 'cover',
                            }}
                        />

                        <div style={{ width: 250, textAlign: 'left' }} className="flex column spacing triple margin top">
                            <RadioGroup value={imageType} onChange={handleChange} defaultValue="public" defaultChecked color="primary">
                                <FormControlLabel
                                    value="public"
                                    control={<Radio color="primary" />}
                                    label={OWN_PROFILE_NORMAL_IMAGE}
                                    labelPlacement="start"
                                    className="flex justify-content-space-between"
                                />
                                <FormControlLabel
                                    value="private"
                                    control={<Radio color="primary" />}
                                    label={OWN_PROFILE_PRIVATE_IMAGE}
                                    labelPlacement="start"
                                    className="flex justify-content-space-between"
                                />
                            </RadioGroup>

                            {imageType === 'private' && (
                                <FormControlLabel
                                    control={<Slider min={5} max={1000} step={5} color="primary" onChange={handleSliderChange} />}
                                    label={ResourceService.replace(OWN_PROFILE_PRIVATE_IMAGE_COINS, { coins: cost.toString() })}
                                    labelPlacement="top"
                                    className="flex align-items-start"
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <DropzoneComponent onDropFiles={onDropFiles} />
                )}
            </div>
        </Modal>
    );
});

export default UploadPictureDialog;
