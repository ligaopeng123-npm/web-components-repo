import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcMultiPlayer, RcMultiScreenPlayer } from "../src";
import RcMultiPlayerTest from "./RcMultiPlayerTest";
import RcMultiScreenPlayerTest from "./RcMultiScreenPlayerTest";
import { Link } from "@mui/material";
import WebRTCPlayerTest from "./WebRTCPlayerTest";

const App = () => {
    const [type, setType] = React.useState('RcMultiScreenPlayer');
    const LinkText = ({ label, value }: any) => {
        return (
            <>
                <Link
                    sx={{ p: [1, 2] }}
                    component="button"
                    variant="body2"
                    onClick={() => {
                        setType(value || label)
                    }}
                >
                    {label || value}
                </Link>
            </>
        )
    }
    return (
        <div>
            <div>
                <LinkText label={'RcMultiPlayer'}/>
                <LinkText label={'RcMultiScreenPlayer'}/>
                <LinkText label={'WebRTCPlayer'}/>
            </div>
            <div id="rootContent">
                {
                    (() => {
                        switch (type) {
                            case 'RcMultiPlayer':
                                return <RcMultiPlayerTest/>
                            case 'RcMultiScreenPlayer':
                                return <RcMultiScreenPlayerTest/>
                            case 'WebRTCPlayer':
                                return <WebRTCPlayerTest/>
                            default:
                                return null
                        }
                    })()
                }
            </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
