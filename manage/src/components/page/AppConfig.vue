<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 游戏管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改游戏</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <div>
                <div>官网名称</div>
                <el-input v-model="appName"></el-input>
            </div>
            <div>
                <div>备案号</div>
                <el-input v-model="recordNumber"></el-input>
            </div>
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                appName: '',
                recordNumber: '',
            }
        },
        async created() {
            // 首页轮播
            const appNameRes = await this.webHttp.get('/api/manage/getWebConfig', {
                configKey: 'appName',
            });
            const recordNumberRes = await this.webHttp.get('/api/manage/getWebConfig', {
                configKey: 'recordNumber',
            });
            if (appNameRes.success) {
                this.appName = appNameRes.data.config;
            }
            if (recordNumberRes.success) {
                this.recordNumber = recordNumberRes.data.config;
            }
        },
        methods: {
            async onSubmit() {
                const { appName, recordNumber } = this;
                const appNameRes = await this.webHttp.get('/api/manage/setWebConfig', {
                    configKey: 'appName',
                    configText: appName
                });
                const recordNumberRes = await this.webHttp.get('/api/manage/setWebConfig', {
                    configKey: 'recordNumber',
                    configText: recordNumber
                });
                // const promiseArr = await Promise.all([appNameRes, recordNumberRes]);
                // console.log(appNameRes, recordNumberRes)
                if (appNameRes.success && recordNumberRes.success) {
                    this.$message.info('修改成功');
                } else {
                    this.$message.error('修改失败');
                }
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
        display: block;
    }
</style>