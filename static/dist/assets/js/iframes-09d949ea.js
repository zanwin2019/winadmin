import{d as p,b as _,j as d,e as m,aq as y,o as n,c as o,a as I,F as w,a8 as k,Q as c,V as O,P as v,W as b,a1 as x,n as L}from"./@vue-859b4330.js";import{u as P}from"./vue-router-0ce8cd6d.js";const R={class:"layout-padding layout-padding-unset layout-iframe"},V={class:"layout-padding-auto layout-padding-view"},B=["src","data-url"],S=p({name:"layoutIframeView"}),D=p({...S,props:{refreshKey:{type:String,default:()=>""},name:{type:String,default:()=>"slide-right"},list:{type:Array,default:()=>[]}},setup(f){const s=f,l=_(),i=P(),h=d(()=>s.list.filter(e=>{var a;return(a=e.meta)==null?void 0:a.isIframeOpen})),g=d(()=>i.path),u=(e,a)=>{L(()=>{if(!l.value)return!1;l.value.forEach(r=>{r.dataset.url===e&&(r.onload=()=>{var t;(t=a.meta)!=null&&t.isIframeOpen&&a.meta.loading&&(a.meta.loading=!1)})})})};return m(()=>i.fullPath,e=>{const a=s.list.find(r=>r.path===e);if(!a)return!1;a.meta.isIframeOpen||(a.meta.isIframeOpen=!0),u(e,a)},{immediate:!0}),m(()=>s.refreshKey,()=>{const e=s.list.find(a=>a.path===i.path);if(!e)return!1;e.meta.isIframeOpen&&(e.meta.isIframeOpen=!1),setTimeout(()=>{e.meta.isIframeOpen=!0,e.meta.loading=!0,u(i.fullPath,e)})},{deep:!0}),(e,a)=>{const r=y("loading");return n(),o("div",R,[I("div",V,[(n(!0),o(w,null,k(h.value,t=>c((n(),o("div",{class:"w100",key:t.path,"element-loading-background":"white"},[O(x,{name:f.name},{default:v(()=>[c((n(),o("iframe",{src:t.meta.isLink,key:t.path,frameborder:"0",height:"100%",width:"100%",style:{position:"absolute"},"data-url":t.path,ref_for:!0,ref_key:"iframeRef",ref:l},null,8,B)),[[b,g.value===t.path]])]),_:2},1032,["name"])])),[[r,t.meta.loading]])),128))])])}}});export{D as default};
