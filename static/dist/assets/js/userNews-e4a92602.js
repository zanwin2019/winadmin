import{d as i,_,ag as m,o as s,c as o,a as e,U as t,S as u,F as p,a8 as v,O as b}from"./@vue-859b4330.js";import{_ as w}from"./_plugin-vue_export-helper-c27b6911.js";const h={class:"layout-navbars-breadcrumb-user-news"},y={class:"head-box"},g={class:"head-box-title"},k={class:"content-box"},x={class:"content-box-msg"},f={class:"content-box-time"},B=i({name:"layoutBreadcrumbUserNews"}),C=i({...B,setup(L){const n=_({newsList:[{label:"关于版本发布的通知",value:"winadmin，基于 vue3 + CompositionAPI + typescript + vite + element plus，正式发布时间：2021年02月28日！",time:"2023-7-15"}]}),l=()=>{n.newsList=[]};return(a,N)=>{const r=m("el-empty");return s(),o("div",h,[e("div",y,[e("div",g,t(a.$t("message.user.newTitle")),1),n.newsList.length>0?(s(),o("div",{key:0,class:"head-box-btn",onClick:l},t(a.$t("message.user.newBtn")),1)):u("",!0)]),e("div",k,[n.newsList.length>0?(s(!0),o(p,{key:0},v(n.newsList,(c,d)=>(s(),o("div",{class:"content-box-item",key:d},[e("div",null,t(c.label),1),e("div",x,t(c.value),1),e("div",f,t(c.time),1)]))),128)):(s(),b(r,{key:1,description:a.$t("message.user.newDesc")},null,8,["description"]))])])}}});const D=w(C,[["__scopeId","data-v-8302ad22"]]);export{D as default};