import{_}from"./index-85c2db4d.js";import{d as B,b as m,_ as ie,i as le,ag as r,o as d,c as ne,V as l,P as a,a as C,u as g,L as x,T as s,Q as se,W as re,O as p,S as u,aQ as b}from"./@vue-859b4330.js";import{u as L,a as O}from"./index-55e8ed20.js";import{M as de}from"./@element-plus-e9b58552.js";import{E as P,a as I}from"./element-plus-9b914f77.js";import{_ as ce}from"./_plugin-vue_export-helper-c27b6911.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";const pe={data:[],header:[{key:"id",colWidth:"",align:"center",title:"ID",type:"text",isCheck:!0},{key:"label",colWidth:"100",align:"center",title:"字段名称",type:"text",isCheck:!0},{key:"key",colWidth:"100",align:"center",title:"字段key",type:"text",isCheck:!0},{key:"type",colWidth:"100",align:"center",title:"字段类型",type:"text",isCheck:!0},{key:"rule",colWidth:"100",align:"center",title:"是否必填",type:"text",isCheck:!0,slot:"ruleSlot"},{key:"isrow",colWidth:"100",align:"center",title:"是否整行",type:"text",isCheck:!0,slot:"isrowSlot"},{key:"disabled",colWidth:"100",align:"center",title:"是否禁用",type:"text",isCheck:!0,slot:"disabledSlot"},{key:"info",colWidth:"100",align:"center",title:"配置名称",type:"text",isCheck:!0},{key:"options",colWidth:"100",align:"center",title:"可选项",type:"text",isCheck:!0},{key:"upload_type",colWidth:"100",align:"center",title:"文件格式",type:"text",isCheck:!0},{key:"width",colWidth:"100",align:"center",title:"宽",type:"text",isCheck:!0},{key:"height",colWidth:"100",align:"center",title:"高",type:"text",isCheck:!0},{key:"value",colWidth:"100",align:"center",title:"值",type:"text",isCheck:!0},{key:"creator",colWidth:"100",align:"center",title:"创建者",type:"text",isCheck:!0},{key:"updater",colWidth:"100",align:"center",title:"更新者",type:"text",isCheck:!0},{key:"sort",colWidth:"",align:"center",title:"排序",type:"text",isCheck:!0},{key:"created_at",colWidth:"150",align:"center",title:"创建时间",type:"text",isCheck:!0},{key:"updated_at",colWidth:"150",align:"center",title:"修改时间",type:"text",isCheck:!0},{key:"desc",colWidth:"120",align:"center",title:"配置简介",type:"text",isCheck:!0},{key:"operate",colWidth:"180",align:"center",title:"操作",type:"",isCheck:!0,slot:"operateSlot",fixed:"right"}],config:{total:0,loading:!0,isBorder:!0,isSerialNo:!1,isSelection:!1,isOperate:!1,isPage:!0,isSetup:!0},param:{page:1,page_size:10},printName:"winadmin 表格打印演示"},ue={search:[{label:"字段名称",prop:"name",placeholder:"请输入字段名称",required:!1,type:"input"},{label:"字段key",prop:"key",placeholder:"请输入字段key",required:!1,type:"input"}]},me={config:{isadd:!0,isaddDisabled:!0,isimport:!1,isimportDisabled:!1,isexport:!1,isexportDisabled:!1}},ge={data:[],header:[{key:"title",colWidth:"",align:"left",title:"配置选项卡",type:"text",isCheck:!0},{key:"operate",colWidth:"60",align:"center",title:"",type:"text",isCheck:!0,slot:"operateSlot",fixed:"right"}],config:{total:0,loading:!0,isBorder:!1,isSerialNo:!1,isSelection:!1,isOperate:!1,isPage:!1,isSetup:!1},param:{page:1,page_size:10},printName:"winadmin 表格打印演示"},fe={search:[{label:"",prop:"title",placeholder:"请输入配置名称",required:!1,type:"input"}]},ye={class:"system-menu-container layout-padding",style:{display:"flex"}},_e={class:"system-menu-container layout-padding",style:{display:"flex",padding:"0 !important",position:"inherit"}},be={style:{"margin-top":"8px"},class:"table-demo-padding layout-padding-view layout-padding-auto"},he={class:"system-menu-container layout-padding",style:{display:"flex",padding:"0 !important",position:"inherit"}},ke={style:{"margin-top":"8px"},class:"table-demo-padding layout-padding-view layout-padding-auto"},Ce=B({name:"systemConfig"}),xe=B({...Ce,setup(Te){const v=b(()=>_(()=>import("./index-1f627def.js"),["assets/js/index-1f627def.js","assets/js/print-js-c817564d.js","assets/js/@intlify-d9393dcf.js","assets/js/js-table2excel-2aecd212.js","assets/js/sortablejs-85e2743d.js","assets/js/pinia-f5c09375.js","assets/js/@vue-859b4330.js","assets/js/index-85c2db4d.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-24abc00a.css"])),R=b(()=>_(()=>import("./dialog-0e5dfb7b.js"),["assets/js/dialog-0e5dfb7b.js","assets/js/index-4031c8a8.js","assets/js/index-85c2db4d.js","assets/js/@vue-859b4330.js","assets/js/pinia-f5c09375.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/@intlify-d9393dcf.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-f24d9663.css","assets/js/index-55e8ed20.js"])),N=b(()=>_(()=>import("./dialogTab-1e2287c1.js"),["assets/js/dialogTab-1e2287c1.js","assets/js/index-4031c8a8.js","assets/js/index-85c2db4d.js","assets/js/@vue-859b4330.js","assets/js/pinia-f5c09375.js","assets/js/vue-router-0ce8cd6d.js","assets/js/vue-i18n-a46d56de.js","assets/js/@intlify-d9393dcf.js","assets/js/vue-9a76c5f3.js","assets/js/js-cookie-edb2da2a.js","assets/js/@element-plus-e9b58552.js","assets/js/nprogress-28073a82.js","assets/css/nprogress-771398e6.css","assets/js/axios-28bc18a3.js","assets/js/qs-42f07db3.js","assets/js/side-channel-99bfd094.js","assets/js/get-intrinsic-4a38020a.js","assets/js/has-symbols-e8f3ca0e.js","assets/js/has-proto-f7d0b240.js","assets/js/function-bind-61637ca6.js","assets/js/hasown-bc561cf0.js","assets/js/call-bind-6482c9b0.js","assets/js/set-function-length-9c361e89.js","assets/js/define-data-property-bf6c9733.js","assets/js/has-property-descriptors-58650a95.js","assets/js/gopd-e1d311d9.js","assets/js/object-inspect-70513235.js","assets/js/element-plus-9b914f77.js","assets/js/lodash-es-21c98b27.js","assets/js/@vueuse-8b13c3f4.js","assets/js/@popperjs-c75af06c.js","assets/js/@ctrl-f8748455.js","assets/js/dayjs-816b3f93.js","assets/js/async-validator-dee29e8b.js","assets/js/memoize-one-297ddbcb.js","assets/js/escape-html-72afddb3.js","assets/js/normalize-wheel-es-ed76fb12.js","assets/js/@floating-ui-432baded.js","assets/js/mitt-f7ef348c.js","assets/js/vue-grid-layout-18559e02.js","assets/css/index-a33b6e65.css","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-f24d9663.css","assets/js/index-55e8ed20.js"])),A=b(()=>_(()=>import("./index-4b7e1185.js"),["assets/js/index-4b7e1185.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-6717164e.css"])),$=b(()=>_(()=>import("./index-8ddee447.js"),["assets/js/index-8ddee447.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/index-20863ba9.css"])),T=m(),w=m(),e=ie({searchData:ue,searchDataTab:fe,buttonData:me,tableData:pe,TableDataTab:ge,dialogVisible:!1,dialogVisibleTab:!1,menuList:[],menuListTab:[],SeachTabData:"",operate:!1,operateId:"",tabId:""}),M=m();m();const S=m(""),Q=t=>{S.value=t,e.tableData.param=S,f()},f=t=>{if(e.tableData.config.loading=!0,t)var o=Object.assign(t,e.tableData.param);else var o=e.tableData.param;L().getConfig(o).then(n=>{e.tableData.data=n.data.items,e.tableData.config.total=n.data.count;const c=n.data.items;z(c)}).finally(()=>{e.tableData.config.loading=!1})},h=t=>{if(e.TableDataTab.config.loading=!0,t)var o=t;O().getConfigtab(o).then(n=>{e.TableDataTab.data=n.data;const c=n.data;J(c)}).finally(()=>{e.TableDataTab.config.loading=!1})},z=t=>{e.menuList=m(JSON.parse(JSON.stringify(t)))},J=t=>{e.menuListTab=m(JSON.parse(JSON.stringify(t)))},q=t=>{e.dialogVisible=!0,setTimeout(()=>{var o;(o=T.value)==null||o.openDialog(t,e.tabId)},200)},V=(t,o)=>{e.dialogVisibleTab=!0,setTimeout(()=>{var n;(n=w.value)==null||n.openDialog(t,o)},200)},F=(t,o)=>{e.dialogVisible=!0,setTimeout(()=>{var n;(n=T.value)==null||n.openDialog(t,o)},200)},H=(t,o)=>{e.dialogVisibleTab=!0,setTimeout(()=>{var n;(n=w.value)==null||n.openDialog(t,o)},200)},j=()=>{e.dialogVisible=!1},U=()=>{e.dialogVisibleTab=!1},G=t=>{P.confirm(`确定删除配置：【${t.name}】?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{await L().delConfig(t.id),f(),I.success("删除成功")}).catch(()=>{})},K=t=>{P.confirm(`确定删除配置：【${t.title}】?`,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{await O().delConfigtab(t.id),h(),I.success("删除成功")}).catch(()=>{})},X=t=>{const o={config_tab_id:t.id};e.tabId=t.id,e.buttonData.config.isaddDisabled=e.tabId=="",f(o)},Y=()=>{const t={title:e.SeachTabData};h(t)},Z=t=>{e.operate=!0,e.operateId=t.id},ee=t=>{e.operate=!1,e.operateId=""};return le(async()=>{f(),h()}),(t,o)=>{const n=r("el-input"),c=r("el-button"),W=r("el-card"),D=r("el-dropdown-item"),te=r("el-dropdown-menu"),ae=r("el-dropdown"),E=r("el-col"),y=r("el-tag"),oe=r("el-row");return d(),ne("div",ye,[l(oe,{gutter:8,style:{width:"100%"},class:"table-demo-padding layout-padding-view"},{default:a(()=>[l(E,{span:4,xs:24},{default:a(()=>[C("div",_e,[l(W,{shadow:"hover","body-style":{paddingBottom:"",display:"flex"}},{default:a(()=>[l(n,{modelValue:e.SeachTabData,"onUpdate:modelValue":o[0]||(o[0]=i=>e.SeachTabData=i),placeholder:"请输入选项卡名称",size:"small",class:"w-50 m-2","suffix-icon":g(de),clearable:"",onChange:Y},null,8,["modelValue","suffix-icon"]),l(c,{icon:"ele-Plus",type:"primary",size:"default",plain:"",onClick:o[1]||(o[1]=i=>V("add")),style:{"margin-left":"20px","padding-right":"10px",border:"0"}})]),_:1}),C("div",be,[l(g(v),x({ref_key:"tableRefTab",ref:M},e.TableDataTab,{class:"table-demo1","highlight-current-row":"",onRowClick:X,onCellMouseEnter:Z,onCellMouseLeave:ee,"row-style":{height:"40px"}}),{operateSlot:a(({scopeData:i})=>[l(ae,null,{dropdown:a(()=>[l(te,null,{default:a(()=>[l(D,{icon:"ele-Plus",onClick:k=>V("addPid",i.row)},{default:a(()=>[s(" 添加 ")]),_:2},1032,["onClick"]),l(D,{icon:"ele-Edit",onClick:k=>H("edit",i.row)},{default:a(()=>[s(" 编辑 ")]),_:2},1032,["onClick"]),l(D,{icon:"ele-Delete",onClick:k=>K(i.row)},{default:a(()=>[s(" 删除")]),_:2},1032,["onClick"])]),_:2},1024)]),default:a(()=>[se(l(c,{icon:"ele-MoreFilled",size:"small",text:"",type:"primary",style:{"padding-left":"5px","padding-bottom":"25px",transform:"rotate(90deg)"}},null,512),[[re,e.operate&&e.operateId==i.row.id]])]),_:2},1024)]),_:1},16)])])]),_:1}),l(E,{span:20,xs:24},{default:a(()=>[C("div",he,[l(W,{shadow:"hover","body-style":{paddingBottom:"0",display:"flex"}},{default:a(()=>[l(g(A),x(e.searchData,{onSearch:f}),null,16),l(g($),x(e.buttonData,{onOnadd:o[2]||(o[2]=i=>q("add"))}),null,16)]),_:1}),C("div",ke,[l(g(v),x({ref:"tableRef"},e.tableData,{class:"table-demo",onPageChange:Q}),{ruleSlot:a(({scopeData:i})=>[i.row.rule===!0?(d(),p(y,{key:0,type:"success"},{default:a(()=>[s("是")]),_:1})):u("",!0),i.row.rule===!1?(d(),p(y,{key:1,type:"danger"},{default:a(()=>[s("否")]),_:1})):u("",!0)]),isrowSlot:a(({scopeData:i})=>[i.row.isrow===!0?(d(),p(y,{key:0,type:"success"},{default:a(()=>[s("是")]),_:1})):u("",!0),i.row.isrow===!1?(d(),p(y,{key:1,type:"danger"},{default:a(()=>[s("否")]),_:1})):u("",!0)]),disabledSlot:a(({scopeData:i})=>[i.row.disabled===!0?(d(),p(y,{key:0,type:"success"},{default:a(()=>[s("是")]),_:1})):u("",!0),i.row.disabled===!1?(d(),p(y,{key:1,type:"danger"},{default:a(()=>[s("否")]),_:1})):u("",!0)]),operateSlot:a(({scopeData:i})=>[l(c,{icon:"ele-Edit",text:"",type:"primary",onClick:k=>F("edit",i.row)},{default:a(()=>[s(" 编辑 ")]),_:2},1032,["onClick"]),l(c,{icon:"ele-Delete",text:"",type:"danger",onClick:k=>G(i.row)},{default:a(()=>[s(" 删除 ")]),_:2},1032,["onClick"])]),_:1},16)])])]),_:1})]),_:1}),e.dialogVisibleTab?(d(),p(g(N),{key:0,ref_key:"menuDialogReftab",ref:w,onHandleQueryTab:h,menuListTab:e.menuListTab,onConfighandleCloseTab:U},null,8,["menuListTab"])):u("",!0),e.dialogVisible?(d(),p(g(R),{key:1,ref_key:"menuDialogRef",ref:T,onHandleQuery:f,menuList:e.menuList,onConfighandleClose:j},null,8,["menuList"])):u("",!0)])}}});const dt=ce(xe,[["__scopeId","data-v-8570f397"]]);export{dt as default};
