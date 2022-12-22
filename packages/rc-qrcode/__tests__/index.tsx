import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcQrcode } from "../src";
import { useRef, useState } from "react";

const App = () => {
    const [text, setText] = useState();
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
                text={text}
            />
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));
