
let subject = document.querySelector("#subject");
let lect = document.querySelector("#lect");
let room = document.querySelector("#room");
let day = document.querySelector("#day");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let addlec = document.querySelector("#addlec");
let formdiv = document.querySelector("#formdiv");
let table1 = document.querySelector("#table1");
let save = document.querySelector("#save");
let teacher = document.querySelector("#email");
let dlist = document.getElementById("emails");
let emails = document.querySelector("#emails");
let teacherlogo = document.querySelector("#teacherlogo");
let time = document.querySelector("#time");
let logout = document.querySelector("#logout");
let lectures = [];
let currentUser;
async function getLecture(teacher) {
    console.log(teacher);
    let res = await fetch('/get/lectures',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({teacher:teacher})
    }) //fetch req se hmare ps data string ki form me ata hai
    let data = await res.json();
    lectures = data;
     console.log(lectures);
     
    showsubject();
}
get();

async function get() {
    let data = await fetch('/get/currentUser');
    currentUser = await data.json();
    if (currentUser && currentUser.email) {
        teacherlogo.innerHTML = `Logged in as ${currentUser.email} (Admin) <img src="https://static.vecteezy.com/system/resources/previews/021/919/677/original/login-icon-in-trendy-flat-style-isolated-on-white-background-approach-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-flat-style-for-graphic-design-vector.jpg" height="50px" width="50px">`;
    }
    console.log("current",currentUser);

}

let final,form_email;
async function load() {
    let data = await fetch('/get/data');
    final = await data.json();
    
    form_email=document.querySelector("#form-email");
    final.forEach(lec => {
        if (lec.email) {
            let option = document.createElement("option");
            let option2=document.createElement("option");
            option.value = lec.email;
            option.innerHTML = lec.email;
            option2.value=lec.email;
            option2.innerHTML=lec.email;
            option.id = lec.email;
            dlist.appendChild(option);
            form_email.appendChild(option2);
            // console.log(lec.email);
        }
    }
    
    );
}
dlist.addEventListener('change',async (e)=>{
 getLecture(e.target.value);
})
logout.addEventListener('click',async()=>{
    // window.location.href='login.html'
const res=await fetch('/logout',{
    method:'POST',
});
if(res.ok)
window.location.href='login.html'
else
alert('logout fail')
})
load();
function selectedEmail(){
    let select_email=form_email.value;
    let select_table_email=dlist.value;
    console.log(select_email);
    console.log(select_table_email);  
}


save.addEventListener("click", () => {
    formdiv.style.display = "none";
    let date = new Date().toLocaleDateString();
    let lecture = {
        subject: subject.value,
        lect: lect.value,
        day: day.value,
        start: start.value,
        end: end.value,
        room: room.value,
        teacher: form_email.value,
        date: date,
        // store:[],
    };
    lectures.push(lecture);
    console.log("currentUser", currentUser);
    console.log(lectures);

    async function post() {
        let data = await fetch('/post/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lecture)
        });
        data = (await data).json();
        console.log(data);
    }
    post();


    subject.value = '';
    lect.value = '';
    day.value = '';
    start.value = '';
    end.value = '';
    room.value = '';
    date = '';
    teacher='';
    showsubject();

    table1.style.display = "block";
    addlec.style.display = "block";

})
function showsubject() {
    let cells = document.querySelectorAll("td[id]");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    lectures.forEach(lec => {
        let period = getPeriodNumber(lec.start);
        let cellId = `${lec.day} ${period}`;
        let cell = document.getElementById(cellId);

        if (cell) {
            cell.innerHTML = `
            <b>${lec.subject}</b><br>
            Room: ${lec.room}<br>

            Period ${period}
        `;
        }
    });

}

function getPeriodNumber(time) {
    let hour = parseInt(time.split(":")[0]);
    if (hour <= 8) return 1;
    if (hour <= 9) return 2;
    if (hour <= 10) return 3;
    if (hour <= 11) return 4;
    if (hour <= 12) return 5;
    if (hour <= 13) return 6;
    if(hour<=14) return 7;
    if(hour>=15) return 8;
    return 0;
}

addlec.addEventListener("click", () => {
    formdiv.style.display = "block";
    table1.style.display = "none";
    addlec.style.display = "none";
})

function showtime() {
    time.innerHTML = new Date().toLocaleString();
}
setInterval(showtime, 1000);
showtime();