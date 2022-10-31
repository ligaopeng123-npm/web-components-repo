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
import React from 'react';
import LayoutButton from "./LayoutButton";
import { Props } from "../MultiTyping";
import FullScreenButton from "./FullScreenButton";
import Divider from "@mui/material/Divider";
import ActionColumn from "./ActionColumn";
import styles from "../styles.module.less";
import HideFullScreen from "./HideFullScreen";
import { MultiScreenDrawerButton } from "./MultiScreenDrawer";

type MultiScreenPlayerActionProps = {} & Props;
const MultiScreenPlayerAction: React.FC<MultiScreenPlayerActionProps> = (props) => {
    const { state, dispatch } = props;
    return (
        <ActionColumn
            right={<>
                <HideFullScreen>
                    <LayoutButton state={state} dispatch={dispatch}/>
                </HideFullScreen>
                <Divider classes={{ root: styles.hr }} orientation="vertical" variant="middle" flexItem/>
                <MultiScreenDrawerButton state={state} dispatch={dispatch}/>
                <Divider classes={{ root: styles.hr }} orientation="vertical" variant="middle" flexItem/>
                <FullScreenButton/>
            </>
            }
        />
    )
};

export default MultiScreenPlayerAction;

