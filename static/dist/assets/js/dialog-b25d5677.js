import{F as S}from"./index-4031c8a8.js";import{u as g}from"./index-bbfdc41d.js";import{d as D,_ as V,b as p,i as M,ag as n,o as N,O as z,P as t,a as d,V as i,U as y,T as _,n as B}from"./@vue-859b4330.js";import"./index-85c2db4d.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./_plugin-vue_export-helper-c27b6911.js";const J=[{label:"租户名称",key:"name",type:"input",rule:!0,isrow:!1},{label:"数据库名",key:"schema_name",type:"input",rule:!0,isrow:!1},{label:"联系人",key:"contact_person",type:"input",rule:!1,isrow:!1},{label:"联系电话",key:"contact_phone",type:"input",rule:!1,isrow:!1},{label:"联系邮箱",key:"contact_email",type:"input",rule:!1,isrow:!1},{label:"过期时间",key:"expire_date",type:"datetime",rule:!1,isrow:!1},{label:"域名",key:"test",type:"input",rule:!0,isrow:!1},{label:"状态",key:"status",type:"radio",value:0,disabled:!1,isrow:!1,options:[{label:"启用",value:1},{label:"禁用",value:0}]},{label:"备注",key:"remark",type:"textarea",rule:!1,isrow:!0}],O={style:{color:"#fff"}},E={class:"dialog-footer"},Te=D({__name:"dialog",emits:["handleQuery","TenanthandleClose"],setup(I,{expose:b,emit:h}){const e=V({formModels:J,ruleForm:{status:1,domains:[],test:""},dialog:{isShowDialog:!1,type:"",title:"",submitTxt:""}}),u=p(""),c=p(),f=p(),m=h,w=(r,o)=>{e.dialog.isShowDialog=!0,u.value=r,r==="add"?(e.dialog.title="新增租户",e.dialog.submitTxt="新 增"):(f.value=o.id,B(()=>{e.ruleForm=JSON.parse(JSON.stringify(o)),e.ruleForm.test=e.ruleForm.domains[0].domain}),e.dialog.title=`修改租户【${o.name}】`,e.dialog.submitTxt="修 改")},F=()=>{setTimeout(()=>{m("handleQuery"),m("TenanthandleClose")},500),e.dialog.isShowDialog=!1},k=()=>{e.dialog.isShowDialog=!1},x=()=>{setTimeout(()=>{m("TenanthandleClose")},500)},T=async()=>{var o;if(await((o=c.value)==null?void 0:o.validateJbxx())){if(u.value==="edit"){const a={domain:e.ruleForm.test};e.ruleForm.domains=[],e.ruleForm.domains.push(a);const l=e.ruleForm,s=f.value;await g().editTenant(l,s)}else{const a={domain:e.ruleForm.test};e.ruleForm.domains.push(a);const l=e.ruleForm;await g().addTenant(l)}F()}};return M(async()=>{}),b({openDialog:w}),(r,o)=>{const a=n("ele-Edit"),l=n("el-icon"),s=n("el-button"),v=n("el-dialog");return N(),z(v,{modelValue:e.dialog.isShowDialog,"onUpdate:modelValue":o[0]||(o[0]=C=>e.dialog.isShowDialog=C),draggable:"",width:"769px",onClose:x},{header:t(()=>[d("div",O,[i(l,{size:"16",style:{"margin-right":"3px",display:"inline","vertical-align":"middle"}},{default:t(()=>[i(a)]),_:1}),d("span",null,y(e.dialog.title),1)])]),footer:t(()=>[d("span",E,[i(s,{onClick:k,size:"default"},{default:t(()=>[_("取 消")]),_:1}),i(s,{type:"primary",onClick:T,size:"default"},{default:t(()=>[_(y(e.dialog.submitTxt),1)]),_:1})])]),default:t(()=>[i(S,{formModels:e.formModels,ruleForm:e.ruleForm,ref_key:"myFormRef",ref:c},null,8,["formModels","ruleForm"])]),_:1},8,["modelValue"])}}});export{Te as default};