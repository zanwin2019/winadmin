import{d as _,ag as t,o,c as a,V as r,P as n,O as l,F as v,a8 as S,a as w,J as h,S as i}from"./@vue-859b4330.js";import{_ as B}from"./_plugin-vue_export-helper-c27b6911.js";const V={class:"icon-selector-warp-row"},b=_({name:"iconSelectorList"}),I=_({...b,props:{list:{type:Array,default:()=>[]},empty:{type:String,default:()=>"无相关图标"},prefix:{type:String,default:()=>""}},emits:["get-icon"],setup(e,{emit:m}){const p=e,d=m,u=s=>{d("get-icon",s)};return(s,N)=>{const f=t("SvgIcon"),g=t("el-col"),y=t("el-row"),k=t("el-empty"),x=t("el-scrollbar");return o(),a("div",V,[r(x,{ref:"selectorScrollbarRef"},{default:n(()=>[p.list.length>0?(o(),l(y,{key:0,gutter:10},{default:n(()=>[(o(!0),a(v,null,S(e.list,(c,C)=>(o(),l(g,{xs:6,sm:4,md:4,lg:4,xl:4,key:C,onClick:z=>u(c)},{default:n(()=>[w("div",{class:h(["icon-selector-warp-item",{"icon-selector-active":e.prefix===c}])},[r(f,{name:c},null,8,["name"])],2)]),_:2},1032,["onClick"]))),128))]),_:1})):i("",!0),e.list.length<=0?(o(),l(k,{key:1,"image-size":100,description:e.empty},null,8,["description"])):i("",!0)]),_:1},512)])}}});const A=B(I,[["__scopeId","data-v-cec21a67"]]);export{A as default};
