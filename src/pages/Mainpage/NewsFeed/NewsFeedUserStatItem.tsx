import { faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Typography } from '@material-ui/core';
import React from 'react';

import Icon from '../../../components/Icon';

export interface INewsFeedUserStatItemProps {
    text: string;
    value: boolean;
    button?: boolean;
    onClick?(): void;
}

export function NewsFeedUserStatItem(props: INewsFeedUserStatItemProps) {
    const { text, value, button, onClick } = props;
    return (
        <div
            className={`flex spacing double margin bottom align-items-center ${button && !value ? 'pointer' : ''}`}
            onClick={button && !value ? onClick : undefined}
            style={{ justifyContent: 'center', paddingTop: 10 }} 
        >
            <Icon
                icon={value ? faCheck : faTimes}
                color={value ? 'secondary' : 'error'}
                fontSize="small"
                style={{ fontSize: 18 }}
                className="spacing margin right"
            />

            <Typography variant="body2">{text}</Typography>
        </div>
    );
}

export default NewsFeedUserStatItem;
