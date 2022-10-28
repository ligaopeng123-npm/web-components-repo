/** ********************************************************************
 *
 * @模块名称: Theme
 *
 * @模块用途: Theme
 *
 * @date: 2022/10/27 18:49
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import { createTheme } from '@mui/material/styles';

export const DefaultTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3370FF',
        },
        secondary: {
            main: '#edf2ff',
        },
        // @ts-ignore
        iconButton: {
            main: 'rgba(255,255,255,0.8)',
            contrastText: '#fff',
        },
    },
});
