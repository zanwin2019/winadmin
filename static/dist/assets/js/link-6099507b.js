import{u as c}from"./vue-router-0ce8cd6d.js";import{c as l}from"./index-85c2db4d.js";import{d as p,_,e as d,ag as u,o as f,c as k,a as o,U as h,V as v,P as w,bi as y,bg as g}from"./@vue-859b4330.js";import{_ as b}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-f5c09375.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";const n=i=>(y("data-v-aed8fb0e"),i=i(),g(),i),L={class:"layout-padding layout-link-container"},x={class:"layout-padding-auto layout-padding-view"},C={class:"layout-link-warp"},I=n(()=>o("i",{class:"layout-link-icon iconfont icon-xingqiu"},null,-1)),S={class:"layout-link-msg"},V=n(()=>o("i",{class:"iconfont icon-lianjie"},null,-1)),$=n(()=>o("span",null,"立即前往体验",-1)),B=p({name:"layoutLinkView"}),N=p({...B,setup(i){const e=c(),t=_({title:"",isLink:""}),r=()=>{const{origin:s,pathname:a}=window.location;l(t.isLink)?window.open(t.isLink):window.open(`${s}${a}#${t.isLink}`)};return d(()=>e.path,()=>{t.title=e.meta.title,t.isLink=e.meta.isLink},{immediate:!0}),(s,a)=>{const m=u("el-button");return f(),k("div",L,[o("div",x,[o("div",C,[I,o("div",S,'页面 "'+h(s.$t(t.title))+'" 已在新窗口中打开',1),v(m,{class:"mt30",round:"",size:"default",onClick:r},{default:w(()=>[V,$]),_:1})])])])}}});const kt=b(N,[["__scopeId","data-v-aed8fb0e"]]);export{kt as default};
