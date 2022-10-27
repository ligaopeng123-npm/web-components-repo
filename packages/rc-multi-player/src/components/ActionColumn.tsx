/**********************************************************************
 *
 * @模块名称: ActionColumn
 *
 * @模块用途: ActionColumn  操作列
 *
 * @创建人: pgli
 *
 * @date: 2022/10/19 11:48
 *
 **********************************************************************/
import React, { useState } from 'react';
import styles from '../styles.module.less';
import LayoutButton from "./LayoutButton";
import { Props } from "../MultiTyping";
import FullScreenButton from "./FullScreenButton";
import Divider from "@mui/material/Divider";
import Hidden from "./Hidden";

type ActionColumnProps = {} & Props;
const ActionColumn: React.FC<ActionColumnProps> = (props) => {
    const { state, dispatch } = props;
    const [hidden, setHidden] = useState(false);
    return (
        <div className={styles.bottomMain}>
            <div className={styles.bottomContent}>
                <div className={styles.left}></div>
                <div className={styles.center}></div>
                <div className={styles.right}>
                    <Hidden hide={hidden}>
                        <LayoutButton state={state} dispatch={dispatch}/>
                    </Hidden>
                    <Divider classes={{ root: styles.hr }} orientation="vertical" variant="middle" flexItem/>
                    <FullScreenButton setHidden={setHidden}/>
                </div>
            </div>
        </div>
    )
};

export default ActionColumn;
