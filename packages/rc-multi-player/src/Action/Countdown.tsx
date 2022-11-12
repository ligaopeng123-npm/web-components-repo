/**********************************************************************
 *
 * @模块名称: Countdown
 *
 * @模块用途: Countdown  时间倒计时
 *
 * @创建人: pgli
 *
 * @date: 2022/11/11 16:44
 *
 **********************************************************************/
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { PollerMark, usePoller } from "@gaopeng123/hooks";
import Button from "@mui/material/Button";
import styles from "./styles.module.less";

type CountdownProps = {
    maxTime?: number;
    style?: React.CSSProperties;
    onMax?: () => void;
    onMaxClick?: () => void;
};

type countdownRef = {
    reset: () => void
}
const Countdown = forwardRef<countdownRef, CountdownProps>((props, ref) => {
    const { maxTime, style, onMax, onMaxClick } = props;
    const [currentTime, setCurrentTime] = useState(0);
    const [time, startPoller, stopPoller] = usePoller({
        delay: 1000, callBack: (params: PollerMark) => {
            const newCurrentTime = currentTime + 1;
            setCurrentTime(newCurrentTime)
            if (newCurrentTime >= props.maxTime) {
                stopPoller();
                if (onMax) {
                    onMax();
                }
                return;
            }
        }
    });
    const reset = () => {
        setCurrentTime(0);
        startPoller();
    }

    // 暴露数据
    useImperativeHandle(ref, () => ({
        reset: () => {
            reset();
        },
    }));

    return (
        <div className={styles.countdown} style={style}>
            {maxTime - currentTime} 秒
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    reset();
                    if (maxTime - currentTime <= 0 && onMaxClick) {
                        onMaxClick()
                    }
                }}
                size={'small'}>继续播放</Button>
        </div>
    )
});

export default Countdown;