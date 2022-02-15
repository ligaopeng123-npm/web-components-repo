import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcImageUpload} from '../src';

const App = () => {
    const uploadChange = (e: any) => {
        console.log(e)
    }
    return (
        <div>
            <RcImageUpload
                id={`test`} height={600} width={400} pictureHeight={64} pictureWidth={64}
                fileList={[]}
                maxCount={4}
                onUploadChange={uploadChange}
                onAfterUpload={uploadChange}
                onAfterDelete={uploadChange}
            />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
