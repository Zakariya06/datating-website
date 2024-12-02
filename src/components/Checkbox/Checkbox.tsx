import { faCheckSquare, faMinusSquare, faSquare } from '@fortawesome/pro-light-svg-icons';
import MuiCheckbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

import Icon from '../Icon';

export interface ICheckboxProps extends CheckboxProps {
    label?: string;
    labelClassName?: string;
    labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

export const Checkbox = (props: ICheckboxProps) => {
    const { label, labelClassName, labelPlacement, ...rest } = props;

    const main = (
        <MuiCheckbox
            icon={<Icon icon={faSquare} />}
            checkedIcon={<Icon icon={faCheckSquare} />}
            indeterminateIcon={<Icon icon={faMinusSquare} />}
            {...rest}
        />
    );

    if (label) {
        return (
            <FormControlLabel control={main} label={label} className={labelClassName} labelPlacement={labelPlacement} />
        );
    }

    return main;
};

export default Checkbox;
