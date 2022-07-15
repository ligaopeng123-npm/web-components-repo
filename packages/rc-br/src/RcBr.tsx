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
import Br from "./Br";
import styles from './styles.module.less';
import downIcon from './assets/down.png';

export type RcBrProps = {
    text: string | Array<any>;
    maxRow?: number; // 最长行数
    maxLength?: number; // 最长字符
    render?: (itemText: string) => ReactNode | string;
    handleMoreClick?: (rows: Array<any>) => void;
    onMoreClick?: (rows: Array<any>) => void;
};

const RcBr: FC<RcBrProps> = (props: RcBrProps) => {
    const {text, render, maxRow, maxLength, handleMoreClick, onMoreClick} = props;
    const [rows, setRows] = useState<any[string]>([]);
    const [renderRows, setRenderRows] = useState<any[string]>([]);
    const [currentRenderRows, setCurrentRenderRows] = useState<any[string]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [moreType, setMoreType] = useState<boolean>(false);
    useEffect(() => {
        if (text) {
            // 处理原始数据
            let textStr;
            if (Array.isArray(text)) {
                textStr = text.join('\n');
            } else {
                textStr = text;
            }
            setRows(textStr.split('\n'));
            // 处理渲染数据
            let renderStr = textStr;
            if (maxLength) {
                renderStr = textStr.substring(0, maxLength);
                setHasMore(true);
            }

            let renderRows = renderStr?.split('\n');
            if (maxRow && renderRows?.length) {
                renderRows = renderRows.slice(0, maxRow);
                setHasMore(true);
            }
            setRenderRows(renderRows);
            setCurrentRenderRows(renderRows);
        }
    }, [text]);

    const moreClick = () => {
        const newMoreType = !moreType
        if (newMoreType) {
            setCurrentRenderRows(rows);
        } else {
            setCurrentRenderRows(renderRows);
        }
        setMoreType(newMoreType);
    }

    return (
        <>
            {
                currentRenderRows?.map((row: string | any, index: number) => {
                    return <Fragment key={`${index}`}>
                        {
                            <>
                                {render ? render(row) : row}
                                {
                                    index + 1 < currentRenderRows.length ? <Br/> : null
                                }
                                {
                                    hasMore && index + 1 === currentRenderRows.length
                                        ? <>{!moreType ? '...' : null}
                                            <a
                                                href="!#"
                                                className={moreType ? styles.putAway : styles.hasMore}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (onMoreClick) {
                                                        onMoreClick(rows);
                                                    } else {
                                                        moreClick();
                                                        handleMoreClick && handleMoreClick(rows);
                                                    }
                                                }}></a>
                                        </>
                                        : null
                                }
                            </>
                        }
                    </Fragment>
                })
            }
        </>
    )
};

export default RcBr;
