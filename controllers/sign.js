//sign.js
const fs = require('fs');

function sign(req,res){
    const {email,password,role} = req.body;
    let obj = {
        email : email,
        password : password,
        role : role,
        lec:[]
    }
    if(role == 'admin')
        read('admin.json',obj)
    else
    read('teacher.json',obj);

    function read(path,data2){
        fs.readFile(path,'utf-8',(err,data)=>{
            if(err){
                return res.json(err);
            }
            else{
                
                let temp = JSON.parse(data);
                temp.push(data2);
                write(path,temp);
            }
        })
    }

    function write(path,data){
        fs.writeFile(path,JSON.stringify(data),(err)=>{
            if(err)
            {
                return res.json('404 not correct')
                
            }
            else{
                res.json('file written successfully');
            }
        });
    }
}

module.exports = {sign};