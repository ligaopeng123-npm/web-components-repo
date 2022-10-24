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
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindHover, bindMenu } from 'material-ui-popup-state';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import styles from '../styles.module.less';
import { MultiStoreEnum, Props } from "../MultiTyping";
import { AssetsIcon, LayoutJson } from "../assets";
import AppsIcon from '@mui/icons-material/Apps';

export type LayoutJsonItemRows = {
    height?: string;
    type?: 'row' | 'col';
    width?: number;
    key?: string;
    children?: Array<LayoutJsonItemRows>
}
type LayoutJsonItem = { name: string; key: string; icon: string; stream: string, children: Array<any> }

type LayoutButtonProps = {} & Props;

const LayoutButton: React.FC<LayoutButtonProps> = (props) => {
    const { state, dispatch } = props;
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
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState: any) => (
                <React.Fragment>
                    <Button startIcon={<AppsIcon/>} size="small" className={styles.bottom}
                            color="info" {...bindTrigger(popupState)}>
                        分屏
                    </Button>
                    <Menu {...bindMenu(popupState)} className={styles.menu}>
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
