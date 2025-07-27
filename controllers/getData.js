//getData.js
const fs=require('fs');
    function reading(req,res){

        fs.readFile('teacher.json','utf-8',(err,data)=>{
            if(err) return res.send("error");
            else{
            let arr=JSON.parse(data);
            res.json(arr);
            }
        })
    }
    function getLecture(req,res){
        // console.log(req.body);
        
        fs.readFile('teacher.json','utf-8',(err,data)=>{
            if(err) return res.send('error');
            else{
                let arr=JSON.parse(data);
                if(req.session.obj){
                    arr.forEach(element => {
                        if(element.email==req.session.obj.email){
                            res.json(element.lec);
                        }
                    });

                    

                }else{
                console.log(req.body);
                arr.forEach(element => {
                    if(element.email==req.body.teacher){
                        
                        res.json(element.lec);
                    }
                });
            }
                // res.json('kuch nhi ha');
            }
        })
    }
    function getCurrentUser(req,res){
        fs.readFile('currentUser.json','utf-8',(err,data)=>{
            if(err) return res.send('error');
            else{
                let arr=JSON.parse(data);
                if (Array.isArray(arr) && arr.length > 0) {
                    console.log("Current user:", arr[0].email, "| Role:", arr[0].role);
                    res.json(arr[0]);
                } else {
                    console.log("currentUser.json is empty");
                    res.status(404).json({ error: "No current user found" });
                }
            }
        })
        
    }
    function getLecturesByEmail(req,res)
    {
    const email = req.query.email;

    fs.readFile('teacher.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read failed" });

        let lectures = JSON.parse(data || '[]');
        const filtered = lectures.filter(lec => lec.user === email || lec.teacher === email);
        // console.log(lec.user);
        // console.log(lec.teacher);
        
        res.status(200).json(filtered);
    });
    }
module.exports = {reading,getLecture,getCurrentUser,getLecturesByEmail};