/**********************************************************************
 *
 * @模块名称: TimeEdit
 *
 * @模块作用: TimeEdit
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 4:35 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, useRef } from 'react';
import { EnumWeekState } from "../interface";
import { TimeRangeInterface } from "../interface";
import TimePositionModal from "./TimePositionModal";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Mandarin } from "flatpickr/dist/l10n/zh";
import { formatTimestamp } from "@gaopeng123/utils";
import '../index.less';

const TimePickerStyle = {
    width: 70
};

const SinglePeriodTitle: React.FC<any> = (props: any) => {
    const {
        store,
        timeRange,
        setTimeRange
    } = props;

    const [startFlatpickr, setStartFlatpickr] = useState<any>();
    const [endFlatpickr, setEndFlatpickr] = useState<any>();

    const ref = useRef<any>();

    /**
     * change事件回调
     * @param date
     * @param dateString
     */
    const onStartChange: any = (date: any): void => {
        ref.current.start = formatTimestamp(date[0], 'HH:mm:ss');
        setTimeRange({
            start: ref.current.start,
            end: ref.current.end
        });
    };
    const onEndChange: any = (date: any): void => {
        ref.current.end = formatTimestamp(date[0], 'HH:mm:ss');
        setTimeRange({
            start: ref.current.start,
            end: ref.current.end
        });
    };
    /**
     * 根据periodClick点击事件 处理点击逻辑
     */
    useEffect(() => {
        // timeRange
        const periodClick = store[EnumWeekState.periodClick];
        if (periodClick && periodClick.timeRange && startFlatpickr && endFlatpickr) {
            const {
                start,
                end
            } = periodClick.timeRange;
            startFlatpickr.setDate(start);
            endFlatpickr.setDate(end);
            ref.current.start = start;
            ref.current.end = end;
            setTimeRange({
                start,
                end
            });
        }
    }, [store[EnumWeekState.periodClick], endFlatpickr, startFlatpickr]);


    useEffect(() => {
        const initFlatpickr = (inputId: string, onChange: any) => {
            return flatpickr(ref?.current?.querySelector(`#${inputId}`), {
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i:S",
                "locale": Mandarin,
                time_24hr: true,
                defaultDate: "12:00:00",
                onChange: onChange,
                onClose: (v) => {
                    // 当参数一样时，此处不做onChange变更，只做赋值处理
                },
                onOpen: () => {

                }
            });
        }
        setStartFlatpickr(initFlatpickr('start-datetime', onStartChange));
        setEndFlatpickr(initFlatpickr('end-datetime', onEndChange));
    }, []);

    return (
        <div
            ref={ref}>
            <input
                id="start-datetime"
                className="flatpickr time-change-item-input"
                data-enable-time="true"
                data-enable-seconds="true"></input>
            <span
                style={{margin: 4}}>-</span>
            <input
                id="end-datetime"
                className="flatpickr time-change-item-input"
                data-enable-time="true"
                data-enable-seconds="true"></input>
        </div>
    )
};


const SinglePeriod: React.FC<any> = (props: any) => {
    const {
        store,
        dispatch
    } = props;
    /**
     * 时间范围
     */
    const [timeRange, setTimeRange] = useState<TimeRangeInterface>({
        start: null,
        end: null
    });

    /**
     * 确定按钮
     */
    const onConfirm = () => {
        store[EnumWeekState.periodClick].timeRange = timeRange;
        dispatch({
            type: EnumWeekState.periodEdit,
            value: store[EnumWeekState.periodClick]
        });
    };

    /**
     * 删除按钮
     */
    const onCancel = () => {
        dispatch({
            type: EnumWeekState.periodDelete,
            value: store[EnumWeekState.periodClick]
        });
    };

    return (
        <TimePositionModal
            modalKey={'single-period'}
            onCancel={onCancel}
            onConfirm={onConfirm}
            monitor={store[EnumWeekState.periodClick]}
            title={
                <SinglePeriodTitle
                    store={store}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}>
                </SinglePeriodTitle>
            }/>
    )
};

export default SinglePeriod;