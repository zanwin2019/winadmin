import{b as C,u as I,e as v,S as P,_ as B}from"./index-21d73ac4.js";import{d as V,_ as x,j as u,G as E,n as h,i as D,Z as O,e as S,ag as b,o as p,c as M,V as s,P as l,X as _,O as d,Q as w,W as R,R as Q,aB as U,u as j,aQ as G}from"./@vue-859b4330.js";import{u as W,b as X}from"./vue-router-0ce8cd6d.js";import{s as y}from"./pinia-f5c09375.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";const Z={class:"layout-parent"},q=V({name:"layoutParentView"}),Be=V({...q,setup(z){const g=G(()=>B(()=>import("./iframes-09d949ea.js"),["assets/js/iframes-09d949ea.js","assets/js/@vue-859b4330.js","assets/js/vue-router-0ce8cd6d.js"])),o=W(),K=X(),A=C(),L=I(),{keepAliveNames:a,cachedViews:f}=y(A),{themeConfig:m}=y(L),e=x({refreshRouterViewKey:"",iframeRefreshKey:"",keepAliveNameList:[],iframeList:[]}),n=u(()=>m.value.animation),T=u(()=>m.value.isTagsview?f.value:e.keepAliveNameList),c=u(()=>o.meta.isIframe),k=async()=>{K.getRoutes().forEach(t=>{t.meta.isIframe&&(t.meta.isIframeOpen=!1,t.meta.loading=!0,e.iframeList.push({...t}))})};return E(()=>{e.keepAliveNameList=a.value,v.on("onTagsViewRefreshRouterView",t=>{e.keepAliveNameList=a.value.filter(i=>o.name!==i),e.refreshRouterViewKey="",e.iframeRefreshKey="",h(()=>{e.refreshRouterViewKey=t,e.iframeRefreshKey=t,e.keepAliveNameList=a.value})})}),D(()=>{k(),h(()=>{setTimeout(()=>{if(m.value.isCacheTagsView){let t=P.get("tagsViewList")||[];f.value=t.filter(i=>{var r;return(r=i.meta)==null?void 0:r.isKeepAlive}).map(i=>i.name)}},0)})}),O(()=>{v.off("onTagsViewRefreshRouterView",()=>{})}),S(()=>o.fullPath,()=>{e.refreshRouterViewKey=decodeURI(o.fullPath)},{immediate:!0}),(t,i)=>{const r=b("router-view");return p(),M("div",Z,[s(r,null,{default:l(({Component:N})=>[s(_,{name:n.value,mode:"out-in"},{default:l(()=>[(p(),d(U,{include:T.value},[w((p(),d(Q(N),{key:e.refreshRouterViewKey,class:"w100"})),[[R,!c.value]])],1032,["include"]))]),_:2},1032,["name"])]),_:1}),s(_,{name:n.value,mode:"out-in"},{default:l(()=>[w(s(j(g),{class:"w100",refreshKey:e.iframeRefreshKey,name:n.value,list:e.iframeList},null,8,["refreshKey","name","list"]),[[R,c.value]])]),_:1},8,["name"])])}}});export{Be as default};