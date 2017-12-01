<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 游戏管理</el-breadcrumb-item>
                <el-breadcrumb-item>游戏列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            -->
            <el-button type="primary" @click="addGame">新增</el-button>
        </div> 
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="gameId" label="游戏id" width="80">
                </el-table-column>
            <el-table-column prop="gameName" label="游戏名">
                </el-table-column>
            <el-table-column prop="downUrl" label="下载地址">
                </el-table-column>
            <el-table-column prop="gameType" label="游戏类型">
                </el-table-column>
            <el-table-column prop="gameLoginUrl" label="后台登陆地址">
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
                if(process.env.NODE_ENV === 'development'){
                    self.url = 'http://result.eolinker.com/Si3YRczf826e807c8053e83130109e7e34d195898a36247?uri=/api/gameList';
                };
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    const list = res.data.data;
                    console.log(list)
                    self.tableData = list;
                })
            },
            search(){
                this.is_search = true;
            },
            addGame() {
                this.$router.push('/addGame');
            },
            // formatter(row, column) {
            //     return row.address;
            // },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this;
                self.$message.error('想要这个功能???不存在的!!');
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