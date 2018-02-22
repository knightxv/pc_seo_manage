<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'readme',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '2',
                        title: '游戏管理',
                        subs: [
                            {
                                index: 'gamesList',
                                title: '游戏列表'
                            },
                            {
                                index: 'addGame',
                                title: '添加游戏'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '3',
                        title: '新闻管理',
                        subs: [
                            {
                                index: 'newsList',
                                title: '新闻列表'
                            },
                            {
                                index: 'addNews',
                                title: '添加新闻'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '4',
                        title: '首页管理',
                        subs: [
                            {
                                index: 'pageManage_home',
                                title: '热门游戏'
                            },
                            {
                                index: 'friendLink',
                                title: '友情链接'
                            },
                            {
                                index: 'homeCarouel',
                                title: '轮播图片'
                            },
                            {
                                index: 'phone_homeCarouel',
                                title: '轮播图片(手机)'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '5',
                        title: '页面管理',
                        subs: [

                            {
                                index: 'pageManage_platfrom',
                                title: '平台介绍'
                            },
                            {
                                index: 'pageManage_contact',
                                title: '联系我们'
                            },
                            {
                                index: 'banner',
                                title: 'banner(横幅)'
                            },
                            {
                                index: 'phone_join',
                                title: '加入我们(手机)'
                            },
                            {
                                index: 'appConfig',
                                title: '全局配置'
                            },
                        ]
                    },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单',
                    //     subs: [
                    //         {
                    //             index: 'baseform',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'vueeditor',
                    //             title: '编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'basecharts',
                    //     title: '图表'
                    // },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
