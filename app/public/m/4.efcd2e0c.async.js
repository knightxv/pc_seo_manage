webpackJsonp([4],{567:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(127),s=a(r),u=n(2),l=a(u),i=n(228),c=a(i),o=n(125),f=a(o),d=n(6),m=a(d),p=n(7),_=a(p),w=n(10),h=a(w),v=n(11),T=a(v),C=n(0),y=a(C),k=n(126),M=n(227),N=a(M),b=n(229),E=n(574),x=a(E),Q=function(e){function t(e){(0,m.default)(this,t);var n=(0,h.default)(this,(t.__proto__||(0,f.default)(t)).call(this,e));return n.formatTime=function(e){return n.helps.formatTimeStamp(e,"yyyy-MM-dd")},n.state={newsTitle:"",publicTime:"",newsContent:""},n}return(0,T.default)(t,e),(0,_.default)(t,[{key:"componentWillMount",value:function(){function e(){return t.apply(this,arguments)}var t=(0,c.default)(s.default.mark(function e(){var t,n,a;return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.router.getQuery(),n=t.newsId,e.next=3,this.http.serverHttp.get("/api/newsDetail/"+n,{newsId:n});case 3:a=e.sent,a.isSuccess&&this.setState((0,l.default)({},a.data));case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"render",value:function(){var e=this.state,t=e.newsTitle,n=e.publicTime,a=e.newsContent;return y.default.createElement("div",{className:x.default.container},y.default.createElement(b.NavBar,{title:"\u8d44\u8baf\u8be6\u60c5",onClick:this.router.back}),y.default.createElement("div",{className:x.default.contentContainer},y.default.createElement("div",{className:x.default.newsTitle},t),y.default.createElement("div",{className:x.default.newsTime},this.formatTime(n)),y.default.createElement("div",{className:x.default.newsContent,dangerouslySetInnerHTML:this.helps.createMarkup(a)})))}}]),t}(N.default);Q.propTypes={},t.default=(0,k.connect)()(Q),e.exports=t.default},574:function(e,t){e.exports={container:"container___2QquJ",contentContainer:"contentContainer___3PQkC",newsContent:"newsContent___2QFpC",newsTitle:"newsTitle___3mwMf",newsTime:"newsTime___NCblT"}}});