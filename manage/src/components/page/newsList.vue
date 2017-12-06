<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 新闻管理</el-breadcrumb-item>
                <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
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
            <el-button type="primary" @click="addNews">新增</el-button>
        </div> 
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="id" label="新闻id" width="80">
                </el-table-column>
            <el-table-column prop="newsTitle" label="标题">
                </el-table-column>
            <el-table-column prop="publicTime" label="发布日期" :formatter="timeFormat">
                </el-table-column>
            <el-table-column prop="newsType" label="新闻类型" :formatter="typeFormat">
                </el-table-column>
            <el-table-column prop="newsBrief" label="新闻简介">
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
    export default {
        data() {
            return {
                url: '/api/newsList',
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
                self.webHttp.get(self.url, {page:self.cur_page}).then((res) => {
                    const list = res.data;
                    self.tableData = list || [];
                })
            },
            typeFormat(row, column) {
                let typeLabel = '默认';
                newsTypeArr.some(typeInfo => {
                    if (typeInfo.type === +row.newsType) {
                        typeLabel = typeInfo.label;
                        return true;
                    }
                    return false;
                });
                return typeLabel;
            },
            // 时间的转换
            timeFormat(row, column) {
                const timeStrap = row.publicTime;
                return new Date(timeStrap).format('yyyy-MM-dd');
            },
            // search(){
            //     this.is_search = true;
            // },
            addNews() {
                this.$router.push('/addNews');
            },
            // formatter(row, column) {
            //     return row.address;
            // },
            // filterTag(value, row) {
            //     return row.tag === value;
            // },
            handleEdit(index, row) {
                this.$router.push({ path: 'editNews', query: { newsId: row.id }});
                // this.$message('编辑第'+(index+1)+'行');
            },
            handleDelete(index, row) {
                const self = this;
                this.webHttp.get(`/api/manage/deleteNews`, { newsId: row.id }).then(res => {
                    if (res.success) {
                        self.tableData = self.tableData.filter(news => {
                            return news.id !== row.id;
                        });
                        self.$message.error('删除成功');
                        return;
                    }
                    self.$message.error('删除失败');
                })
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