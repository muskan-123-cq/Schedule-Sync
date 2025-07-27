//login.js
const { log } = require('console');
const fs = require('fs');
  
function matching(req,res){
    const {email,password,role}=req.body;
    const obj={email,password,role};
   
    
    if(obj.role == 'admin')
        read('admin.json',obj)
    else
    read('teacher.json',obj);


    function read(path , obj){
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                return res.status(404).json(err)
            }
            else{
                let arr = JSON.parse(data);
                check(arr,obj);
            }
        })
    }

    function check(arr,obj){
        console.log(obj)
console.log(arr);

        let present = arr.find((ele) => 

            ele.email == obj.email && 
            ele.password == obj.password && 
            ele.role == obj.role
        );
        if (present) { 
            req.session.obj={
                email: present.email,
                role:present.role
            }
            res.json(present);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}

module.exports = {matching};