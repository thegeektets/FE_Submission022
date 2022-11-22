import View from "./View.js";
import("https://cdn.jsdelivr.net/npm/gridjs/dist/gridjs.umd.js");

const view = new View();

const getHtml = async () => {
  return `${view.setNav()}
            <div class="app--body">
            <h1>Orders</h1>
            <div class="order-list" id="ordersList"></div>
            </div>`;
};

const getOrdersData = async () => {
  let ordersUrl = "https://freddy.codesubmit.io/orders";
  let accessToken = localStorage.getItem("access_token");

  const ordersData = await fetch(ordersUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data.msg === "Token has expired") {
        swal("Failed to load orders!", data.msg, "error");
        window.location.assign("index.html");
      }
      return data;
    }).catch((error) => {
      swal("Failed to load orders!", error.msg, "error");
      window.location.assign("index.html");
      console.error("Error:", error);
    });

  return ordersData;
};

const displayOrders = async (ordersData) => {
  let columnData = [];
  for (let i = 0; i < ordersData.orders.length; i++) {
    let data = ordersData.orders[i];
    let rowData = [data.product.name,
      data.created_at,
      `${data.currency} ${data.total}`,
      data.status,
    ];
    columnData.push(rowData);
  }
  new gridjs.Grid({
    search: true,
    pagination:true,
    columns: ["Product Name", "Date", "Price", "Status"],
    data: columnData,
  }).render(document.getElementById("ordersList"));
};


export default { getHtml, getOrdersData, displayOrders };
