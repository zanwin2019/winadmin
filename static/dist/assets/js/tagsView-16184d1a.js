import{a as X,u as be,O as Te,b as Re,o as Y,e as d,_ as _e,S as y,P as Z}from"./index-21d73ac4.js";import{d as te,b as q,_ as xe,j as $,G as Se,Z as qe,ah as De,i as Ae,e as Ie,ag as ee,o as h,c as C,V as O,P as ke,a as se,J as E,F as ae,a8 as Pe,a3 as b,S as T,O as M,U as Ue,u as $e,aQ as Oe,n as j}from"./@vue-859b4330.js";import{u as Ee,b as Me,o as je}from"./vue-router-0ce8cd6d.js";import{S as Ne}from"./sortablejs-85e2743d.js";import{s as N}from"./pinia-f5c09375.js";import{a as Be}from"./element-plus-9b914f77.js";import{_ as ve}from"./_plugin-vue_export-helper-c27b6911.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";const Fe=["data-url","onContextmenu","onMousedown","onClick"],He={key:0,class:"iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont"},We=te({name:"layoutTagsView"}),ze=te({...We,setup(Ke){const ie=Oe(()=>_e(()=>import("./contextmenu-3ff5d30a.js"),["assets/js/contextmenu-3ff5d30a.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/contextmenu-19b04222.css"])),f=q([]),R=q(),B=q(),re=q(),ne=X(),le=be(),ue=X(),oe=Te(),{themeConfig:v}=N(le),{tagsViewRoutes:F}=N(ue),{routesList:ce}=N(oe),w=Re(),m=Ee(),c=Me(),t=xe({routeActive:"",routePath:m.path,dropdown:{x:"",y:""},sortable:"",tagsRefsIndex:0,tagsViewList:[],tagsViewRoutesList:[]}),me=$(()=>v.value.tagsStyle),u=$(()=>v.value),fe=$(()=>s=>Y.setTagsViewNameI18n(s)),_=s=>u.value.isShareTagsView?s.path===t.routePath:s.query&&Object.keys(s.query).length||s.params&&Object.keys(s.params).length?s.url?s.url===t.routeActive:s.path===t.routeActive:s.path===t.routePath,p=s=>{y.set("tagsViewList",s)},H=async()=>{t.routeActive=await g(m),t.routePath=await m.meta.isDynamic?m.meta.isDynamicPath:m.path,t.tagsViewList=[],t.tagsViewRoutesList=F.value,pe()},pe=async()=>{y.get("tagsViewList")&&u.value.isCacheTagsView?t.tagsViewList=await y.get("tagsViewList"):(await t.tagsViewRoutesList.map(s=>{var e;(e=s.meta)!=null&&e.isAffix&&!s.meta.isHide&&(s.url=g(s),t.tagsViewList.push({...s}),w.addCachedView(s))}),await D(m.path,m)),J(u.value.isShareTagsView?t.routePath:t.routeActive)},W=async(s,e)=>{var i,l;let a=(i=e==null?void 0:e.meta)!=null&&i.isDynamic?e.meta.isDynamicPath:s;if(t.tagsViewList.filter(n=>{var o,L;return n.path===a&&Z((o=e==null?void 0:e.meta)!=null&&o.isDynamic?n.params?n.params:null:n.query?n.query:null,(L=e==null?void 0:e.meta)!=null&&L.isDynamic?e!=null&&e.params?e==null?void 0:e.params:null:e!=null&&e.query?e==null?void 0:e.query:null)}).length<=0){let n=t.tagsViewRoutesList.find(o=>o.path===a);if(!n||n.meta.isAffix||n.meta.isLink&&!n.meta.isIframe)return!1;(l=e==null?void 0:e.meta)!=null&&l.isDynamic?n.params=e.params:n.query=e==null?void 0:e.query,n.url=g(n),t.tagsViewList.push({...n}),await w.addCachedView(n),p(t.tagsViewList)}},z=(s,e)=>{var r;let a=(r=e==null?void 0:e.meta)!=null&&r.isDynamic?e.meta.isDynamicPath:s;t.tagsViewList.forEach(i=>{var l,n,o;i.path===a&&!Z((l=e==null?void 0:e.meta)!=null&&l.isDynamic?i.params?i.params:null:i.query?i.query:null,(n=e==null?void 0:e.meta)!=null&&n.isDynamic?e!=null&&e.params?e==null?void 0:e.params:null:e!=null&&e.query?e==null?void 0:e.query:null)&&((o=e==null?void 0:e.meta)!=null&&o.isDynamic?i.params=e.params:i.query=e==null?void 0:e.query,i.url=g(i),p(t.tagsViewList))})},D=(s,e)=>{j(async()=>{var r,i,l;let a;if((r=e==null?void 0:e.meta)!=null&&r.isDynamic){if(u.value.isShareTagsView?await z(s,e):await W(s,e),t.tagsViewList.some(n=>{var o;return n.path===((o=e==null?void 0:e.meta)==null?void 0:o.isDynamicPath)}))return p(t.tagsViewList),!1;a=t.tagsViewRoutesList.find(n=>{var o;return n.path===((o=e==null?void 0:e.meta)==null?void 0:o.isDynamicPath)})}else{if(u.value.isShareTagsView?await z(s,e):await W(s,e),t.tagsViewList.some(n=>n.path===s))return p(t.tagsViewList),!1;a=t.tagsViewRoutesList.find(n=>n.path===s)}if(!a||(i=a==null?void 0:a.meta)!=null&&i.isLink&&!a.meta.isIframe)return!1;(l=e==null?void 0:e.meta)!=null&&l.isDynamic?a.params=e!=null&&e.params?e==null?void 0:e.params:m.params:a.query=e!=null&&e.query?e==null?void 0:e.query:m.query,a.url=g(a),await w.addCachedView(a),await t.tagsViewList.push({...a}),await p(t.tagsViewList)})},K=async s=>{var r;const e=decodeURI(s);let a={};if(t.tagsViewList.forEach(i=>{i.transUrl=V(i),i.transUrl?i.transUrl===V(i)&&(a=i):i.path===e&&(a=i)}),!a)return!1;await w.delCachedView(a),d.emit("onTagsViewRefreshRouterView",s),(r=a.meta)!=null&&r.isKeepAlive&&w.addCachedView(a)},A=s=>{t.tagsViewList.map((e,a,r)=>{var i;(i=e.meta)!=null&&i.isAffix||(u.value.isShareTagsView?e.path===s:e.url===s)&&(w.delCachedView(e),t.tagsViewList.splice(a,1),setTimeout(()=>{(t.tagsViewList.length===a&&u.value.isShareTagsView?t.routePath===s:t.routeActive===s)?r[r.length-1].meta.isDynamic?a!==r.length?c.push({name:r[a].name,params:r[a].params}):c.push({name:r[r.length-1].name,params:r[r.length-1].params}):a!==r.length?c.push({path:r[a].path,query:r[a].query}):c.push({path:r[r.length-1].path,query:r[r.length-1].query}):(t.tagsViewList.length!==a&&u.value.isShareTagsView?t.routePath===s:t.routeActive===s)&&(r[a].meta.isDynamic?c.push({name:r[a].name,params:r[a].params}):c.push({path:r[a].path,query:r[a].query}))},0))}),p(t.tagsViewList)},ge=s=>{y.get("tagsViewList")&&(t.tagsViewList=[],y.get("tagsViewList").map(e=>{var a;(a=e.meta)!=null&&a.isAffix&&!e.meta.isHide&&(e.url=g(e),w.delOthersCachedViews(e),t.tagsViewList.push({...e}))}),D(s,m),p(t.tagsViewList))},we=()=>{y.get("tagsViewList")&&(w.delAllCachedViews(),t.tagsViewList=[],y.get("tagsViewList").map(s=>{var e;(e=s.meta)!=null&&e.isAffix&&!s.meta.isHide&&(s.url=g(s),t.tagsViewList.push({...s}),c.push({path:t.tagsViewList[t.tagsViewList.length-1].path}))}),p(t.tagsViewList))},he=async s=>{const e=t.tagsViewList.find(a=>u.value.isShareTagsView?a.path===s:a.url===s);e.meta.isDynamic?await c.push({name:e.name,params:e.params}):await c.push({name:e.name,query:e.query}),ne.setCurrenFullscreen(!0)},G=s=>{let e={};return t.tagsViewList.forEach(a=>{a.transUrl=V(a),a.transUrl?a.transUrl===V(a)&&a.transUrl===s.commonUrl&&(e=a):a.path===decodeURI(s.path)&&(e=a)}),e||null},I=async s=>{if(s.commonUrl=V(s),!G(s))return Be({type:"warning",message:"请正确输入路径及完整参数（query、params）"});const{path:e,name:a,params:r,query:i,meta:l,url:n}=G(s);switch(s.contextMenuClickId){case 0:l.isDynamic?await c.push({name:a,params:r}):await c.push({path:e,query:i}),K(m.fullPath);break;case 1:A(u.value.isShareTagsView?e:n);break;case 2:l.isDynamic?await c.push({name:a,params:r}):await c.push({path:e,query:i}),ge(e);break;case 3:we();break;case 4:he(u.value.isShareTagsView?e:n);break}},de=(s,e)=>{const{clientX:a,clientY:r}=e;t.dropdown.x=a,t.dropdown.y=r,B.value.openContextmenu(s)},ye=(s,e)=>{var a;if(!((a=s.meta)!=null&&a.isAffix)&&e.button===1){const r=Object.assign({},{contextMenuClickId:1,...s});I(r)}},Ve=(s,e)=>{t.tagsRefsIndex=e,c.push(s),u.value.layout==="columns"&&(ce.value.find(r=>r.path.indexOf(`/${s.path.split("/")[1]}`)>-1).children?u.value.isCollapse=!1:u.value.isCollapse=!0)},V=s=>{var r,i;let e=s.query&&Object.keys(s.query).length>0?s.query:s.params;if(!e)return"";let a="";for(let[l,n]of Object.entries(e))(r=s.meta)!=null&&r.isDynamic?a+=`/${n}`:a+=`&${l}=${n}`;return(i=s.meta)!=null&&i.isDynamic?s.isFnClick?decodeURI(s.path):`${s.path.split(":")[0]}${a.replace(/^\//,"")}`:`${s.path}${a.replace(/^&/,"?")}`},g=s=>{var r;let e=s.query&&Object.keys(s.query).length>0?s.query:s.params;if(!e||Object.keys(e).length<=0)return s.path;let a="";for(let i in e)a+=e[i];return`${(r=s.meta)!=null&&r.isDynamic?s.meta.isDynamicPath:s.path}-${a}`},Le=s=>{R.value.$refs.wrapRef.scrollLeft+=s.wheelDelta/4},Ce=()=>{j(()=>{if(f.value.length<=0)return!1;let s=f.value[t.tagsRefsIndex],e=t.tagsRefsIndex,a=f.value.length,r=f.value[0],i=f.value[f.value.length-1],l=R.value.$refs.wrapRef,n=l.scrollWidth,o=l.offsetWidth,L=l.scrollLeft,U=f.value[t.tagsRefsIndex-1],Q=f.value[t.tagsRefsIndex+1],x=0,S=0;s===r?l.scrollLeft=0:s===i?l.scrollLeft=n-o:(e===0?x=r.offsetLeft-5:x=(U==null?void 0:U.offsetLeft)-5,e===a?S=i.offsetLeft+i.offsetWidth+5:S=Q.offsetLeft+Q.offsetWidth+5,S>L+o?l.scrollLeft=S-o:x<L&&(l.scrollLeft=x)),R.value.update()})},J=s=>{j(async()=>{let e=await t.tagsViewList;t.tagsRefsIndex=e.findIndex(a=>u.value.isShareTagsView?a.path===s:a.url===s),Ce()})},k=async()=>{const s=document.querySelector(".layout-navbars-tagsview-ul");if(!s)return!1;t.sortable.el&&t.sortable.destroy(),t.sortable=Ne.create(s,{animation:300,dataIdAttr:"data-url",disabled:!u.value.isSortableTagsView,onEnd:()=>{const e=[];t.sortable.toArray().map(a=>{t.tagsViewList.map(r=>{r.url===a&&e.push({...r})})}),p(e)}})},P=async()=>{await k(),Y.isMobile()&&t.sortable.el&&t.sortable.destroy()};return Se(()=>{P(),window.addEventListener("resize",P),d.on("onCurrentContextmenuClick",s=>{s.isFnClick=!0,I(s)}),d.on("openOrCloseSortable",()=>{k()}),d.on("openShareTagsView",()=>{u.value.isShareTagsView&&(c.push("/home"),t.tagsViewList=[],t.tagsViewRoutesList.map(s=>{var e;(e=s.meta)!=null&&e.isAffix&&!s.meta.isHide&&(s.url=g(s),t.tagsViewList.push({...s}))}))})}),qe(()=>{d.off("onCurrentContextmenuClick",()=>{}),d.off("openOrCloseSortable",()=>{}),d.off("openShareTagsView",()=>{}),window.removeEventListener("resize",P)}),De(()=>{f.value=[]}),Ae(()=>{H(),k()}),je(async s=>{t.routeActive=g(s),t.routePath=s.meta.isDynamic?s.meta.isDynamicPath:s.path,await D(s.path,s),J(u.value.isShareTagsView?t.routePath:t.routeActive)}),Ie(()=>F.value,s=>{if(s.length===t.tagsViewRoutesList.length)return!1;H()},{deep:!0}),(s,e)=>{const a=ee("SvgIcon"),r=ee("el-scrollbar");return h(),C("div",{class:E(["layout-navbars-tagsview",{"layout-navbars-tagsview-shadow":u.value.layout==="classic"}])},[O(r,{ref_key:"scrollbarRef",ref:R,onWheel:b(Le,["prevent"])},{default:ke(()=>[se("ul",{class:E(["layout-navbars-tagsview-ul",me.value]),ref_key:"tagsUlRef",ref:re},[(h(!0),C(ae,null,Pe(t.tagsViewList,(i,l)=>(h(),C("li",{key:l,class:E(["layout-navbars-tagsview-ul-li",{"is-active":_(i)}]),"data-url":i.url,onContextmenu:b(n=>de(i,n),["prevent"]),onMousedown:n=>ye(i,n),onClick:n=>Ve(i,l),ref_for:!0,ref:n=>{n&&(f.value[l]=n)}},[_(i)?(h(),C("i",He)):T("",!0),!_(i)&&u.value.isTagsviewIcon?(h(),M(a,{key:1,name:i.meta.icon,class:"pr5"},null,8,["name"])):T("",!0),se("span",null,Ue(fe.value(i)),1),_(i)?(h(),C(ae,{key:2},[O(a,{name:"ele-RefreshRight",class:"ml5 layout-navbars-tagsview-ul-li-refresh",onClick:e[0]||(e[0]=b(n=>K(s.$route.fullPath),["stop"]))}),i.meta.isAffix?T("",!0):(h(),M(a,{key:0,name:"ele-Close",class:"layout-navbars-tagsview-ul-li-icon layout-icon-active",onClick:b(n=>A(u.value.isShareTagsView?i.path:i.url),["stop"])},null,8,["onClick"]))],64)):T("",!0),i.meta.isAffix?T("",!0):(h(),M(a,{key:3,name:"ele-Close",class:"layout-navbars-tagsview-ul-li-icon layout-icon-three",onClick:b(n=>A(u.value.isShareTagsView?i.path:i.url),["stop"])},null,8,["onClick"]))],42,Fe))),128))],2)]),_:1},512),O($e(ie),{dropdown:t.dropdown,ref_key:"contextmenuRef",ref:B,onCurrentContextmenuClick:I},null,8,["dropdown"])],2)}}});const Ps=ve(ze,[["__scopeId","data-v-eac8b2d0"]]);export{Ps as default};