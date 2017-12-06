<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>平台介绍</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <quill-editor ref="myTextEditor" v-model="platfrom" :config="editorOption"></quill-editor>
        </div>
        <div class="btn-wrap">
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
const htmltextEnum = {
    platfrom: 1,
    contact: 2,
};
    export default {
        data: function(){
            return {
                platfrom: '',
                editorOption: {

                },
            }
        },
        created() {
            // const newsId = this.$route.query.newsId;
            const textId = htmltextEnum.platfrom;
            this.webHttp.get('/api/manage/getHtmlText', { textId }).then(res => {
                if (res.success) {
                    this.platfrom = res.data.htmlText;
                } else {
                    this.$message.error('获取失败');
                }
            });
        },
        components: {
            quillEditor
        },
        methods: {
            onSubmit() {
                const htmlText = this.platfrom;
                const textId = htmltextEnum.platfrom;
                this.webHttp.get('/api/manage/setHtmlText', { textId, htmlText }).then(res => {
                    if (res.success) {
                        this.$message.success('修改成功');
                    } else {
                        this.$message.error('修改失败');
                    }
                });
            }
        },
    }
</script>

<style scoped>
    .btn-wrap {
        margin-top: 20px;
    }
</style>