webpackJsonp([3],{568:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(2),r=n(l),m=a(31),o=n(m),i=a(127),c=n(i),d=a(228),u=n(d),f=a(125),s=n(f),_=a(6),g=n(_),I=a(7),p=n(I),v=a(10),E=n(v),N=a(11),h=n(N),w=a(0),C=n(w),y=a(126),S=a(229),k=a(570),W=n(k),T=a(227),R=n(T),b=a(575),G=n(b),L=function(e){function t(e){var a=this;(0,g.default)(this,t);var n=(0,E.default)(this,(t.__proto__||(0,s.default)(t)).call(this,e));return n.getGameList=(0,u.default)(c.default.mark(function e(){var t;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.http.serverHttp.get("/api/phone/getRecommendGame",{size:2});case 2:t=e.sent,t.isSuccess&&n.setState({gameList:t.data});case 4:case"end":return e.stop()}},e,a)})),n.getGame=function(){var e=(0,u.default)(c.default.mark(function e(t){var l,m,i,d,u;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.http.serverHttp.get("/api/gameDetail/"+t);case 2:if(l=e.sent,l.isSuccess){m=l.data,i=m.gameScreenshot,d=(0,o.default)(m,["gameScreenshot"]),u=[];try{u=JSON.parse(i)}catch(e){console.log(e)}n.setState((0,r.default)({},d,{gameScreenshot:u}))}case 4:case"end":return e.stop()}},e,a)}));return function(t){return e.apply(this,arguments)}}(),n.navigateToGameDetail=function(e){n.router.go("/gameDetail",{gameId:e}),n.getGame(e)},n.renderItem=function(e){return C.default.createElement("div",{className:G.default.recommendItem,onClick:function(){return n.gameDetail(e.gameId)}},C.default.createElement(W.default,{className:G.default.gameIcon,src:e.gameIcon}),C.default.createElement("div",{className:G.default.gameName},e.gameName),C.default.createElement("div",{className:G.default.gameSize},e.gameSize))},n.renderStar=function(e){for(var t=[],a=0;a<e;a++)t.push(C.default.createElement("i",{key:"start"+a,className:G.default.gameStar}));return t},n.downLoad=function(){var e=n.state.downUrl;e&&(window.location.href=e)},n.backHome=function(){if(n.props.history.length>2)return void n.router.back();n.router.go("/games")},n.state={gameName:"",gameIcon:"",downUrl:"",gameSize:"",downCount:"",gameVersion:"",gameStar:5,gameIntroduce:"",characteristic:"",publicDataTime:"",developer:"",gameScreenshot:[],gameLoginUrl:"",gameList:[]},n}return(0,h.default)(t,e),(0,p.default)(t,[{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,u.default)(c.default.mark(function e(){var t,a;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.router.getQuery(),a=t.gameId,this.getGameList(),this.getGame(a);case 3:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this,t=this.state,a=t.gameName,n=t.gameIcon,l=t.gameSize,r=t.gameVersion,m=t.publicDate,o=t.gameIntroduce,i=t.characteristic,c=t.gameScreenshot,d=t.gameList,u=t.downUrl,f=t.gameBrief,s=new Date(m).format("yyyy-MM-dd");return C.default.createElement("div",{className:G.default.container},C.default.createElement(S.NavBar,{onClick:this.backHome}),C.default.createElement("div",{className:G.default.contentContainer},C.default.createElement("div",{className:G.default.scrollContent},C.default.createElement("div",{className:G.default.header},C.default.createElement("div",null,C.default.createElement(W.default,{className:G.default.gameIcon,src:n})),C.default.createElement("div",{className:G.default.gameInfoWrap},C.default.createElement("div",{className:G.default.gameName},a),C.default.createElement("div",{className:G.default.gameBrief},f))),C.default.createElement("div",{className:G.default.scrollWrap},C.default.createElement(S.Carousel,{cellSpacing:8,slideWidth:.9,dots:!1,selectedIndex:0,beforeChange:function(e,t){},afterChange:function(e){}},c.map(function(t,a){return C.default.createElement("div",{key:"Carousel"+a,className:G.default.swiperItem},C.default.createElement(W.default,{src:t,dots:!1,className:G.default.swiperImg,onLoad:function(){window.dispatchEvent(new Event("resize")),e.setState({imgHeight:"auto"})}}))}))),C.default.createElement("div",{className:G.default.infoItem},C.default.createElement("div",{className:G.default.infoItemTitle},"\u73a9\u6cd5\u4ecb\u7ecd"),C.default.createElement("div",{className:G.default.infoItemContent,dangerouslySetInnerHTML:this.helps.createMarkup(o)})),C.default.createElement("div",{className:G.default.infoItem},C.default.createElement("div",{className:G.default.infoItemTitle},"\u6e38\u620f\u4eae\u70b9"),C.default.createElement("div",{className:G.default.infoItemContent,dangerouslySetInnerHTML:this.helps.createMarkup(i)})),C.default.createElement("div",{className:G.default.infoItem},C.default.createElement("div",{className:G.default.infoItemTitle},"\u6e38\u620f\u4fe1\u606f"),C.default.createElement("div",{className:G.default.infoRowItem},C.default.createElement("div",{className:G.default.infoRowItemKey},"\u6e38\u620f\u5927\u5c0f\u3000"),C.default.createElement("div",{style:{flex:1}},l)),C.default.createElement("div",{className:G.default.infoRowItem},C.default.createElement("div",{className:G.default.infoRowItemKey},"\u7248\u672c\u53f7\u3000\u3000"),C.default.createElement("div",{style:{flex:1}},r)),C.default.createElement("div",{className:G.default.infoRowItem,style:{borderBottom:"none"}},C.default.createElement("div",{className:G.default.infoRowItemKey},"\u66f4\u65b0\u65e5\u671f\u3000"),C.default.createElement("div",{style:{flex:1}},s))),C.default.createElement("div",{className:G.default.hotGameInfoItem},C.default.createElement("div",{className:G.default.infoRecommendTitle},"\u70ed\u95e8\u6e38\u620f\u63a8\u8350"),C.default.createElement("div",{className:G.default.recommendGameWrap},d.map(function(t,a){return C.default.createElement("div",{className:G.default.gameItem,key:"gameItem"+a,onClick:function(){return e.navigateToGameDetail(t.id)}},C.default.createElement("div",{className:G.default.gameIconWrap},C.default.createElement(W.default,{className:G.default.gameIcon,src:t.gameIcon,alt:t.gameName})),C.default.createElement("div",{className:G.default.gameInfo},C.default.createElement("div",{className:G.default.gameName},t.gameName),C.default.createElement("div",{className:G.default.gameBrief},t.gameBrief)))})))),C.default.createElement("div",{className:G.default.btnWrap},C.default.createElement(S.Button,{onClick:this.downLoad,disabled:!u},u?"\u4e0b\u8f7d":"\u656c\u8bf7\u671f\u5f85"))))}}]),t}(R.default);L.propTypes={},t.default=(0,y.connect)()(L),e.exports=t.default},570:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=a(2),r=n(l),m=a(0),o=n(m),i="",c=function(e){return o.default.createElement("img",(0,r.default)({},e,{src:i+e.src}))};t.default=c,e.exports=t.default},575:function(e,t){e.exports={container:"container___1nZ7W",contentContainer:"contentContainer___3lWmQ",gameContent:"gameContent___2R9Xj",scrollWrap:"scrollWrap___2rBtc",btnWrap:"btnWrap___1KkLo",scrollContent:"scrollContent___caWEo",header:"header___3EQIt",headerRow:"headerRow___id3WI",gameInfoWrap:"gameInfoWrap___226JR",gameDownText:"gameDownText___YHHGs",gameName:"gameName___1Y8C6",gameBrief:"gameBrief___35B3n",gameSize:"gameSize___2KkWa",gameIcon:"gameIcon___kdYfr",gameVersion:"gameVersion___VL7Fn",carouselImg:"carouselImg___1KMWG",swiperContainer:"swiperContainer___284Co",rowSwiperContainer:"rowSwiperContainer___SlnVp",swiperItem:"swiperItem___3Rwq8",swiperImg:"swiperImg___2SYdT",introTitle:"introTitle___yIJYU",introContent:"introContent___DCjAv",infoItem:"infoItem___3Y5v0",infoItemTitle:"infoItemTitle___388PX",infoItemContent:"infoItemContent___2emV3",infoRowItem:"infoRowItem___8UZgP",infoRowItemKey:"infoRowItemKey___1IaIv",infoRecommendTitle:"infoRecommendTitle___2fvP5",hotGameInfoItem:"hotGameInfoItem___2n0L3",gameItem:"gameItem___3TXLQ",gameInfo:"gameInfo___GbVj1",recommendWrap:"recommendWrap___2QHDJ"}}});