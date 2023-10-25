const buyer=document.getElementById("buyer");
const consumer=document.getElementById("consumer");
const main1=document.getElementsByTagName("main");
const btn_consume=document.getElementById("consume");
const form= document.getElementsByClassName("form");
const absolute=document.getElementsByClassName("absolute");
const body=document.getElementsByTagName("body")[0];
const buyer_data=document.getElementById("buyer-data");
const consumer_data=document.getElementById("consumer-data");
btn_consume.addEventListener("click",(e)=>{
    form[0].style.top=""+(e.offsetY+(window.innerHeight/2))+"px";
    form[0].style.left = "" + (e.offsetX  +window.innerWidth / 2) + "px";
    main1[0].style.opacity=0;
    form[0].style.animation="example 0.4s linear";
    form[0].style.scale = "1";
    main1[0].style.overflow="hidden";
});
absolute[0].addEventListener("click",()=>{
    form[0].style.scale=0;
    form[0].style.top="0px";
    form[0].style.left = "0px";
    form[0].style.animation = "none";
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
                <button id=${item.id} class="btn edit">Edit</button>
                <button id="${item.id}" class="btn delete">Delete</button>
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