import{v as V}from"./vue-i18n-a46d56de.js";import{d as _,_ as I,ag as t,o as v,c as x,V as e,P as l,a as w,T as p}from"./@vue-859b4330.js";import"./@intlify-d9393dcf.js";import"./vue-9a76c5f3.js";const $={class:"form-i18n-container layout-pd"},z={style:{"text-align":"center","margin-top":"15px"}},C=_({name:"pagesFormI18n"}),k=_({...C,setup(P){const{locale:f}=V.useI18n(),o=I({radio:"zh-cn",form:{name:"",email:"",autograph:""}}),c=()=>{f.value=o.radio};return(n,a)=>{const r=t("el-radio-button"),i=t("el-radio-group"),d=t("el-input"),s=t("el-form-item"),u=t("el-col"),g=t("el-row"),b=t("el-form"),h=t("el-card");return v(),x("div",$,[e(h,{shadow:"hover",header:"表单国际化演示(不适用于动态项 form-item)"},{default:l(()=>[w("div",z,[e(i,{modelValue:o.radio,"onUpdate:modelValue":a[0]||(a[0]=m=>o.radio=m),size:"default",onChange:c},{default:l(()=>[e(r,{label:"zh-cn"},{default:l(()=>[p("中文简体")]),_:1}),e(r,{label:"en"},{default:l(()=>[p("英文")]),_:1}),e(r,{label:"zh-tw"},{default:l(()=>[p("中文繁体")]),_:1})]),_:1},8,["modelValue"])]),e(b,{model:o.form,size:"default","label-width":"100px",class:"mt35 mb35"},{default:l(()=>[e(g,{gutter:35},{default:l(()=>[e(u,{xs:24,sm:12,md:8,lg:8,xl:8,class:"mb20"},{default:l(()=>[e(s,{label:n.$t("message.formI18nLabel.name")},{default:l(()=>[e(d,{modelValue:o.form.name,"onUpdate:modelValue":a[1]||(a[1]=m=>o.form.name=m),placeholder:n.$t("message.formI18nPlaceholder.name"),clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(u,{xs:24,sm:12,md:8,lg:8,xl:8,class:"mb20"},{default:l(()=>[e(s,{label:n.$t("message.formI18nLabel.email")},{default:l(()=>[e(d,{modelValue:o.form.email,"onUpdate:modelValue":a[2]||(a[2]=m=>o.form.email=m),placeholder:n.$t("message.formI18nPlaceholder.email"),clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1}),e(u,{xs:24,sm:12,md:8,lg:8,xl:8,class:"mb20"},{default:l(()=>[e(s,{label:n.$t("message.formI18nLabel.autograph")},{default:l(()=>[e(d,{modelValue:o.form.autograph,"onUpdate:modelValue":a[3]||(a[3]=m=>o.form.autograph=m),placeholder:n.$t("message.formI18nPlaceholder.autograph"),clearable:""},null,8,["modelValue","placeholder"])]),_:1},8,["label"])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})])}}});export{k as default};