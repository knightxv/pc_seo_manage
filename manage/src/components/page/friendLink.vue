<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>友情链接</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hot-title">友情链接</div>
        <el-button
            type="primary"
            @click="isAdd = true"
        >
            新建
        </el-button>
        <div class="flex-item">
            <el-table :data="friendLinks" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- <el-table-column prop="id" label="id" width="80">
                    </el-table-column> -->
                <el-table-column prop="href" label="链接">
                    </el-table-column>
                <el-table-column prop="label" label="描述">
                    </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button size="small"
                                @click="showHandleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="修改链接信息"
            :visible.sync="isEdit"
            width="30%"
        >
            <el-input
                placeholder="链接"
                v-model="selectEditHref"
                clearable>
            </el-input>
            <el-input
                placeholder="描述"
                v-model="selectEditLabel"
                clearable>
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="添加友情链接"
            :visible.sync="isAdd"
            width="30%"
        >
            <el-input
                placeholder="链接"
                v-model="addEditHref"
                clearable>
            </el-input>
            <el-input
                placeholder="描述"
                v-model="addEditLabel"
                clearable>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd = false">取 消</el-button>
                <el-button type="primary" @click="handleCreate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                friendLinks: [],
                isEdit: false, // 是否正在编辑状态
                editId: null, // 编辑的index
                editIndex: null,
                selectEditHref: '', // 要添加的href
                selectEditLabel: '', // 要添加的label
                isAdd: false,
                addEditHref: '', // 要添加的href
                addEditLabel: '', // 要添加的label
            }
        },
        async created() {
            // 友情链接
            const friendLinkRes = await this.webHttp.get('/api/manage/friendLink');
            if (friendLinkRes.success) {
                this.friendLinks = friendLinkRes.data;
            }
        },
        methods: {
            onSubmit() {

            },
            // 新建
            async handleCreate() {
                const { addEditHref, addEditLabel } = this;
                const createRes = await this.webHttp.get('/api/manage/createFriendLink', {
                    href: addEditHref,
                    label: addEditLabel,
                });
                if (createRes.success) {
                    const linkInfo = createRes.data;
                    console.log(linkInfo)
                    this.friendLinks = [ ...this.friendLinks, linkInfo];
                    this.$message.info(createRes.info || '添加成功');
                    this.addEditHref = '';
                    this.addEditLabel = '';
                } else {
                    this.$message.error(createRes.info || '添加失败');
                }
                this.isAdd = false;
            },
            // 显示编辑框
            showHandleEdit(index, row) {
                const { id } = row;
                this.isEdit = true;
                this.editIndex = index;
                this.editId = id;
                this.selectEditHref = row.href;
                this.selectEditLabel = row.label;
            },
            // 确认修改
            async handleEdit() {
                this.isEdit = false;
                const { editId, selectEditHref, selectEditLabel, editIndex } = this;
                if (!isNaN(editId)) {
                    const res = await this.webHttp.get('/api/manage/editFriendLink', {
                        id: editId,
                        href: selectEditHref,
                        label: selectEditLabel,
                    });
                    if (res.success) {
                        this.friendLinks[editIndex].href = selectEditHref;
                        this.friendLinks[editIndex].label = selectEditLabel;
                        this.$message.info('修改成功');
                    } else {
                        this.$message.error(res.info || '修改失败');
                    }
                }
            },
            async handleDelete(index, row) {
                const { id } = row;
                 const res = await this.webHttp.get('/api/manage/deleteFriendLink', {
                    id,
                });
                if (res.success) {
                    this.friendLinks = this.friendLinks.filter(linkInfo => linkInfo.id !== id);
                    this.$message.info('删除成功');
                } else {
                    this.$message.error(res.info || '删除失败');
                }
            },
            handleSelectionChange() {

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
</style>