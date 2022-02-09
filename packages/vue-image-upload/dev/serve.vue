<script lang="ts">
import Vue from 'vue';
import VueImageUpload from '@/index.vue';

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VueImageUpload
    },
    data: {
        id: `upload-${Date.now()}`
    },
    methods: {
        onUploadChange(e: any) {
            console.log(e.detail.fileList);
        }
    }
});
</script>

<template>
    <div id="app">
        <vue-image-upload :id="id" @onUploadChange="onUploadChange"/>
    </div>
</template>
