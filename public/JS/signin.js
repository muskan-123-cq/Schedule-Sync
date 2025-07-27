let logindiv = document.querySelector("#logindiv");
let submitbtn = document.querySelector("#submitbtn");
let loginemailInput = document.querySelector("#loginemail");
let passwordInput = document.querySelector("#password");
let teacher = document.querySelector("#teacher");
let admin = document.querySelector("#admin");

submitbtn.addEventListener("click", async() => {
    // alert("Button clicked!");
    // e.preventDefault();
    let email = loginemailInput.value.trim();
    let password = passwordInput.value.trim();
    let role;

    if (teacher.checked) role = teacher.value;
    else if (admin.checked) role = admin.value;
    else {
        alert("Please select a role.");
        return;
    }

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    let user = {
        email: email,
        password: password,
        role: role
    };
    
    let data = await fetch('/sign/user',{
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(user)
    });
    let responce = await data.json();
    console.log(responce);

    if(responce.status!=404)
        window.location='login.html';

});