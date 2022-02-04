<script lang="ts">
import Vue from 'vue';
import "@gaopeng123/image-upload";
import {AfterUpload} from "@gaopeng123/image-upload";

type UploadEvent = AfterUpload;

export default /*#__PURE__*/Vue.extend({
    name: 'VueImageUpload', // vue component name
    props: {
        id: {
            type: String,
            default: 'vue-image-upload',
        },
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400,
        },
        pictureWidth: {
            type: Number,
            default: 64,
        },
        pictureHeight: {
            type: Number,
            default: 64,
        },
        action: {
            type: String,
            default: '',
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        listType: {
            type: String,
            default: 'picture',
        },
        maxCount: {
            type: Number,
            default: Number.MAX_SAFE_INTEGER,
        },
        accept: {
            type: String,
            default: '.png,.jpg,.jpeg',
        },
        fileList: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    mounted: function () {
        const me: any = this;
        const upload: any = document.querySelector(`#${me.id}`);
        if (upload) {
            upload.addEventListener('uploadChange', me.uploadChange);
            upload.addEventListener('afterUpload', me.afterUpload);
            upload.addEventListener('afterDelete', me.afterDelete);
        }
    },
    methods: {
        uploadChange(e: any) {
            this.$emit("onUploadChange", e);
        },
        afterUpload(e: UploadEvent) {
            this.$emit("onAfterUpload", e);
        },
        afterDelete(e: UploadEvent) {
            this.$emit("onAfterDelete", e);
        }
    },
    beforeDestroy: function () {
        const me: any = this;
        const upload: any = document.querySelector(`#${me.id}`);
        if (upload) {
            upload.removeEventListener('uploadChange', me.uploadChange);
            upload.removeEventListener('afterUpload', me.afterUpload);
            upload.removeEventListener('afterDelete', me.afterDelete);
        }
    }
});
</script>

<template>
    <image-upload
        :id="id"
        :width="width"
        :height="height"
        :picture-width="pictureWidth"
        :picture-height="pictureHeight"
        :action="action"
        :multiple="multiple"
        :list-type="listType"
        :max-count="maxCount"
        :accept="accept"
        :file-list="JSON.stringify(fileList || [])"
    ></image-upload>
</template>

<style scoped>
</style>
