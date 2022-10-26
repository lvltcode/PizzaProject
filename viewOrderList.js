"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gREQUEST_STATUS_OK = 200;
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gBASE_URL = "http://42.115.221.44:8080/devcamp-pizza365/orders";

var gUserListObject = {};

const gEND_ROW_TABLE = -1;
// hằng số số thứ tự các cột
const gCOLUMN_ORDER_ID = 0;
const gCOLUMN_COMBO_SIZE = 1;
const gCOLUMN_PIZZA_TYPE = 2;
const gCOLUMN_DRINK = 3;
const gCOLUMN_AMOUNT = 4;
const gCOLUMN_NAME = 5;
const gCOLUMN_PHONE_NUMBER = 6;
const gCOLUMN_ORDER_STATUS = 7;
const gCOLUMN_DETAILS = 8;

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
onPageLoading();

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// hàm xử lý sự kiện loading
function onPageLoading() {
  // console.log("hien thi du lieu");
  callAPIToLoadOrderListObject();
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// hiển thị dữ liệu lên table

function callAPIToLoadOrderListObject() {
  "use strict";
  var vXHTMLRequest = new XMLHttpRequest();
  vXHTMLRequest.open("GET", gBASE_URL, true);
  vXHTMLRequest.send();
  vXHTMLRequest.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_STATUS_OK
    ) {
      console.log(vXHTMLRequest.responseText);
      var vOrderObjectList = JSON.parse(vXHTMLRequest.responseText);
      drawTableAndAddDataToIt(vOrderObjectList);
      addEventToDetailButton();
    }
  };
}

function drawTableAndAddDataToIt(paramOrderObjectList) {
  "use strict";
  // console.log(paramOrderObjectList)
  var vTable = document.getElementById("order-table");
  var vTableBody = vTable.getElementsByTagName("tbody")[0];

  for (var bIndex = 0; bIndex < paramOrderObjectList.length; bIndex++) {
    var bOrder = paramOrderObjectList[bIndex];
    // tạo dòng mới cho bẳng và ghi vào các giá trị
    var bRow = vTableBody.insertRow(gEND_ROW_TABLE);

    var bCellOrderId = bRow.insertCell(gCOLUMN_ORDER_ID);
    var bCellComboSize = bRow.insertCell(gCOLUMN_COMBO_SIZE);
    var bCellPizzaType = bRow.insertCell(gCOLUMN_PIZZA_TYPE);
    var bCellDrink = bRow.insertCell(gCOLUMN_DRINK);
    var bCellAmount = bRow.insertCell(gCOLUMN_AMOUNT);
    var bCellName = bRow.insertCell(gCOLUMN_NAME);
    var bCellPhoneNumber = bRow.insertCell(gCOLUMN_PHONE_NUMBER);
    var bCellOrderStatus = bRow.insertCell(gCOLUMN_ORDER_STATUS);
    var bCellButtonDetail = bRow.insertCell(gCOLUMN_DETAILS);

    bCellOrderId.innerHTML = bOrder.orderId;
    bCellComboSize.innerHTML = bOrder.kichCo;
    bCellPizzaType.innerHTML = bOrder.loaiPizza;
    bCellDrink.innerHTML = bOrder.idLoaiNuocUong;
    bCellAmount.innerHTML = bOrder.thanhTien;
    bCellName.innerHTML = bOrder.hoTen;
    bCellPhoneNumber.innerHTML = bOrder.soDienThoai;
    bCellOrderStatus.innerHTML = bOrder.trangThai;

    // add button to row
    var bButtonDetail = document.createElement("button");
    bButtonDetail.innerHTML = "Chi tiết";
    bButtonDetail.className = "btn btn-success btn-detail w-100";
    bButtonDetail.setAttribute("data-id", bOrder.id);
    bButtonDetail.setAttribute("data-orderid", bOrder.orderId);
    bButtonDetail.setAttribute("data-size", bOrder.kichCo);
    bButtonDetail.setAttribute("data-pizzatype", bOrder.loaiPizza);
    bButtonDetail.setAttribute("data-drink", bOrder.idLoaiNuocUong);
    bButtonDetail.setAttribute("data-amount", bOrder.thanhTien);
    bButtonDetail.setAttribute("data-name", bOrder.hoTen);
    bButtonDetail.setAttribute("data-phonenumber", bOrder.soDienThoai);
    bButtonDetail.setAttribute("data-orderstatus", bOrder.trangThai);

    // gắn nút chi tiết vào ô Button
    bCellButtonDetail.appendChild(bButtonDetail);
  }
}

function addEventToDetailButton() {
  "use strict";
  // console.log("Click");
  // truy xuất tất cả các nút chi tiết
  var vButtonDetails = document.getElementsByClassName("btn-detail");
  // console.log(vButtonDetails.length);
  for (var bI = 0; bI < vButtonDetails.length; bI++) {
    // console.log(vButtonDetails[bI]);
    vButtonDetails[bI].addEventListener("click", onButtonClick);
  }
}

function onButtonClick() {
  // Lấy Id & Order Id
  var vId = this.dataset.id;
  var vOrderId = this.dataset.orderid;
  // gọi và truyền data qua form Details
  const vDETAIL_FORM_URL = "OrderDetailFromOrderList.html";
  var vUrlSiteToOpen = vDETAIL_FORM_URL + "?id=" + vId + "&orderid=" + vOrderId;
  window.location.href = vUrlSiteToOpen;
}
