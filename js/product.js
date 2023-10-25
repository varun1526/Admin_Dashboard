const edit=document.getElementsByClassName("edit");
const product_edit=document.getElementById("product_edit");
const edit_close=document.getElementById("edit_close");
for(let item of edit){
    item.addEventListener("click",update);
}
console.log(products);
function update(e){
    const id=this.classList[1];
    products.classList.add("hide");
    product_edit.style.scale='1';
    product_edit.style.top = ""+(window.innerHeight / 2) + "px";
    product_edit.style.left = "" + window.innerWidth / 2 + "px";
}
edit_close.addEventListener("click",()=>{
    products.classList.remove("hide");
    product_edit.style.scale = "0";
    product_edit.style.top = "0px";
    product_edit.style.left = "0px";
})