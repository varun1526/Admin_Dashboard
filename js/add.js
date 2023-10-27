const buyer = document.getElementById("buyer");
const consumer = document.getElementById("consumer");
const main1 = document.getElementsByTagName("main");
const btn_consume = document.getElementById("consume");
const add = document.getElementById("add");
const close2 = document.getElementById("close");
const body = document.getElementsByTagName("body")[0];
const buyer_data = document.getElementById("buyer-data");
const consumer_data = document.getElementById("consumer-data");
const add_btn = document.getElementById("add_");
const add_name = document.getElementById("add_name");
const add_email = document.getElementById("add_email");
const btn_buyer=document.getElementById("buyer");
const edit_user=document.getElementById("edit_user");
const update_=document.getElementById("update_");
const update_email=document.getElementById("update_email");
const update_name = document.getElementById("update_name");
const update_close=document.getElementById("update_close");
let openedBy = undefined;
let edit_id;
let edit_on;
btn_consume.addEventListener("click", (e) => {
  add.style.top = "" + window.innerHeight / 2 + "px";
  add.style.left = "" + window.innerWidth / 2 + "px";
  main1[0].style.opacity = 0;
  add.style.animation = "example 0.4s linear";
  add.style.scale = "1";
  main1[0].style.overflow = "hidden";
  openedBy = "consumer";
});
btn_buyer.addEventListener("click", (e) => {
  add.style.top = "" + window.innerHeight / 2 + "px";
  add.style.left = "" + window.innerWidth / 2 + "px";
  main1[0].style.opacity = 0;
  add.style.animation = "example 0.4s linear";
  add.style.scale = "1";
  main1[0].style.overflow = "hidden";
  openedBy = "buyer";
});
close2.addEventListener("click", () => {
  add.style.scale = "0";
  add.style.top = "0px";
  add.style.left = "0px";
  add.style.animation = "none";
  main1[0].style.opacity = 1;
  main1[0].style.overflow = "auto";
});
update_close.addEventListener("click",()=>{
  edit_user.style.top = "0px";
  edit_user.style.left = "0px";
  main1[0].style.opacity = 1;
  edit_user.style.animation = "none";
  edit_user.style.scale = "0";
  main1[0].style.overflow = "auto";
})
let data2 = JSON.parse(sessionStorage.getItem("data"));
update_.addEventListener("click", (e) => {
    e.preventDefault();
    let name=update_name.value;
    let email=update_email.value;
    let x=false;
    console.log(data2[0][edit_on]);
    data2[0][edit_on].forEach(item=>{
      if(item.email===email && Number(item.id)!=Number(edit_id)){
          x=true;
      }
    });
    if(x==true){
      alert("Email already exists");
    }
    else{
      data2[0][edit_on].forEach(item=>{
        if(Number(item.id)==Number(edit_id)){
          item.name=name;
          item.email=email;
        }
      })
      sendData2(data2);

    }
});
function delete_(e) {
  let classes=Array.from(this.classList);
  let operation_on=classes[1];
  let id=classes[2];
  let new_=data2[0][operation_on].filter((item)=>item.id!=id);
  for(let i=0;i<new_.length;i++){
    new_[i].id=i+1;
  }
  data2[0][operation_on]=new_;
  sessionStorage.setItem("data",JSON.stringify(data2));
  sendData2(data2);
}
function update(e){ 
  let classes=Array.from(this.classList);
  edit_on=classes[1];
  edit_id=classes[2];
  console.log(edit_id);
  edit_user.style.top = "" + window.innerHeight / 2 + "px";
  edit_user.style.left = "" + window.innerWidth / 2 + "px";
  main1[0].style.opacity = 0;
  edit_user.style.animation = "example 0.4s linear";
  edit_user.style.scale = "1";
  main1[0].style.overflow = "hidden";
  console.log(data2[0][edit_on]);
  let update_on = data2[0][edit_on].filter((item) => item.id == edit_id);;
  update_name.value=update_on[0].name;
  update_email.value=update_on[0].email;
  // console.log(update_on);
}
async function sendData2(data){
  const response = await fetch(`http://localhost:3000/login/${data[0].id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "manual",
    body: JSON.stringify(data[0]),
  });
  if (response.ok) {
    sessionStorage.setItem("data", JSON.stringify(data));
    window.location.href = "../index.html";
  }
  else{
    alert("Error in updating data");
  }
}
function getData(data,val) {
  return data
    .map((item) => {
      return `<div class="data_set">
            <p>${item.id}</p>
            <p>${item.name}</p>
            <p>${item.email}</p>
            <div>
                <button class="edit_btn ${val} ${item.id}">Edit</button>
                <button class="del_btn ${val} ${item.id}">Delete</button>
            </div>
        </div>`;
    })
    .join(" ");
}
(function render() {
  if (data2.length == 0) {
    return;
  }
  let con = data2[0].consumer;
  let buy = data2[0].buyer;
  buyer_data.innerHTML = getData(buy,"buyer");
  consumer_data.innerHTML = getData(con,"consumer");
  const del_btn = document.getElementsByClassName("del_btn");
  for (let item of del_btn) {
    item.addEventListener("click",delete_);
  }
  const edit_btn = document.getElementsByClassName("edit_btn");
  for(let item of edit_btn){
    item.addEventListener("click",update)
  }
})();
function checkData(username, email) {
  let x = false;
  data2[0][openedBy].forEach((element) => {
    if (element?.email === email) {
      x = true;
    }
  });
  return x;
}
async function sendData(username, email) {
  let data_add = { name: username, email: email };
  data2[0][openedBy].push(data_add);
  for(let i=0;i<data2[0][openedBy].length;i++){
    data2[0][openedBy][i].id=i+1;
  }
  const response = await fetch(`http://localhost:3000/login/${data2[0].id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "manual",
    body: JSON.stringify(data2[0]),
  });
  if(response.ok){
    sessionStorage.setItem("data",JSON.stringify(data2));
    window.location.href="../index.html";
  }
}
add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = add_name.value;
  const email = add_email.value;
  let x = checkData(username, email);
  if (x == true) {
    alert("Email already exists");
  } else {
    sendData(username, email);
  }
});
