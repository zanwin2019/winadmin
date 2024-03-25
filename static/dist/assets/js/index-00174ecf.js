import{_ as F}from"./index-85c2db4d.js";import{i as h}from"./getStyleSheets-a5a9fa08.js";import{d as L,b as E,_ as N,j as R,i as G,e as U,ag as s,o as x,c as _,V as a,P as r,O as $,J as M,a as S,U as j,u as v,aQ as J,n as Q}from"./@vue-859b4330.js";import"./pinia-f5c09375.js";import"./vue-router-0ce8cd6d.js";import"./vue-i18n-a46d56de.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";import"./js-cookie-edb2da2a.js";import"./@element-plus-e9b58552.js";import"./nprogress-28073a82.js";import"./axios-28bc18a3.js";import"./qs-42f07db3.js";import"./side-channel-99bfd094.js";import"./get-intrinsic-4a38020a.js";import"./has-symbols-e8f3ca0e.js";import"./has-proto-f7d0b240.js";import"./function-bind-61637ca6.js";import"./hasown-bc561cf0.js";import"./call-bind-6482c9b0.js";import"./set-function-length-9c361e89.js";import"./define-data-property-bf6c9733.js";import"./has-property-descriptors-58650a95.js";import"./gopd-e1d311d9.js";import"./object-inspect-70513235.js";import"./element-plus-9b914f77.js";import"./lodash-es-21c98b27.js";import"./@vueuse-8b13c3f4.js";import"./@popperjs-c75af06c.js";import"./@ctrl-f8748455.js";import"./dayjs-816b3f93.js";import"./async-validator-dee29e8b.js";import"./memoize-one-297ddbcb.js";import"./escape-html-72afddb3.js";import"./normalize-wheel-es-ed76fb12.js";import"./@floating-ui-432baded.js";import"./mitt-f7ef348c.js";import"./vue-grid-layout-18559e02.js";const q={class:"icon-selector w100 h100"},H={class:"icon-selector-warp"},K={class:"icon-selector-warp-title"},X=L({name:"iconSelector"}),We=L({...X,props:{prepend:{type:String,default:()=>"ele-Pointer"},placeholder:{type:String,default:()=>"请输入内容搜索图标或者选择图标"},size:{type:String,default:()=>"default"},title:{type:String,default:()=>"请选择图标"},disabled:{type:Boolean,default:()=>!1},clearable:{type:Boolean,default:()=>!0},emptyDescription:{type:String,default:()=>"无相关图标"},modelValue:String},emits:["update:modelValue","get","clear"],setup(i,{emit:C}){const n=i,p=C,m=J(()=>F(()=>import("./list-724e07ae.js"),["assets/js/list-724e07ae.js","assets/js/@vue-859b4330.js","assets/js/_plugin-vue_export-helper-c27b6911.js","assets/css/list-1817b3d2.css"])),f=E(),e=N({fontIconPrefix:"",fontIconWidth:0,fontIconSearch:"",fontIconPlaceholder:"",fontIconTabActive:"ali",fontIconList:{ali:[],ele:[],awe:[]}}),T=()=>{if(!n.modelValue)return!1;e.fontIconSearch="",e.fontIconPlaceholder=n.modelValue},k=()=>{const t=P();setTimeout(()=>{t.filter(l=>l===e.fontIconSearch).length<=0&&(e.fontIconSearch="")},300)},d=R(()=>{const t=P();if(!e.fontIconSearch)return t;let o=e.fontIconSearch.trim().toLowerCase();return t.filter(l=>{if(l.toLowerCase().indexOf(o)!==-1)return l})}),P=()=>{let t=[];return e.fontIconTabActive==="ali"?t=e.fontIconList.ali:e.fontIconTabActive==="ele"?t=e.fontIconList.ele:e.fontIconTabActive==="awe"&&(t=e.fontIconList.awe),t},b=()=>{if(n.modelValue==="")return e.fontIconPlaceholder=n.placeholder;e.fontIconPlaceholder=n.modelValue,e.fontIconPrefix=n.modelValue},y=()=>{if(n.modelValue==null)return"ele";let t="ali";return n.modelValue.indexOf("iconfont")>-1?t="ali":n.modelValue.indexOf("ele-")>-1?t="ele":n.modelValue.indexOf("fa")>-1&&(t="awe"),e.fontIconTabActive=t,t},V=async t=>{if(t==="ali"){if(e.fontIconList.ali.length>0)return;await h.ali().then(o=>{e.fontIconList.ali=o.map(l=>`iconfont ${l}`)})}else if(t==="ele"){if(e.fontIconList.ele.length>0)return;await h.ele().then(o=>{e.fontIconList.ele=o})}else if(t==="awe"){if(e.fontIconList.awe.length>0)return;await h.awe().then(o=>{e.fontIconList.awe=o.map(l=>`fa ${l}`)})}e.fontIconPlaceholder=n.placeholder,b()},z=t=>{V(t.paneName),f.value.focus()},u=t=>{e.fontIconPlaceholder=t,e.fontIconPrefix=t,p("get",e.fontIconPrefix),p("update:modelValue",e.fontIconPrefix),f.value.focus()},A=()=>{e.fontIconPrefix="",p("clear",e.fontIconPrefix),p("update:modelValue",e.fontIconPrefix)},w=()=>{Q(()=>{e.fontIconWidth=f.value.$el.offsetWidth})},B=()=>{window.addEventListener("resize",()=>{w()})};return G(()=>{V(y()),B(),w()}),U(()=>n.modelValue,()=>{b(),y()}),(t,o)=>{const l=s("SvgIcon"),O=s("el-input"),I=s("el-tab-pane"),D=s("el-tabs"),W=s("el-popover");return x(),_("div",q,[a(O,{modelValue:e.fontIconSearch,"onUpdate:modelValue":o[0]||(o[0]=c=>e.fontIconSearch=c),placeholder:e.fontIconPlaceholder,clearable:i.clearable,disabled:i.disabled,size:i.size,ref_key:"inputWidthRef",ref:f,onClear:A,onFocus:T,onBlur:k},{prepend:r(()=>{var c,g;return[(e.fontIconPrefix===""?((c=i.prepend)==null?void 0:c.indexOf("ele-"))>-1:((g=e.fontIconPrefix)==null?void 0:g.indexOf("ele-"))>-1)?(x(),$(l,{key:0,name:e.fontIconPrefix===""?i.prepend:e.fontIconPrefix,class:"font14"},null,8,["name"])):(x(),_("i",{key:1,class:M([e.fontIconPrefix===""?i.prepend:e.fontIconPrefix,"font14"])},null,2))]}),_:1},8,["modelValue","placeholder","clearable","disabled","size"]),a(W,{placement:"bottom",width:e.fontIconWidth,transition:"el-zoom-in-top","popper-class":"icon-selector-popper",trigger:"click","virtual-ref":f.value,"virtual-triggering":""},{default:r(()=>[S("div",H,[S("div",K,j(i.title),1),a(D,{modelValue:e.fontIconTabActive,"onUpdate:modelValue":o[1]||(o[1]=c=>e.fontIconTabActive=c),onTabClick:z},{default:r(()=>[a(I,{lazy:"",label:"ali",name:"ali"},{default:r(()=>[a(v(m),{list:d.value,empty:i.emptyDescription,prefix:e.fontIconPrefix,onGetIcon:u},null,8,["list","empty","prefix"])]),_:1}),a(I,{lazy:"",label:"ele",name:"ele"},{default:r(()=>[a(v(m),{list:d.value,empty:i.emptyDescription,prefix:e.fontIconPrefix,onGetIcon:u},null,8,["list","empty","prefix"])]),_:1}),a(I,{lazy:"",label:"awe",name:"awe"},{default:r(()=>[a(v(m),{list:d.value,empty:i.emptyDescription,prefix:e.fontIconPrefix,onGetIcon:u},null,8,["list","empty","prefix"])]),_:1})]),_:1},8,["modelValue"])])]),_:1},8,["width","virtual-ref"])])}}});export{We as default};
