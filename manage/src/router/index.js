import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                // {
                //     path: '/basetable',
                //     component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                // },
                
                // {
                //     path: '/vuetable',
                //     component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                // },
                // {
                //     path: '/baseform',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                // },
                // {
                //     path: '/vueeditor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                // },
                // {
                //     path: '/basecharts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                // },
                // {
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                // },
                // self
                {
                    path: '/gamesList',
                    component: resolve => require(['../components/page/GamesList.vue'], resolve)
                },
                {
                    path: '/addGame',
                    component: resolve => require(['../components/page/AddGame.vue'], resolve)    // 添加游戏
                },
                {
                    path: '/editGame',
                    component: resolve => require(['../components/page/EditGame.vue'], resolve)    // 添加游戏
                },
                {
                    path: '/newsList',
                    component: resolve => require(['../components/page/NewsList.vue'], resolve)
                },
                {
                    path: '/addNews',
                    component: resolve => require(['../components/page/AddNews.vue'], resolve)    // 添加游戏
                },
                {
                    path: '/pageManage_home',
                    component: resolve => require(['../components/page/PageManage_home.vue'], resolve)    // 添加游戏
                },
                {
                    path: '/pageManage_platfrom',
                    component: resolve => require(['../components/page/PageManage_platfrom.vue'], resolve)    // 添加游戏
                },
                {
                    path: '/pageManage_contact',
                    component: resolve => require(['../components/page/PageManage_contact.vue'], resolve)    // 添加游戏
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
