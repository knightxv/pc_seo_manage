<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 新闻管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="游戏名称">
                    <el-input v-model="form.gameName"></el-input>
                </el-form-item>
                <el-form-item label="游戏简介">
                    <el-input v-model="form.gameBrief"></el-input>
                </el-form-item>
                <el-form-item label="游戏大小">
                    <el-input v-model="form.gameSize"></el-input>
                </el-form-item>
                <el-form-item label="游戏版本">
                    <el-input v-model="form.version"></el-input>
                </el-form-item>
                <el-form-item label="游戏下载地址">
                    <el-input v-model="form.downUrl"></el-input>
                </el-form-item>
                <el-form-item label="代理登陆地址">
                    <el-input v-model="form.gameLoginUrl"></el-input>
                </el-form-item>
                <el-form-item label="更新日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.publicTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="游戏类型">
                    <el-select v-model="form.gameType" placeholder="请选择">
                        <el-option key="dzqp" label="大众棋牌" value="dzqp"></el-option>
                        <el-option key="tsqp" label="特色棋牌" value="tsqp"></el-option>
                        <el-option key="dfmj" label="地方麻将" value="dfmj"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏图标">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="游戏截图">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :show-file-list="true"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handlePictureCardSuccess"
                        :file-list="gameScreenshot"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
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
                <el-form-item label="游戏介绍">
                    <el-input type="textarea" v-model="form.gameIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="新版特性">
                    <el-input type="textarea" v-model="form.characteristic"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
                <div>{{ form.gameIntroduce }}</div>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    gameName: '', // 游戏名
                    gameBrief: '', // 游戏简介
                    gameSize: '', // 游戏大小
                    version: '', // 游戏版本
                    gameType: 'dzqp', // 游戏类型
                    publicTime: '', // 发布日期
                    downUrl: '', // 游戏下载地址
                    gameLoginUrl: '', // 代理登陆地址
                    gameIntroduce: '', // 游戏介绍
                    characteristic: '', // 新版特性
                },
                imageUrl: '',
                gameScreenshot: [], // 游戏截图
                dialogImageUrl: '',
                dialogVisible: false,
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
                const gameIcon = this.imageUrl;
                console.log(this.gameScreenshot);
                console.log(gameIcon);
                console.log(this.form);
            },
            // 游戏图标
            handleAvatarSuccess(res, file) {
                console.log(res);
                console.log(file);
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 游戏截图
            handleRemove(file, fileList) {
                this.gameScreenshot = fileList;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handlePictureCardSuccess(res, file) {
                this.gameScreenshot = [ ...this.gameScreenshot, file];
                // console.log(res);
                // console.log(file);
            }
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