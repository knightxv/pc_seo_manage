<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 新闻管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改新闻</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="新闻标题">
                    <el-input v-model="form.newsTitle"></el-input>
                </el-form-item>
                <el-form-item label="新闻简介">
                    <el-input v-model="form.newsBrief"></el-input>
                </el-form-item>
                <el-form-item label="发布日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.publicTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="新闻类型">
                     <el-select v-model="form.newsType" placeholder="请选择">
                        <el-option v-for="newsType in newsTypeArr"
                            :key="newsType.type" :label="newsType.label" :value="newsType.type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="新闻简图">
                    <el-upload
                        action=""
                        class="avatar-uploader"
                        :http-request="uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.newsIcon" :src="form.newsIcon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <quill-editor ref="myTextEditor" v-model="form.newsContent" :config="editorOption"></quill-editor>
                </el-form-item>
                <!-- <el-form-item label="游戏截图">
                    <el-upload
                        action=""
                        list-type="picture-card"
                        :show-file-list="true"
                        :http-request="uploadImage"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handlePictureCardSuccess"
                        :file-list="gameScreenshot"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item> -->
                <!-- <el-form-item label="选择开关">
                    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
                </el-form-item> -->
                <!-- <el-form-item label="多选框">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="步步高" name="type"></el-checkbox>
                        <el-checkbox label="小天才" name="type"></el-checkbox>
                        <el-checkbox label="imoo" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
                <!-- <el-form-item label="单选框">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="步步高"></el-radio>
                        <el-radio label="小天才"></el-radio>
                        <el-radio label="imoo"></el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <!-- <el-form-item label="新版特性">
                    <el-input type="textarea" v-model="form.characteristic"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
const newsTypeArr = [
    {
        label: '行业资讯',
        value: 'information',
        type: 1,
    },
    {
        label: '新闻公告',
        value: 'notice',
        type: 2,
    },
];
import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function(){
            return {
                form: {
                    newsTitle: '', // 新闻标题
                    publicTime: new Date(), // 发布时间
                    newsContent: '', // 新闻内容
                    newsBrief: '', // 游戏版本
                    newsType: newsTypeArr[0].type, // 游戏类型
                    newsIcon: '', // 新闻简介图
                },
                // dialogImageUrl: '',
                // dialogVisible: false,
                editorOption: {

                },
                newsTypeArr,
            }
        },
        components: {
            quillEditor
        },
        created() {
            const newsId = this.$route.query.newsId;
            this.webHttp.get('/api/newsDetail/' + newsId).then(res => {
                if (res.success) {
                    this.form = {
                        ...this.form,
                        ...res.data,
                        publicTime: new Date(res.data.publicTime),
                        newsType: +res.data.newsType,
                    };
                }
            });
        },
        methods: {
            onSubmit() {
                const { newsId } =  this.$route.query;
                const postBody = {
                    ...this.form,
                    id: newsId,
                    publicTime: this.form.publicTime.getTime(),
                };
                this.webHttp.post('/api/manage/updateNews', postBody).then(res => {
                    console.log(res);
                    if (res.success) {
                        this.$message.success('修改成功');
                        this.$router.back();
                    } else {
                        this.$message.error('修改失败');
                    }
                });
            },
            onCancel() {
                this.$router.back();
            },
            uploadImage(row) {
                const file = row.file;
                const imageForm = new FormData();
                imageForm.append('files', file);
                this.webHttp.form('/api/upload/image', imageForm).then(res => {
                    if (res.success) {
                        row.onSuccess(res.data, row);
                    }
                });
            },
            // 游戏图标
            handleAvatarSuccess(res, row) {
                // edit
                this.form.newsIcon = res.url;
                // this.imageUrl = res.url;
                // this.imageUrl = URL.createObjectURL(res.url);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // // 游戏截图
            // handleRemove(file, fileList) {
            //     this.gameScreenshot = fileList;
            // },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            // handlePictureCardSuccess(res, file) {
            //     this.gameScreenshot = [ ...this.gameScreenshot, file];
            //     // console.log(res);
            //     // console.log(file);
            // }
        }
    }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>