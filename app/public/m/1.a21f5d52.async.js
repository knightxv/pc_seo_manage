webpackJsonp([1],{565:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var n=t(14),r=l(n),u=t(127),d=l(u),c=t(228),i=l(c),f=t(125),s=l(f),o=t(6),m=l(o),_=t(7),g=l(_),b=t(10),v=l(b),p=t(11),I=l(p),h=t(0),E=l(h),L=t(126),N=t(17),w=l(N),B=t(227),W=l(B),k=t(229),S=t(570),y=l(S),x=t(571),C=l(x),M=t(573),j=l(M),A=function(e){function a(e){(0,m.default)(this,a);var t=(0,v.default)(this,(a.__proto__||(0,s.default)(a)).call(this,e));return t.navigateToGameDetail=function(e){t.router.go("/gameDetail",{gameId:e})},t.renderStar=function(e){for(var a=[],t=0;t<e;t++)a.push(E.default.createElement("i",{key:"start"+t,className:j.default.gameStar}));return a},t.goLink=function(e,a){e.stopPropagation(),a&&(window.location.href=a)},t.state={swiperList:[],gameList:[]},t}return(0,I.default)(a,e),(0,g.default)(a,[{key:"componentWillMount",value:function(){function e(){return a.apply(this,arguments)}var a=(0,i.default)(d.default.mark(function e(){var a,t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.http.serverHttp.get("/api/phone/homeCarousel");case 2:return a=e.sent,console.log(a),a.isSuccess&&this.setState({swiperList:a.data}),e.next=7,this.http.serverHttp.get("/api/phone/gameList");case 7:t=e.sent,t.isSuccess&&this.setState({gameList:t.data});case 9:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this,a=this.state,t=a.swiperList,l=a.gameList;return E.default.createElement("div",{className:j.default.container},t&&E.default.createElement(k.Carousel,{autoplay:t.length>1,dots:t.length>1,infinite:!0,selectedIndex:0,beforeChange:function(e,a){},afterChange:function(e){}},t.map(function(a,t){return E.default.createElement("a",{key:"Carousel"+t,href:a.href||"javascript:;",className:j.default.imgWrap},E.default.createElement(y.default,{src:a.src,alt:a.alt,className:j.default.carouselImg,onLoad:function(){window.dispatchEvent(new Event("resize")),e.setState({imgHeight:"auto"})}}))})),E.default.createElement("div",null,E.default.createElement("div",{className:j.default.gameListTitleWrap},E.default.createElement("span",{className:j.default.gameTitle},"\u70ed\u95e8\u6e38\u620f")),E.default.createElement("div",{className:j.default.gameListWrap},l.map(function(a,t){var l;return E.default.createElement("div",{key:"gameItem"+t,onClick:function(){return e.navigateToGameDetail(a.id)}},E.default.createElement("div",{className:j.default.gameItem},E.default.createElement("div",{className:j.default.gameIconWrap},E.default.createElement(y.default,{className:j.default.gameIcon,src:a.gameIcon,alt:a.gameName})),E.default.createElement("div",{className:j.default.gameInfo},E.default.createElement("div",{className:j.default.gameName},a.gameName),E.default.createElement("div",{className:j.default.gameBrief},a.gameBrief)),E.default.createElement("div",{className:(0,w.default)((l={},(0,r.default)(l,j.default.downGameIcon,!0),(0,r.default)(l,j.default.downGameDisabled,!a.downUrl),l)),onClick:function(t){return e.goLink(t,a.downUrl)}},"\u4e0b\u8f7d")))}))),E.default.createElement(C.default,{select:"games"}))}}]),a}(W.default);a.default=(0,L.connect)()(A),e.exports=a.default},570:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var n=t(2),r=l(n),u=t(0),d=l(u),c="",i=function(e){return d.default.createElement("img",(0,r.default)({},e,{src:c+e.src}))};a.default=i,e.exports=a.default},571:function(e,a,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0});var n=t(14),r=l(n),u=t(125),d=l(u),c=t(6),i=l(c),f=t(7),s=l(f),o=t(10),m=l(o),_=t(11),g=l(_),b=t(0),v=l(b),p=t(126),I=t(17),h=l(I),E=t(227),L=l(E),N=t(572),w=l(N),B=function(e){function a(){var e,t,l,n;(0,i.default)(this,a);for(var r=arguments.length,u=Array(r),c=0;c<r;c++)u[c]=arguments[c];return t=l=(0,m.default)(this,(e=a.__proto__||(0,d.default)(a)).call.apply(e,[this].concat(u))),l.navigate=function(e){var a=l.props.select;e.indexOf(a)>-1||l.router.go(e)},n=t,(0,m.default)(l,n)}return(0,g.default)(a,e),(0,s.default)(a,[{key:"render",value:function(){var e,a,t,l,n,u,d=this,c=this.props.select;return v.default.createElement("div",null,v.default.createElement("div",{className:w.default.tabbarWrap},v.default.createElement("div",{className:w.default.tabbarItem,onClick:function(){return d.navigate("/games")}},v.default.createElement("div",{className:(0,h.default)((e={},(0,r.default)(e,w.default.tabBarIcon,!0),(0,r.default)(e,w.default.tabBarIcon_game,!0),(0,r.default)(e,w.default.active,"games"===c),e))}),v.default.createElement("div",{className:(0,h.default)((a={},(0,r.default)(a,w.default.tabbarLabel,!0),(0,r.default)(a,w.default.tabbarLabelActive,"games"===c),a))},"\u6e38\u620f")),v.default.createElement("div",{className:w.default.tabbarItem,onClick:function(){return d.navigate("/newsList")}},v.default.createElement("div",{className:(0,h.default)((t={},(0,r.default)(t,w.default.tabBarIcon,!0),(0,r.default)(t,w.default.tabBarIcon_news,!0),(0,r.default)(t,w.default.active,"newsList"===c),t))}),v.default.createElement("div",{className:(0,h.default)((l={},(0,r.default)(l,w.default.tabbarLabel,!0),(0,r.default)(l,w.default.tabbarLabelActive,"newsList"===c),l))},"\u8d44\u8baf")),v.default.createElement("div",{className:w.default.tabbarItem,onClick:function(){return d.navigate("/join")}},v.default.createElement("div",{className:(0,h.default)((n={},(0,r.default)(n,w.default.tabBarIcon,!0),(0,r.default)(n,w.default.tabBarIcon_news,!0),(0,r.default)(n,w.default.active,"join"===c),n))}),v.default.createElement("div",{className:(0,h.default)((u={},(0,r.default)(u,w.default.tabbarLabel,!0),(0,r.default)(u,w.default.tabbarLabelActive,"join"===c),u))},"\u52a0\u5165\u6211\u4eec"))))}}]),a}(L.default);a.default=(0,p.connect)()(B),e.exports=a.default},572:function(e,a){e.exports={tabBarIcon:"tabBarIcon___2B0Cz",active:"active___1rrtt",tabBarIcon_game:"tabBarIcon_game___2avaP",tabBarIcon_news:"tabBarIcon_news___CFf86",tabBarIcon_join:"tabBarIcon_join___eqdxG",tabbarWrap:"tabbarWrap___3QKzr",tabbarItem:"tabbarItem___QpMKc",tabbarLabel:"tabbarLabel___1HdeB",tabbarLabelActive:"tabbarLabelActive___1AVqj"}},573:function(e,a){e.exports={container:"container___1M_YP",imgWrap:"imgWrap___3cRrw",carouselImg:"carouselImg___1M_aM",gameListTitleWrap:"gameListTitleWrap___2zxRJ",gameTitle:"gameTitle___2cVWV",gameIconWrap:"gameIconWrap___3ulFS",gameIcon:"gameIcon___1AAbc",gameItem:"gameItem___1kiOJ",gameInfo:"gameInfo___25rTW",gameName:"gameName___2FPyL",gameBrief:"gameBrief___1Ab1J",downGameIcon:"downGameIcon___3NlIm",gameStarSizeWrap:"gameStarSizeWrap___3reoS",gameSize:"gameSize___2QmzF",gameListWrap:"gameListWrap___1gGi2",downGameDisabled:"downGameDisabled___25PnK"}}});