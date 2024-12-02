import './UserSearch.scss';

import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { InputAdornment, TextField, Typography } from '@material-ui/core';
import React, { memo, useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Icon from '../../../../components/Icon';
import { USER_SEARCH_PATH } from '../../../../models/Paths';
import useTranslation from '../../../../services/i18n/core/useTranslation';

export interface IUserSearchProps {}

export const UserSearch = memo((props: IUserSearchProps) => {
    const [value, setValue] = useState<string>('');
    const timeout = useRef<number | undefined>();
    const history = useHistory();
    const { USER_SEARCH_SIDEBAR_TITLE, USER_SEARCH_PLACEHOLDER } = useTranslation();

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const currentVal = e.currentTarget.value;
            setValue(currentVal);

            if (timeout.current) {
                window.clearTimeout(timeout.current);
            }

            timeout.current = window.setTimeout(() => {
                history.push(USER_SEARCH_PATH.replace(':id?', currentVal));
            }, 1000);
        },
        [history]
    );

    return (
        <div className="flex column spacing triple margin bottom">
            <Typography variant="overline" className="spacing double margin bottom text-align-center">
                {USER_SEARCH_SIDEBAR_TITLE}
            </Typography>
            <div>
                <TextField
                    onChange={handleChange}
                    defaultValue={value}
                    placeholder={USER_SEARCH_PLACEHOLDER}
                    inputProps={{ style: { padding: 9 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment variant="standard" position="start">
                                <Icon icon={faSearch} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
});

export default UserSearch;
