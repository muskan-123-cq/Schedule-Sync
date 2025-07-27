let ttable=document.querySelector('#teacher-table');
let showtimetable=document.querySelector("#showtimetable");
let details=document.querySelector("#details");
let time=document.querySelector("#time");
let teacherlogo=document.querySelector("#teacherlogo"); 
let totaldone=document.querySelector("#totaldone"); 
let totalleft=document.querySelector("#totalleft"); 
let totallec=document.querySelector("#totallec"); 
let currentTime=new Date().toLocaleString();
// let showtimetable=document.querySelector("#showtimetable");     
let currentUser=JSON.parse(localStorage.getItem("currentUser"));
// console.log(show);
let count=0;
let done=0,left=0;
// console.log(currentUser);
let allLectures=[];
let teacherLectures=[];
// = JSON.parse(localStorage.getItem("lectures")) || [];
async function lectures(){
    let data=await fetch('/get/lectures',{
        method:'POST'
    });
    let res = await data.json();
    showSubject(res);
    console.log(res);
    allLectures=res;
    teacherLectures = allLectures.filter(lec => 
        {
            if(lec.user === currentUser.email){
                count++;
           return lec.user===currentUser.email
            }
        });
        
    
        
}
lectures();
// console.log(teacherLectures);

// console.log(allLectures);

    
totallec.innerHTML='';
totallec.innerHTML=`Total lecture <br> ${count}`;

console.log(teacherLectures);

window.onload=()=>{
    lectures();
showtimetable.addEventListener("click",()=>{
     details.style.display="none";
 ttable.style.display="block";
//  showSubject();
})
function showtime(){
time.innerHTML=new Date().toLocaleString();
}


if (currentUser && currentUser.role === "teacher") {
    console.log(currentUser);
    teacherlogo.innerHTML = `Logged in as ${currentUser.email} (Teacher)
    <img src="https://static.vecteezy.com/system/resources/previews/021/919/677/original/login-icon-in-trendy-flat-style-isolated-on-white-background-approach-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-flat-style-for-graphic-design-vector.jpg" height="30px" width="30px">`;
}


setInterval(showtime,1000);
showtime();
}
function showSubject(teacherLectures) {
    let cells = document.querySelectorAll("td[id]");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
console.log(teacherLectures);

     teacherLectures.forEach(lec => {
        let period = getPeriodNumber(lec.start);
        let cellId = `${lec.day} ${period}`;
        let cell = document.getElementById(cellId);
        if (cell) {
            cell.innerHTML = `<b>${lec.subject}</b><br>${lec.start}-${lec.end}`;
            console.log(cell);
            
        }

    });
    function getPeriodNumber(time) {
        let hour = parseInt(time.split(":")[0]);
        if (hour <= 8) return 1;
        if (hour <= 9) return 2;
        if (hour <= 10) return 3;
        if (hour <= 11) return 4;
        if (hour <= 12) return 5;
        if (hour >= 13) return 6;
        return 0;
    }
}