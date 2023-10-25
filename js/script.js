const sidebar=document.getElementById("sidebar");
const logout=document.getElementById("logout");
let data;
(async function fetching(){
  let data=JSON.parse(sessionStorage.getItem("data"));
  createChart(data[0]);
})()
let openflag=false;
function openSidebar() {
  if (!openflag) {
    sidebar.classList.add("sidebar-responsive");
    openflag = true;
  }
}
function createChart(data){
  console.log(data);
  if(data){
    // console.log(data);
    const month = data.bymonth.slice(-Math.min(6, data.bymonth.length));
    const prod = data.byproduct.slice(-Math.min(6, data.byproduct.length));
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
function closeSidebar(){
    if(openflag){
        sidebar.classList.remove("sidebar-responsive");
        openflag=false;
    }
}
logout.addEventListener("click",(e)=>{
  e.preventDefault();
  sessionStorage.clear();
  window.location.href="./login/index.html"
})