"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
const gREQUEST_STATUS_OK = 200;
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gBASE_ORDER_URL = "http://42.115.221.44:8080/devcamp-pizza365/orders";

var gOrderInit = {
  id: "",
  orderId: "",
};
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
onPageLoading();

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// hàm xử lý sự kiện loading
function onPageLoading() {
  "use strict";
  // console.log("hien thi du lieu");
  // Lấy id và ghi ra console Id
  getIdFromTrackingButton();
  // Lấy Order id và ghi ra console Order Id
  getOrderIdFromTrackingButton();
  // Ghi ra console Order response text
  gerOrderbyOrderIdQuery();
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// get Id of the Order from query string
function getIdFromTrackingButton() {
  "use strict";
  var vUrlString = window.location.href; //đường đẫn gọi đến trang
  // console.log(vUrlString);
  var vUrl = new URL(vUrlString);
  // get parameters
  var vId = vUrl.searchParams.get("id");
  // console.log("Đã lấy được Id là: " + vId);
  gOrderInit.id = vId;
}

// get Order id from query string
function getOrderIdFromTrackingButton() {
  "use strict";
  var vUrlString = window.location.href; //đường đẫn gọi đến trang
  // console.log(vUrlString);
  var vUrl = new URL(vUrlString);
  // get parameters
  var vOrderId = vUrl.searchParams.get("orderid");
  // console.log("Order Id là: " + vOrderId);
  gOrderInit.orderId = vOrderId;
}

// Dùng Order Id gọi API lấy order
function gerOrderbyOrderIdQuery() {
  "use strict";

  var vXmlHttpGetOrderById = new XMLHttpRequest();
  vXmlHttpGetOrderById.open(
    "GET",
    gBASE_ORDER_URL + "/" + gOrderInit.orderId,
    true
  );

  // console.log(gOrderInit);
  vXmlHttpGetOrderById.send();
  vXmlHttpGetOrderById.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_STATUS_OK
    ) {
      // console.log(vXmlHttpGetOrderById.responseText);
      var vOrderDataObject = JSON.parse(vXmlHttpGetOrderById.responseText);
      // console.log(vOrderDataObject);
      displayOrderToFormSection(vOrderDataObject);
    }
  };
}

function displayOrderToFormSection(paramOrderDataObject) {
  "use strict";
  // Truy xuất các input element bằng id
  var vInputOrderIdElement = document.getElementById("order-id");
  var vInputComboSizeElement = document.getElementById("combo-size");
  var vInputPizzaDiameterElement = document.getElementById("pizza-diameter");
  var vInputRibPieceElement = document.getElementById("rib-piece");
  var vInputSaladElement = document.getElementById("salad");
  var vInputPizzaTypeElement = document.getElementById("pizza-type");

  var vInputVoucherIdElement = document.getElementById("voucher-id");
  var vInputAmountElement = document.getElementById("amount");
  var vInputDiscountElement = document.getElementById("discount");

  var vInputSelectedDrinkElement = document.getElementById("selected-drink");
  var vInputNumberDrinkElement = document.getElementById("number-drink");

  var vInputFullNameElement = document.getElementById("full-name");
  var vInputEmailElement = document.getElementById("email");
  var vInputPhoneNumberElement = document.getElementById("phone-number");
  var vInputAddressElement = document.getElementById("address");
  var vInputMessageElement = document.getElementById("message");
  var vInputOrderStatusElement = document.getElementById("order-status");
  var vInputCreatedDateElement = document.getElementById("created-date");
  var vInputUpdatedDateElement = document.getElementById("updated-date");

  // Gán value cho các input element với Data lấy được từ Order Object
  vInputOrderIdElement.value = paramOrderDataObject.orderId;
  vInputComboSizeElement.value = paramOrderDataObject.kichCo;
  vInputPizzaDiameterElement.value = paramOrderDataObject.duongKinh;
  vInputRibPieceElement.value = paramOrderDataObject.suon;
  vInputSaladElement.value = paramOrderDataObject.salad;
  vInputPizzaTypeElement.value = paramOrderDataObject.loaiPizza;

  vInputVoucherIdElement.value = paramOrderDataObject.idVourcher;
  vInputAmountElement.value = paramOrderDataObject.thanhTien;
  vInputDiscountElement.value = paramOrderDataObject.giamGia;

  vInputSelectedDrinkElement.value = paramOrderDataObject.idLoaiNuocUong;
  vInputNumberDrinkElement.value = paramOrderDataObject.soLuongNuoc;

  vInputFullNameElement.value = paramOrderDataObject.hoTen;
  vInputEmailElement.value = paramOrderDataObject.email;
  vInputPhoneNumberElement.value = paramOrderDataObject.soDienThoai;
  vInputAddressElement.value = paramOrderDataObject.diaChi;
  vInputMessageElement.value = paramOrderDataObject.loiNhan;
  vInputOrderStatusElement.value = paramOrderDataObject.trangThai;

  // Chuyển đổi data nhận được thành định dạng Date (ngày tháng năm)
  var vCreatedDate = new Date(parseInt(paramOrderDataObject.ngayTao, 10));
  var vUpdatedDate = new Date(parseInt(paramOrderDataObject.ngayCapNhat, 10));
  // Chỉ lấy 25 ký tự đầu tiên cho tới ngày tháng năm tạo, chi tiết đến giờ phút giây
  var vCreatedDateString = vCreatedDate.toString().slice(0, 25);
  var vUpdatedDateString = vUpdatedDate.toString().slice(0, 25);
  vInputCreatedDateElement.value = vCreatedDateString;
  vInputUpdatedDateElement.value = vUpdatedDateString;
}

// Ấn nút confirm chuyển trạng thái của Order và update thông tin bằng API
function onBtnConfirmClick() {
  "use strict";
  var vBtnStatus = "confirmed";
  updateOrderStatusAndRedirect(vBtnStatus);
}

// Ấn nút cancel chuyển trạng thái của Order và update thông tin bằng API
function onBtnCancelClick() {
  "use strict";
  var vBtnStatus = "cancel";
  updateOrderStatusAndRedirect(vBtnStatus);
}

// Nhận status khi nhấn các button Confirm hoặc Cancel và redirect về View Order List
function updateOrderStatusAndRedirect(paramBtnStatus) {
  "use strict";
  var vOrderId = gOrderInit.id;
  var vConfirmRequest = {
    trangThai: paramBtnStatus, //3 trang thai open, confirmed, cancel
  };

  var vXmlHttpUpdateOrder = new XMLHttpRequest();
  vXmlHttpUpdateOrder.open("PUT", gBASE_ORDER_URL + "/" + vOrderId);
  vXmlHttpUpdateOrder.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  vXmlHttpUpdateOrder.send(JSON.stringify(vConfirmRequest));
  vXmlHttpUpdateOrder.onreadystatechange = function () {
    if (
      this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK &&
      this.status == gREQUEST_STATUS_OK
    ) {
      var vConfirmedOrder = vXmlHttpUpdateOrder.responseText;
      // console.log(vConfirmedOrder);
      // Chuyển về trang viewOrderList để check Order đã được confirm chưa
      redirectToViewOrderListPage();
    }
  };
}

// Hàm để redirect về View Order List
function redirectToViewOrderListPage() {
  "use strict";
  location.href = "viewOrderList.html";
}
