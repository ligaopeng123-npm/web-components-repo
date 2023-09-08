# rc-image-upload

> 图片上传，截图上传插件，支持点击上传、截图粘贴上传、拖拽上传 

[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/story/example-rcimageupload--props) 

![demo.png](https://github.com/ligaopeng123-npm/web-components-repo/blob/main/packages/image-upload/__tests__/demo.png?raw=true)

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
    preventPreview?: boolean; // 阻止默认预览
    onPreview?: (e: FileItem) => void; // 预览事件
    onUploadChange?: (e: UploadEvent) => void; // 上传事件
    onAfterUpload?: (e: UploadEvent) => void; // 上传后事件
    onAfterDelete?: (e: UploadEvent) => void; // 删除后事件
};*/

const App = () => {
    const uploadChange = (e: any) => {
        console.log(e)
    }
    const onPreview = (e: FileItem)=> {
        console.log(e);
    }
    return (
        <RcImageUpload
                id={`test`} height={600} width={400} pictureHeight={64} pictureWidth={64}
                fileList={[]}
                maxCount={4}
				preventPreview={true}
                onPreview={onPreview}
                onUploadChange={uploadChange}
                onAfterUpload={uploadChange}
                onAfterDelete={uploadChange}
            />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));

```

