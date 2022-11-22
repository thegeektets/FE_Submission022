import View from "./View.js";
import("../../js/chart.umd.js");
import("https://cdn.jsdelivr.net/npm/gridjs/dist/gridjs.umd.js");
const view = new View();

const initDashboard = async (week = true, dashboardData) => {
  document.querySelector("#app").innerHTML = await getHtml(week);
  document.querySelector(
    "#todayMetric"
  ).innerHTML = `$${dashboardData.dashboard.sales_over_time_week[1].total} / ${dashboardData.dashboard.sales_over_time_week[1].orders} orders `;
  document.querySelector(
    "#weekMetric"
  ).innerHTML = `$${dashboardData.dashboard.sales_over_time_week[2].total} / ${dashboardData.dashboard.sales_over_time_week[2].orders} orders `;
  document.querySelector(
    "#monthMetric"
  ).innerHTML = `$${dashboardData.dashboard.sales_over_time_year[1].total} / ${dashboardData.dashboard.sales_over_time_year[1].orders} orders `;

  listBestSellers(dashboardData.dashboard.bestsellers);
};

const createChart = function (chartData, week = true) {
  const ctx = document.getElementById("barChart");

  let xAxis = [];
  let yAxis = [];

  const orderedData = Object.keys(chartData)
    .sort()
    .reduce((obj, key) => {
      obj[key] = chartData[key];
      return obj;
    }, {});

  Object.keys(orderedData).forEach(function (key) {
    if (week) {
      if (key == 1) {
        yAxis.push("Today");
      } else if (key == 2) {
        yAxis.push("Yesterday");
      } else {
        yAxis.push(`Day ${key}`);
      }
    } else {
      if (key == 1) {
        yAxis.push("this Month");
      } else if (key == 2) {
        yAxis.push("last Month");
      } else {
        yAxis.push(`Month ${key}`);
      }
    }

    xAxis.push(chartData[key].orders);
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: yAxis,
      datasets: [
        {
          label: "Sales",
          data: xAxis,
        },
      ],
    },
  });
};

const getDashboardData = async () => {
  let dasbhoardUrl = "https://freddy.codesubmit.io/dashboard";
  let accessToken = localStorage.getItem("access_token");

  const dashboardData = await fetch(dasbhoardUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.msg === "Token has expired") {
        swal("Failed to load dashboard!", data.msg, "error");
        window.location.assign("index.html");
      }
      return data;
    })
    .catch((error) => {
      swal("Failed to load dashboard!", error.msg, "error");
      window.location.assign("index.html");
      console.error("Error:", error);
    });

  return dashboardData;
};

const getHtml = async (week = true) => {
  return `${view.setNav()}
        <div class="app--body">
            <h1>Dashboard</h1>
            <ul class="dashboard--metrics">
            <li>
                <div class="metric--title">
                This Week
                </div>
                <div class="metric--value" id="todayMetric">
                
                </div>
            </li>
            <li>
            <div class="metric--title">
            Last Week
            </div>
            <div class="metric--value" id="weekMetric">
            
            </div>
        </li>
        <li>
        <div class="metric--title">
        Last Month
        </div>
        <div class="metric--value" id="monthMetric">
        
        </div>
    </li>
            </ul>

            <div id="revenueSwitch">
            <label class="switch">
            <input type="checkbox" id="revenueCheckBox" ${
              week ? "" : "checked"
            }>
            <span class="slider"></span>
            </label>
            </button>
            </div>

            
            <h2>${
              week ? "Revenue (last 7 days)" : "Revenue (last 12 months)"
            } </h2>
            
            <canvas id="barChart" class="bar-chart">
            
            </canvas>
            
            <h2> Bestsellers </h2>

            <div id="bestSellersGrid" class="best-sellers"></div>
         </div>
        `;
};
const listBestSellers = async (sellerData) => {
  let columnData = [];
  for (let i = 0; i < sellerData.length; i++) {
    let data = sellerData[i];
    let rowData = [
      data.product.name,
      Math.floor(data.revenue / data.units),
      data.units,
      data.revenue,
    ];
    columnData.push(rowData);
  }
  new gridjs.Grid({
    columns: ["Product", "Price", "# Units Sold", "Revenue"],
    data: columnData,
  }).render(document.getElementById("bestSellersGrid"));
};

export default { getHtml, createChart, getDashboardData, listBestSellers,initDashboard };
