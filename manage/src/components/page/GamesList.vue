<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 游戏管理</el-breadcrumb-item>
                <el-breadcrumb-item>游戏列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input> -->
            <el-button type="primary" @click="addGame">新增</el-button>
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        </div> 
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="游戏id" width="80">
                </el-table-column>
            <el-table-column prop="gameName" label="游戏名">
                </el-table-column>
            <el-table-column prop="gameType" label="游戏类型" :formatter="typeFormat">
                </el-table-column>
            <el-table-column prop="gameVersion" label="版本">
                </el-table-column>
            <el-table-column prop="downUrl" label="下载地址">
                </el-table-column>
            <el-table-column prop="gameLoginUrl" label="后台登陆地址">
                </el-table-column>
            <el-table-column prop="publicDate" label="更新时间" :formatter="timeFormat">
                </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
            </el-pagination>
        </div> -->
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
        data() {
            return {
                url: '/api/gameList',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData;
                // return self.tableData.filter(function(d){
                //     let is_del = false;
                //     for (let i = 0; i < self.del_list.length; i++) {
                //         if(d.name === self.del_list[i].name){
                //             is_del = true;
                //             break;
                //         }
                //     }
                //     if(!is_del){
                //         if(d.address.indexOf(self.select_cate) > -1 && 
                //             (d.name.indexOf(self.select_word) > -1 ||
                //             d.address.indexOf(self.select_word) > -1)
                //         ){
                //             return d;
                //         }
                //     }
                // })
            }
        },
        methods: {
            // handleCurrentChange(val){
            //     this.cur_page = val;
            //     this.getData();
            // },
            getData(){
                let self = this;
                // if(process.env.NODE_ENV === 'development'){
                //     self.url = '/api/gameList';
                // };
                self.webHttp.get(self.url, {page:self.cur_page}).then((res) => {
                    const list = res.data || [];
                    self.tableData = list;
                })
            },
            // search(){
            //     this.is_search = true;
            // },
            addGame() {
                this.$router.push('/addGame');
            },
            typeFormat(row, column) {
                let typeLabel = '默认';
                gameTypeArr.some(typeInfo => {
                    if (typeInfo.type === +row.gameType) {
                        typeLabel = typeInfo.label;
                        return true;
                    }
                    return false;
                });
                return typeLabel;
            },
            // 时间的转换
            timeFormat(row, column) {
                const timeStrap = row.publicDate;
                return new Date(timeStrap).format('yyyy-MM-dd');
            },
            handleEdit(index, row) {
                this.$router.push({ path: 'editGame', query: { gameId: row.id }});
                // this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                const self = this;
                this.webHttp.get(`/api/manage/deleteGame`, { gameId: row.id }).then(res => {
                    if (res.success) {
                        self.tableData = self.tableData.filter(game => {
                            return game.id !== row.id;
                        });
                        self.$message.error('删除成功');
                        return;
                    }
                    self.$message.error('删除失败');
                })
            },
            delAll(){
                const self = this;
                self.$message.error('你想要这个功能吗?不存在的!!');
                //     length = self.multipleSelection.length;
                // let str = '';
                // self.del_list = self.del_list.concat(self.multipleSelection);
                // for (let i = 0; i < length; i++) {
                //     str += self.multipleSelection[i].name + ' ';
                // }
                // self.$message.error('删除了'+str);
                // self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>