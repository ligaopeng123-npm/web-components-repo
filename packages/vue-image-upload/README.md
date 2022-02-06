# vue-image-upload

> 图片上传 支持粘贴上传

![image-20220206113048610](C:\Users\pgli\AppData\Roaming\Typora\typora-user-images\image-20220206113048610.png)

## Usage

```vue
<script lang="ts">
import Vue from 'vue';
import VueImageUpload from '@gaopeng123/vue-image-upload';
    
/*
type FileItem = {
	name: string,
	url: string,
}
// 可配置参数
type VueImageUploadProps = {
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

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VueImageUpload
    },
    methods: {
        onUploadChange(e: any) {
            console.log(e);
        }
    }
});
</script>

<template>
    <div id="app">
        <vue-image-upload @onUploadChange="onUploadChange"/>
    </div>
</template>
```

