import{s as e}from"./index-85c2db4d.js";function t(){return{getUser:(r,u)=>e({url:"/api/account/user/",method:"GET",params:r,data:u}),addUser:(r,u)=>e({url:"/api/account/user/",method:"POST",data:r,params:u}),editUser:(r,u)=>e({url:"/api/account/user/"+u+"/",method:"PUT",data:r}),delUser:r=>e({url:"/api/account/user/"+r+"/",method:"DELETE"}),resetPassword:r=>e({url:"/api/account/user/reset_password/",method:"POST",data:r}),modifyPassword:r=>e({url:"/api/account/user/modify_password/",method:"POST",data:r})}}export{t as u};
