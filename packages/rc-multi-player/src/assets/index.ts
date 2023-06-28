/** ********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @date: 2022/10/21 15:11
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import icon1 from './1屏.svg';
import icon4 from './4屏.svg';
import icon6 from './6屏.svg';
import icon8 from './8屏.svg';
import icon9 from './9屏.svg';
import icon12 from './12屏.svg';
import icon13 from './13屏.svg';
import icon16 from './16屏.svg';
import LayoutJsonData from './layout.json';
import { LayoutJsonType } from "../MultiTyping";

export const AssetsIcon: any = {
    1: icon1,
    4: icon4,
    6: icon6,
    8: icon8,
    9: icon9,
    12: icon12,
    13: icon13,
    16: icon16,
}

export const LayoutJson: LayoutJsonType = LayoutJsonData as LayoutJsonType;
