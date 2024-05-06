/**********************************************************************
 *
 * @模块名称: RcSuperLoading
 *
 * @模块作用: RcSuperLoading
 *
 * @创建人: pgli
 *
 * @date: 2023/9/20 2:44 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, FC, useRef } from 'react';
import RcBaseLoading from "../RcBaseLoading";
import LoadingIcon from "../LoadingIcon";
import { useEasing } from "@gaopeng123/hooks";
import styles from '../styles.module.less';
import loadingGif from "../loading.webp";
import { classnames, isUndefined } from "@gaopeng123/utils";
import { RcLoadingProps, SingleLoadingStep } from "../interface";


const LoadingBody: FC<RcLoadingProps> = (props) => {
    const { loading, duration, stepList, title, subTitle } = Object.assign({
        duration: 60000,
        title: '正在查询',
        subTitle: '查询进度',
        stepList: [{
            label: '参数校验中',
        }, {
            label: '数据查询中',
        }, {
            label: '数据分析中',
        }, {
            label: '数据加载中',
        }]
    }, props);
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
    const _stepList = stepList.map((item: SingleLoadingStep, index) => {
        return {
            label: item.label,
            step: isUndefined(item.step) ? (100 / stepList.length * index) : item.step,
        }
    });

    const ref = useRef<any>();

    return (
        <div>
            <div className={classnames({ [styles.loadingEl]: loading })}>
                <div className={styles.loadingBody}>
                    <img className={styles.loadingGif} src={loadingGif}/>
                    <div className={styles.step}>
                        {
                            _stepList.map(({ step, label }, index) => {
                                const lastStep = _stepList[index + 1]?.step || 100;
                                const lastIndex = _stepList.length - 1;
                                const isLoading = percent < lastStep && percent >= step;
                                if (isLoading && props.onStepChange && ref.current !== index) {
                                    props.onStepChange(stepList[index]);
                                    ref.current = index
                                }
                                return <div key={index} className={classnames({
                                    [styles.lastCircle]: index === lastIndex,
                                    [styles.circle]: index !== lastIndex
                                })}>
                                                <span className={classnames(styles.serial)}
                                                      style={isLoading ? { background: 'transparent' } : {}}>
                                                    {
                                                        isLoading
                                                            ? <LoadingIcon style={{ background: '#fff' }}/>
                                                            : index + 1
                                                    }
                                                </span>
                                    <span className={styles.label}>{label}</span>
                                </div>
                            })
                        }
                    </div>
                    <div className={styles.progress}>
                        <span className={styles.title}>{title} &nbsp; <LoadingIcon size={'small'}/></span>
                        <div>
                            <span style={{ marginRight: 8 }}>{subTitle}</span>
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

const RcSuperLoading: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading loadingComponent={LoadingBody} {...props}/>
    )
}

export default RcSuperLoading;