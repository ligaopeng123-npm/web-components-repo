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
import { Box } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material/styles";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Title from "./Title";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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
    defaultValue?: any;
    options?: Array<{ label: string, value?: any }>;
    onChange?: (v: any) => void;
};
const FormItem: React.FC<FormItemProps> = (props) => {
    const { label, options, onChange, defaultValue } = props;

    const [alignment, setAlignment] = React.useState(defaultValue);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
        if (onChange) {
            onChange(newAlignment);
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
            </Box>
            <Box component={'div'}>
                <StyledToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    {
                        options?.map(({ label, value }) => {
                            return <ToggleButton key={value} size={'small'} value={value}>{label}</ToggleButton>
                        })
                    }
                </StyledToggleButtonGroup>
            </Box>
        </Paper>
    )
};

export default FormItem;
