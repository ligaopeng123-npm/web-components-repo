/**********************************************************************
 *
 * @模块名称: Hidden
 *
 * @模块用途: Hidden
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:03
 *
 **********************************************************************/
import React, { Children, cloneElement } from 'react';

type HiddenProps = {
    children: any;
    hide: boolean;
    style?: React.CSSProperties;
};
const Hidden = (props: HiddenProps) => {
    return (
        <>
            {
                Children.map(props.children, (child) => {
                    return child ? cloneElement(child, {
                        style: props.hide ? { display: 'none' } : props.style
                    }) : null
                })
            }
        </>
    )
};

export default Hidden;
