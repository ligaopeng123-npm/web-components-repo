/**********************************************************************
 *
 * @模块名称: RcLoadingTest
 *
 * @模块作用: RcLoadingTest
 *
 * @创建人: pgli
 *
 * @date: 2023/9/20 5:28 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/

import * as React from 'react';
import {
    RcSuperLoading, RcLoading1, RcLoading2, RcLoading3, RcLoading4, RcLoading5, RcLoading6, RcLoading7,
    RcLoading8,
    RcLoading9,
    RcLoading10, RcLoadingProps
} from "../src";
import { FC, useState } from "react";

const RcLoadingTest: FC<RcLoadingProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(0);
    const LoadingComponents = [RcSuperLoading, RcLoading1, RcLoading2, RcLoading3, RcLoading4, RcLoading5, RcLoading6, RcLoading7,
        RcLoading8,
        RcLoading9,
        RcLoading10];
    const LoadingComponent = LoadingComponents[index];
    return (
        <div>
            <select onChange={(v) => {
                setIndex(Number(v.target.value))
            }}>
                {new Array(11).fill(0).map((v, index: number) => {
                    return <option key={index} value={index}>loading-{index}</option>
                })}
            </select>
            <button onClick={() => setLoading(!loading)}>loading</button>

            <LoadingComponent loading={loading} duration={20000} wrapperClassName={'test'}>
                <div style={{ width: 500, height: 700 }}>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                    <div>我是一段待加载的页面</div>
                </div>
            </LoadingComponent>
        </div>
    );
};


export default RcLoadingTest;