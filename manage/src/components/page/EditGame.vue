<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 游戏管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改游戏</el-breadcrumb-item>
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
                    <el-input v-model="form.gameVersion"></el-input>
                </el-form-item>
                <el-form-item label="游戏下载地址">
                    <el-input v-model="form.downUrl"></el-input>
                </el-form-item>
                <el-form-item label="代理登陆地址">
                    <el-input v-model="form.gameLoginUrl"></el-input>
                </el-form-item>
                <el-form-item label="更新日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.publicDate" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="游戏类型">
                    <el-select v-model="form.gameType" placeholder="请选择">
                        <el-option v-for="gameType in gameTypeArr"
                            :key="gameType.type" :label="gameType.label" :value="gameType.type">
                        </el-option>
                        <!-- <el-option key="dzqp" label="大众棋牌" value="dzqp"></el-option>
                        <el-option key="tsqp" label="特色棋牌" value="tsqp"></el-option>
                        <el-option key="dfmj" label="地方麻将" value="dfmj"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏图标">
                    <el-upload
                        action=""
                        class="avatar-uploader"
                        :http-request="uploadImage"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="remoteUrl + imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="游戏截图(1360*760)">
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
                        <img width="100%" :src="remoteUrl + dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
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
                <el-form-item label="玩法介绍">
                    <el-input type="textarea" v-model="form.gameIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="游戏亮点">
                    <el-input type="textarea" v-model="form.characteristic"></el-input>
                </el-form-item>
                <el-form-item label="显示在手机">
                    <el-switch on-text="yes" off-text="no" v-model="showInPhone"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">修改</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
const gameTypeArr = [
		{
		label: '大众棋牌',
		value: 'dzqp',
		type: 1,
		},
		{
		label: '特色棋牌',
		value: 'tsqp',
		type: 2,
		},
		{
		label: '地方麻将',
		value: 'dfmj',
		type: 3,
		},
];

export default {
	data: function(){
        const { remoteUrl } = this.config;
		return {
            remoteUrl: remoteUrl,
			form: {
				gameName: '', // 游戏名
				gameBrief: '', // 游戏简介
				gameSize: '', // 游戏大小
				gameVersion: '', // 游戏版本
				gameType: gameTypeArr[0].type, // 游戏类型
				publicDate: new Date(), // 发布日期
				downUrl: '', // 游戏下载地址
				gameLoginUrl: '', // 代理登陆地址
				gameIntroduce: '', // 游戏介绍
				characteristic: '', // 新版特性
			},
			showInPhone: false, // 是否显示在手机
			imageUrl: '', // 游戏图标
			gameScreenshot: [], // 游戏截图

			dialogImageUrl: '',
			dialogVisible: false,
			gameTypeArr,
		}
    },
	created() {
		const gameId = this.$route.query.gameId;
		// 得到游戏详情
		this.webHttp.get('/api/gameDetail/' + gameId).then(res => {
			if (res.success) {
				const { gameIcon, publicDate, gameIntroduce, characteristic, gameScreenshot, gameType, showInPhone, ...otherData } = res.data;
				this.form = {
					...this.form,
					...otherData,
					publicDate: new Date(publicDate),
					gameIntroduce: gameIntroduce.replace('<br />', '\r\n'),
					characteristic: characteristic.replace('<br />', '\r\n'),
					gameType: +gameType
				};
				this.imageUrl = gameIcon;
                const gameScreenshotArr = JSON.parse(gameScreenshot);
				this.gameScreenshot = gameScreenshotArr.map(imgUrl => ({
					name: imgUrl,
					url: imgUrl,
				}));
				this.showInPhone = !!showInPhone;
			} else {
				this.$message.error(res.info || '网络繁忙');
			}
		});
	},
	methods: {
			onSubmit() {
                // this.$message.success('提交成功！');
                // console.log(this.gameScreenshot);
                // console.log(gameIcon);
                // console.log(this.form);
                const { gameId } =  this.$route.query;
                const gameIcon = this.imageUrl;
                const {
                    gameName, // 游戏名
                    gameBrief, // 游戏简介
                    gameSize, // 游戏大小
                    gameVersion, // 游戏版本
                    gameType, // 游戏类型
                    publicDate, // 发布日期
                    downUrl, // 游戏下载地址
                    gameLoginUrl, // 代理登陆地址
                    gameIntroduce, // 游戏介绍
                    characteristic, // 新版特性
                } = this.form;
                const upGameScreenshot = this.gameScreenshot.map(({ url }) => url);
                const upGameScreenshotStr = JSON.stringify(upGameScreenshot);
                if (gameName.length > 20) {
                    this.$message.error('名字不能超过20个字');
                    return;
                }
                const body = {
                    id: gameId,
                    gameName,
                    gameBrief,
                    gameSize,
                    gameVersion,
                    publicDate: publicDate.getTime(),
                    downUrl,
                    gameLoginUrl,
                    gameIntroduce: gameIntroduce.replace(/\r{0,}\n/g, '<br />'),
                    gameType,
                    characteristic: characteristic.replace(/\r{0,}\n/g, '<br />'),
                    gameScreenshot: upGameScreenshotStr,
                    gameIcon: gameIcon,
                    showInPhone: this.showInPhone,
                };
                this.webHttp.get('/api/manage/updateGame', body).then(res => {
                    if (res.success) {
                        this.$message.success('修改成功');
                        this.$router.back();
                    } else {
                        this.$message.error('添加失败');
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
                this.webHttp.form('/api/upload/image/games', imageForm).then(res => {
                    if (res.success) {
                        row.onSuccess(res.data, row);
                    }
                });
			},
			// 游戏图标
			handleAvatarSuccess(res, row) {
                // edit
                this.imageUrl = res.url;
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
			// 游戏截图
			handleRemove(file, fileList) {
					this.gameScreenshot = fileList;
			},
			handlePictureCardPreview(file) {
					this.dialogImageUrl = file.url;
					this.dialogVisible = true;
			},
			handlePictureCardSuccess(res, file) {
					// dev
					this.gameScreenshot = [ ...this.gameScreenshot, { name: file.name, url: res.url }];
					// this.gameScreenshot = [ ...this.gameScreenshot, { name: file.name, url: res.url }];
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
