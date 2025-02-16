import { faCheck, faHourglassHalf, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Typography } from '@material-ui/core';
import React from 'react';

import Icon from '../../../components/Icon';
import Config from 'config/config';

export interface INewsFeedUserStatItemProps {
    text: string;
    value: number;
    button?: boolean;
    onClick?(): void;
}

export function NewsFeedUserStatItem(props: INewsFeedUserStatItemProps) {
    const { text, value, button, onClick } = props;
    return (
        <div
            className={`flex align-items-center ${button && !value ? 'pointer' : ''}`}
            onClick={button && !value ? onClick : undefined}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px 15px',
                borderRadius: '20px',
                border: `1px solid ${Config.GLOBAL_PRIMARY_COLOR}`,
                color: Config.GLOBAL_PRIMARY_COLOR,
                cursor: button && !value ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
                fontSize: '1.1rem',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(227, 178, 60, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <Icon
                icon={value === 1 ? faCheck : value === 0 ? faTimes : faHourglassHalf}
                color={value ? 'secondary' : 'error'}
                fontSize="small"
                style={{
                    fontSize: 18,
                    marginRight: 8,
                }}
            />
            <Typography variant="body2" style={{ marginLeft: 8 }}>
                {text}
            </Typography>
        </div>
    );
}

export default NewsFeedUserStatItem;
