import{u as U,b as V,o as j}from"./vue-router-0ce8cd6d.js";import{s as H}from"./pinia-f5c09375.js";import{O as z,u as E,e as r}from"./index-85c2db4d.js";import{d as x,b as k,_ as J,i as W,Z,e as q,ag as O,o as m,c as d,V as S,P as G,a as c,F as K,a8 as Q,J as _,u as p,U as R,n as X}from"./@vue-859b4330.js";import{_ as Y}from"./_plugin-vue_export-helper-c27b6911.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";const ee={class:"layout-columns-aside"},te=["onClick","onMouseenter","title"],se={class:"columns-vertical-title font12"},oe=["href"],ne={class:"columns-vertical-title font12"},le=x({name:"layoutColumnsAside"}),ie=x({...le,setup(re){const g=k([]),I=k(),f=z(),D=E(),{routesList:b,isColumnsMenuHover:v,isColumnsNavHover:A}=H(f),{themeConfig:l}=H(D),y=U(),M=V(),o=J({columnsAsideList:[],liIndex:0,liOldIndex:null,liHoverIndex:null,liOldPath:null,difference:0,routeSplit:[]}),P=e=>{if(e===void 0)return!1;o.liIndex=e,I.value.style.top=`${g.value[e].offsetTop+o.difference}px`},T=async e=>{var i;let{path:t,redirect:n}=e;if(n)h(e.k),y.path.startsWith(n)?r.emit("setSendColumnsChildren",a(n)):M.push(n);else if(!e.children)M.push(t);else{const s=a(t);if(Object.keys(s).length<=0)return!1;h((i=s.item)==null?void 0:i.k),r.emit("setSendColumnsChildren",s)}e.children?e.children.length>1&&(l.value.isCollapse=!1):l.value.isCollapse=!0},F=(e,t)=>{if(!l.value.isColumnsMenuHoverPreload)return!1;let{path:n}=e;o.liOldPath=n,o.liOldIndex=t,o.liHoverIndex=t,r.emit("setSendColumnsChildren",a(n)),f.setColumnsMenuHover(!1),f.setColumnsNavHover(!0)},N=async()=>{if(!l.value.isColumnsMenuHoverPreload)return!1;await f.setColumnsNavHover(!1),setTimeout(()=>{!v&&!A&&r.emit("restoreDefault")},100)},h=e=>{X(()=>{P(e)})},L=e=>{const t=a(e);return t.children.length<=1?l.value.isCollapse=!0:l.value.isCollapse=!1,t},w=()=>{var t;o.columnsAsideList=$(b.value);const e=L(y.path);h((t=e.item)==null?void 0:t.k),setTimeout(()=>{r.emit("setSendColumnsChildren",e)},500)},a=e=>{const t=e.split("/");let n={children:[]};return o.columnsAsideList.map((i,s)=>{i.path===`/${t[1]}`&&(i.k=s,n.item={...i},n.children=[{...i}],i.children&&(n.children=i.children))}),n},$=e=>e.filter(t=>{var n;return!((n=t.meta)!=null&&n.isHide)}).map(t=>(t=Object.assign({},t),t.children&&(t.children=$(t.children)),t)),B=e=>{o.routeSplit=e.split("/"),o.routeSplit.shift();const t=`/${o.routeSplit[0]}`,n=o.columnsAsideList.find(i=>i.path===t);if(!n)return!1;setTimeout(()=>{h(n.k)},0)};return W(()=>{w(),r.on("restoreDefault",()=>{o.liOldIndex=null,o.liOldPath=null})}),Z(()=>{r.off("restoreDefault",()=>{})}),j(e=>{const t=L(e.path);B(e.path),r.emit("setSendColumnsChildren",t)}),q([()=>l.value.columnsAsideStyle,v,A],()=>{if(l.value.columnsAsideStyle==="columnsRound"?o.difference=3:o.difference=0,!v.value&&!A.value)o.liHoverIndex=null,r.emit("setSendColumnsChildren",a(y.path));else{if(o.liHoverIndex=o.liOldIndex,!o.liOldPath)return!1;r.emit("setSendColumnsChildren",a(o.liOldPath))}},{deep:!0}),(e,t)=>{const n=O("SvgIcon"),i=O("el-scrollbar");return m(),d("div",ee,[S(i,null,{default:G(()=>[c("ul",{onMouseleave:t[0]||(t[0]=s=>N())},[(m(!0),d(K,null,Q(o.columnsAsideList,(s,u)=>(m(),d("li",{key:u,onClick:C=>T(s),onMouseenter:C=>F(s,u),ref_for:!0,ref:C=>{C&&(g.value[u]=C)},class:_({"layout-columns-active":o.liIndex===u,"layout-columns-hover":o.liHoverIndex===u}),title:e.$t(s.meta.title)},[!s.meta.isLink||s.meta.isLink&&s.meta.isIframe?(m(),d("div",{key:0,class:_(p(l).columnsAsideLayout)},[S(n,{name:s.meta.icon},null,8,["name"]),c("div",se,R(e.$t(s.meta.title)&&e.$t(s.meta.title).length>=4?e.$t(s.meta.title).substr(0,p(l).columnsAsideLayout==="columns-vertical"?4:3):e.$t(s.meta.title)),1)],2)):(m(),d("div",{key:1,class:_(p(l).columnsAsideLayout)},[c("a",{href:s.meta.isLink,target:"_blank"},[S(n,{name:s.meta.icon},null,8,["name"]),c("div",ne,R(e.$t(s.meta.title)&&e.$t(s.meta.title).length>=4?e.$t(s.meta.title).substr(0,p(l).columnsAsideLayout==="columns-vertical"?4:3):e.$t(s.meta.title)),1)],8,oe)],2))],42,te))),128)),c("div",{ref_key:"columnsAsideActiveRef",ref:I,class:_(p(l).columnsAsideStyle)},null,2)],32)]),_:1})])}}});const We=Y(ie,[["__scopeId","data-v-a17d115d"]]);export{We as default};
