import{d as p,b as g,_ as v,ag as l,o,c,F as f,a8 as x,O as y,P as k,T,U as h,V as C,a9 as V}from"./@vue-859b4330.js";import{_ as A}from"./_plugin-vue_export-helper-c27b6911.js";const b=p({name:"inputTags"}),B=p({...b,setup(w){const s=g(),e=v({currentval:"",tagsArr:[],inputLength:""}),u=()=>{e.tagsArr.push(e.currentval),e.currentval=""},_=(t,a)=>{e.tagsArr.splice(t,1)},d=()=>{s.value.focus()};return(t,a)=>{const i=l("el-tag"),m=l("el-input");return o(),c("div",{class:"arrbox",onClick:d},[(o(!0),c(f,null,x(e.tagsArr,(n,r)=>(o(),y(i,{key:r,closable:"",onClose:F=>_(r)},{default:k(()=>[T(h(n),1)]),_:2},1032,["onClose"]))),128)),C(m,{placeholder:t.placeholder,modelValue:e.currentval,"onUpdate:modelValue":a[0]||(a[0]=n=>e.currentval=n),onKeyup:V(u,["enter","native"]),ref_key:"inputTag",ref:s,type:"text"},null,8,["placeholder","modelValue"])])}}});const N=A(B,[["__scopeId","data-v-9d7321ca"]]);export{N as default};
