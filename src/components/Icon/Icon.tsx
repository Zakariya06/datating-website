// import { icon, parse } from '@fortawesome/fontawesome-svg-core';

import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/pro-light-svg-icons';
import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

import isArray from '../../core/typeguards/isArray';

export interface IIconProps extends SvgIconProps {
    icon: IconDefinition;
    size?: SizeProp;
    iconColor?: string;
}

export const Icon: React.FC<IIconProps> = (props: IIconProps) => {
    const { style, icon, iconColor: color, ...rest } = props;

    if (!icon) {
        return null;
    }

    let iconColor = color;

    if (style && style.color) {
        iconColor = style.color;
    }

    const [width, height, , , path] = icon.icon;

    return (
        <>
            <SvgIcon viewBox={`0 0 ${width} ${height}`} style={{ ...style, color: iconColor }} {...rest}>
                {isArray(path) ? (
                    path.map((x) => (
                        <path
                            fill="currentColor"
                            // eslint-disable-next-line max-len
                            d={x}
                        ></path>
                    ))
                ) : (
                    <path
                        fill="currentColor"
                        // eslint-disable-next-line max-len
                        d={path}
                    ></path>
                )}
            </SvgIcon>
            {/* <svg
                aria-hidden="true"
                focusable="false"
                data-prefix={icon.prefix}
                data-icon={icon.iconName}
                className={`svg-inline--fa ${icon.prefix}-${icon.iconName} fa-w-16 fa-xs ${ligatures.join(' ')}`}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height}`}
                data-unicode={unicode}
                color={iconColor}
                style={{ display: 'none' }}
            >
                {isArray(path) ? (
                    path.map((x) => (
                        <path
                            fill="currentColor"
                            // eslint-disable-next-line max-len
                            d={x}
                        ></path>
                    ))
                ) : (
                    <path
                        fill="currentColor"
                        // eslint-disable-next-line max-len
                        d={path}
                    ></path>
                )}
            </svg> */}
        </>
    );
};

Icon.displayName = 'Icon';

export default Icon;
