webpackJsonp([6],{507:function(e,t,r){r(622);var a=r(197)(r(555),r(609),null,null);e.exports=a.exports},535:function(e,t,r){var a=r(136),o=r(49)("toStringTag"),i="Arguments"==a(function(){return arguments}()),n=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,r,l;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=n(t=Object(e),o))?r:i?a(t):"Object"==(l=a(t))&&"function"==typeof t.callee?"Arguments":l}},536:function(e,t,r){e.exports={default:r(537),__esModule:!0}},537:function(e,t,r){var a=r(63),o=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},538:function(e,t,r){var a=r(88),o=r(49)("iterator"),i=Array.prototype;e.exports=function(e){return void 0!==e&&(a.Array===e||i[o]===e)}},539:function(e,t,r){var a=r(64);e.exports=function(e,t,r,o){try{return o?t(a(r)[0],r[1]):t(r)}catch(t){var i=e.return;throw void 0!==i&&a(i.call(e)),t}}},540:function(e,t,r){var a=r(49)("iterator"),o=!1;try{var i=[7][a]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!o)return!1;var r=!1;try{var i=[7],n=i[a]();n.next=function(){return{done:r=!0}},i[a]=function(){return n},e(i)}catch(e){}return r}},541:function(e,t,r){var a=r(535),o=r(49)("iterator"),i=r(88);e.exports=r(63).getIteratorMethod=function(e){if(void 0!=e)return e[o]||e["@@iterator"]||i[a(e)]}},542:function(e,t,r){e.exports={default:r(544),__esModule:!0}},543:function(e,t,r){"use strict";t.__esModule=!0;var a=r(542),o=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return(0,o.default)(e)}},544:function(e,t,r){r(201),r(547),e.exports=r(63).Array.from},545:function(e,t,r){"use strict";var a=r(50),o=r(67);e.exports=function(e,t,r){t in e?a.f(e,t,o(0,r)):e[t]=r}},547:function(e,t,r){"use strict";var a=r(198),o=r(89),i=r(138),n=r(539),l=r(538),s=r(200),c=r(545),m=r(541);o(o.S+o.F*!r(540)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,o,u,f=i(e),p="function"==typeof this?this:Array,d=arguments.length,g=d>1?arguments[1]:void 0,v=void 0!==g,h=0,b=m(f);if(v&&(g=a(g,d>2?arguments[2]:void 0,2)),void 0==b||p==Array&&l(b))for(t=s(f.length),r=new p(t);t>h;h++)c(r,h,v?g(f[h],h):f[h]);else for(u=b.call(f),r=new p;!(o=u.next()).done;h++)c(r,h,v?n(u,g,[o.value,h],!0):o.value);return r.length=h,r}})},555:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(543),o=r.n(a),i=r(536),n=r.n(i),l=[{label:"大众棋牌",value:"dzqp",type:1},{label:"特色棋牌",value:"tsqp",type:2},{label:"地方麻将",value:"dfmj",type:3}];t.default={data:function(){return{form:{gameName:"",gameBrief:"",gameSize:"",gameVersion:"",gameType:l[0].type,publicTime:new Date,downUrl:"",gameLoginUrl:"",gameIntroduce:"",characteristic:""},imageUrl:"",gameScreenshot:[],dialogImageUrl:"",dialogVisible:!1,gameTypeArr:l}},methods:{onSubmit:function(){var e=this,t=this.imageUrl,r=this.form,a=r.gameName,o=r.gameBrief,i=r.gameSize,s=r.gameVersion,c=r.gameType,m=r.publicTime,u=r.downUrl,f=r.gameLoginUrl,p=r.gameIntroduce,d=r.characteristic,g=this.gameScreenshot.map(function(e){return e.url}),v=n()(g),h={gameName:a,gameBrief:o,gameSize:i,gameVersion:s,publicDate:m.getTime(),downUrl:u,gameLoginUrl:f,gameIntroduce:p.replace(/\r{0,}\n/g,"<br />"),gameType:c,characteristic:d.replace(/\r{0,}\n/g,"<br />"),gameScreenshot:v,gameIcon:t};this.webHttp.get("/api/manage/addGame",h).then(function(t){t.success?(e.$message.success("添加成功"),e.form={gameName:"",gameBrief:"",gameSize:"",gameVersion:"",gameType:l[0].type,publicTime:new Date,downUrl:"",gameLoginUrl:"",gameIntroduce:"",characteristic:""},e.imageUrl="",e.gameScreenshot=[]):e.$message.error("添加失败")})},uploadImage:function(e){var t=e.file,r=new FormData;r.append("files",t),this.webHttp.form("/api/upload/image",r).then(function(t){t.success&&e.onSuccess(t.data,e)})},onCancel:function(){this.$router.back()},handleAvatarSuccess:function(e,t){this.imageUrl=e.url},beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type,r=e.size/1024/1024<2;return t||this.$message.error("上传头像图片只能是 JPG 格式!"),r||this.$message.error("上传头像图片大小不能超过 2MB!"),t&&r},handleRemove:function(e,t){this.gameScreenshot=t},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handlePictureCardSuccess:function(e,t){this.gameScreenshot=[].concat(o()(this.gameScreenshot),[{name:t.name,url:e.url}])}}}},591:function(e,t,r){t=e.exports=r(87)(void 0),t.push([e.i,".avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload:hover{border-color:#409eff}.avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.avatar{width:178px;height:178px;display:block}",""])},609:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"crumbs"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",[r("i",{staticClass:"el-icon-date"}),e._v(" 游戏管理")]),e._v(" "),r("el-breadcrumb-item",[e._v("添加游戏")])],1)],1),e._v(" "),r("div",{staticClass:"form-box"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"游戏名称"}},[r("el-input",{model:{value:e.form.gameName,callback:function(t){e.$set(e.form,"gameName",t)},expression:"form.gameName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏简介"}},[r("el-input",{model:{value:e.form.gameBrief,callback:function(t){e.$set(e.form,"gameBrief",t)},expression:"form.gameBrief"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏大小"}},[r("el-input",{model:{value:e.form.gameSize,callback:function(t){e.$set(e.form,"gameSize",t)},expression:"form.gameSize"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏版本"}},[r("el-input",{model:{value:e.form.gameVersion,callback:function(t){e.$set(e.form,"gameVersion",t)},expression:"form.gameVersion"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏下载地址"}},[r("el-input",{model:{value:e.form.downUrl,callback:function(t){e.$set(e.form,"downUrl",t)},expression:"form.downUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"代理登陆地址"}},[r("el-input",{model:{value:e.form.gameLoginUrl,callback:function(t){e.$set(e.form,"gameLoginUrl",t)},expression:"form.gameLoginUrl"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"更新日期"}},[r("el-col",{attrs:{span:11}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.publicTime,callback:function(t){e.$set(e.form,"publicTime",t)},expression:"form.publicTime"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏类型"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.gameType,callback:function(t){e.$set(e.form,"gameType",t)},expression:"form.gameType"}},e._l(e.gameTypeArr,function(e){return r("el-option",{key:e.type,attrs:{label:e.label,value:e.type}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏图标"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","http-request":e.uploadImage,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?r("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏截图"}},[r("el-upload",{attrs:{action:"","list-type":"picture-card","show-file-list":!0,"http-request":e.uploadImage,"on-preview":e.handlePictureCardPreview,"on-success":e.handlePictureCardSuccess,"file-list":e.gameScreenshot,"on-remove":e.handleRemove}},[r("i",{staticClass:"el-icon-plus"})]),e._v(" "),r("el-dialog",{attrs:{visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.dialogVisible=t}}},[r("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),e._v(" "),r("el-form-item",{attrs:{label:"玩法介绍"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.form.gameIntroduce,callback:function(t){e.$set(e.form,"gameIntroduce",t)},expression:"form.gameIntroduce"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"游戏亮点"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.form.characteristic,callback:function(t){e.$set(e.form,"characteristic",t)},expression:"form.characteristic"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("提交")]),e._v(" "),r("el-button",{on:{click:e.onCancel}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]}},622:function(e,t,r){var a=r(591);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(196)("7d138872",a,!0)}});