import { Typography } from '@material-ui/core';
import React, { CSSProperties } from 'react';
import IMAGE from '../../assets/images/emptyStates/empty.png';

export interface IEmptyStateProps {
    image?: string;
    title?: string;
    titleStyle?: CSSProperties;
    description?: string;
    imageStyles?: CSSProperties;
}

export const EmptyState = (props: IEmptyStateProps) => {
    const { image, title, titleStyle, description, imageStyles = {} } = props;

    return (
        <div className="flex column align-items-center justify-content-center">
            <img src={image ?? IMAGE} alt="empty state" style={{ maxWidth: 350, ...imageStyles }} className="spacing triple margin bottom" />
            {title && (
                <Typography variant="h6" style={titleStyle}>
                    {title}
                </Typography>
            )}
            {description && <Typography>{description}</Typography>}
        </div>
    );
};

export default EmptyState;
