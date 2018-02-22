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
            <div>游戏中心：</div>
            <el-upload
                action=""
                class="avatar-uploader"
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handleGameBannerSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="gameBanner" :src="gameBanner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div>
            <div>新闻：</div>
            <el-upload
                action=""
                class="avatar-uploader"
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handleNewsBannerSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="newsBanner" :src="newsBanner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div>
            <div>平台介绍：</div>
            <el-upload
                action=""
                class="avatar-uploader"
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handlePlatformBannerSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="platformBanner" :src="platformBanner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div>
            <div>联系我们：</div>
            <el-upload
                action=""
                class="avatar-uploader"
                :http-request="uploadImage"
                :show-file-list="false"
                :on-success="handleContactBannerSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="contactBanner" :src="contactBanner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                gameBanner: '', // 游戏中心banner
                newsBanner: '', // 新闻banner
                platformBanner: '', // 平台banner
                contactBanner: '', // 联系我们banner
            }
        },
        async created() {
            this.gameBanner = await this.getBanner('games');
            this.newsBanner = await this.getBanner('news');
            this.platformBanner = await this.getBanner('platform');
            this.contactBanner = await this.getBanner('contact');
        },
        methods: {
            onSubmit() {

            },
            async getBanner(bannerkey) {
                const res = await this.webHttp.get('/api/manage/getBannerConfig', {
                    bannerkey
                });
                if (res.success) {
                    return res.data.src;
                }
                return '';
            },
            handleGameBannerSuccess(res, row) {
                this.gameBanner = res.url;
                this.handleBannerSuccess('games', res.url);
            },
            handleNewsBannerSuccess(res, row) {
                this.newsBanner = res.url;
                this.handleBannerSuccess('news', res.url);
            },
            handlePlatformBannerSuccess(res, row) {
                this.platformBanner = res.url;
                this.handleBannerSuccess('platform', res.url);
            },
            handleContactBannerSuccess(res, row) {
                this.contactBanner = res.url;
                this.handleBannerSuccess('contact', res.url);
            },
            // 修改图片(后台)
            async handleBannerSuccess(bannerkey, bannerSrc) {
                const res = await this.webHttp.get('/api/manage/setBannerConfig', {
                    bannerkey, bannerSrc
                });
                if (res.success) {
                    this.$message.info('修改成功');
                } else {
                    this.$message.error('修改失败,请重新修改');
                }
            },
            // 上传图片
            uploadImage(row) {
                const file = row.file;
                const imageForm = new FormData();
                imageForm.append('files', file);
                this.webHttp.form('/api/upload/image/banner', imageForm).then(res => {
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
