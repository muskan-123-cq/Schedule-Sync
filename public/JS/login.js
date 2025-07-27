let loginemail = document.querySelector("#loginemail");
let loginpass = document.querySelector("#loginpass");
let submitbtn = document.querySelector("#submitbtn");
let teacher = document.querySelector("#teacher");
let admin = document.querySelector("#admin");

submitbtn.addEventListener("click", async() => {
    let loginuser = loginemail.value.trim();
    let loginpassword = loginpass.value.trim();
    let role;

    if (teacher.checked) role = teacher.value;
    else if (admin.checked) role = admin.value;
    else { 
        alert("Please select a role");
        return;
    }

    if (!loginuser || !loginpassword) {
        alert("Please enter both email and password.");
        return;
    }

    let obj = {
        email : loginuser,
        password : loginpassword,
        role : role
    }

    let data = await fetch('/login/user',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(obj)
    })

    let temp = await data.json();
    

    if(data.ok){
        await fetch('/post/currentUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(temp)
        });
        if(role=='teacher')
            window.location.href='/teacher';
        else
        window.location.href='/admin';
    }
    else{
        console.log(temp);
    }
       
});