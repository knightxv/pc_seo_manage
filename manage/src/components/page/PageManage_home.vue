<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="flex-item">
            <div class="hot-title">热门游戏：</div>
            <el-checkbox-group v-model="selectGameLabel">
                <!-- <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox> -->
                <el-checkbox v-for="game in gameList"
                    :key="game.id" :label="game.gameName" :name="String(game.id)">
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                selectGameLabel: [],
                gameList: [],
            }
        },
        async created() {
            const gameListRes = await this.webHttp.get('/api/gameList');
            if (gameListRes.success) {
                this.gameList = gameListRes.data || [];
                const res = await this.webHttp.get('/api/manage/getHomeConfig');
                if (res.success) {
                    const { hotGame } = res.data;
                    this.selectGameLabel = hotGame.map(gameId => {
                        let gameLabel;
                        this.gameList.some(gameInfo => {
                            if (gameInfo.id === gameId) {
                                gameLabel = gameInfo.gameName;
                                return true;
                            }
                            return false;
                        })
                        return gameLabel;
                    });
                }

            }
        },
        methods: {
            onSubmit() {
                const homeConfigEnum = {
                    carousel: 0,
                    hotGame: 1,
                    friendLink: 2,
                };
                const gameSelect = this.selectGameLabel.map(gameName => {
                    let selectId;
                    const gameIndex = this.gameList.some(gameInfo => {
                        if (gameName === gameInfo.gameName) {
                            selectId = gameInfo.id;
                            return true;
                        }
                        return false;
                    });
                    return selectId;
                }).filter(item => (typeof item !=='undefiend'));
                const configId = homeConfigEnum.hotGame;
                this.webHttp.get('/api/manage/setHomeConfig', {
                    configId,
                    configText: JSON.stringify(gameSelect),
                }).then(res => {
                    if (res.success) {
                        this.$message.success('修改成功');
                    } else {
                        this.$message.error('添加失败');
                    }
                })
                
            }
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
</style>