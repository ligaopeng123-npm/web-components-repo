# rc-image-upload

> 图片上传，支持粘贴上传

![image-20220206113110933](C:\Users\pgli\AppData\Roaming\Typora\typora-user-images\image-20220206113110933.png)

## Usage

```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RcImageUpload from '../src';

/*
type FileItem = {
	name: string,
	url: string,
}
// 可配置参数
type RcImageUploadProps = {
    id: string;
    width?: string | number;
    height?: string | number;
    pictureWidth?: string | number; // 图片宽高
    pictureHeight?: string | number;
    action?: string; // 上传的路径
    listType?: 'picture-card' | 'picture';
    multiple?: boolean; // 是否支持多选
    accept?: string; // 支持类型 默认.png,.jpg,.jpeg
    maxCount?: number; // 最大上传个数
    fileList?: FileItem[]; // 上传列表
    onUploadChange?: (e: UploadEvent) => void; // 上传事件
    onAfterUpload?: (e: UploadEvent) => void; // 上传后事件
    onAfterDelete?: (e: UploadEvent) => void; // 删除后事件
};*/

const App = () => {
    const uploadChange = (e: any) => {
        console.log(e)
    }
    return (
        <RcImageUpload
                id={`test`} height={600} width={400} pictureHeight={64} pictureWidth={64}
                fileList={[]}
                maxCount={4}
                onUploadChange={uploadChange}
                onAfterUpload={uploadChange}
                onAfterDelete={uploadChange}
            />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));

```

