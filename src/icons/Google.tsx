import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function GoogleIcon(props: Partial<SvgIconProps>) {
    return (
        <SvgIcon width={24} height={24} viewBox='-64 -64 640 640' {...props}>
            <path
                d='M262.7,223.8V301h127.7c-5.2,33.1-38.6,97-127.7,97c-76.8,0-139.5-63.6-139.5-142s62.7-142,139.5-142
                c43.7,0,73,18.5,89.7,34.6l61-58.8C374.3,53.3,323.5,31,262.7,31c-124.4,0-225,100.6-225,225s100.6,225,225,225
                c129.9,0,216.1-91.3,216.1-219.9c0-14.8-1.6-26.1-3.6-37.3L262.7,223.8z'
            />
        </SvgIcon>
    );
}
