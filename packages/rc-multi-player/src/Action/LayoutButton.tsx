/**********************************************************************
 *
 * @模块名称: LayoutButton
 *
 * @模块用途: LayoutButton  菜单切换
 *
 * @创建人: pgli
 *
 * @date: 2022/10/19 11:17
 *
 **********************************************************************/
import * as React from 'react';
import { useRef } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import styles from '../styles.module.less';
import { LayoutButtonProps, LayoutJsonItem, MultiStoreEnum } from "../MultiTyping";
import { AssetsIcon, LayoutJson } from "../assets";
import AppsIcon from '@mui/icons-material/Apps';
import { isEmptyObject } from "@gaopeng123/utils";

const LayoutButton: React.FC<LayoutButtonProps> = (props) => {
    const {state, dispatch} = props;
    const bthRef = useRef<any>(null);
    const onMenuClick = (item: LayoutJsonItem, popupState: any) => {
        const selectedPlayer = state[MultiStoreEnum.selectedPlayer];
        // 上一次选择的屏数
        const lastSelectedScreen = parseInt(state[MultiStoreEnum.selectedScreen]);
        // 当前选中的屏幕
        const currentSelectedScreen = +item.key;
        const playerList = state[MultiStoreEnum.playerList];
        // 当分屏选中的屏幕太少 移动到第一位
        if (+selectedPlayer > currentSelectedScreen) {
            dispatch({
                type: MultiStoreEnum.selectedPlayer,
                value: '0'
            })
        }
        /**
         * 当从少数屏幕切换到多数屏幕时 不做修改
         * 当从多数屏 切换到 少数屏时 此时需要做下处理 保证视频的存活
         */
        if (lastSelectedScreen > currentSelectedScreen) {
            const latestPlayer = [];
            const startLen = currentSelectedScreen - 1;
            const endLen = lastSelectedScreen;
            const newPlayerList = [...playerList];
            for (let i = startLen; i < endLen; i++) {
                if (newPlayerList[i] && !isEmptyObject(newPlayerList[i])) {
                    latestPlayer.push(newPlayerList[i]);
                }
            }
            if (latestPlayer?.length) {
                for (let i = 0; i < newPlayerList.length; i++) {
                    /**
                     * 如果补充完了 就停止循环
                     */
                    if (!latestPlayer.length) {
                        break;
                    }
                    if (!newPlayerList[i] || isEmptyObject(newPlayerList[i])) {
                        const currentPlayer = latestPlayer.shift();
                        newPlayerList[i] = currentPlayer;
                    }
                }
            }
            dispatch({
                type: MultiStoreEnum.playerList,
                value: newPlayerList?.slice(0, currentSelectedScreen)
            })
        } else {
            const addPlayerList = new Array(currentSelectedScreen - lastSelectedScreen).fill(0)?.map(() => {
                return {}
            });
            dispatch({
                type: MultiStoreEnum.playerList,
                value: [...playerList, ...addPlayerList]
            });
        }
        dispatch({
            type: MultiStoreEnum.selectedScreen,
            value: item.key
        });
        dispatch({
            type: MultiStoreEnum.layout,
            value: item
        });

        popupState.close();
    }
    return (
        // @ts-ignore
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState: any) => (
                <React.Fragment>
                    <Button style={props.style} ref={bthRef} startIcon={<AppsIcon/>}
                            size="small"
                            className={`${styles.bottom} ${props.className}`}
                            color="info" {...bindTrigger(popupState)}>
                        分屏
                    </Button>
                    <Menu {...bindMenu(popupState)} className={styles.menu} anchorEl={bthRef.current}>
                        {
                            LayoutJson?.data?.map((item: LayoutJsonItem) => {
                                return <MenuItem
                                    key={item.key}
                                    selected={item.key == state[MultiStoreEnum.selectedScreen]}
                                    onClick={() => onMenuClick(item, popupState)}>
                                    <span className={styles.menuItem}>
                                    <img width={16} height={16}
                                         src={AssetsIcon[item.key]}/>
                                        {item.name}
                                    </span>
                                </MenuItem>
                            })
                        }
                    </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
};

export default LayoutButton;