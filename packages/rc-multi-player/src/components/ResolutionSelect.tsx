/**********************************************************************
 *
 * @模块名称: ResolutionSelect
 *
 * @模块作用: ResolutionSelect 分辨率切换
 *
 * @创建人: pgli
 *
 * @date: 2023/12/1 4:30 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import MenuList from '@mui/material/MenuList';
import React, { useState, useEffect, useRef } from 'react';
import { PlayerConfigOptions } from "../Player/PlayerTyping";
import { on, off } from "@gaopeng123/utils";
import LoadingIcon from "./LoadingIcon";

type ResolutionSelectProps = {
    el?: HTMLElement;
    onChange: (type: string) => void;
    options?: Array<PlayerConfigOptions>;
    value?: string;
};

const ResolutionSelect: React.FC<ResolutionSelectProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef<any>();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (!loading) {
            setOpen(true);
        }
    };

    const handleClose = (event: React.MouseEvent, val: string) => {
        event.stopPropagation();
        setOpen(false);
        if (ref.current !== val) {
            setLoading(true);
            props?.onChange(val);
        }
    };

    useEffect(() => {
        const onmouseleave = () => {
            setOpen(false);
        }
        on(props.el, 'mouseleave', onmouseleave);
        return () => {
            off(props.el, 'mouseleave', onmouseleave);
        }
    }, [props.el]);

    useEffect(() => {
        if (props.options?.length && ref.current !== props.value) {
            ref.current = props.value;
            setLoading(false);
        }
    }, [props.value, props.options]);

    return (
        <>
            <Button
                ref={ref}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color={"inherit"}
                style={{padding: 0}}
            >
                {
                    loading ? <LoadingIcon/> : props.options?.filter((item) => item.value === props.value)[0]?.label
                }
            </Button>
            <MenuList style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                display: open ? 'block' : 'none',
                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))'
            }}>
                {
                    props.options?.map(({ label, value }) => {
                        return <MenuItem onClick={(e: any) => handleClose(e, value)}>{label}</MenuItem>
                    })
                }
            </MenuList>
        </>
    )
};

export default ResolutionSelect;