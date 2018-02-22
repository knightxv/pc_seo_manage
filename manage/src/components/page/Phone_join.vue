<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>横幅</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hot-title">横幅(建议:1920*300)</div>
        <div>
            <div>加入我们的图片</div>
            <el-upload
                action=""
                class="avatar-uploader"
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handleUploadSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="joinImg" :src="remoteUrl + joinImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
        const { remoteUrl, } = this.config;
            return {
                remoteUrl,
                joinImg: '', // 游戏中心banner
            }
        },
        async created() {
            this.joinImg = await this.getImg();
        },
        methods: {
            async getImg() {
                const res = await this.webHttp.get('/api/phone/join/getImage');
                if (res.success) {
                    return res.data.src;
                }
                return '';
            },
            // 修改图片(后台)
            async handleUploadSuccess(res, row) {
                this.joinImg = res.url;
                const JoinRes = await this.webHttp.get('/api/phone/join/setImage', {
                    joinImg: res.url,
                });
                console.log(JoinRes);
            },
            // 上传图片
            uploadImage(row) {
                const file = row.file;
                const imageForm = new FormData();
                imageForm.append('files', file);
                this.webHttp.form('/api/upload/image/join', imageForm).then(res => {
                    if (res.success) {
                        row.onSuccess(res.data, row);
                    }
                });
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
        },
    }
</script>

<style scoped>
    .flex-item {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .hot-title {
        padding: 10px 0;
    }
    .avatar {
        width: 100%;
        height: 100%;
    }
</style>
