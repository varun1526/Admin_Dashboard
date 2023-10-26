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

let openedBy = undefined;
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
let data2 = JSON.parse(sessionStorage.getItem("data"));
console.log(data2);
function getData(data) {
  return data
    .map((item) => {
      return `<div class="data_set">
            <p>${item.id}</p>
            <p>${item.name}</p>
            <p>${item.email}</p>
            <div>
                <button class="btn ${item.id}">Edit</button>
                <button class="btn ${item.id}">Delete</button>
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
  buyer_data.innerHTML = getData(buy);
  consumer_data.innerHTML = getData(con);
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
    console.log(data2[0]);
    sessionStorage.setItem("data",JSON.stringify(data2));
    window.location.href="./login/index.html";
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
