const sidebar=document.getElementsByClassName("sidebar")[0];
let openflag=false;
function openSidebar() {
  if (!openflag) {
    sidebar.classList.add("sidebar-responsive");
    openflag = true;
  }
}
function closeSidebar(){
    if(openflag){
        sidebar.classList.remove("sidebar-responsive");
        openflag=false;
    }
}
var barchartOptions = {
    series: [{
        data: [10, 8, 6, 4, 2]
    }],
    chart: {    
        type: 'bar',
        height: 300,
        toolbar:{
        show:false
    },
    color:[
        "#246dec",
        "#cc3c43",
        "#367952",
        "#f5b74f",
        "#4f35a1",
    ]
    },
    plotOptions: {
        bar: {
            distributed: true,    
            borderRadius: 4,
            horizontal: false,
            columnWidth: '30%',
        }
    },
    dataLabels: {
        enabled: false,
        total:{
            style:{
                fontSize: "10px",
            }
        }
    },
    xaxis: {
        categories: ["Laptop","Phone","Monitor","Headphones","Camera"],
    },
    yaxis:{
        title:{
            title:"count",
        }
    }
};

let chart1 = new ApexCharts(document.querySelector("#bar-chart"), barchartOptions);
chart1.render();
var areachartOptions = {
  series: [
    {
      name: "Purchase Orders",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Sales Orders",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
    toolbar:{
        show:false,
    },
  },
  color:['#4f35a1','#246dec'],
  dataLabels:{
    enabled:false
  },
  stroke: {
    curve: "smooth",
  },
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
  ],
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

var chart = new ApexCharts(document.querySelector("#area-chart"), areachartOptions);
chart.render();
