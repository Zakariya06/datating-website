import React from 'react';
import { Button } from '@material-ui/core';

import DropzoneComponent from 'pages/Mainpage/ProfilePage/components/DropzoneComponent';
import { useImageUploader } from 'core/useImageUploader';
// import DropzoneComponent from '../DropzoneComponent';

export interface IDropzoneUploadProps {
    onUpload: (base64: string) => void;
}

const DropzoneUpload = ({ onUpload }: IDropzoneUploadProps) => {
    const { getImage, handleUpload, onDropFiles, resetFiles, hasFiles } = useImageUploader(onUpload);

    return (
        <div className="flex column spacing triple margin bottom align-items-center">
            {hasFiles ? (
                <div
                    style={{
                        width: 280,
                        height: 280,
                        backgroundImage: `url(${getImage()})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '8px',
                        border: '2px solid #ccc',
                    }}
                />
            ) : (
                <DropzoneComponent
                    onDropFiles={onDropFiles}
                    style={{ background: 'rgba(227, 178, 60, 0.2)', border: '2px dashed rgb(227, 178, 60)', borderRadius: '12px' }}
                />
            )}
            {hasFiles && (
                <Button onClick={handleUpload} color="primary" className="spacing double margin top" variant="contained">
                    Upload Image
                </Button>
            )}
            <Button onClick={resetFiles} color="secondary" className="spacing double margin top" variant="outlined">
                Reset
            </Button>
        </div>
    );
};

export default DropzoneUpload;

