/**********************************************************************
 *
 * @模块名称: RcMultiScreenPlayerTest
 *
 * @模块用途: RcMultiScreenPlayerTest
 *
 * @创建人: pgli
 *
 * @date: 2022/10/28 9:19
 *
 **********************************************************************/
import * as React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { RcMultiScreenPlayer } from "../src";
import Snackbar from "@mui/material/Snackbar";

type RcMultiScreenPlayerTestProps = {};
const RcMultiScreenPlayerTest: React.FC<RcMultiScreenPlayerTestProps> = (props) => {
    const [protocol, setProtocol] = React.useState<any>('FLV');
    const [open, setOpen] = React.useState(false);
    const [mediaDataSource, setMediaDataSource] = React.useState<any>();
    const [playerConfig, setPlayerConfig] = React.useState<any>();
    const handleChange = (v: any) => {
        setProtocol(v?.target?.value);
    }
    const onClick = () => {
        // @ts-ignore
        const url = document.querySelector('#outlined-basic')?.value;
        if (url) {
            setMediaDataSource({ url: url, type: 'flv', });
            setPlayerConfig({ protocol: protocol, title: '你好色彩' });
        } else {
            setOpen(true)
        }
    }
    return (
        <div style={{ height: 600 }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ width: '90%' }} className={'form'}>
                        <FormControl fullWidth className={'form-item'}>
                            <InputLabel id="demo-simple-select-label">协议类型</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={protocol}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={'FLV'}>FLV</MenuItem>
                                <MenuItem value={'WebRTC'}>WebRTC</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={'form-item'}>
                            <TextField defaultValue={'/live/40491879758-1-30002.flv'} id="outlined-basic" label="url地址"
                                       variant="outlined"/>
                        </FormControl>
                        <FormControl fullWidth className={'form-item'}>
                            <Button onClick={onClick} type={'submit'} id="form-submit"
                                    variant="outlined">
                                提交
                            </Button>
                        </FormControl>
                    </div>
                </div>
                <div style={{ flex: 3, height: 600 }}>
                    <RcMultiScreenPlayer
                        playerConfig={playerConfig}
                        mediaDataSource={mediaDataSource}
                        defaultSelectedScreen={4}/>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="请输入播放地址"
            />
        </div>
    )
};

export default RcMultiScreenPlayerTest;
