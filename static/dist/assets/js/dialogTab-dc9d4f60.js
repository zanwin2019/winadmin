import{F as J}from"./index-3c0ce5e1.js";import{a as b}from"./index-f461de49.js";import{d as V,_ as M,$ as P,b as p,i as z,ag as r,o as B,O as R,P as i,a as d,V as l,U as y,T as _,n as T}from"./@vue-859b4330.js";import"./index-fa427f68.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./_plugin-vue_export-helper-c27b6911.js";const E=[{label:"上级配置",key:"pid",type:"cascader",value:0,isrow:!0,props:{checkStrictly:!0,emitPath:!1,value:"id",label:"title",children:"children"},options:[]},{label:"配置名称",key:"title",type:"input",rule:!0,isrow:!1},{label:"配置编码",key:"code",type:"input",rule:!0,isrow:!1},{label:"类型",key:"type",type:"input",rule:!0,isrow:!1},{label:"排序",key:"sort",type:"number",rule:!1,isrow:!1},{label:"状态",key:"status",type:"radio",value:0,disabled:!1,isrow:!1,options:[{label:"启用",value:1},{label:"禁用",value:0}]},{label:"是否显示",key:"is_display",type:"radio",value:0,disabled:!1,isrow:!1,options:[{label:"启用",value:1},{label:"禁用",value:0}]}],I={style:{color:"#fff"}},L={class:"dialog-footer"},Fe=V({__name:"dialogTab",props:{menuListTab:Object},emits:["handleQueryTab","ConfighandleCloseTab","initTreeDataTab"],setup(h,{expose:v,emit:C}){const e=M({formModels:E,ruleForm:{pid:"0",title:"",code:"",status:1,is_display:1,icon:"",type:"",sort:"0"},dialog:{isShowDialog:!1,type:"",title:"",submitTxt:""}}),m=h;P(m);const u=p(""),f=p(),c=p(),s=C,k=()=>{var t=e.formModels.filter(a=>a.options);for(var o of t)o.key==="pid"&&(o.options=JSON.parse(JSON.stringify(m.menuListTab)))},w=(t,o)=>{e.dialog.isShowDialog=!0,k(),u.value=t,t==="add"?(e.dialog.title="新增配置",e.dialog.submitTxt="新 增"):t==="addPid"?(e.dialog.title="新增配置",e.dialog.submitTxt="新 增",T(()=>{e.ruleForm.pid=JSON.parse(JSON.stringify(o.id))})):(c.value=o.id,T(()=>{e.ruleForm=JSON.parse(JSON.stringify(o))}),e.dialog.title=`修改配置【${o.title}】`,e.dialog.submitTxt="修 改")},x=()=>{setTimeout(()=>{s("handleQueryTab"),s("ConfighandleCloseTab"),s("initTreeDataTab")},500),e.dialog.isShowDialog=!1},S=()=>{e.dialog.isShowDialog=!1},F=()=>{setTimeout(()=>{s("ConfighandleCloseTab")},500)},D=async()=>{var o;if(await((o=f.value)==null?void 0:o.validateJbxx())){if(u.value==="edit"){const a=e.ruleForm,n=c.value;await b().editConfigtab(a,n)}else await b().addConfigtab(e.ruleForm);x()}};return z(async()=>{}),v({openDialog:w}),(t,o)=>{const a=r("ele-Edit"),n=r("el-icon"),g=r("el-button"),N=r("el-dialog");return B(),R(N,{modelValue:e.dialog.isShowDialog,"onUpdate:modelValue":o[0]||(o[0]=O=>e.dialog.isShowDialog=O),draggable:"",width:"769px",onClose:F},{header:i(()=>[d("div",I,[l(n,{size:"16",style:{"margin-right":"3px",display:"inline","vertical-align":"middle"}},{default:i(()=>[l(a)]),_:1}),d("span",null,y(e.dialog.title),1)])]),footer:i(()=>[d("span",L,[l(g,{onClick:S,size:"default"},{default:i(()=>[_("取 消")]),_:1}),l(g,{type:"primary",onClick:D,size:"default"},{default:i(()=>[_(y(e.dialog.submitTxt),1)]),_:1})])]),default:i(()=>[l(J,{formModels:e.formModels,ruleForm:e.ruleForm,ref_key:"myFormRef",ref:f},null,8,["formModels","ruleForm"])]),_:1},8,["modelValue"])}}});export{Fe as default};