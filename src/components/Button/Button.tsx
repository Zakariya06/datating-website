// import './Button.scss';

import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import MuiButton from '@material-ui/core/Button';
import React from 'react';

import Icon from '../Icon';

export type ButtonColor = 'primary' | 'secondary' | 'default' | 'none';

interface IButtonProps {
    children: React.ReactChild | React.ReactChildren | React.ReactChildren[];
    variant?: 'outlined' | 'contained' | 'text';
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
    fullWidth?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon?: IconDefinition;
    mediumFont?: boolean;
    onClick(): void;
}

export const Button = (props: IButtonProps) => {
    const { children, variant = 'contained', color = 'primary', onClick, fullWidth = false, icon } = props;

    return (
        <MuiButton
            onClick={onClick}
            variant={variant}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            color={color}
            fullWidth={fullWidth}
            // className={`buttonBase nunito buttonVariant-${variant} ${color && color} ${fullWidth ? 'fullWidth' : 'single'}
            // ${mediumFont ? 'mediumFont' : ''}`}
            startIcon={icon && <Icon icon={icon} className="buttonIcon" />}
            style={{
                borderRadius: 100,
            }}
        >
            {children}
        </MuiButton>
    );
};

export default Button;

// import './Button.scss';

// import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import React from 'react';

// import Icon from '../Icon';

// export type ButtonColor = 'primary' | 'secondary' | 'customFB' | 'customGradient' | 'default' | 'none';

// interface IButtonProps {
//     children: React.ReactChild | React.ReactChildren | React.ReactChildren[];
//     variant?: 'outlined' | 'contained' | 'text';
//     color?: ButtonColor;
//     fullWidth?: boolean;
//     icon?: IconProp;
//     mediumFont?: boolean;
//     onClick(): void;
// }

// export const Button = (props: IButtonProps) => {
//     const { children, variant = 'contained', color = 'primary', onClick: onPress, fullWidth = false, icon, mediumFont } = props;

//     return (
//         <Button
//             onClick={onPress}
//             className={`buttonBase nunito buttonVariant-${variant} ${color && color} ${fullWidth ? 'fullWidth' : 'single'}
// 			${mediumFont ? 'mediumFont' : ''}`}
//         >
//             {icon && <Icon icon={icon} className="buttonIcon" />}
//             {children}
//         </Button>
//     );
// };

// export default Button;
