/**********************************************************************
 *
 * @模块名称: RcCardEllipsis
 *
 * @模块用途: RcCardEllipsis
 *
 * @创建人: wangxiangyu
 *
 * @date: 2023-08-17 15:55:26
 *
 **********************************************************************/
import React, { FC, useEffect, useState } from 'react';
import { CardEllipsisConfig } from "@gaopeng123/card-ellipsis";
import { uuid } from "@gaopeng123/utils";
import "@gaopeng123/card-ellipsis";

type RcCardEllipsisChangeValue = { expand: boolean };
export type RcCardEllipsisProps = {
    minHeight?: number;
    onChange?: (v: RcCardEllipsisChangeValue) => void;
};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'card-ellipsis': CardEllipsisConfig
        }
    }
}

const RcCardEllipsis: FC<RcCardEllipsisProps> = (props) => {
    const [id] = useState(uuid(16))
    useEffect(() => {
        const card = document.querySelector(`#${id}`);
        const onChange = (e: any) => {
            const detail: RcCardEllipsisChangeValue = e.detail;
            if (props.onChange) {
                props.onChange(detail);
            }
        }
        card?.addEventListener('onChange', onChange);
        return () => {
            card.removeEventListener('onChange', onChange);
        }
    }, []);
    console.log(id)
    return (
        <card-ellipsis id={id} min-height={props.minHeight}>
            <div slot="content">{props.children}</div>
        </card-ellipsis>
    )
};

export default RcCardEllipsis;
