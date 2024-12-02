import { Typography } from '@material-ui/core';
import React from 'react';

import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface INewTagProps {}

export const NewTag = (props: INewTagProps) => {
    const { NEW_TAG } = useTranslation();
    return (
        <div className="new-tag">
            <Typography variant="caption" color="inherit" style={{ fontWeight: 700 }}>
                {NEW_TAG}
            </Typography>
        </div>
    );
};

export default NewTag;
