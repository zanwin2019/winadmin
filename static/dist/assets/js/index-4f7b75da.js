import{s as e}from"./index-21d73ac4.js";function r(){return{getConfigtab:t=>e({url:"/api/system/configtab/",method:"GET",params:t}),addConfigtab:t=>e({url:"/api/system/configtab/",method:"POST",data:t}),editConfigtab:(t,i)=>e({url:"/api/system/configtab/"+i+"/",method:"PUT",data:t}),delConfigtab:t=>e({url:"/api/system/configtab/"+t+"/",method:"DELETE"})}}function o(){return{getConfig:t=>e({url:"/api/system/config/",method:"GET",params:t}),addConfig:t=>e({url:"/api/system/config/",method:"POST",data:t}),editConfig:(t,i)=>e({url:"/api/system/config/"+i+"/",method:"PUT",data:t}),delConfig:t=>e({url:"/api/system/config/"+t+"/",method:"DELETE"})}}export{r as a,o as u};