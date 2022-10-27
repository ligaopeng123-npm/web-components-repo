import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcMultiPlayer, RcMultiScreenPlayer } from "../src";

const RcMultiPlayerTest = () => {
    const [mediaDataSource, setMediaDataSource] = React.useState<any>({});

    React.useEffect(() => {
        setTimeout(() => {
            setMediaDataSource({ url: 'http://localhost:5007/live/40491879758-1-30002.flv' })
        }, 2000);
    }, [])
    return (
        <RcMultiPlayer
            mediaDataSource={mediaDataSource}
        />
    );
}

const RcMultiScreenPlayerTest = () => {
    return (
        <RcMultiScreenPlayer defaultSelectedScreen={4}/>
    )
}
const App = () => {
    const [type, setType] = React.useState('RcMultiScreenPlayer');
    return (
        <div>
            <div style={{paddingBottom: 12}}>
                <a className={'a'} onClick={() => setType('RcMultiPlayer')}>RcMultiPlayer</a> &nbsp;&nbsp;&nbsp;&nbsp;
                <a className={'a'} onClick={() => setType('RcMultiScreenPlayer')}>RcMultiScreenPlayer</a>
            </div>
            <div id="rootContent">
                {
                    (() => {
                        switch (type) {
                            case 'RcMultiPlayer':
                                return <RcMultiPlayerTest/>
                            case 'RcMultiScreenPlayer':
                                return <RcMultiScreenPlayerTest/>
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
