### image-upload

`截图上传插件`

#### 属性配置

| 属性           | 配置                     | 说明                                         |
| -------------- | ------------------------ | -------------------------------------------- |
| width          | string \| number         | 默认100%                                     |
| height         | string \| number         | 默认200                                      |
| picture-width  | string \| number         | 默认48                                       |
| picture-height | string \| number         | 默认48                                       |
| action         | string                   | 上传接口，默认为空字符串                     |
| list-type      | picture \|  picture-card | list排列或者卡片排列                         |
| multiple       | boolean                  | 是否支持多选，默认单选，配置为true后支持多选 |
| accept         | 支持的图片类型           | 默认.png,.jpg,.jpeg                          |
| file-list      | string                   | 上传列表[{name: string, url: string}]        |
| max-count      | number                   | 限制数据，默认不限制                         |

#### 事件接口

##### getFileList

`当前上传的list`

```typescript
document.querySelector('image-upload').getFileList();
// 传递进来的数据 或者 File
```

##### uploadChange

`上传更新接口`

```typescript
document.querySelector('image-upload').addEventListener('uploadChange', ({detail})=> {});
```

##### afterUpload

`上传后服务端返回的数据`

```typescript
document.querySelector('image-upload').addEventListener('afterUpload', ({detail})=> {});
```

#### afterDelete

```typescript
document.querySelector('image-upload').addEventListener('afterDelete', ({detail})=> {});
```

