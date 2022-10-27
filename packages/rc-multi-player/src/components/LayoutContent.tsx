/**********************************************************************
 *
 * @模块名称: LayoutContent
 *
 * @模块用途: LayoutContent 布局管理
 *
 * @创建人: pgli
 *
 * @date: 2022/10/20 13:54
 *
 **********************************************************************/
import React from 'react';
import Grid from '@mui/material/Grid';
import { MultiStoreEnum, Props } from "../MultiTyping";
import styles from '../styles.module.less';
import { LayoutJsonItemRows } from "./LayoutButton";
import LayoutContentItem from "./LayoutContentItem";

type LayoutContentProps = {} & Props;

const LayoutContentGrid = ({ layout, dispatch, state }: any) => {
    const selectedPlayer = state[MultiStoreEnum.selectedPlayer];
    const onItemClick = (key: string) => {
        dispatch({
            type: MultiStoreEnum.selectedPlayer,
            value: key
        })
    }
    return (
        <>
            {
                layout?.children?.map((item: any, index: number) => {
                    return <Grid container key={item.key || index}
                                 style={{ height: item.height }}>
                        {
                            item?.children?.map((colItem: LayoutJsonItemRows, index: number) => {
                                return colItem?.children?.length
                                    ? <Grid key={colItem.key || index} className={styles.item} item
                                            xs={colItem.width / 2}>
                                        <LayoutContentGrid state={state} dispatch={dispatch} layout={colItem}/>
                                    </Grid>
                                    : <Grid
                                        onClick={() => {
                                            onItemClick(colItem.key);
                                        }}
                                        item
                                        id={`multi-screen-player-item-${colItem.key}`}
                                        key={colItem.key || index}
                                        className={`${styles.item} ${selectedPlayer === colItem.key ? styles.selected : ''} multi-screen-player-item`}
                                        xs={colItem.width / 2}>
                                        {colItem.key}
                                    </Grid>
                            })
                        }
                    </Grid>
                })
            }
        </>
    )
}
const LayoutContent: React.FC<LayoutContentProps> = (props) => {
    const { state, dispatch } = props;
    const layoutVal = state[MultiStoreEnum.layout];
    return (
        <div className={styles.content}>
            <LayoutContentGrid layout={layoutVal} dispatch={dispatch} state={state}/>
        </div>
    )
};

export default LayoutContent;
