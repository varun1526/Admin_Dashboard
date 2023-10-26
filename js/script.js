const sidebar=document.getElementsByClassName("sidebar")[0];
const logout=document.getElementById("logout");
const products=document.getElementById("products");
const purchase_order = document.getElementById("purchase-order");
const sales_order = document.getElementById("sales-order");
const main_container=document.getElementById("main-container");
const product_btn=document.getElementById("product_btn");
const purchase_btn=document.getElementById("purchase_btn");
const sales_btn = document.getElementById("sales_btn");
const prod_data=document.getElementById("prod-data");
products.classList.add("hide");
purchase_order.classList.add("hide");
sales_order.classList.add("hide");
let data;
// fetching data
(async function fetching(){
  let data=JSON.parse(sessionStorage.getItem("data"));
  createChart(data[0]);
  updateProductData(data[0].byproduct);
})()
let openflag=false;
// open sidebar
function openSidebar(){
  if (!openflag) {
    sidebar.setAttribute("id","sidebar-responsive")
    openflag = true;;
  }
}
//creating chart
function updateProductData(data){
  let x=data.map((item)=>{
    return `
        <tr>
          <td>${item.id}</td>
          <td>${item.prod}</td>
          <td>${item.cnt}</td>
          <td>
              <button class="edit ${item.id}">Edit</button>
              <button class="del ${item.id}">Delete</button>
          </td>
        </tr>
      `;
  })
  prod_data.innerHTML=prod_data.innerHTML+x.join('\n');
}
function createChart(data){
  if(data){
    const month = data.bymonth.slice(-Math.min(6, data.bymonth.length));
    const prod = data.byproduct.slice(0,Math.min(6, data.byproduct.length));
    var barchartOptions = {
      series: [
        {
          data: prod.map((item) => item.cnt),
        },
      ],
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
        color: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
      },
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
        total: {
          style: {
            fontSize: "10px",
          },
        },
      },
      xaxis: {
        categories: prod.map((item) => item.prod),
      },
      yaxis: {
        title: {
          title: "count",
        },
      },
    };
    let chart1 = new ApexCharts(
      document.querySelector("#bar-chart"),
      barchartOptions
    );
    chart1.render();
    var areachartOptions = {
      series: [
        {
          name: "Purchase Orders",
          data: month.map((item) => item.purchase),
        },
        {
          name: "Sales Orders",
          data: month.map((item) => item.sales),
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      color: ["#4f35a1", "#246dec"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      labels: month.map((item) => item.month),
      markers: {
        size: 0,
      },
      yaxis: [
        {
          title: {
            text: "Purchase Orders",
          },
        },
        {
          opposite: true,
          title: {
            text: "Sales Orders",
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
    };

    var chart = new ApexCharts(
      document.querySelector("#area-chart"),
      areachartOptions
    );
    chart.render();
  }
}
// closing sidebar
function closeSidebar(){
    if(openflag){
        sidebar.removeAttribute("id", "sidebar-responsive");
        openflag=false;
    }
}
logout.addEventListener("click",(e)=>{
  e.preventDefault();
  sessionStorage.clear();
  window.location.href="./login/index.html"
})
// navigation
let curr=main_container;
product_btn.addEventListener("click",()=>{
  console.log(products);
  products.classList.remove("hide");
  console.log(main_container);
  main_container.classList.add("hide");
})