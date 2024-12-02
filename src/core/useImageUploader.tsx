import { useState } from 'react';

import ImFileReader from './ImFileReader';

export function useImageUploader(onFileUploaded: (base64: string) => void) {
    const [files, setFiles] = useState<File[]>();

    const onDropFiles = (acceptedFiles: File[]) => {
        files ? setFiles(files?.concat(acceptedFiles)) : setFiles(acceptedFiles);
    };

    const resetFiles = () => {
        setFiles(undefined);
    };

    const getImage = () => {
        if (files) return URL.createObjectURL(files[0]);
        else return '';
    };

    const handleUpload = () => {
        if (files && files?.length === 1) {
            new ImFileReader(files[0]).readSingleFile((base64: string) => {
                onFileUploaded(base64);
                setFiles(undefined);
            });
        }
    };

    return {
        getImage: getImage,
        resetFiles: resetFiles,
        onDropFiles: onDropFiles,
        handleUpload: handleUpload,
        hasFiles: files && files?.length > 0,
    };
}
