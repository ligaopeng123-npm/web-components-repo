/**********************************************************************
 *
 * @模块名称: RcBr
 *
 * @模块用途: RcBr
 *
 * @创建人: pgli
 *
 * @date: 2022/5/31 19:53
 *
 **********************************************************************/
import React, {FC, Fragment, ReactNode, useEffect, useState} from 'react';

export type RcBrProps = {
    text: string | Array<any>;
    render?: (itemText: string) => ReactNode | string
};
const RcBr: FC<RcBrProps> = (props: RcBrProps) => {
    const {text, render} = props;
    const [rows, setRows] = useState<any[string]>([]);
    useEffect(() => {
        if (Array.isArray(text)) {
            setRows(text);
        } else {
            setRows(text?.split('\n'))
        }
    }, [text]);
    return (
        <>
            {
                rows?.map((row: string | any, index: number) => {
                    return <Fragment key={`${index}`}>{render ? render(row) : row}<br></br></Fragment>
                })
            }
        </>
    )
};

export default RcBr;