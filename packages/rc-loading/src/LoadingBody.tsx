/**********************************************************************
 *
 * @模块名称: LoadingBody
 *
 * @模块作用: LoadingBody
 *
 * @创建人: pgli
 *
 * @date: 2023/8/31 10:00 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, FC } from 'react';
import LoadingIcon from "./LoadingIcon";
import { useEasing } from "@gaopeng123/hooks";
import styles from './styles.module.less';
import loadingGif from "./loading.gif";
import { classnames } from "@gaopeng123/utils";

// --loading-main-color  css变量 定义颜色

export interface LoadingBodyProps {
    loading?: boolean; // 是否开启
    duration?: number; // 默认 60000ms
    style?: React.CSSProperties;
    className?: string | undefined;
}

const LoadingBody: FC<LoadingBodyProps> = (props) => {
    const { loading, duration } = Object.assign({ duration: 60000 }, props);
    /**
     * 记录进度
     */
    const [easing] = useEasing({ duration: duration, intervals: 1000, easingType: 'cubicOut' });
    /**
     * 当前百分比
     */
    const [percent, setPercent] = useState(0);
    /**
     * 处理进度模拟 不能大于99 加的进度
     */
    useEffect(() => {
        const percent = Math.floor(easing * 100);
        setPercent(percent >= 99 ? 99 : percent);
    }, [easing]);

    // 参数校验中 -> 数据查询中 -> 数据分析中 ->  数据加载中

    const stepList = [{ css: styles.first, step: 0 }, { css: styles.second, step: 20 }, {
        css: styles.third,
        step: 60
    }, { css: styles.fourth, step: 80 }];

    return (
        <div>
            <div className={classnames({ [styles.loadingEl]: loading })}>
                <div className={styles.loadingBody}>
                    <img className={styles.loadingGif} src={loadingGif}/>
                    <div className={styles.step}>
                        {
                            stepList.map(({ css, step }, index) => {
                                const lastStep = stepList[index + 1]?.step || 100;
                                const isLoading = percent < lastStep && percent >= step;
                                return <div key={index} className={classnames({
                                    [styles.lastCircle]: index === 3,
                                    [styles.circle]: index !== 3
                                })}>
                                                <span className={classnames(styles.serial, css)}
                                                      style={isLoading ? { background: 'transparent' } : {}}>
                                                    {
                                                        isLoading
                                                            ? <LoadingIcon/>
                                                            : index + 1
                                                    }
                                                </span>
                                </div>
                            })
                        }
                    </div>
                    <div className={styles.progress}>
                        <span className={styles.title}>正在查询 &nbsp; <LoadingIcon size={'small'}/></span>
                        <div>
                            <span style={{ marginRight: 8 }}>查询进度</span>
                            <input type="range" min="0" step="0.01" max="100" value={percent}
                                   style={{
                                       width: 300,
                                       backgroundSize: `${percent}% 100%`,
                                       pointerEvents: 'none'
                                   }}
                            ></input>
                            <span style={{ marginLeft: 8 }} className={styles.text}>{percent}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingBody;