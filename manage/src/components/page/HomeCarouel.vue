<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-upload2"></i> 页面管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页轮播</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="hot-title">首页轮播</div>
        <el-button
            type="primary"
            @click="showHandleAdd"
        >
            新建
        </el-button>
        <div class="flex-item">
            <el-table :data="carousel" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <!-- <el-table-column prop="id" label="id" width="80">
                    </el-table-column> -->
                <el-table-column prop="id" label="id">
                    </el-table-column>
                <el-table-column prop="src" label="图片地址">
                    </el-table-column>
                <el-table-column prop="href" label="跳转链接">
                    </el-table-column>
                <el-table-column prop="alt" label="描述">
                    </el-table-column>
                <el-table-column prop="sortNumber" label="排列序号">
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
        <!-- 修改轮播图信息 -->
        <el-dialog
            title="修改轮播图信息"
            :visible.sync="isEdit"
            width="30%"
        >
            <el-input
                placeholder="跳转链接"
                v-model="editInfo.href"
                clearable>
            </el-input>
            <el-input
                placeholder="描述"
                v-model="editInfo.alt"
                clearable>
            </el-input>
            <el-input
                placeholder="排列序号"
                v-model="editInfo.sortNumber"
                clearable>
            </el-input>
            <div>
                <div>轮播图片(建议:1920*450)</div>
                <el-upload
                    action=""
                    class="avatar-uploader"
                    :http-request="uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="isEdit" :src="remoteUrl + editInfo.src" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加轮播图信息 -->
        <el-dialog
            title="添加轮播图"
            :visible.sync="isAdd"
            width="30%"
        >
            <el-input
                placeholder="跳转链接"
                v-model="addInfo.href"
                clearable>
            </el-input>
            <el-input
                placeholder="描述"
                v-model="addInfo.alt"
                clearable>
            </el-input>
            <el-input
                placeholder="排列序号"
                v-model="addInfo.sortNumber"
                clearable>
            </el-input>
            <div>
                <div>轮播图片(建议:1920*450)</div>
                <el-upload
                    action=""
                    class="avatar-uploader"
                    :http-request="uploadImage"
                    :show-file-list="false"
                    :on-success="handleAddCarouselSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="addInfo.src" :src="remoteUrl + addInfo.src" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAdd = false">取 消</el-button>
                <el-button type="primary" @click="handleAddCarousel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data: function(){
            const { remoteUrl, } = this.config;
            return {
                remoteUrl,
                carousel: [],
                isEdit: false, // 是否正在编辑状态
                editIndex: null, // 正在编辑的index
                editInfo: {
                    id: '',
                    src: '',
                    href: '',
                    alt: '',
                    sortNumber: '',
                },
                isAdd: false,
                addInfo: {
                    src: '',
                    href: '',
                    alt: '',
                    sortNumber: '',
                },
            }
        },
        async created() {
            // 首页轮播
            const res = await this.webHttp.get('/api/manage/homeCarousel');
            if (res.success) {
                this.carousel = res.data;
            }
        },
        methods: {
            onSubmit() {

            },
            // 显示编辑框
            showHandleEdit(index, row) {
                const { id, src, href, alt, sortNumber } = row;
                this.isEdit = true; // 是否正在编辑状态
                this.editIndex = index; // 正在编辑的index
                this.editInfo = {
                    id,
                    src,
                    href,
                    alt,
                    sortNumber,
                };
            },
            // 确认修改
            async handleEdit() {
                this.isEdit = false;
                const { id, src, href, alt, sortNumber } = this.editInfo;
                const editIndex = this.editIndex;
                const res = await this.webHttp.get('/api/manage/editCarousel', {
                    id, src, href, alt, sortNumber,
                });
                if (res.success) {
                    this.carousel.splice(editIndex, 1, this.editInfo);
                    this.$message.info('修改成功');
                } else {
                    this.$message.error('修改失败');
                }
            },
            // 显示添加轮播图编辑框
            showHandleAdd() {
                this.isAdd = true; // 是否正在编辑状态
                this.addInfo = {
                    src: '',
                    href: '',
                    alt: '',
                    sortNumber: '',
                };
            },
            // 添加轮播图
            async handleAddCarousel() {
                const { src, href, alt, sortNumber } = this.addInfo;
                const createRes = await this.webHttp.get('/api/manage/createCarousel', {
                    src, href, alt, sortNumber,
                });
                if (createRes.success) {
                    const linkInfo = createRes.data;
                    this.carousel.push({
                        src, href, alt, sortNumber, id: linkInfo.id,
                    });
                    this.$message.info(createRes.info || '添加成功');
                } else {
                    this.$message.error(createRes.info || '添加失败');
                }
                this.isAdd = false;
            },
            // 删除轮播图
            async handleDelete(index, row) {
                const { id } = row;
                 const res = await this.webHttp.get('/api/manage/deleteCarousel', {
                    id,
                });
                if (res.success) {
                    this.carousel = this.carousel.filter(linkInfo => linkInfo.id !== id);
                    this.$message.info('删除成功');
                } else {
                    this.$message.error(res.info || '删除失败');
                }
            },
            handleSelectionChange() {

            },
            // 上传图片
            uploadImage(row) {
                const file = row.file;
                const imageForm = new FormData();
                imageForm.append('files', file);
                this.webHttp.form('/api/upload/image/carousel', imageForm).then(res => {
                    if (res.success) {
                        row.onSuccess(res.data, row);
                    }
                });
            },
            // 上传图成功（修改）
            handleAvatarSuccess(res, row) {
                console.log(res.url)
                // edit
                this.editInfo.src = res.url;
                this.$message.info('上传成功');
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
            // 上传图成功（添加）
            handleAddCarouselSuccess(res, row) {
                console.log(res.url)
                // edit
                this.addInfo.src = res.url;
                this.$message.info('上传成功');
                // this.imageUrl = res.url;
                // this.imageUrl = URL.createObjectURL(res.url);
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
