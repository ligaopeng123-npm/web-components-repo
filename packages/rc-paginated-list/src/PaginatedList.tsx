/**********************************************************************
 *
 * @模块名称: PaginatedList
 *
 * @模块用途: PaginatedList 分页列表 支持下拉刷新 上拉加载
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 8:31
 *
 **********************************************************************/
import * as React from 'react';
import { useBoolean } from '@gaopeng123/hooks.use-boolean';
import { usePagination } from '@gaopeng123/hooks.use-pagination';
import { useState, useEffect, ReactNode, useRef } from 'react';
import DownLoading from './DownLoading';
import ListContent from "./ListContent";
import TopLoading from './TopLoading';
import { FixedSizeListProps, ListOnScrollProps } from "react-window";
import EmptyList from "./Empty";

type DataSource = { data: Array<any>, total: number };
type PaginationProps = {
    pageSize?: number;
    current?: number;
};

export type PaginatedListProps = {
    upLoading?: ReactNode,
    downLoading?: ReactNode,
    pagination?: PaginationProps,
    params?: any;
    request?: (params: PaginationProps, abortController: AbortController) => Promise<DataSource>;
    height?: number;
    render: (record: any, style: React.CSSProperties) => ReactNode;
    primaryColor?: string;
} & FixedSizeListProps;

const PaginatedList: React.FC<PaginatedListProps> = (props) => {
    const {pagination, request, params, upLoading, downLoading, height, itemSize} = props;
    const primaryColor = props.primaryColor || '#31CD70';
    /**
     * 分页参数
     */
    const [currentPagination, setPagination] = useState<any>(Object.assign({pageSize: 20, current: 1}, pagination));
    const [listData, setData] = useState([]);
    const [current, next, prev, reset] = usePagination(currentPagination);
    /**
     * 刷新控制
     */
    const [nextBool, {setTrue: setNextBoolTrue, setFalse: setNextBoolFalse}] = useBoolean(false);
    const [upBool, {setTrue: setUpBoolTrue, setFalse: setUpBoolFalse}] = useBoolean(false);
    const ref = useRef<HTMLDivElement & { scrollOffset: number }>();

    const onMax = () => {
        setTimeout(() => {
            setNextBoolFalse();
        });
    }

    const onMin = () => {

    }

    /**
     * 参数变化刷新
     */
    const [loadId, setLoadId] = useState<number>();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        reset();
        setLoadId(Date.now());
    }, [params]);

    /**
     * 接口数据获取
     */
    useEffect(() => {
        if (request && loadId) {
            const abortController = new AbortController();
            request(Object.assign({}, params, currentPagination, {current}), abortController)
                .then(({data, total}) => {
                    /**
                     * 分页参数控制
                     */
                    setPagination({total, pageSize: currentPagination.pageSize, onMax, onMin});
                    /**
                     * 第一页重新加载
                     */
                    setData(current !== 1 ? [...listData, ...data] : data);
                    setUpBoolFalse();
                    setNextBoolFalse();
                    setLoaded(true);
                })
            return () => {
                abortController?.abort();
            }
        }
    }, [loadId, current]);

    const currentHeight = height || 600;
    const currentItemSize: number = itemSize || 40;

    return (
        <div ref={ref}>
            {
                upBool ? upLoading || <TopLoading itemStyle={{background: primaryColor}}/> : null
            }
            {
                listData?.length
                    ? <ListContent
                        itemCount={listData.length}
                        height={currentHeight}
                        itemSize={currentItemSize}
                        onScroll={(p: ListOnScrollProps) => {
                            // "backward" 向上  forward 向下
                            if (ref.current) {
                                ref.current.scrollOffset = p.scrollOffset;
                            }
                            if (p.scrollDirection === 'forward') {
                                const currentHeight = height || 600;
                                const currentItemSize: number = itemSize || 40;
                                if ((p.scrollOffset + currentHeight >= currentItemSize * listData.length)) {
                                    next();
                                    setNextBoolTrue();
                                }
                            } else if (p.scrollDirection === 'backward') {
                                if (!p.scrollOffset) {
                                    reset();
                                    setLoadId(Date.now());
                                    setUpBoolTrue();
                                }
                            }
                        }}
                        data={listData}
                        {...props}
                    />
                    : <EmptyList loaded={loaded} textStyle={{color: primaryColor}} style={{backgroundColor: primaryColor}}/>
            }

            {
                nextBool ? downLoading || <DownLoading itemStyle={{background: primaryColor}}/> : null
            }
        </div>
    )
};

export default PaginatedList;
