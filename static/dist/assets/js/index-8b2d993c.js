import{_ as d}from"./index-fa427f68.js";import{u as v}from"./index-c94d958e.js";import{E as Q,a as z}from"./element-plus-9b914f77.js";import{d as T,b as h,_ as F,i as H,ag as s,o as c,c as j,V as n,P as a,u as p,L as k,a as q,O as _,T as m,S as g,aQ as u}from"./@vue-859b4330.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";const J={data:[],header:[{key:"id",colWidth:"",align:"center",title:"ID",type:"text",isCheck:!0},{key:"name",colWidth:"",align:"center",title:"租户名称",type:"text",isCheck:!0},{key:"status",colWidth:"",align:"center",title:"状态",type:"text",isCheck:!0,slot:"statusSlot"},{key:"contact_person",colWidth:"",align:"center",title:"联系人",type:"text",isCheck:!0},{key:"contact_phone",colWidth:"",align:"center",title:"联系电话",type:"text",isCheck:!0},{key:"contact_email",colWidth:"",align:"center",title:"联系邮箱",type:"text",isCheck:!0},{key:"created_at",colWidth:"180",align:"center",title:"创建时间",type:"text",isCheck:!0},{key:"expire_date",colWidth:"180",align:"center",title:"过期时间",type:"text",isCheck:!0},{key:"remark",colWidth:"",align:"center",title:"备注",type:"text",isCheck:!0},{key:"operate",colWidth:"200",align:"center",title:"操作",type:"text",isCheck:!0,slot:"operateSlot",fixed:"right"}],config:{total:0,loading:!0,isBorder:!0,isSerialNo:!1,isSelection:!1,isOperate:!1,isPage:!0,isSetup:!0},param:{page:1,page_size:10},printName:"winadmin 表格打印演示"},K={search:[{label:"租户名称",prop:"name",placeholder:"请输入租户名称",required:!1,type:"input"}]},U={config:{isadd:!0,isexport:!1,isdownload:!1}},X={class:"system-menu-container layout-padding",style:{display:"flex"}},Y={style:{"margin-top":"8px"},class:"table-demo-padding layout-padding-view layout-padding-auto"},Z=T({name:"platformTenant"}),ee=T({...Z,setup(te){const w=u(()=>d(()=>import("./index-a7149817.js"),["assets/js/index-a7149817.js","assets/js/print-js-c817564d.js","assets/js/@intlify-d9393dcf.js","assets/js/js-table2excel-2aecd212.js","assets/js/sortablejs-85e2743d.js","assets/js/pinia-f5c09375.js","assets/js/@vue-859b4330.js","assets/js/index-fa427f68.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-24abc00a.css"])),V=u(()=>d(()=>import("./dialog-64933aba.js"),["assets/js/dialog-64933aba.js","assets/js/index-3c0ce5e1.js","assets/js/index-fa427f68.js","assets/js/@vue-859b4330.js","assets/js/pinia-f5c09375.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/@intlify-d9393dcf.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-f24d9663.css","assets/js/index-c94d958e.js"])),E=u(()=>d(()=>import("./dialogPer-fcec5a3c.js"),["assets/js/dialogPer-fcec5a3c.js","assets/js/index-c94d958e.js","assets/js/index-fa427f68.js","assets/js/@vue-859b4330.js","assets/js/pinia-f5c09375.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/@intlify-d9393dcf.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/index-21d650ff.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/dialogPer-a32bc54f.css"])),P=u(()=>d(()=>import("./index-4b7e1185.js"),["assets/js/index-4b7e1185.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-6717164e.css"])),O=u(()=>d(()=>import("./index-8ddee447.js"),["assets/js/index-8ddee447.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-20863ba9.css"])),y=h(),b=h(),e=F({searchData:K,buttonData:U,tableData:J,dialogVisible:!1,dialogVisible2:!1}),x=h(""),B=t=>{x.value=t,e.tableData.param=x,r()},r=t=>{if(e.tableData.config.loading=!0,t)var o=Object.assign(t,e.tableData.param);else var o=e.tableData.param;v().getTenant(o).then(l=>{e.tableData.data=l.data.items,e.tableData.config.total=l.data.count}).finally(()=>{e.tableData.config.loading=!1})},R=t=>{e.dialogVisible=!0,setTimeout(()=>{var o;(o=y.value)==null||o.openDialog(t)},200)},S=(t,o)=>{e.dialogVisible=!0,setTimeout(()=>{var l;(l=y.value)==null||l.openDialog(t,o)},200)},W=()=>{e.dialogVisible=!1},A=()=>{e.dialogVisible2=!1},I=t=>{Q.confirm(`确定删除租户：【${t.name}】?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{await v().delTenant(t.id),r(),z.success("删除成功")}).catch(()=>{})},L=t=>{e.dialogVisible2=!0,setTimeout(()=>{var o;(o=b.value)==null||o.openDialog(t)},200)};return H(async()=>{r()}),(t,o)=>{const l=s("el-card"),C=s("el-tag"),f=s("el-button"),N=s("el-dropdown-item"),$=s("el-dropdown-menu"),M=s("el-dropdown");return c(),j("div",X,[n(l,{shadow:"hover","body-style":{paddingBottom:"0",display:"flex"}},{default:a(()=>[n(p(P),k(e.searchData,{onSearch:r}),null,16),n(p(O),k(e.buttonData,{onOnadd:o[0]||(o[0]=i=>R("add"))}),null,16)]),_:1}),q("div",Y,[n(p(w),k({ref:"tableRef"},e.tableData,{class:"table-demo",onPageChange:B}),{statusSlot:a(({scopeData:i})=>[i.row.status===1?(c(),_(C,{key:0,type:"success"},{default:a(()=>[m("启用")]),_:1})):g("",!0),i.row.status===0?(c(),_(C,{key:1,type:"danger"},{default:a(()=>[m("禁用")]),_:1})):g("",!0)]),operateSlot:a(({scopeData:i})=>[n(f,{icon:"ele-Edit",text:"",type:"primary",onClick:D=>S("edit",i.row)},{default:a(()=>[m("编辑")]),_:2},1032,["onClick"]),n(f,{icon:"ele-Delete",text:"",type:"danger",onClick:D=>I(i.row),disabled:i.row.schema_name==="public"},{default:a(()=>[m(" 删除 ")]),_:2},1032,["onClick","disabled"]),n(M,null,{dropdown:a(()=>[n($,null,{default:a(()=>[n(N,{icon:"ele-CopyDocument",onClick:D=>L(i.row)},{default:a(()=>[m(" 分配权限 ")]),_:2},1032,["onClick"])]),_:2},1024)]),default:a(()=>[n(f,{icon:"ele-MoreFilled",size:"small",text:"",type:"primary",style:{padding:"15px 0 0 20px"}})]),_:2},1024)]),_:1},16)]),e.dialogVisible?(c(),_(p(V),{key:0,ref_key:"menuDialogRef",ref:y,onHandleQuery:r,onTenanthandleClose:W},null,512)):g("",!0),e.dialogVisible2?(c(),_(p(E),{key:1,ref_key:"perDialogRef",ref:b,onHandleQuery:r,onPerhandleClose:A},null,512)):g("",!0)])}}});const Qe=G(ee,[["__scopeId","data-v-40463834"]]);export{Qe as default};
