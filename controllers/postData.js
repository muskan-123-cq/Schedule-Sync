const fs = require('fs');
const path = 'teacher.json';

function printLectures(req, res) {
  const newLecture = req.body;

  fs.readFile(path, 'utf-8', (err, data) => {
    let lectures = [];


    if (!err && data) {
      lectures = JSON.parse(data);
    }

    lectures.forEach(element => {
      if(element.email==req.body.teacher){
        element.lec.push(req.body);
      }
    });

    fs.writeFile(path, JSON.stringify(lectures), (err) => {
      if (err) {
        res.status(500).send('Lecture add nahi ho paaya');
      } else {
        res.status(201).json({ message: 'Lecture successfully added' });
      }
    });
  });
}
function setCurrentUser(req, res) {
    const newUser = req.body;
    fs.writeFile('currentUser.json', JSON.stringify([newUser]), (err) => {
        if (err) {
            console.error( err);
            return res.status(500).json({ error: "Failed to set current user" });
        } else {
            console.log("currentUser set:", newUser.email);
            return res.status(200).json({ message: "Current user set successfully" });
        }
    }); 
}
module.exports = {printLectures,setCurrentUser};
