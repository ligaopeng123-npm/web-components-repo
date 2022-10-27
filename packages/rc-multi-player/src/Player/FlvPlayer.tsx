/**********************************************************************
 *
 * @模块名称: FlvPlayer
 *
 * @模块用途: FlvPlayer
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:44
 *
 **********************************************************************/
import React from 'react';
import RcMultiPlayer, { RcMultiPlayerProps } from "../RcMultiPlayer";

type FlvPlayerProps = {} & RcMultiPlayerProps;
const FlvPlayer: React.FC<FlvPlayerProps> = (props) => {
    return (
        <RcMultiPlayer
            {...props}
        />
    )
};

export default FlvPlayer;
