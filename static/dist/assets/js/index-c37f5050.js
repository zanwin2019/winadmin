import{a as T}from"./index-55e8ed20.js";import{s as V}from"./index-85c2db4d.js";import{F}from"./index-4031c8a8.js";import{a as z}from"./element-plus-9b914f77.js";import{d as M,_ as E,b as w,i as S,ag as f,o as s,c as m,O as u,P as n,F as C,a8 as x,S as _,a as A,V as d,T as p}from"./@vue-859b4330.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";function N(){return{saveGlobal:y=>V({url:"/api/system/config/save_configs/",method:"POST",data:y})}}const G={class:"system-menu-container layout-padding",style:{display:"flex"}},I={key:0,class:"footer"},L={key:1},P={key:0,class:"footer"},R=M({name:"systemPost"}),j=M({...R,setup(y){const t=E({dialogVisible:!1,dialogVisibleTab:!1,menuList:[],menuListTab:[],SeachTabData:"",operate:!1,operateId:"",tabId:"",tabs:[],formModels:[],ruleForm:{},childdata:{},tabs:!0}),h=w(),b=()=>{T().getConfigtab().then(l=>{t.tabs=l.data,g()})},g=(l,c)=>{if(l)var o=c.target.getAttribute("id").split("-")[1];else var o=0;if(t.tabs[o].children)t.childdata=t.tabs[o].children,v();else{var a=[];t.tabs[o].configs.forEach(function(e){if(e.type==="checkbox"){const r=[...e.value];a.push({key:e.key,value:r})}else a.push({key:e.key,value:e.value})});let i={};a.forEach(e=>{i[e.key]=e.value}),t.ruleForm=i}},v=(l,c)=>{if(l)var o=c.target.getAttribute("id").split("-")[1];else var o=0;var a=[];t.childdata[o].configs.forEach(function(e){if(e.type==="checkbox"){const r=[...e.value];a.push({key:e.key,value:r})}else a.push({key:e.key,value:e.value})});let i={};a.forEach(e=>{i[e.key]=e.value}),t.ruleForm=i},k=async l=>{const c={config_tab_id:l,configs:t.ruleForm};await N().saveGlobal(c),z.success("提交成功"),b(),t.tabs=!1,setTimeout(()=>{t.tabs=!0},100)};return S(async()=>{b()}),(l,c)=>{const o=f("el-button"),a=f("el-tab-pane"),i=f("el-tabs");return s(),m("div",G,[t.tabs?(s(),u(i,{key:0,type:"border-card",size:"large",onTabClick:g,class:"table-demo-padding layout-padding-view"},{default:n(()=>[(s(!0),m(C,null,x(t.tabs,e=>(s(),u(a,{label:e.title,key:e.code},{default:n(()=>[e.children?(s(),u(i,{key:0,size:"small",onTabClick:v},{default:n(()=>[(s(!0),m(C,null,x(e.children,r=>(s(),u(a,{label:r.title,key:r.code},{default:n(()=>[A("div",null,[d(F,{formModels:r.configs,ruleForm:t.ruleForm,ref_for:!0,ref_key:"myFormRef",ref:h,style:{width:"60%",margin:"auto"}},null,8,["formModels","ruleForm"]),r.configs.length?(s(),m("div",I,[d(o,{size:"default"},{default:n(()=>[p("取 消")]),_:1}),d(o,{type:"primary",onClick:O=>k(r.id),size:"default"},{default:n(()=>[p("提交")]),_:2},1032,["onClick"])])):_("",!0)])]),_:2},1032,["label"]))),128))]),_:2},1024)):(s(),m("div",L,[d(F,{formModels:e.configs,ruleForm:t.ruleForm,ref_for:!0,ref_key:"myFormRef",ref:h,style:{width:"60%",margin:"auto"}},null,8,["formModels","ruleForm"]),e.configs.length?(s(),m("div",P,[d(o,{size:"default"},{default:n(()=>[p("取 消")]),_:1}),d(o,{type:"primary",onClick:r=>k(e.id),size:"default"},{default:n(()=>[p("提交")]),_:2},1032,["onClick"])])):_("",!0)]))]),_:2},1032,["label"]))),128))]),_:1})):_("",!0)])}}});const ze=B(j,[["__scopeId","data-v-5b74421f"]]);export{ze as default};
