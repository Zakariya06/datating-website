import './Image.scss';

import React, { CSSProperties, ImgHTMLAttributes, memo, useCallback, useEffect, useState } from 'react';

import LoadingOverlay from '../../LoadingOverlay';
import { ReactChildren } from '../../models/core/ReactChildren';

export interface IImageProps {
    id?: string;
    className?: string;
    style?: CSSProperties;
    backgroundSize?: 'cover' | 'contain';

    src: string;
    placeholder?: string;
    alt?: string;

    imageClassName?: string;
    revealClassName?: string;
    previewClassName?: string;
    imgProps?: ImgHTMLAttributes<HTMLImageElement>;
    children?: ReactChildren;
    onClick?(e: React.MouseEvent<HTMLElement>): void;
}

export const LazyImage = memo((props: IImageProps) => {
    const { src, style = {}, className = '', id, children, backgroundSize, onClick } = props;
    // const { imageClassName = '', revealClassName = '', previewClassName = '' } = props;
    const [finishedLoading, setFinishedLoading] = useState<boolean>(false);
    const handleImageLoad = useCallback(() => setFinishedLoading(true), []);

    // const loadingStateClass = finishedLoading ? `image-reveal ${revealClassName}` : `image-preview ${previewClassName}`;
    // const imgClassName = `image ${imageClassName} ${loadingStateClass}`;

    useEffect(() => {
        const imageLoader = new Image();
        imageLoader.src = src;

        imageLoader.onload = handleImageLoad;
    }, [handleImageLoad, src]);

    let imgSrc = '';
    if(window.location.href.includes('profile')) {
        imgSrc = src;
    }

    return (
        <div
            className={`image-root ${className}`}
            id={id}
            style={{ backgroundImage: `url(${imgSrc})`, backgroundSize: backgroundSize, ...style }}
            onClick={onClick}
        >
            {!finishedLoading && (
                <div className="flex full-height full-width" style={{ margin: 'auto' }}>
                    <LoadingOverlay />
                </div>
            )}
            {children}
            {/* <img {...imgProps} className={imgClassName} alt={alt} src={src} style={style} onLoad={handleImageLoad} draggable={false} /> */}
        </div>
    );
});

export default LazyImage;
