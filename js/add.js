const buyer=document.getElementById("buyer");
const consumer=document.getElementById("consumer");
const main1=document.getElementsByTagName("main");
const btn_consume=document.getElementById("consume");
const add= document.getElementById("add");
const close2=document.getElementById("close");
const body=document.getElementsByTagName("body")[0];
const buyer_data=document.getElementById("buyer-data");
const consumer_data=document.getElementById("consumer-data");
btn_consume.addEventListener("click",(e)=>{
    add.style.top=""(window.innerHeight/2)+"px";
    add.style.left = "" + (window.innerWidth / 2) + "px";
    main1[0].style.opacity=0;
    add.style.animation="example 0.4s linear";
    add.style.scale = "1";
    main1[0].style.overflow="hidden";
});
close2.addEventListener("click",()=>{
    add.style.scale="0";
    add.style.top="0px";
    add.style.left = "0px";
    add.style.animation = "none";
    main1[0].style.opacity=1;
    main1[0].style.overflow="auto";
})
let data2=JSON.parse(sessionStorage.getItem("data"));
function getData(data){
    return (data.map((item)=>{
        return `<div class="data_set">
            <p>${item.id}</p>
            <p>${item.name}</p>
            <p>${item.email}</p>
            <div>
                <button class="btn ${item.id}">Edit</button>
                <button class="btn ${item.id}">Delete</button>
            </div>
        </div>`;
    })).join(' ');
}
(function render(){
  if(data2.length==0){
    return;
  }
  let con=data2[0].consumer;
  let buy=data2[0].buyer;
  buyer_data.innerHTML=getData(con);
  consumer_data.innerHTML=getData(buy);
})()