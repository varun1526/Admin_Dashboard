const sign_in=document.getElementById("sign_in");
const sign_up=document.getElementById("sign_up");
const nav_bar=document.getElementsByClassName("nav_bar");
const navigation = document.getElementsByClassName("navigation");
const login_anchor=document.getElementById("login_anchor");
const signin_anchor=document.getElementById("signin_anchor");
const login=document.getElementById("login");
const signup=document.getElementById("signup");
const error=document.getElementsByClassName("error");
const password_error=document.getElementById("password_error");
const username_exists=document.getElementById("username_exists");
const email_exists=document.getElementById("email_exists");
const password_match=document.getElementById("password_match");
const login_button=document.getElementById("login_button");
const login_username=document.getElementById("login_username");
const login_password=document.getElementById("login_password");
const signup_button=document.getElementById("signup_button");
const signup_username=document.getElementById("signup_username");
const signup_email=document.getElementById("signup_email");
const signup_password=document.getElementById("signup_password");
const confirm_password=document.getElementById("confirm_password");
let curr=null;
login.classList.add("hide");
signup.classList.add("hide");
navigation[0].classList.add("hide");
for(let x of error){
    x.classList.add("hide");
}
async function addData(userData){
    try{
        const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "manual",
        body: JSON.stringify(userData),
        });
        if(response){
            sessionStorage.setItem("data",userData);
            window.location.href = "../index.html";
        }
    }
    catch(e){
        alert("network error");
    }
    finally{
        sign_up.reset()
    }
}
function createUser(){
    let userData = {
      "username": signup_username.value,
      "password": signup_password.value,
      "consumer": [],
      "buyer": [],
      "bymonth": [],
      "byproduct": []
    };
    addData(userData);
}
async function fetchData(){
    try{
        const json = await fetch(`http://localhost:3000/login?username=${login_username.value}&password=${login_password.value}`);
        const data=await json.json();
        if(data.length===0){
            throw "user doesn't exists";
        }
        sessionStorage.setItem("data",JSON.stringify(data));
        window.location.href = "../index.html";
    }
    catch(e){
        password_error.classList.remove("hide");
        await new Promise((res, rej) => {
          setTimeout(() => {
            password_error.classList.add("hide");
            res();
          }, 1000);
        });
        login_username.value="";
        login_password.value="";
    }
}
sign_in.addEventListener("click",()=>{
    nav_bar[0].classList.add("hide");
    login.classList.remove("hide");
    navigation[0].classList.remove("hide");
    login_anchor.classList.add("active");
    curr=login_anchor;
})
sign_up.addEventListener("click", () => {
    nav_bar[0].classList.add("hide");
    signup.classList.remove("hide");
    navigation[0].classList.remove("hide");
    signin_anchor.classList.add("active");
    curr = signin_anchor;
});
login_anchor.addEventListener("click",()=>{
    if(curr!=login_anchor){
        signup.classList.add("hide");
        signin_anchor.classList.remove("active");
        curr = login_anchor;
        login.classList.remove("hide");
        login_anchor.classList.add("active");
    }
})
signin_anchor.addEventListener("click",()=>{
    if (curr != signin_anchor) {
        login.classList.add("hide");
        login_anchor.classList.remove("active");
        curr = signin_anchor;
        signup.classList.remove("hide");
        signin_anchor.classList.add("active");
    }
})
login_button.addEventListener("click",(e)=>{
    e.preventDefault();
    fetchData();
})
async function check(){
    const username=signup_username.value;
    try{
        const json = await fetch(`http://localhost:3000/login?username=${username}`);
        const data=await json.json();
        if(data.length>0){
            username_exists.classList.remove("hide");
            await new Promise((res,rej)=>{setTimeout(()=>{
                username_exists.classList.add("hide");  
                res();
            },1000)});
        }
        else{
            createUser();
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        signup_password.value="";
        signup_email.value = "";
        signup_username.value = "";
        confirm_password.value = "";
    }
}
signup_button.addEventListener("click",(e)=>{
    e.preventDefault();
    check();
})
