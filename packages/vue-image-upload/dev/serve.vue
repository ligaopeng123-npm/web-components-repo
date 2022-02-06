<script lang="ts">
import Vue from 'vue';
import VueImageUpload from '@/index.vue';

export default Vue.extend({
    name: 'ServeDev',
    components: {
        VueImageUpload
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
        <vue-image-upload @onUploadChange="onUploadChange"/>
    </div>
</template>
