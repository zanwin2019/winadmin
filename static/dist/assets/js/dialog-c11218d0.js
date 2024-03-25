import{F as J}from"./index-3c0ce5e1.js";import{u as y}from"./index-f461de49.js";import{d as V,_ as M,$ as z,b as p,i as B,ag as r,o as R,O as E,P as a,a as u,V as s,U as g,T as v,n as _}from"./@vue-859b4330.js";import"./index-fa427f68.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./_plugin-vue_export-helper-c27b6911.js";const I=[{label:"字段key",key:"key",type:"input",rule:!0,isrow:!1},{label:"字段名称",key:"label",type:"input",rule:!0,isrow:!1},{label:"字段类型",key:"type",type:"select",rule:!0,isrow:!1,value:0,options:[{label:"单行文本",value:"input"},{label:"文本域",value:"textarea"},{label:"密码框",value:"password"},{label:"数字",value:"number"},{label:"下拉选择",value:"select"},{label:"级联选择",value:"cascader"},{label:"开关",value:"switch"},{label:"单选框",value:"radio"},{label:"多选框",value:"checkbox"},{label:"日期",value:"date"},{label:"时间",value:"time"},{label:"日期时间",value:"datetime"},{label:"日期区间",value:"date-to-date"},{label:"时间区间",value:"time-to-time"},{label:"日期时间区间",value:"datetime-to-datetime"}]},{label:"是否必填",key:"rule",type:"radio",value:0,disabled:!1,isrow:!1,options:[{label:"是",value:!0},{label:"否",value:!1}]},{label:"可选项",key:"options",type:"textarea",rule:!1,isrow:!0},{label:"配置名称",key:"info",type:"input",rule:!1,isrow:!1},{label:"文件格式",key:"upload_type",type:"input",rule:!1,isrow:!1},{label:"宽",key:"width",type:"input",rule:!0,isrow:!1},{label:"高",key:"height",type:"input",rule:!0,isrow:!1},{label:"值",key:"value",type:"input",rule:!1,isrow:!1},{label:"排序",key:"sort",type:"number",rule:!1,isrow:!1},{label:"是否整行",key:"isrow",type:"radio",disabled:!1,isrow:!1,options:[{label:"是",value:!0},{label:"否",value:!1}]},{label:"是否禁用",key:"disabled",type:"radio",disabled:!1,isrow:!1,options:[{label:"是",value:!0},{label:"否",value:!1}]},{label:"配置简介",key:"desc",type:"textarea",rule:!1,isrow:!0}],L={style:{color:"#fff"}},P={class:"dialog-footer"},Ne=V({__name:"dialog",props:{menuList:Object},emits:["handleQuery","ConfighandleClose"],setup(h,{expose:w,emit:k}){const e=M({formModels:I,ruleForm:{key:"",name:"",type:"",options:"",rule:!0,width:"",height:"",value:"",info:"",sort:"",desc:"",isrow:!1,disabled:!1,config_tab_id:""},dialog:{isShowDialog:!1,type:"",title:"",submitTxt:""}}),m=h;z(m);const d=p(""),f=p(),c=p(),n=k,x=()=>{var o=e.formModels.filter(t=>t.options);for(var l of o)l.key==="pid"&&(l.options=JSON.parse(JSON.stringify(m.menuList)))},C=(o,l)=>{console.log("99156",l),e.dialog.isShowDialog=!0,x(),d.value=o,o==="add"?(e.dialog.title="新增配置",e.dialog.submitTxt="新 增",_(()=>{e.ruleForm.config_tab_id=JSON.parse(JSON.stringify(l))})):(c.value=l.id,_(()=>{e.ruleForm=JSON.parse(JSON.stringify(l)),e.ruleForm.options=e.ruleForm.options==""?"":JSON.stringify(l.options)}),e.dialog.title=`修改配置【${l.label}】`,e.dialog.submitTxt="修 改")},F=()=>{setTimeout(()=>{n("handleQuery"),n("ConfighandleClose")},500),e.dialog.isShowDialog=!1},S=()=>{e.dialog.isShowDialog=!1},N=()=>{setTimeout(()=>{n("ConfighandleClose")},500)},O=async()=>{var t;if(await((t=f.value)==null?void 0:t.validateJbxx())){if(e.ruleForm.options){const i={options:JSON.parse(e.ruleForm.options)};var l={...e.ruleForm,...i}}else var l=e.ruleForm;if(d.value==="edit"){const i=c.value;await y().editConfig(l,i)}else await y().addConfig(l);F()}};return B(async()=>{}),w({openDialog:C}),(o,l)=>{const t=r("ele-Edit"),i=r("el-icon"),b=r("el-button"),T=r("el-dialog");return R(),E(T,{modelValue:e.dialog.isShowDialog,"onUpdate:modelValue":l[0]||(l[0]=D=>e.dialog.isShowDialog=D),draggable:"",width:"769px",onClose:N},{header:a(()=>[u("div",L,[s(i,{size:"16",style:{"margin-right":"3px",display:"inline","vertical-align":"middle"}},{default:a(()=>[s(t)]),_:1}),u("span",null,g(e.dialog.title),1)])]),footer:a(()=>[u("span",P,[s(b,{onClick:S,size:"default"},{default:a(()=>[v("取 消")]),_:1}),s(b,{type:"primary",onClick:O,size:"default"},{default:a(()=>[v(g(e.dialog.submitTxt),1)]),_:1})])]),default:a(()=>[s(J,{formModels:e.formModels,ruleForm:e.ruleForm,ref_key:"myFormRef",ref:f},null,8,["formModels","ruleForm"])]),_:1},8,["modelValue"])}}});export{Ne as default};