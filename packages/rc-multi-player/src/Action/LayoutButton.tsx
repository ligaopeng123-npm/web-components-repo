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
import { LayoutButtonProps, LayoutJsonItem, MultiStoreEnum, Props } from "../MultiTyping";
import { AssetsIcon, LayoutJson } from "../assets";
import AppsIcon from '@mui/icons-material/Apps';

const LayoutButton: React.FC<LayoutButtonProps> = (props) => {
    const { state, dispatch } = props;
    const bthRef = useRef();
    const onMenuClick = (item: LayoutJsonItem, popupState: any) => {
        const selectedPlayer = state[MultiStoreEnum.selectedPlayer];
        if (+selectedPlayer > +item.key) {
            dispatch({
                type: MultiStoreEnum.selectedPlayer,
                value: '0'
            })
        }
        dispatch({
            type: MultiStoreEnum.selectedScreen,
            value: item.key
        })
        dispatch({
            type: MultiStoreEnum.layout,
            value: item
        })
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
