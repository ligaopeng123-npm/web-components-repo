# image-upload

`截图上传插件，支持点击上传、截图粘贴上传、拖拽上传`

[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/story/example-imageupload--props)

## 属性配置

| 属性            | 配置                     | 说明                                         |
| --------------- | ------------------------ | -------------------------------------------- |
| width           | string \| number         | 默认100%                                     |
| height          | string \| number         | 默认200                                      |
| picture-width   | string \| number         | 默认48                                       |
| picture-height  | string \| number         | 默认48                                       |
| action          | string                   | 上传接口，默认为空字符串                     |
| list-type       | picture \|  picture-card | list排列或者卡片排列                         |
| multiple        | boolean                  | 是否支持多选，默认单选，配置为true后支持多选 |
| accept          | 支持的图片类型           | 默认.png,.jpg,.jpeg                          |
| file-list       | string                   | 上传列表[{name: string, url: string}]        |
| max-count       | number                   | 限制数据，默认不限制                         |
| prevent-preview | boolean                  | 默认为false，是否阻止默认的预览方式          |

## 事件接口

### getFileList

`当前上传的list`

```typescript
document.querySelector('image-upload').getFileList();
// 传递进来的数据 或者 File
```

### onPreview

`预览事件`

```typescript
document.querySelector('image-upload').addEventListener('onPreview', ({detail})=> {});
```

### uploadChange

`上传更新接口`

```typescript
document.querySelector('image-upload').addEventListener('uploadChange', ({detail})=> {});
```

### afterUpload

`上传后服务端返回的数据`

```typescript
document.querySelector('image-upload').addEventListener('afterUpload', ({detail})=> {});
```

### afterDelete

```typescript
document.querySelector('image-upload').addEventListener('afterDelete', ({detail})=> {});
```

## Usage

![demo](https://raw.githubusercontent.com/ligaopeng123-npm/web-components-repo/main/packages/image-upload/__tests__/demo.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>screenshot-upload</title>
</head>
<body style="margin: 0px;">
<div style="display: flex;align-items: center;justify-content: center;margin-top: 100px;">
    <image-upload
            id="upload"
            list-type="picture"
            picture-width="64"
            picture-height="64"
            max-count="4"
            width="400px">
    </image-upload>
</div>
<script>
    window.onload = () => {
        // 支持的数据格式
        const fileList = [{
            name: 'tttt.png',
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }, {
            name: 'aaaa.png',
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }, {
            name: '666.png',
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }];
        const upload = document.querySelector('#upload');
        upload.setAttribute('file-list', JSON.stringify(fileList));
        upload.addEventListener('uploadChange', ({detail}) => {
            console.log(detail);
        });
        upload.addEventListener('afterUpload', ({detail}) => {
            console.log(detail);
        });
        upload.addEventListener('afterDelete', ({detail}) => {
            console.log(detail);
        });
    }
</script>
</body>
</html>
```

