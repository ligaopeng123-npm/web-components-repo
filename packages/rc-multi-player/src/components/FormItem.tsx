/**********************************************************************
 *
 * @模块名称: FormItem
 *
 * @模块用途: FormItem
 *
 * @创建人: pgli
 *
 * @date: 2022/10/31 11:30
 *
 **********************************************************************/
import React from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Title from "./Title";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from './styles.module.less';


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }: any) => ({
    '& .MuiToggleButtonGroup-grouped': {
        textTransform: 'capitalize',
        margin: theme.spacing(0.5),
        marginLeft: 0,
        marginRight: 12,
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

type FormItemProps = {
    label?: string;
    helpText?: string;
    defaultValue?: any;
    options?: Array<{ label: string, value?: any }>;
    onChange?: (v: any) => void;
};
const FormItem: React.FC<FormItemProps> = (props) => {
    const { label, options, onChange, defaultValue, helpText } = props;

    const [alignment, setAlignment] = React.useState(defaultValue);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        if (newAlignment) {
            setAlignment(newAlignment);
            if (onChange) {
                onChange(newAlignment);
            }
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{}}
        >
            <Box component={'div'} sx={{ padding: "8px 0px" }}>
                <Title>
                    {label}
                </Title>
                {
                    helpText ? <>
                        <HelpOutlineIcon sx={{ fontSize: '.85rem', verticalAlign: 'sub', margin: '0px 2px' }}/>
                        <Title className={styles.subTitle} ellipsis={true}>{helpText}</Title></> : null
                }
            </Box>
            <Box component={'div'}>
                <StyledToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive={true}
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    {
                        options?.map(({ label, value }) => {
                            return <ToggleButton style={{ margin: '0px 8px 0px 0px', lineHeight: 1 }} key={value}
                                                 size={'small'} value={value}>{label}</ToggleButton>
                        })
                    }
                </StyledToggleButtonGroup>
            </Box>
        </Paper>
    )
};

export default FormItem;