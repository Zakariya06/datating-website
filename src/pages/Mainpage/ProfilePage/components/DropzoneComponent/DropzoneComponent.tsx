import './DropZone.scss';

import { faPlus } from '@fortawesome/pro-light-svg-icons';
import { Typography, useTheme } from '@material-ui/core';
import React, { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Icon from '../../../../../components/Icon';
import useTranslation from '../../../../../services/i18n/core/useTranslation';

export interface IDropzoneProps {
    style?: React.CSSProperties;
    hideText?: boolean;
    onDropFiles(acceptedFiles: File[]): void;
}

export const DropzoneComponent = memo((props: IDropzoneProps) => {
    const { onDropFiles, style = {}, hideText } = props;
    const theme = useTheme();
    const { DROPZONE_TEXT, DROPZONE_DRAG_TEXT } = useTranslation();

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length === 1) {
                onDropFiles(acceptedFiles);
            }
        },
        [onDropFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false, accept: 'image/png, image/jpeg, image/svg+xml' });

    const className = `drop-zone ${theme.palette.type}`;

    return (
        <div {...getRootProps()} style={style} className={className}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>{DROPZONE_DRAG_TEXT}</p>
            ) : (
                <div>
                    <div style={{ alignSelf: 'center' }} className="flex justify-content-center">
                        <Icon fontSize="large" icon={faPlus} />
                    </div>
                    {!hideText && (
                        <div className="flex center spacing margin double top">
                            <Typography variant="h6" align="center">
                                {DROPZONE_TEXT}
                            </Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});

export default DropzoneComponent;
