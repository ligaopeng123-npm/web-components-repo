/**********************************************************************
 *
 * @模块名称: ReplayLoad
 *
 * @模块用途: ReplayLoad
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 19:26
 *
 **********************************************************************/
import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from "@mui/material/IconButton";
import styles from "./styles.modules.less";

type ReplayLoadProps = {
    error?: boolean;
};
const ReplayLoad: React.FC<ReplayLoadProps> = (props) => {
    const { error, children } = props;
    const onClick = () => {

    }
    return (
        <>
            {
                error
                    ? <div className={styles.replay}>
                        <IconButton
                            onClick={onClick}
                            // @ts-ignore
                            color="iconButton"
                            size={'small'}>
                            <div>
                                <ReplayIcon/>
                                <div>重新加载</div>
                            </div>
                        </IconButton>
                    </div>
                    : props.children
            }
        </>
    )
};

export default ReplayLoad;
