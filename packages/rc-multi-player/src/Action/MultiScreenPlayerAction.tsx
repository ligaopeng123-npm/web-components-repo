/**********************************************************************
 *
 * @模块名称: MultiScreenPlayerAction
 *
 * @模块用途: MultiScreenPlayerAction
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:51
 *
 **********************************************************************/

import React, { useState } from 'react';
import LayoutButton from "./LayoutButton";
import { Props } from "../MultiTyping";
import FullScreenButton from "./FullScreenButton";
import Divider from "@mui/material/Divider";
import Hidden from "./Hidden";
import ActionColumn from "./ActionColumn";
import styles from "../styles.module.less";

type MultiScreenPlayerActionProps = {} & Props;
const MultiScreenPlayerAction: React.FC<MultiScreenPlayerActionProps> = (props) => {
    const { state, dispatch } = props;
    const [hidden, setHidden] = useState(false);
    return (
        <ActionColumn
            right={<>
                <Hidden hide={hidden}>
                    <LayoutButton state={state} dispatch={dispatch}/>
                </Hidden>
                <Divider classes={{ root: styles.hr }} orientation="vertical" variant="middle" flexItem/>
                <FullScreenButton onChange={setHidden}/>
            </>
            }
        />
    )
};

export default MultiScreenPlayerAction;

