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
import React, { ReactNode } from 'react';
import styles from '../styles.module.less';

type ActionColumnProps = {
    left?: ReactNode;
    center?: ReactNode;
    right?: ReactNode;
    className?: string;
};
const ActionColumn: React.FC<ActionColumnProps> = (props) => {
    const { left, center, right, className } = props;
    return (
        <div className={`${styles.bottomMain} ${className}`}>
            <div className={styles.bottomContent}>
                <div className={styles.left}>
                    {left}
                </div>
                <div className={styles.center}>
                    {center}
                </div>
                <div className={styles.right}>
                    {right}
                </div>
            </div>
        </div>
    )
};

export default ActionColumn;
