import{s}from"./index-21d73ac4.js";function o(){return{getPost:t=>s({url:"/api/system/post/",method:"GET",params:t}),addPost:t=>s({url:"/api/system/post/",method:"POST",data:t}),editPost:(t,e)=>s({url:"/api/system/post/"+e+"/",method:"PUT",data:t}),delPost:t=>s({url:"/api/system/post/"+t+"/",method:"DELETE"})}}export{o as u};