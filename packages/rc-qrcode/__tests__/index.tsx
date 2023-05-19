import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcQrcode } from "../src";
import { useRef, useState } from "react";

const App = () => {
    const [text, setText] = useState('test');
    const ref = useRef<any>();
    const onClick = ()=> {
        setText(ref?.current.value)
    }
    return (
        <>
            <div>
                <input ref={ref} type="text"></input>
                <input type="submit" onClick={onClick}/>
            </div>
            <RcQrcode
                QRCodeStylingOptions={{image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAs9JREFUeF7tW1GSwiAMhT3Vuj+rM3oOvYl6Ez2Hzqz7s+6plp0grUiBpG1qUdM/FWh4eSSPgFq9+KNffP5KABAGvDgCsgSGIMDyOPmCcffz86zv+KvDx8Zos9ZGb3eLn03f8cL+7AxYHd6nRmsLgDZmtlv8nvoYvTxOzGWsBwEAjK285ljQGWRvnBMHm2KO6Gwc5lW3DKZKKWs8MAP6GK3Xrq/97B7LEm30d0VzH0QOJqXsHQwAfykACEopf8IYfnX7oahfGTAYAPACjwXYhJO/PyQAzvtA9crrrRkAywGif+0phoB6lxgQUP8melcRHaPDfn62zMyNhY1B/Z11CfiBK+a59gBcNIA/Ge6AyAZA6C0/wjs6f1IDIax7ow20h6cRPCuGUL2ca8cGANW7HEZXqZVjLBYAYtTnMC7rOaagyASAlb83a/UOAGz7ymwrvoY2tPTxBYDSPTS0fSwM4JC8HSbKskMkAVBJW8jnSv2dwuBTCgC3dipFKaCgAMTV3W1xogQAEqkYZQkKQErg+GqsBABSdmLSOQtATuD4A48NQEaGo6U0ASAXfYUBriQdLSR4WlyWwOUcoE3Nr0Pab3SpI7zEAO8sIoQJqylKEJQgmEFAsoBkgWZVNlHtlSwgaVB0gAihZ1SC19seYbYsqR4wmBSGScc2OqG8HHszlLKTcoKEVoRgcCeI7FmdNqZxIFECADE74Tvs8IQEALZ1KwUAzM7otr5Lp7DPGABguzzqvFgYkAtCVEPatisKAG/93euAFC13UwFlYYD/stxyAK/BwUreuLdpeCvkuv/gvyzJDgB1C50CIZ/T+988bVSMqFShthMAiDUEYUACAVkC2QqvxIDe1+/vEARpO8injQFuZ2b/5OA/bZRbSktwXpCstQU1vbVpB6kQ2nuC5hTbRaZZ0K9/G1vZhVCbl5fQVgAowQtj2iAMGBP9Et798gz4Bw74DW7eiHgCAAAAAElFTkSuQmCC'}}
                label={`Andow`}
                toDataURL={(v: string)=> {
                    console.log(v);
                }}
                text={text}
            />
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));
