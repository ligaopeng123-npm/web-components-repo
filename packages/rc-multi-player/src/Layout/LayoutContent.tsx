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
import { LayoutJsonItemRows, MultiStoreEnum, Props } from "../MultiTyping";
import styles from "../styles.module.less";
import LayoutPlayer from "../Player/LayoutPlayer";
import { PlayerEvents } from "../Player/PlayerTyping";

type LayoutContentProps = { events?: PlayerEvents, hideAction?: boolean } & Props;

const LayoutContentGrid = ({ layout, dispatch, state, playerList, events, defaultPlayerConfig }: any) => {
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
                                    ? <Grid key={colItem.key || index}
                                            item
                                            style={{ height: colItem.height }}
                                            xs={colItem.width / 2}>
                                        <LayoutContentGrid
                                            events={events}
                                            state={state}
                                            dispatch={dispatch}
                                            layout={colItem}
                                            defaultPlayerConfig={defaultPlayerConfig}
                                            playerList={playerList}/>
                                    </Grid>
                                    : <Grid
                                        onClick={() => {
                                            onItemClick(colItem.key);
                                        }}
                                        item
                                        id={`multi-screen-player-item-${colItem.key}`}
                                        key={colItem.key || index}
                                        className={`${styles.item} multi-screen-player-item`}
                                        xs={colItem.width / 2}
                                        style={{ height: colItem.height }}
                                    >
                                        <LayoutPlayer
                                            playerList={playerList}
                                            events={events}
                                            state={state}
                                            dispatch={dispatch}
                                            layoutIndex={colItem.key}
                                            defaultPlayerConfig={defaultPlayerConfig}
                                            playerConfig={playerList[+colItem.key]?.playerConfig}
                                            mediaDataSource={playerList[+colItem.key]?.mediaDataSource}
                                            selected={selectedPlayer === colItem.key}/>
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
    const { state, dispatch, events, hideAction, defaultPlayerConfig } = props;
    const layoutVal = state[MultiStoreEnum.layout];
    const playerList = state[MultiStoreEnum.playerList];
    return (
        <div className={styles.content} style={hideAction ? {height: 'calc(100% - 0px)'} : {}}>
            <LayoutContentGrid
                events={events}
                playerList={playerList}
                layout={layoutVal}
                defaultPlayerConfig={defaultPlayerConfig}
                dispatch={dispatch}
                state={state}/>
        </div>
    )
};

export default LayoutContent;
