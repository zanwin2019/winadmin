import{d as m,_ as k,j as y,i as v,Z as L,e as S,ag as V,o,O as I,P as M,Q as b,c as a,K as d,a as l,F as u,a8 as E,V as W,U as $,S as B,W as O,X as j}from"./@vue-859b4330.js";import{_ as D}from"./_plugin-vue_export-helper-c27b6911.js";const F={class:"el-dropdown-menu"},N=["onClick"],T=m({name:"layoutTagsViewContextmenu"}),z=m({...T,props:{dropdown:{type:Object,default:()=>({x:0,y:0})}},emits:["currentContextmenuClick"],setup(p,{expose:f,emit:x}){const n=p,_=x,e=k({isShow:!1,dropdownList:[{contextMenuClickId:0,txt:"message.tagsView.refresh",affix:!1,icon:"ele-RefreshRight"},{contextMenuClickId:1,txt:"message.tagsView.close",affix:!1,icon:"ele-Close"},{contextMenuClickId:2,txt:"message.tagsView.closeOther",affix:!1,icon:"ele-CircleClose"},{contextMenuClickId:3,txt:"message.tagsView.closeAll",affix:!1,icon:"ele-FolderDelete"},{contextMenuClickId:4,txt:"message.tagsView.fullscreen",affix:!1,icon:"iconfont icon-fullscreen"}],item:{},arrowLeft:10}),r=y(()=>n.dropdown.x+117>document.documentElement.clientWidth?{x:document.documentElement.clientWidth-117-5,y:n.dropdown.y}:n.dropdown),w=t=>{_("currentContextmenuClick",Object.assign({},{contextMenuClickId:t},e.item))},C=t=>{var i;e.item=t,(i=t.meta)!=null&&i.isAffix?e.dropdownList[1].affix=!0:e.dropdownList[1].affix=!1,c(),setTimeout(()=>{e.isShow=!0},10)},c=()=>{e.isShow=!1};return v(()=>{document.body.addEventListener("click",c)}),L(()=>{document.body.removeEventListener("click",c)}),S(()=>n.dropdown,({x:t})=>{t+117>document.documentElement.clientWidth?e.arrowLeft=117-(document.documentElement.clientWidth-t):e.arrowLeft=10},{deep:!0}),f({openContextmenu:C}),(t,i)=>{const h=V("SvgIcon");return o(),I(j,{name:"el-zoom-in-center"},{default:M(()=>[b((o(),a("div",{"aria-hidden":"true",class:"el-dropdown__popper el-popper is-light is-pure custom-contextmenu",role:"tooltip","data-popper-placement":"bottom",style:d(`top: ${r.value.y+5}px;left: ${r.value.x}px;`),key:Math.random()},[l("ul",F,[(o(!0),a(u,null,E(e.dropdownList,(s,g)=>(o(),a(u,null,[s.affix?B("",!0):(o(),a("li",{class:"el-dropdown-menu__item","aria-disabled":"false",tabindex:"-1",key:g,onClick:A=>w(s.contextMenuClickId)},[W(h,{name:s.icon},null,8,["name"]),l("span",null,$(t.$t(s.txt)),1)],8,N))],64))),256))]),l("div",{class:"el-popper__arrow",style:d({left:`${e.arrowLeft}px`})},null,4)],4)),[[O,e.isShow]])]),_:1})}}});const K=D(z,[["__scopeId","data-v-d613ffa6"]]);export{K as default};
