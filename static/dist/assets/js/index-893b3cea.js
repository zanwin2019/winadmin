import{d as u,b as c,_ as k,i as w,ag as S,Q as W,W as T,o as i,c as o,a as d,J as I,S as f,U as O,I as B,O as A,K as m,n as _}from"./@vue-859b4330.js";import{_ as $}from"./_plugin-vue_export-helper-c27b6911.js";const R={key:1,class:"notice-bar-warp-slot"},C=u({name:"noticeBar"}),N=u({...C,props:{mode:{type:String,default:()=>""},text:{type:String,default:()=>""},color:{type:String,default:()=>"var(--el-color-warning)"},background:{type:String,default:()=>"var(--el-color-warning-light-9)"},size:{type:[Number,String],default:()=>14},height:{type:Number,default:()=>40},delay:{type:Number,default:()=>1},speed:{type:Number,default:()=>100},scrollable:{type:Boolean,default:()=>!1},leftIcon:{type:String,default:()=>""},rightIcon:{type:String,default:()=>""}},emits:["close","link"],setup(t,{emit:y}){const n=t,s=y,l=c(),a=c(),e=k({order:1,oneTime:0,twoTime:0,warpOWidth:0,textOWidth:0,isMode:!1}),p=()=>{_(()=>{e.warpOWidth=l.value.offsetWidth,e.textOWidth=a.value.offsetWidth,document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${e.textOWidth}px;}}`),document.styleSheets[0].insertRule(`@keyframes twoAnimation {0% {left: ${e.warpOWidth}px;} 100% {left: -${e.textOWidth}px;}}`),h(),setTimeout(()=>{r()},n.delay*1e3)})},h=()=>{e.oneTime=e.textOWidth/n.speed,e.twoTime=(e.textOWidth+e.warpOWidth)/n.speed},r=()=>{e.order===1?(a.value.style.cssText=`animation: oneAnimation ${e.oneTime}s linear; opactity: 1;}`,e.order=2):a.value.style.cssText=`animation: twoAnimation ${e.twoTime}s linear infinite; opacity: 1;`},g=()=>{a.value.addEventListener("animationend",()=>{r()},!1)},x=()=>{if(!n.mode)return!1;n.mode==="closeable"?(e.isMode=!0,s("close")):n.mode==="link"&&s("link")};return w(()=>{if(n.scrollable)return!1;p(),g()}),(v,z)=>{const b=S("SvgIcon");return W((i(),o("div",{class:"notice-bar",style:m({background:t.background,height:`${t.height}px`})},[d("div",{class:"notice-bar-warp",style:m({color:t.color,fontSize:`${t.size}px`})},[t.leftIcon?(i(),o("i",{key:0,class:I(["notice-bar-warp-left-icon",t.leftIcon])},null,2)):f("",!0),d("div",{class:"notice-bar-warp-text-box",ref_key:"noticeBarWarpRef",ref:l},[t.scrollable?(i(),o("div",R,[B(v.$slots,"default",{},void 0,!0)])):(i(),o("div",{key:0,class:"notice-bar-warp-text",ref_key:"noticeBarTextRef",ref:a},O(t.text),513))],512),t.rightIcon?(i(),A(b,{key:1,name:t.rightIcon,class:"notice-bar-warp-right-icon",onClick:x},null,8,["name"])):f("",!0)],4)],4)),[[T,!e.isMode]])}}});const E=$(N,[["__scopeId","data-v-dab2d617"]]);export{E as default};
