import{F as J}from"./index-440886be.js";import{u as _}from"./index-78922694.js";import{u as V}from"./index-9983061a.js";import{d as L,_ as M,$ as U,b as p,i as z,ag as n,o as B,O as P,P as l,a as m,V as r,U as h,T as b,n as R}from"./@vue-859b4330.js";import"./index-21d73ac4.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./_plugin-vue_export-helper-c27b6911.js";const A=[{label:"上级部门",key:"parent_id",type:"cascader",value:0,isrow:!0,props:{checkStrictly:!0,emitPath:!1,value:"id",label:"name",children:"children"},options:[]},{label:"部门名称",key:"name",type:"input",rule:!0,isrow:!1},{label:"负责人",key:"leader",type:"select",rule:!1,isrow:!1,value:0,options:[]},{label:"排序",key:"sort",type:"number",rule:!1,isrow:!1},{label:"状态",key:"status",type:"radio",value:0,disabled:!1,isrow:!1,options:[{label:"启用",value:1},{label:"禁用",value:0}]},{label:"描述",key:"desc",type:"textarea",rule:!1,isrow:!0}],E={style:{color:"#fff"}},I={class:"dialog-footer"},Oe=L({__name:"dialog",props:{menuList:Object},emits:["handleQuery","DepthandleClose","initTreeData"],setup(v,{expose:D,emit:w}){const e=M({formModels:A,ruleForm:{parent_id:"0",name:"",leader:"",status:1,sort:0,desc:""},dialog:{isShowDialog:!1,type:"",title:"",submitTxt:""},leaderList:[]}),d=v;U(d);const u=p(""),c=p(),f=p(),s=w,g=()=>{var o=e.formModels.filter(a=>a.options);for(var t of o)if(t.key==="parent_id"&&(t.options=JSON.parse(JSON.stringify(d.menuList))),t.key==="leader"){const a=JSON.parse(JSON.stringify(e.leaderList)).map(i=>({value:i.id,label:i.chname}));t.options=a}},k=async()=>{await V().getUser().then(o=>{e.leaderList=o.data,g()})},x=(o,t)=>{e.dialog.isShowDialog=!0,k(),g(),u.value=o,o==="add"?(e.dialog.title="新增部门",e.dialog.submitTxt="新 增"):(f.value=t.id,R(()=>{e.ruleForm=JSON.parse(JSON.stringify(t))}),e.dialog.title=`修改部门【${t.name}】`,e.dialog.submitTxt="修 改")},S=()=>{setTimeout(()=>{s("handleQuery"),s("DepthandleClose"),s("initTreeData")},500),e.dialog.isShowDialog=!1},T=()=>{e.dialog.isShowDialog=!1},C=()=>{setTimeout(()=>{s("DepthandleClose")},500)},F=async()=>{var t;if(await((t=c.value)==null?void 0:t.validateJbxx())){if(u.value==="edit"){const a=e.ruleForm,i=f.value;await _().editDept(a,i)}else await _().addDept(e.ruleForm);S()}};return z(async()=>{}),D({openDialog:x}),(o,t)=>{const a=n("ele-Edit"),i=n("el-icon"),y=n("el-button"),N=n("el-dialog");return B(),P(N,{modelValue:e.dialog.isShowDialog,"onUpdate:modelValue":t[0]||(t[0]=O=>e.dialog.isShowDialog=O),draggable:"",width:"769px",onClose:C},{header:l(()=>[m("div",E,[r(i,{size:"16",style:{"margin-right":"3px",display:"inline","vertical-align":"middle"}},{default:l(()=>[r(a)]),_:1}),m("span",null,h(e.dialog.title),1)])]),footer:l(()=>[m("span",I,[r(y,{onClick:T,size:"default"},{default:l(()=>[b("取 消")]),_:1}),r(y,{type:"primary",onClick:F,size:"default"},{default:l(()=>[b(h(e.dialog.submitTxt),1)]),_:1})])]),default:l(()=>[r(J,{formModels:e.formModels,ruleForm:e.ruleForm,ref_key:"myFormRef",ref:c},null,8,["formModels","ruleForm"])]),_:1},8,["modelValue"])}}});export{Oe as default};
