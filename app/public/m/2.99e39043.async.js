webpackJsonp([2],{565:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(127),r=l(u),n=a(228),d=l(n),f=a(125),c=l(f),i=a(6),s=l(i),o=a(7),b=l(o),_=a(10),v=l(_),m=a(11),p=l(m),I=a(0),g=l(I),h=a(227),B=l(h),E=a(568),j=l(E),L=a(569),w=l(L),y=function(e){function t(e){(0,s.default)(this,t);var a=(0,v.default)(this,(t.__proto__||(0,c.default)(t)).call(this,e));return a.state={joinImg:""},a}return(0,p.default)(t,e),(0,b.default)(t,[{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,d.default)(r.default.mark(function e(){var t,a;return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.http.serverHttp.get("/api/phone/join/getImage");case 2:if(t=e.sent,t.isSuccess){e.next=5;break}return e.abrupt("return");case 5:a=t.data.src,this.setState({joinImg:a});case 7:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this.state.joinImg;return g.default.createElement("div",{style:{paddingBottom:"1rem"}},g.default.createElement(j.default,{style:{width:"100%"},src:e}),g.default.createElement(w.default,{select:"join"}))}}]),t}(B.default);t.default=y,e.exports=t.default},568:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(2),r=l(u),n=a(0),d=l(n),f="",c=function(e){return d.default.createElement("img",(0,r.default)({},e,{src:f+e.src}))};t.default=c,e.exports=t.default},569:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(14),r=l(u),n=a(125),d=l(n),f=a(6),c=l(f),i=a(7),s=l(i),o=a(10),b=l(o),_=a(11),v=l(_),m=a(0),p=l(m),I=a(126),g=a(17),h=l(g),B=a(227),E=l(B),j=a(570),L=l(j),w=function(e){function t(){var e,a,l,u;(0,c.default)(this,t);for(var r=arguments.length,n=Array(r),f=0;f<r;f++)n[f]=arguments[f];return a=l=(0,b.default)(this,(e=t.__proto__||(0,d.default)(t)).call.apply(e,[this].concat(n))),l.navigate=function(e){var t=l.props.select;e.indexOf(t)>-1||l.router.go(e)},u=a,(0,b.default)(l,u)}return(0,v.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e,t,a,l,u,n,d=this,f=this.props.select;return p.default.createElement("div",null,p.default.createElement("div",{className:L.default.tabbarWrap},p.default.createElement("div",{className:L.default.tabbarItem,onClick:function(){return d.navigate("/games")}},p.default.createElement("div",{className:(0,h.default)((e={},(0,r.default)(e,L.default.tabBarIcon,!0),(0,r.default)(e,L.default.tabBarIcon_game,!0),(0,r.default)(e,L.default.active,"games"===f),e))}),p.default.createElement("div",{className:(0,h.default)((t={},(0,r.default)(t,L.default.tabbarLabel,!0),(0,r.default)(t,L.default.tabbarLabelActive,"games"===f),t))},"\u6e38\u620f")),p.default.createElement("div",{className:L.default.tabbarItem,onClick:function(){return d.navigate("/newsList")}},p.default.createElement("div",{className:(0,h.default)((a={},(0,r.default)(a,L.default.tabBarIcon,!0),(0,r.default)(a,L.default.tabBarIcon_news,!0),(0,r.default)(a,L.default.active,"newsList"===f),a))}),p.default.createElement("div",{className:(0,h.default)((l={},(0,r.default)(l,L.default.tabbarLabel,!0),(0,r.default)(l,L.default.tabbarLabelActive,"newsList"===f),l))},"\u8d44\u8baf")),p.default.createElement("div",{className:L.default.tabbarItem,onClick:function(){return d.navigate("/join")}},p.default.createElement("div",{className:(0,h.default)((u={},(0,r.default)(u,L.default.tabBarIcon,!0),(0,r.default)(u,L.default.tabBarIcon_news,!0),(0,r.default)(u,L.default.active,"join"===f),u))}),p.default.createElement("div",{className:(0,h.default)((n={},(0,r.default)(n,L.default.tabbarLabel,!0),(0,r.default)(n,L.default.tabbarLabelActive,"join"===f),n))},"\u52a0\u5165\u6211\u4eec"))))}}]),t}(E.default);t.default=(0,I.connect)()(w),e.exports=t.default},570:function(e,t){e.exports={tabBarIcon:"tabBarIcon___2B0Cz",active:"active___1rrtt",tabBarIcon_game:"tabBarIcon_game___2avaP",tabBarIcon_news:"tabBarIcon_news___CFf86",tabBarIcon_join:"tabBarIcon_join___eqdxG",tabbarWrap:"tabbarWrap___3QKzr",tabbarItem:"tabbarItem___QpMKc",tabbarLabel:"tabbarLabel___1HdeB",tabbarLabelActive:"tabbarLabelActive___1AVqj"}}});